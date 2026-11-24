// Borel-Weil-Bott convention: parabolic-dominant GL(5) weights (lambda1; lambda2>=...>=lambda5).
export function bott(weight){
 if(weight.length!==5||weight.some(x=>!Number.isSafeInteger(x)||Math.abs(x)>100)||weight.slice(1).some((x,i,a)=>i>0&&a[i-1]<x))throw new RangeError('Expected five bounded integer weights with dominant tail');
 const shifted=weight.map((v,i)=>v+4-i);
 if(new Set(shifted).size!==5)return {shifted,sorted:null,degree:null,highest:null,dimension:0,index:0};
 let degree=0;for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)if(shifted[i]<shifted[j])degree++;
 const sorted=[...shifted].sort((a,b)=>b-a),highest=sorted.map((v,i)=>v-4+i);
 let num=1n,den=1n;for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){num*=BigInt(sorted[i]-sorted[j]);den*=BigInt(j-i)}
 const dimension=Number(num/den);if(!Number.isSafeInteger(dimension))throw new RangeError('Dimension exceeds safe integer range');
 return {shifted,sorted,degree,highest,dimension,index:degree%2?-dimension:dimension};
}
export function lineIndex(n,k){
 if(!Number.isInteger(n)||n<1||n>4||!Number.isInteger(k)||Math.abs(k)>100)throw new RangeError('Bounded integer dimension/twist required');
 if(k<0&&k>=-n)return 0;
 let v=1;for(let j=1;j<=n;j++)v*=k+j;for(let j=1;j<=n;j++)v/=j;return v;
}
// Complex components represented by pairs. State from nonnegative weights and phases (radians).
export function ray(weights,phases,global=0){
 if(weights.length!==phases.length||weights.some(w=>!Number.isFinite(w)||w<0)||phases.some(p=>!Number.isFinite(p))||!Number.isFinite(global))throw new RangeError('Invalid ray');
 const total=weights.reduce((s,w)=>s+w,0);if(!(total>0))throw new RangeError('Zero vector has no ray');
 return weights.map((w,i)=>{const r=Math.sqrt(w/total),p=phases[i]+global;return [r*Math.cos(p),r*Math.sin(p)]});
}
export function overlap(a,b){
 if(a.length!==b.length)throw new RangeError('Dimension mismatch');
 let re=0,im=0;for(let i=0;i<a.length;i++){re+=a[i][0]*b[i][0]+a[i][1]*b[i][1];im+=a[i][0]*b[i][1]-a[i][1]*b[i][0]}
 return Math.min(1,Math.max(0,re*re+im*im));
}
export const distance=(a,b)=>Math.acos(Math.sqrt(overlap(a,b)));
// Rank-one density operator rho_ij = z_i conjugate(z_j).
export function projector(z){return z.map(([a,b])=>z.map(([c,d])=>[a*c+b*d,b*c-a*d]))}
