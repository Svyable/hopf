import {field,mod,lines,fiber} from './arithmetic-model.mjs';
export function inverse(a,p){a=mod(a,p);if(!a)throw new RangeError('Zero has no inverse');for(let i=1;i<p;i++)if(mod(a*i,p)===1)return i;throw new RangeError('Not invertible')}
export function finiteHopf(p,[a,b]){const f=field(p);const [r,s]=f.mul([a[0],mod(-a[1],p)],b);return [mod(2*r,p),mod(2*s,p),mod(f.norm(a)-f.norm(b),p)]}
export function chartPoint(p,w){if(w===null)return [0,0,p-1];const f=field(p),n=f.norm(w),v=inverse(1+n,p);return [mod(2*w[0]*v,p),mod(2*w[1]*v,p),mod((1-n)*v,p)]}
export function quadric(p){return lines(p).filter(l=>l.norm!==0).map(({w})=>({w,point:chartPoint(p,w)}))}
export function torusGenerator(p){const f=field(p);for(const g of f.elements){if(f.norm(g)!==1)continue;let power=[1,0],orbit=[];do{orbit.push(power);power=f.mul(power,g)}while((power[0]!==1||power[1]!==0)&&orbit.length<=p+1);if(orbit.length===p+1&&power[0]===1&&power[1]===0)return {g,orbit}}throw new Error('No generator')}
export function orderedFiber(p,w){const f=field(p),{g,orbit}=torusGenerator(p),start=fiber(p,w)[0];if(!start)throw new RangeError('Isotropic line');return {g,orbit:orbit.map(s=>start.map(z=>f.mul(z,s)))}}
export const centered=(a,p)=>a>(p-1)/2?a-p:a;
export function project3([x,y,z],yaw,pitch){const c=Math.cos(yaw),s=Math.sin(yaw),u=Math.cos(pitch),v=Math.sin(pitch);const X=c*x-s*z,Z=s*x+c*z;return [X,u*y-v*Z,v*y+u*Z]}
