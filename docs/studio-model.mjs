// Exact Hopf map and horizontal lift of a latitude, plus discrete Pancharatnam holonomy.
export const TAU=2*Math.PI;
export const ray=(theta,phi,phase=0)=>[Math.cos(theta/2)*Math.cos(phase),Math.cos(theta/2)*Math.sin(phase),Math.sin(theta/2)*Math.cos(phi+phase),Math.sin(theta/2)*Math.sin(phi+phase)];
export const hopf=([a,b,c,d])=>[2*(a*c+b*d),2*(a*d-b*c),a*a+b*b-c*c-d*d];
export const inner=([a,b,c,d],[e,f,g,h])=>[a*e+b*f+c*g+d*h,a*f-b*e+c*h-d*g];
export const stereo=([a,b,c,d])=>{let v=1-d;return v>1e-12?[a/v,b/v,c/v]:null};
export const area=theta=>TAU*(1-Math.cos(theta));
export const phaseAt=(theta,travel)=>-(Math.sin(theta/2)**2)*travel;
export const lift=(theta,phi,travel)=>ray(theta,phi+travel,phaseAt(theta,travel));
export const wrap=x=>((x+Math.PI)%TAU+TAU)%TAU-Math.PI;
export function discretePhase(theta,n){if(!Number.isInteger(n)||n<3||n>65536)throw new RangeError('3–65536 vertices required');const a=Math.cos(theta/2)**2,b=Math.sin(theta/2)**2,d=TAU/n;const re=a+b*Math.cos(d),im=b*Math.sin(d);if(Math.hypot(re,im)<1e-12)return null;return wrap(-n*Math.atan2(im,re))}
export const phaseError=(theta,n)=>{const p=discretePhase(theta,n);return p===null?null:Math.abs(wrap(p-phaseAt(theta,TAU)))};
export function gauge(theta,travel,winding){const a=Math.sin(theta/2)**2;return {connection:a+winding,sectionPhase:winding*travel,compensation:-(a+winding)*travel,total:-a*travel};}
export const deg=x=>x*180/Math.PI;
export const rad=x=>x*Math.PI/180;

// Normalized cap fluxes for F=(sin theta / 2)dtheta wedge dphi.
export const capFlux=theta=>[(1-Math.cos(theta))/2,(1+Math.cos(theta))/2];
export function quadratureFlux(theta,bins){if(!Number.isInteger(bins)||bins<1||bins>65536)throw new RangeError('Invalid subdivision count');function integrate(a,b){const d=(b-a)/bins;let sum=0;for(let i=0;i<bins;i++)sum+=Math.sin(a+(i+.5)*d)*d/2;return sum}return integrate(0,theta)+integrate(theta,Math.PI)}
