// Exact scalar and Spin-c toy-model formulas. Unit round S^9 normalization.
export const crossing=1/Math.sqrt(12);
export const curvature=t=>(80-8*t*t)*t**(2/9);
export const gap=t=>Math.min(20,8+1/t**2)*t**(2/9);
export const index=k=>(k+1)*(k+2)*(k+3)*(k+4)/24;
export const holonomy=theta=>Math.PI*(1-Math.cos(theta));
export function choose4(n){return n<4?0:n*(n-1)*(n-2)*(n-3)/24}
export function modes(max,t,normalize=true){
 const list=[];for(let l=1;l<=max;l++)for(let p=0;p<=l;p++){let q=l-p,k=p-q;list.push({l,k,p,q,value:(l*(l+8)+(1/t**2-1)*k*k)*(normalize?t**(2/9):1),mult:choose4(p+4)*choose4(q+4)-choose4(p+3)*choose4(q+3)});}
 return list.sort((a,b)=>a.value-b.value||a.k-b.k)
}
// Exact Hopf fiber in S^3, followed by stereographic projection from (0,0,0,1).
export function fiberPoint(eta,phi,u){const a=Math.cos(eta)*Math.cos(u),b=Math.cos(eta)*Math.sin(u),c=Math.sin(eta)*Math.cos(u+phi),d=Math.sin(eta)*Math.sin(u+phi);return [a/(1-d),b/(1-d),c/(1-d)]}
