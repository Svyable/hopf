// Arithmetic analogue: unit Hermitian quadric and its norm-one torus quotient.
export const primes=[3,5,7,11,13,17,19];
export const mod=(x,p)=>((x%p)+p)%p;
export function nonsquare(p){if(!primes.includes(p))throw new RangeError('Unsupported prime');for(let d=2;d<p;d++)if(!Array.from({length:p},(_,i)=>mod(i*i,p)).includes(d))return d}
export function field(p){const d=nonsquare(p),elements=Array.from({length:p*p},(_,i)=>[i%p,Math.floor(i/p)]);const norm=([a,b])=>mod(a*a-d*b*b,p);const mul=([a,b],[c,e])=>[mod(a*c+d*b*e,p),mod(a*e+b*c,p)];return {p,d,elements,norm,mul}}
export function lines(p){const f=field(p);return [...f.elements.map(w=>({w,norm:mod(1+f.norm(w),p)})),{w:null,norm:1}]}
export function fiber(p,w){const f=field(p),n=w===null?1:mod(1+f.norm(w),p);if(n===0)return [];return f.elements.filter(s=>mod(f.norm(s)*n,p)===1).map(s=>w===null?[[0,0],s]:[s,f.mul(s,w)])}
export function counts(q,m,r=1){if(!Number.isInteger(m)||m<1||m>12||!Number.isInteger(r)||r<1||r>20)throw new RangeError('Unsupported dimension or extension');const Q=BigInt(q)**BigInt(r),e=r%2?-1n:1n;const torus=Q-e,sphere=Q**BigInt(m-1)*(Q**BigInt(m)-e**BigInt(m));return {Q,torus,sphere,base:sphere/torus}}
export function roots(q,m){return Array.from({length:m},(_,j)=>(j%2?-1n:1n)*BigInt(q)**BigInt(2*m-2-j))}
export function trace(q,m,r){return roots(q,m).reduce((s,a)=>s+a**BigInt(r),0n)}
