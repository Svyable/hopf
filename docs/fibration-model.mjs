// Fibration geometry for the studio's 3D laboratory: Hopf fibers in stereographic R^3,
// the Villarceau tori they fill, the maps S^3 -> S^2, (z1,z2) -> [z1^p : z2^q], and
// polygonal linking numbers. Pure functions only; every displayed number comes from here.
import {TAU,ray,hopf,stereo} from './studio-model.mjs';
export {TAU,ray,hopf,stereo};

export const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];

// Hopf fiber over the base point with colatitude theta and azimuth phi, oriented by the
// circle action z -> e^{it} z, as n points of S^3 (closed curve, last point not repeated).
export const fiber=(theta,phi,n=160)=>Array.from({length:n},(_,i)=>ray(theta,phi,TAU*i/n));

// Rotating S^3 in the (x0,x3)-plane before projecting is the same as projecting
// stereographically from a different pole. Great circles stay circles, or become lines
// exactly when they pass through the pole.
export const tiltPole=([a,b,c,d],alpha)=>[a*Math.cos(alpha)-d*Math.sin(alpha),b,c,a*Math.sin(alpha)+d*Math.cos(alpha)];
export const project=(z,alpha=0)=>stereo(alpha?tiltPole(z,alpha):z);

// Fibers over the latitude theta fill the torus |z1|=cos(theta/2). With the default pole it
// projects to a torus of revolution about the Z axis with tube radius r and centre-circle
// radius R; every fiber on it is a Villarceau circle of radius R whose centre lies at
// distance r from the origin, in a plane tilted by theta/2 from the XY plane.
export function torusRadii(theta){const R=1/Math.cos(theta/2),r=Math.tan(theta/2);return {R,r,tilt:theta/2,check:R*R-r*r}}
export function torusPoint(theta,u,v){const {R,r}=torusRadii(theta);return [(R+r*Math.cos(v))*Math.cos(u),(R+r*Math.cos(v))*Math.sin(u),r*Math.sin(v)]}

// Circle through three points of R^3.
export function circleThrough(p1,p2,p3){const a=sub(p1,p3),b=sub(p2,p3),n=cross(a,b),n2=dot(n,n);if(n2<1e-24)return null;const t1=cross(b,n).map(v=>v*dot(a,a)),t2=cross(n,a).map(v=>v*dot(b,b));const centre=t1.map((v,i)=>(v+t2[i])/(2*n2)+p3[i]);return {centre,radius:Math.hypot(...sub(p1,centre)),normal:n.map(v=>v/Math.sqrt(n2))}}

// The map F_{p,q}: S^3 -> S^2, (z1,z2) -> [z1^p : z2^q], written in the studio's convention
// z1=x0+i x1, z2=x2+i x3 and base point hopf(normalised (z1^p, z2^q)).
const cpow=(re,im,k)=>{const r=Math.hypot(re,im)**k,a=Math.atan2(im,re)*k;return [r*Math.cos(a),r*Math.sin(a)]};
export function mapPQ([a,b,c,d],p,q){const [u0,u1]=cpow(a,b,p),[w0,w1]=cpow(c,d,q),s=Math.hypot(u0,u1,w0,w1);return hopf([u0/s,u1/s,w0/s,w1/s])}

// Radii (|z1|,|z2|) of the torus containing F^{-1}(theta,phi): |z2|^q/|z1|^p = tan(theta/2).
// The left side is strictly decreasing in |z1| on (0,1), so bisection is exact to tolerance.
export function pqRadii(p,q,theta){if(!(theta>0&&theta<Math.PI))throw new RangeError('colatitude must lie strictly between the poles');const target=Math.log(Math.tan(theta/2));let lo=1e-15,hi=1-1e-15;for(let i=0;i<200;i++){const r1=(lo+hi)/2,r2=Math.sqrt(1-r1*r1),f=q*Math.log(r2)-p*Math.log(r1)-target;if(f>0)lo=r1;else hi=r1}const r1=(lo+hi)/2;return [r1,Math.sqrt(1-r1*r1)]}

// F^{-1}(theta,phi) is {|z1|=r1, |z2|=r2, q arg z2 - p arg z1 = phi (mod 2 pi)}: g=gcd(p,q)
// parallel (p/g,q/g) torus-knot components, each oriented by increasing s.
export function preimagePQ(p,q,theta,phi,n=240){if(!Number.isInteger(p)||!Number.isInteger(q)||p<1||q<1)throw new RangeError('p and q must be positive integers');const g=gcd(p,q),P=p/g,Q=q/g,[r1,r2]=pqRadii(p,q,theta),parts=[];for(let k=0;k<g;k++){const pts=[];for(let i=0;i<n;i++){const s=TAU*i/n,a1=Q*s,a2=(phi+TAU*k)/q+P*s;pts.push([r1*Math.cos(a1),r1*Math.sin(a1),r2*Math.cos(a2),r2*Math.sin(a2)])}parts.push(pts)}return parts}

export function knotName(p,q){const g=gcd(p,q),a=Math.min(p,q)/g,b=Math.max(p,q)/g,names={'2,3':'trefoil','2,5':'cinquefoil','3,4':'(3,4) torus knot','2,7':'septafoil','3,5':'(3,5) torus knot'};const knot=a===1?'unknot':names[a+','+b]||'('+a+','+b+') torus knot';return {components:g,knot,label:g===1?knot:g+' parallel '+(a===1?'unknots':knot+'s')}}

// A pole for stereographic projection that keeps every curve of S^3 finite: the tilt
// maximising the smallest distance from the pole. Linking numbers do not depend on it.
export function safeTilt(curves,steps=48){let best=0,score=-1;for(let k=0;k<steps;k++){const alpha=TAU*k/steps;let m=Infinity;for(const c of curves)for(const z of c)m=Math.min(m,1-tiltPole(z,alpha)[3]);if(m>score){score=m;best=alpha}}return best}

// Hopf invariant of F_{p,q} = h o g with g(z1,z2)=(z1^p,z2^q)/|.|, deg g = pq, H(h)=1:
// H(h o g) = deg(g) H(h).
export const hopfInvariant=(p,q)=>p*q;

// Linking number of two closed polygons in R^3 from a generic planar projection:
// half the sum of signed crossings. Exact for polygons in general position.
const VIEW=(()=>{const a=.6180339887,b=.3819660113,c=.2360679775,rz=[[Math.cos(a),-Math.sin(a),0],[Math.sin(a),Math.cos(a),0],[0,0,1]],rx=[[1,0,0],[0,Math.cos(b),-Math.sin(b)],[0,Math.sin(b),Math.cos(b)]],ry=[[Math.cos(c),0,Math.sin(c)],[0,1,0],[-Math.sin(c),0,Math.cos(c)]],m=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)));return m(rz,m(rx,ry))})();
const look=p=>VIEW.map(r=>r[0]*p[0]+r[1]*p[1]+r[2]*p[2]);
export function linkingNumber(A,B){const a=A.map(look),b=B.map(look);let sum=0;for(let i=0;i<a.length;i++){const p=a[i],p2=a[(i+1)%a.length],dx=p2[0]-p[0],dy=p2[1]-p[1];const minx=Math.min(p[0],p2[0]),maxx=Math.max(p[0],p2[0]),miny=Math.min(p[1],p2[1]),maxy=Math.max(p[1],p2[1]);for(let j=0;j<b.length;j++){const r=b[j],r2=b[(j+1)%b.length];if(Math.max(r[0],r2[0])<minx||Math.min(r[0],r2[0])>maxx||Math.max(r[1],r2[1])<miny||Math.min(r[1],r2[1])>maxy)continue;const ex=r2[0]-r[0],ey=r2[1]-r[1],den=dx*ey-dy*ex;if(Math.abs(den)<1e-300)continue;const fx=r[0]-p[0],fy=r[1]-p[1],s=(fx*ey-fy*ex)/den,t=(fx*dy-fy*dx)/den;if(s<0||s>=1||t<0||t>=1)continue;const za=p[2]+s*(p2[2]-p[2]),zb=r[2]+t*(r2[2]-r[2]);sum+=Math.sign(den)*(za>zb?1:-1)}}return sum/2}

// Midpoint discretisation of the Gauss double integral
// Lk = (1/4 pi) \oint\oint (dA x dB) . (A - B) / |A - B|^3, which converges to the integer.
export function gaussLinking(A,B){let s=0;for(let i=0;i<A.length;i++){const a0=A[i],a1=A[(i+1)%A.length],da=sub(a1,a0),ma=a0.map((v,k)=>(v+a1[k])/2);for(let j=0;j<B.length;j++){const b0=B[j],b1=B[(j+1)%B.length],db=sub(b1,b0),d=[ma[0]-(b0[0]+b1[0])/2,ma[1]-(b0[1]+b1[1])/2,ma[2]-(b0[2]+b1[2])/2],r=Math.hypot(d[0],d[1],d[2]);s+=dot(cross(da,db),d)/(r*r*r)}}return s/(4*Math.PI)}

// Total linking of two oriented links given as lists of components.
export function totalLinking(As,Bs,method=linkingNumber){let s=0;for(const A of As)for(const B of Bs)s+=method(A,B);return s}
