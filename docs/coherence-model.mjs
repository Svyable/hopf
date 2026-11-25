// Synthetic experiments only. Phases are classical oscillator coordinates, not quantum amplitudes or EEG measurements.
export function rng(seed){let a=seed>>>0;return ()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
const normal=r=>Math.sqrt(-2*Math.log(Math.max(r(),1e-15)))*Math.cos(2*Math.PI*r());
export function order(theta){let x=0,y=0;for(const a of theta){x+=Math.cos(a);y+=Math.sin(a)}x/=theta.length;y/=theta.length;return {x,y,R:Math.hypot(x,y),F:x*x+y*y}}
export function nullMoments(n){return {mean:1/n,variance:(n-1)/n**3}}
export function simulate({n=48,K=0,H=0,D=.3,seed=42,steps=1600,dt=.02,spread=1}={}){
 const r=rng(seed),theta=Array.from({length:n},()=>2*Math.PI*r()),omega=Array.from({length:n},()=>spread*normal(r)),trace=[],snapshots=[];
 for(let step=0;step<=steps;step++){
  const z=order(theta);if(step%10===0){trace.push({time:step*dt,...z});snapshots.push([...theta])}
  if(step===steps)break;
  for(let j=0;j<n;j++){const a=theta[j];theta[j]=(a+dt*(omega[j]+K*(z.y*Math.cos(a)-z.x*Math.sin(a))-H*Math.sin(a))+Math.sqrt(2*D*dt)*normal(r))%(2*Math.PI)}
 }
 const tail=trace.slice(Math.floor(trace.length/2));return {trace,snapshots,mean:tail.reduce((s,v)=>s+v.F,0)/tail.length,omega};
}
export function plv(a,b){let x=0,y=0;for(let i=0;i<a.length;i++){x+=Math.cos(a[i]-b[i]);y+=Math.sin(a[i]-b[i])}return Math.hypot(x,y)/a.length}
export function plvMatrix(snapshots,n=12){const tail=snapshots.slice(Math.floor(snapshots.length/2));const channels=Array.from({length:n},(_,j)=>tail.map(v=>v[j]));return channels.map(a=>channels.map(b=>plv(a,b)))}
export function entropy(p){return p<=0||p>=1?0:-p*Math.log2(p)-(1-p)*Math.log2(1-p)}
// Uniform-stationary 4-state model (visible bit x, hidden bit h); only one bit may flip.
export function agent(p0,p1,q=.1){if([p0,p1,q].some(v=>!Number.isFinite(v)||v<0)||Math.max(p0,p1)+q>1)throw RangeError('Invalid transition probabilities');const matrix=Array.from({length:4},(_,i)=>{let p=i%2?p1:p0,row=[0,0,0,0];row[i]=1-p-q;row[i^2]=p;row[i^1]=q;return row});return {matrix,defect:Math.abs(p0-p1),information:entropy((p0+p1)/2)-(entropy(p0)+entropy(p1))/2,coarse:[[(1-(p0+p1)/2),(p0+p1)/2],[(p0+p1)/2,1-(p0+p1)/2]]}}
const sigmoid=x=>1/(1+Math.exp(-x));
export function pairedP(a,b){const n=a+b;if(n===0)return 1;let term=2**(-n),sum=term;for(let i=1;i<=Math.min(a,b);i++){term*= (n-i+1)/i;sum+=term}return Math.min(1,2*sum)}
// Paired synthetic target/sham trial; shared nuisance is identical in each pair.
export function trial({n=120,beta=0,similarity=.8,dose=1,seed=42}={}){const r=rng(seed),rows=[];let a=0,b=0,target=0,sham=0;for(let i=0;i<n;i++){const nuisance=normal(r),p=sigmoid(-.5+nuisance),p1=sigmoid(-.5+nuisance+beta*similarity*dose),t=Number(r()<p1),s=Number(r()<p);target+=t;sham+=s;a+=t&&!s?1:0;b+=s&&!t?1:0;rows.push({pair:i+1,target:t,sham:s,similarity,dose})}return {rows,a,b,target,sham,effect:(target-sham)/n,p:pairedP(a,b)}}
export function calibration({reps=300,n=120,beta=0,similarity=.8,dose=1,seed=42}={}){let hits=0,mean=0;const effects=[];for(let i=0;i<reps;i++){const t=trial({n,beta,similarity,dose,seed:(seed+Math.imul(i,2654435761))>>>0});hits+=t.p<=.05;mean+=t.effect;effects.push(t.effect)}return {fraction:hits/reps,mean:mean/reps,effects}}
