// All charges are integer y=6Y, all fermions left-handed Weyl fields.
export const fields=[
 {id:'Q',label:'Q',rep:'(3, 2)',color:3,weak:2,triality:1,t3:1,t2:1,a3:1,y:1},
 {id:'u',label:'uᶜ',rep:'(3̄, 1)',color:3,weak:1,triality:2,t3:1,t2:0,a3:-1,y:-4},
 {id:'d',label:'dᶜ',rep:'(3̄, 1)',color:3,weak:1,triality:2,t3:1,t2:0,a3:-1,y:2},
 {id:'L',label:'L',rep:'(1, 2)',color:1,weak:2,triality:0,t3:0,t2:1,a3:0,y:-3},
 {id:'e',label:'eᶜ',rep:'(1, 1)',color:1,weak:1,triality:0,t3:0,t2:0,a3:0,y:6},
 {id:'N',label:'Nᶜ',rep:'(1, 1)',color:1,weak:1,triality:0,t3:0,t2:0,a3:0,y:0}
];
export const keys=['su3cube','su3y','su2y','ycube','grav','witten'];
export const labels={su3cube:'SU(3)³',su3y:'SU(3)² U(1)',su2y:'SU(2)² U(1)',ycube:'U(1)³',grav:'Gravity² U(1)',witten:'SU(2) global parity'};
export function contribution(f,y){return {su3cube:f.weak*f.a3,su3y:f.weak*f.t3*y,su2y:f.color*f.t2*y,ycube:f.color*f.weak*y**3,grav:f.color*f.weak*y,witten:f.weak===2?f.color:0}}
export function anomalies(charges,enabled=fields.map(f=>f.id)){const out=Object.fromEntries(keys.map(k=>[k,0]));for(const f of fields){if(!enabled.includes(f.id))continue;const y=charges[f.id];if(!Number.isSafeInteger(y)||Math.abs(y)>100)throw new RangeError('Bounded integer charges required');const c=contribution(f,y);for(const k of keys)out[k]+=c[k]}out.witten%=2;return out}
export const standard=Object.fromEntries(fields.map(f=>[f.id,f.y]));
export function yukawa(q,h){return {Q:q,u:-q-h,d:-q+h,L:-3*q,e:3*q+h,N:3*q-h}}
export const mod6=x=>((x%6)+6)%6;
export const quotient=(f,y)=>mod6(2*f.triality+3*(f.weak===2?1:0)+y)===0;
export function su5Weights(){const fundamental=[-2,-2,-2,3,3],ten=[];for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)ten.push({i,j,y:fundamental[i]+fundamental[j],id:j<3?'u':i>=3?'e':'Q'});return {ten,five:fundamental.map((y,i)=>({i,y:-y,id:i<3?'d':'L'}))}}
