// Heat trace of the scalar Berger S^9 metric with fixed horizontal scale.
// t=0 denotes the exact neutral CP^4 limit, not a nonsingular S^9 metric.
const bin4=n=>n*(n-1)*(n-2)*(n-3)/24;
export function multiplicity(l,k){
 if(!Number.isInteger(l)||!Number.isInteger(k)||l<0||Math.abs(k)>l||(l-k)%2)throw new RangeError('Invalid harmonic degree or weight');
 const p=(l+k)/2,q=(l-k)/2;
 return bin4(p+4)*bin4(q+4)*4*(l+4)/((p+4)*(q+4));
}
export function roundMultiplicity(l){let d=(l+4)/4;for(let i=1;i<=7;i++)d*=(l+i)/i;return d}
const energy=l=>l*(l+8);
function degreeRatio(l){return (l+5)/(l+4)*(l+8)/(l+1)}
export function tailBounds(s,L){
 const l=L+1,a=energy(l),b=energy(l+1),r=degreeRatio(l)*Math.exp(-s*(b-a)),rM=r*b/a;
 if(s*a<1||rM>=1)return {z:Infinity,m:Infinity};
 const first=roundMultiplicity(l)*Math.exp(-s*a);
 return {z:first/(1-r),m:a*first/(1-rM)};
}
export function heat(t,s,{cutoff}={}){
 if(!Number.isFinite(t)||t<0||t>1||!Number.isFinite(s)||s<.0001||s>10)throw new RangeError('Use 0≤t≤1 and 0.0001≤s≤10');
 const L=cutoff??Math.ceil(Math.sqrt(55/s));
 if(!Number.isInteger(L)||L<1||L>2000)throw new RangeError('Invalid cutoff');
 let z0=1,z1=0,m0=0,m1=0;
 const weights=new Map([[0,1]]);
 for(let l=1;l<=L;l++){
  const a=energy(l);
  if(l%2===0){let v=multiplicity(l,0)*Math.exp(-s*a);z0+=v;m0+=a*v;weights.set(0,z0)}
  if(t===0)continue;
  const delta=1/(t*t)-1;
  for(let k=l%2===0?2:1;k<=l;k+=2){
   const lambda=a+delta*k*k;
   const v=2*multiplicity(l,k)*Math.exp(-s*lambda);
   if(v===0)continue;
   z1+=v;m1+=lambda*v;weights.set(k,(weights.get(k)||0)+v);
  }
 }
 const z=z0+z1,m=m0+m1,tail=tailBounds(s,L),dimension=2*s*m/z;
 return {t,s,L,z,m,z0,z1,neutral:z0/z,dimension,baseDimension:2*s*m0/z0,
  low:2*s*m/(z+tail.z),high:2*s*(m+tail.m)/z,tailZ:tail.z,tailM:tail.m,weights:[...weights].sort((a,b)=>a[0]-b[0])};
}
export function curve(t,count=49){return Array.from({length:count},(_,i)=>heat(t,10**(-4+4*i/(count-1))))}
