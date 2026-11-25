// Exact arithmetic in unsigned (ell, |k|) sectors of the scalar Berger S9 spectrum.
const abs=x=>x<0n?-x:x;
export function gcd(a,b){a=abs(a);b=abs(b);while(b){[a,b]=[b,a%b]}return a}
const lcm=(a,b)=>a/gcd(a,b)*b;
export function rationalShell(A,B,count){
 A=BigInt(A);B=BigInt(B);if(B<=0n||A<=-B||!Number.isInteger(count)||count<1||count>32)throw new RangeError('Require A/B > -1 and 1–32 sectors');
 const g=gcd(A,B);A/=g;B/=g;
 let L=1n,rows=[];for(let j=0;j<count;j++){const n=abs(A)+4n+BigInt(j),den=B*n*n+A;L=lcm(L,den);rows.push({n,den,u:B*n*n-A,v:2n*B*n})}
 const radius=4n*L,energy=radius*radius-16n;
 return {A,B,energy,rows:rows.map(({n,den,u,v})=>{const x=radius/den*u,k=radius/den*v;return {n,x,l:x-4n,k}})};
}
export function verifyShell({A,B,energy,rows}){if(B<=0n||A<=-B||!rows.length)return false;const seen=new Set();for(const {x,l,k} of rows){const key=l+':'+k;if(seen.has(key)||l<0n||k<0n||k>l||(l-k)%2n||x!==l+4n||B*(x*x-16n)+A*k*k!==B*energy)return false;seen.add(key)}return true}
export const primes=[[2n,1n],[3n,2n],[4n,1n],[5n,2n],[6n,1n],[5n,4n],[7n,2n],[6n,5n],[8n,3n],[8n,5n],[9n,4n],[10n,1n]];
// Distinct split primes 5,13,17,29,37,41,53,61,73,89,97,101.
export function primeShell(r){
 if(!Number.isInteger(r)||r<1||r>primes.length)throw new RangeError('Invalid prime count');
 let P=1n,points=[[1n,0n]];for(const [a,b] of primes.slice(0,r)){P*=a*a+b*b;points=points.flatMap(([x,y])=>[[x*a-y*b,x*b+y*a],[x*a+y*b,-x*b+y*a]])}
 const seen=new Map();for(let [u,v] of points){u=abs(u);v=abs(v);if(u<v)[u,v]=[v,u];const x=4n*u,k=4n*v;seen.set(x+':'+k,{x,l:x-4n,k})}
 return {A:1n,B:1n,P,energy:16n*P-16n,rows:[...seen.values()].sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:0)}
}
// Count all admissible unsigned sectors at a=1, NOT weighted harmonic multiplicity.
// N = lambda+16, both coordinates same parity; x>=k+4.
export function scan(N){
 if(!Number.isInteger(N)||N<16||N>4000000)throw new RangeError('N in [16,4000000]');
 const counts=new Uint16Array(N+1);for(let x=4;x*x<=N;x++){const kmax=Math.min(x-4,Math.floor(Math.sqrt(N-x*x)));for(let k=x%2;k<=kmax;k+=2)counts[x*x+k*k]++}
 let sectors=0,distinct=0,best=0,records=[],samples=[],next=16;
 for(let n=16;n<=N;n++){const c=counts[n];if(c){sectors+=c;distinct++;if(c>best){best=c;records.push({N:n,count:c})}}if(n>=next||n===N){samples.push({N:n,sectors,distinct,average:distinct?sectors/distinct:0,maximum:best});next=Math.max(n+1,Math.ceil(n*1.13))}}
 return {N,sectors,distinct,records,samples,counts}
}
export function shellAt(N){const rows=[];for(let x=4;x*x<=N;x++){const k=Math.sqrt(N-x*x);if(Number.isInteger(k)&&k<=x-4&&(x-k)%2===0)rows.push({x,l:x-4,k})}return rows}
export const K=.7642236535892207;
export const predictedAverage=N=>Math.PI/(8*K)*Math.sqrt(Math.log(N));
