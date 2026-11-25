// Synthetic presentiment benchmark. No human data, physical random target, or retrocausality claim.
export function rng(seed){let a=seed>>>0;return ()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
const normal=r=>Math.sqrt(-2*Math.log(Math.max(r(),1e-15)))*Math.cos(2*Math.PI*r());
export const stakes=[-.9,-.6,-.3,-.1,.1,.3,.6,.9];
export function forecast(p,s,stake){return p+stake*s*Math.min(p,1-p)}
export function factor(p,s,y,stake){if(!(p>0&&p<1)||Math.abs(s)>1||Math.abs(stake)>1||!(y===1||y===-1))throw RangeError('Invalid bet');const q=forecast(p,s,stake);return y===1?q/p:(1-q)/(1-p)}
export function logMeanExp(logs){const m=Math.max(...logs);return m+Math.log(logs.reduce((a,v)=>a+Math.exp(v-m),0)/logs.length)}
export function evidence(rows,key,correct=true){let logs=stakes.map(()=>0),peak=0;return rows.map((r,i)=>{const p=correct?r.p:.5;for(let j=0;j<stakes.length;j++)logs[j]+=Math.log(factor(p,r[key],r.y,stakes[j]));let logE=logMeanExp(logs)/Math.LN10;peak=Math.max(peak,logE);return {i:i+1,logE,peak}})}
export const post=t=>t<0?0:Math.exp(-t/6);
export const pre=t=>t>=-12&&t<0?Math.exp(t/6):0;
export function filtered(values,t,w,centered){let sum=0;for(let k=-w;k<=w;k++)sum+=values[t+40+k-(centered?0:w)];return sum/(2*w+1)}
export function leakKernel(t,w,centered){let sum=0;for(let k=-w;k<=w;k++)sum+=post(t+k-(centered?0:w));return sum/(2*w+1)}
const score=(v,w,centered)=>Math.tanh([-4,-3,-2,-1].reduce((s,t)=>s+filtered(v,t,w,centered),0)/4);
export function simulate({n=480,seed=42,w=6,carry=.65,repeat=.5,beta=0,amplitude=2,collect=true}={}){
 if(!Number.isInteger(n)||n<1||n>2000||!Number.isInteger(w)||w<0||w>10||repeat<.05||repeat>.95||!Number.isFinite(carry)||!Number.isFinite(beta)||!Number.isFinite(amplitude))throw RangeError('Invalid synthetic experiment');
 const r=rng(seed),rows=[],times=Array.from({length:41},(_,i)=>i-20),sums=times.map(()=>[0,0,0]),counts=[0,0];let prev=0,ar=0;
 for(let i=0;i<n;i++){
  const raw=new Float64Array(81);
  for(let t=-40;t<0;t++){ar=.8*ar+.6*normal(r);raw[t+40]=ar+carry*prev}
  // Only now draw target. Conditional probability is recorded, not estimated.
  const p=prev===0?.5:prev===1?repeat:1-repeat,y=r()<p?1:-1;
  // Deliberate violation inserted only in the hypothetical alternative.
  if(beta!==0)for(let t=-12;t<0;t++)raw[t+40]+=beta*y*pre(t);
  for(let t=0;t<=40;t++){ar=.8*ar+.6*normal(r);raw[t+40]=ar+carry*prev+amplitude*y*post(t)}
  const causal=score(raw,w,false),acausal=score(raw,w,true),plain=score(raw,0,false);
  rows.push({i:i+1,y,p,causal,acausal,plain});
  if(collect){const j=y===1?0:1;counts[j]++;for(let k=0;k<times.length;k++){const t=times[k];sums[k][0]+=y*raw[t+40];sums[k][1]+=y*filtered(raw,t,w,false);sums[k][2]+=y*filtered(raw,t,w,true)}}
  prev=y;
 }
 const traces=[evidence(rows,'causal'),evidence(rows,'acausal'),evidence(rows,'causal',false)];
 return {rows,traces,contrast:times.map((t,i)=>({t,raw:2*sums[i][0]/n,causal:2*sums[i][1]/n,acausal:2*sums[i][2]/n,leak:2*amplitude*leakKernel(t,w,true)})),counts};
}
export function calibrate(options,reps=150){let hits=[0,0,0];for(let i=0;i<reps;i++){const a=simulate({...options,seed:(options.seed+Math.imul(i,2654435761))>>>0,collect:false});a.traces.forEach((t,j)=>hits[j]+=t.at(-1).peak>=Math.log10(20)?1:0)}return {reps,hits,rates:hits.map(x=>x/reps)}}
export function kl(p,q){return (p===0?0:p*Math.log2(p/q))+(p===1?0:(1-p)*Math.log2((1-p)/(1-q)))}
export function information(p,truth,pred){return {oracle:kl(truth,p),loss:kl(truth,pred),growth:kl(truth,p)-kl(truth,pred)}}
// Enumerate all 2^n target histories under a known adaptive null. Predictable score = previous target.
export function exactNull(n,repeat=.8){if(!Number.isInteger(n)||n<1||n>18||repeat<=0||repeat>=1)throw RangeError('Invalid exact null');let expected=0,crossing=0,mass=0;function walk(depth,prev,prob,logs,hit){if(depth===n){expected+=prob*Math.exp(logMeanExp(logs));mass+=prob;if(hit)crossing+=prob;return}let p=prev===0?.5:prev===1?repeat:1-repeat;for(const y of [-1,1]){const next=logs.map((l,j)=>l+Math.log(factor(p,prev,y,stakes[j])));walk(depth+1,y,prob*(y===1?p:1-p),next,hit||logMeanExp(next)>=Math.log(20))}}walk(0,0,1,stakes.map(()=>0),false);return {expected,crossing,mass,paths:2**n}}
