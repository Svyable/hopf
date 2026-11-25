// 3D laboratories for the Fiber Studio: linked Hopf fibers, Villarceau tori and the Hopf invariant.
// Rendering only; the mathematics lives in fibration-model.mjs and is tested in tests/fibration.test.mjs.
import {TAU,ray,hopf,fiber,project,torusRadii,circleThrough,preimagePQ,pqRadii,knotName,hopfInvariant,linkingNumber,gaussLinking,totalLinking,safeTilt} from './fibration-model.mjs';
const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg',rad=x=>x*Math.PI/180;
function el(svg,tag,attrs={},text=''){const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(text!=='')n.textContent=text;svg.append(n);return n}
// Hopf colouring: hue = azimuth, lightness = colatitude, so a fiber's colour names its base point.
const hopfColor=(theta,phi)=>`hsl(${((phi*180/Math.PI)%360+360)%360} 82% ${Math.round(76-24*theta/Math.PI)}%)`;
const signed=x=>(x>0?'+':x<0?'−':'')+Math.abs(x);

// A small depth-sorted wireframe renderer for curves in R^3 with drag/keyboard rotation.
class Scene{
 constructor(canvas,{clip=9,label,yaw=-.55,pitch=.42,zoom=1}={}){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.yaw=yaw;this.pitch=pitch;this.zoom=zoom;this.clip=clip;this.curves=[];this.dots=[];this.label=label;this.listen()}
 listen(){const c=this.canvas;let drag=null;c.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY,this.yaw,this.pitch];c.setPointerCapture(e.pointerId)});c.addEventListener('pointermove',e=>{if(!drag)return;this.yaw=drag[2]+(e.clientX-drag[0])*.009;this.pitch=Math.max(-1.5,Math.min(1.5,drag[3]+(e.clientY-drag[1])*.009));this.draw()});const end=()=>drag=null;c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);c.addEventListener('keydown',e=>{const k={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,-.12],ArrowDown:[0,.12]}[e.key];if(k){e.preventDefault();this.yaw+=k[0];this.pitch=Math.max(-1.5,Math.min(1.5,this.pitch+k[1]));this.draw()}else if(e.key==='+'||e.key==='='){this.zoom=Math.min(3,this.zoom*1.12);this.draw()}else if(e.key==='-'){this.zoom=Math.max(.35,this.zoom/1.12);this.draw()}});new ResizeObserver(()=>this.draw()).observe(c)}
 set(curves,dots=[]){this.curves=curves;this.dots=dots;this.draw()}
 draw(){const c=this.canvas,dpr=Math.min(2,devicePixelRatio||1),w=c.clientWidth||600,h=c.clientHeight||420;if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr)}const g=this.ctx;g.setTransform(dpr,0,0,dpr,0,0);const bg=g.createRadialGradient(w/2,h*.45,10,w/2,h/2,Math.max(w,h)*.7);bg.addColorStop(0,'#1c3247');bg.addColorStop(1,'#081019');g.fillStyle=bg;g.fillRect(0,0,w,h);
  const cy=Math.cos(this.yaw),sy=Math.sin(this.yaw),cp=Math.cos(this.pitch),sp=Math.sin(this.pitch),D=9,S=Math.min(w,h)*.2*this.zoom;
  // Z is "up": rotate about Z by yaw, then tilt by pitch; depth grows toward the viewer.
  const view=p=>{const x=cy*p[0]-sy*p[1],y=sy*p[0]+cy*p[1],z=p[2];const Y=cp*z-sp*y,Zd=sp*z+cp*y;const f=D/(D+Zd);return [w/2+S*x*f,h/2-S*Y*f,-Zd]};
  const segs=[];for(const cv of this.curves){const pts=cv.pts,n=pts.length,last=cv.closed?n:n-1;for(let i=0;i<last;i++){const a=pts[i],b=pts[(i+1)%n];if(!a||!b)continue;if(Math.abs(a[0])>this.clip||Math.abs(a[1])>this.clip||Math.abs(a[2])>this.clip||Math.abs(b[0])>this.clip||Math.abs(b[1])>this.clip||Math.abs(b[2])>this.clip)continue;const A=view(a),B=view(b);segs.push([A,B,(A[2]+B[2])/2,cv])}}
  let lo=Infinity,hi=-Infinity;for(const s of segs){lo=Math.min(lo,s[2]);hi=Math.max(hi,s[2])}const span=hi-lo||1;segs.sort((a,b)=>a[2]-b[2]);g.lineCap='round';
  for(const [A,B,d,cv] of segs){const t=(d-lo)/span;g.globalAlpha=(cv.alpha??1)*(.28+.72*t);g.strokeStyle=cv.color;g.lineWidth=(cv.width||1.6)*(.65+.55*t);g.beginPath();g.moveTo(A[0],A[1]);g.lineTo(B[0],B[1]);g.stroke()}
  g.globalAlpha=1;for(const dot of this.dots){if(!dot.p||dot.p.some(v=>Math.abs(v)>this.clip))continue;const [x,y]=view(dot.p);g.fillStyle=dot.color;g.beginPath();g.arc(x,y,dot.r||3.2,0,TAU);g.fill();g.strokeStyle='#09111e';g.lineWidth=1.2;g.stroke()}
  if(this.label){g.fillStyle='#a1b3c3';g.font='11px ui-monospace,monospace';g.textAlign='center';g.fillText(this.label,w/2,h-12)}}
 png(name){this.draw();this.canvas.toBlob(b=>{if(!b)return;const url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)},'image/png')}
}

/* ---------- 17 / Linked fibers and Villarceau tori ---------- */
const pole=()=>rad(+$('poleTilt').value);
const R3=(curve,alpha)=>curve.map(z=>project(z,alpha));
let pins=[],flowing=false,flowFrame=0,flowT=0,linkCache='';
const scene=new Scene($('fiberCanvas'),{label:'STEREOGRAPHIC PROJECTION S³ \\ {pole} → ℝ³ · DRAG TO ROTATE'});
const probe=()=>({theta:rad(+$('fibTheta').value),phi:rad(+$('fibPhi').value)});
const families={
 link:()=>[[rad(40),rad(20)]],
 tori:()=>{const out=[];for(const th of [30,75,115])for(let k=0;k<6;k++)out.push([rad(th),k*TAU/6+rad(th)/3]);return out},
 clifford:()=>Array.from({length:12},(_,k)=>[Math.PI/2,k*TAU/12]),
 necklace:()=>Array.from({length:10},(_,k)=>[rad(60),k*TAU/10]),
 meridian:()=>Array.from({length:10},(_,k)=>{const t=(k+.5)*TAU/10;return [Math.acos(Math.cos(t)),Math.sin(t)<0?Math.PI:0]})
};
// Base-point picker: an orthographic view of S² seen from slightly above the −y side.
const e1=[1,0,0],e2=[0,Math.sin(rad(20)),Math.cos(rad(20))],e3=[0,-Math.cos(rad(20)),Math.sin(rad(20))];
const dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],P0=[170,140],PR=110;
const toPicker=p=>[P0[0]+PR*dot3(p,e1),P0[1]-PR*dot3(p,e2),dot3(p,e3)];
function pickerPath(svg,pts,stroke,width=1.5,opacity=1){let front='',back='',mf=true,mb=true;for(const p of pts){const [x,y,z]=toPicker(p);if(z>=0){front+=(mf?'M':'L')+x.toFixed(1)+' '+y.toFixed(1)+' ';mf=false;mb=true}else{back+=(mb?'M':'L')+x.toFixed(1)+' '+y.toFixed(1)+' ';mb=false;mf=true}}el(svg,'path',{d:back,fill:'none',stroke,'stroke-width':width,opacity:opacity*.35,'stroke-dasharray':'2 4'});el(svg,'path',{d:front,fill:'none',stroke,'stroke-width':width,opacity})}
const latitude=(th,n=96)=>Array.from({length:n+1},(_,i)=>hopf(ray(th,TAU*i/n)));
function drawPicker(){const svg=$('pickSphere');svg.replaceChildren();const s=probe();el(svg,'circle',{cx:P0[0],cy:P0[1],r:PR,fill:'#132a3d',stroke:'#52697e'});for(const th of [Math.PI/4,Math.PI/2,3*Math.PI/4])pickerPath(svg,latitude(th),'#718596',1,.5);for(const ph of [0,Math.PI/2,Math.PI,3*Math.PI/2])pickerPath(svg,Array.from({length:49},(_,i)=>{const t=Math.PI*i/48;return [Math.sin(t)*Math.cos(ph),Math.sin(t)*Math.sin(ph),Math.cos(t)]}),'#718596',1,.45);if($('showTori').checked)pickerPath(svg,latitude(s.theta),'#f0a3cd',1.6,.8);
 for(const [th,ph] of pins){const [x,y,z]=toPicker(hopf(ray(th,ph)));el(svg,'circle',{cx:x,cy:y,r:z>=0?5:3.5,fill:hopfColor(th,ph),opacity:z>=0?1:.45,stroke:'#09111e','stroke-width':1.2})}
 const [x,y,z]=toPicker(hopf(ray(s.theta,s.phi)));el(svg,'circle',{cx:x,cy:y,r:8,fill:'none',stroke:'#f1f5f8','stroke-width':2,opacity:z>=0?1:.5});el(svg,'circle',{cx:x,cy:y,r:4,fill:hopfColor(s.theta,s.phi)});el(svg,'text',{x:P0[0],y:20,'text-anchor':'middle'},'NORTH');el(svg,'text',{x:P0[0],y:272,'text-anchor':'middle'},'SOUTH · fiber through the pole')}
function pickAt(evt){const svg=$('pickSphere'),pt=svg.createSVGPoint();pt.x=evt.clientX;pt.y=evt.clientY;const m=svg.getScreenCTM();if(!m)return;const q=pt.matrixTransform(m.inverse()),u1=(q.x-P0[0])/PR,u2=(P0[1]-q.y)/PR,rr=u1*u1+u2*u2;if(rr>1)return;const d=Math.sqrt(1-rr),p=[0,1,2].map(i=>u1*e1[i]+u2*e2[i]+d*e3[i]);$('fibTheta').value=Math.round(Math.acos(Math.max(-1,Math.min(1,p[2])))*180/Math.PI);$('fibPhi').value=Math.round(((Math.atan2(p[1],p[0])*180/Math.PI)+360)%360);updateFibers()}
function fiberSet(){const s=probe(),list=[],seen=new Set();for(const [t,p] of [...pins,[s.theta,s.phi]]){const k=t.toFixed(6)+','+(((p%TAU)+TAU)%TAU).toFixed(6);if(seen.has(k))continue;seen.add(k);list.push({theta:t,phi:p})}list[list.length-1].probe=true;return list}
function updateLinking(list){const key=list.map(f=>f.theta.toFixed(4)+','+f.phi.toFixed(4)).join(';');if(key===linkCache)return;linkCache=key;const curves=list.map(f=>fiber(f.theta,f.phi,160)),alpha=safeTilt(curves),proj=curves.map(c=>R3(c,alpha));const values=[];for(let i=0;i<proj.length;i++)for(let j=i+1;j<proj.length;j++)values.push(linkingNumber(proj[i],proj[j]));
 const pairs=values.length;$('pairCount').textContent=String(pairs);$('pairLinks').textContent=pairs?(new Set(values).size===1?'all '+signed(values[0]):values.map(signed).join(' ')):'pin a fiber';$('gaussLink').textContent=pairs?gaussLinking(proj[proj.length-1],proj[0]).toFixed(5):'—'}
function updateFibers(){const s=probe(),alpha=pole(),list=fiberSet();$('fibThetaVal').textContent=$('fibTheta').value+'°';$('fibPhiVal').textContent=$('fibPhi').value+'°';$('poleTiltVal').textContent=$('poleTilt').value+'°';$('fibZoomVal').textContent=(+$('fibZoom').value).toFixed(2)+'×';scene.zoom=+$('fibZoom').value;
 const curves=[];if($('showTori').checked){for(let k=0;k<18;k++){const ph=k*TAU/18;curves.push({pts:R3(fiber(s.theta,ph,120),alpha),closed:true,color:'#f0a3cd',width:1,alpha:.32})}}
 for(const f of list){curves.push({pts:R3(fiber(f.theta,f.phi,220),alpha),closed:true,color:hopfColor(f.theta,f.phi),width:f.probe?3.4:2.4,alpha:1})}
 const dots=[];for(const f of list)for(let k=0;k<3;k++)dots.push({p:project(ray(f.theta,f.phi,flowT+k*TAU/3),alpha),color:'#f1f5f8',r:f.probe?3.4:2.6});scene.set(curves,dots);drawPicker();updateLinking(list);
 const {R,r,tilt,check}=torusRadii(s.theta),pts=[0,2.1,4.2].map(t=>project(ray(s.theta,s.phi,t),alpha)),fit=pts.every(Boolean)?circleThrough(...pts):null;$('fiberRadius').textContent=fit&&fit.radius<1e6?fit.radius.toFixed(5):'∞ (a line)';$('predRadius').textContent=alpha===0?R.toFixed(5):'pole tilted';$('tubeRadius').textContent=alpha===0?r.toFixed(5):'—';$('torusCheck').textContent=alpha===0?check.toFixed(6):'—';$('villarceau').textContent=(tilt*180/Math.PI).toFixed(2)+'°';
 $('fiberNote').textContent=alpha===0?`Fibers over colatitude ${$('fibTheta').value}° fill a torus of revolution with R = sec(θ/2) = ${R.toFixed(3)} and tube radius r = tan(θ/2) = ${r.toFixed(3)}. Each fiber is a Villarceau circle of radius R, centred at distance r from the origin, in a plane tilted θ/2 from the equator.`:'The pole is tilted, so the tori become Dupin cyclides and lose their rotational symmetry. Fibers stay exact circles, and become a line only when a fiber passes through the pole. Linking numbers are unchanged.'}
function setPins(list){pins=list.slice(0,18);updateFibers()}
function flow(now){if(!flowing)return;flowT=(now/1400)%TAU;updateFibers();flowFrame=requestAnimationFrame(flow)}
$('flowFibers').onclick=()=>{flowing=!flowing;$('flowFibers').setAttribute('aria-pressed',String(flowing));$('flowFibers').textContent=flowing?'Pause circle action':'Play circle action ▶';if(flowing)flowFrame=requestAnimationFrame(flow);else cancelAnimationFrame(flowFrame)};
$('pinFiber').onclick=()=>{const s=probe();if(pins.length<18)pins.push([s.theta,s.phi]);updateFibers()};$('clearPins').onclick=()=>setPins([]);
for(const b of document.querySelectorAll('[data-family]'))b.onclick=()=>{const fam=b.dataset.family;if(fam==='tori'){$('showTori').checked=true;$('fibTheta').value=90;$('fibPhi').value=0}else if(fam==='clifford'){$('fibTheta').value=90;$('fibPhi').value=15}else if(fam==='necklace'){$('fibTheta').value=60;$('fibPhi').value=18}else if(fam==='meridian'){$('fibTheta').value=120;$('fibPhi').value=90}else{$('fibTheta').value=110;$('fibPhi').value=200}$('poleTilt').value=0;setPins(families[fam]())};
for(const id of ['fibTheta','fibPhi','poleTilt','fibZoom','showTori'])$(id).oninput=updateFibers;
$('savePng').onclick=()=>scene.png('hopf-linked-fibers.png');
const svgPick=$('pickSphere');let picking=false;svgPick.addEventListener('pointerdown',e=>{picking=true;svgPick.setPointerCapture(e.pointerId);pickAt(e)});svgPick.addEventListener('pointermove',e=>{if(picking)pickAt(e)});svgPick.addEventListener('pointerup',()=>picking=false);svgPick.addEventListener('pointercancel',()=>picking=false);
setPins(families.link());$('fibTheta').value=110;$('fibPhi').value=200;updateFibers();

/* ---------- 18 / Hopf invariant lab: F(z1,z2) = [z1^p : z2^q] ---------- */
const pqScene=new Scene($('pqCanvas'),{label:'PREIMAGES OF TWO BASE POINTS · DRAG TO ROTATE',yaw:0,pitch:1.25,zoom:.8});
const pqState=()=>({p:+$('pqP').value,q:+$('pqQ').value,n:+$('gaussN').value,t1:rad(+$('pqTheta').value)});
const SECOND=[rad(118),rad(205)];
let pqKey='',gaussKey='',gaussMemo=new Map();
function updatePQ(){const {p,q,n,t1}=pqState();$('pqPVal').textContent=p;$('pqQVal').textContent=q;$('gaussNVal').textContent=n;$('pqThetaVal').textContent=$('pqTheta').value+'°';const first=[t1,rad(35)];
 const A=preimagePQ(p,q,first[0],first[1],360),B=preimagePQ(p,q,SECOND[0],SECOND[1],360),curves=[];
 for(const [th] of [first,SECOND]){const [r1,r2]=pqRadii(p,q,th);for(let k=0;k<14;k++){const u=k*TAU/14;curves.push({pts:Array.from({length:72},(_,i)=>project([r1*Math.cos(u),r1*Math.sin(u),r2*Math.cos(TAU*i/72),r2*Math.sin(TAU*i/72)])),closed:true,color:'#52697e',width:.8,alpha:.35})}}
 for(const c of A)curves.push({pts:c.map(z=>project(z)),closed:true,color:'#f4c477',width:2.6});for(const c of B)curves.push({pts:c.map(z=>project(z)),closed:true,color:'#63e6d4',width:2.6});pqScene.set(curves);
 const info=knotName(p,q),H=hopfInvariant(p,q);$('pqKnot').textContent=info.label;$('pqComponents').textContent=String(info.components);$('pqH').textContent=String(H);$('pqFormula').textContent=`H(F) = deg(g) · H(h) = ${p}·${q} = ${H}`;
 const key=[p,q,t1].join(':');if(key!==pqKey){pqKey=key;const PA=A.map(c=>c.map(z=>project(z))),PB=B.map(c=>c.map(z=>project(z)));$('pqLink').textContent=signed(totalLinking(PA,PB))}
 if(key!==gaussKey){gaussKey=key;gaussMemo=new Map()}const sample=(N,th,ph)=>preimagePQ(p,q,th,ph,N).map(c=>c.map(z=>project(z)));const gauss=N=>{if(!gaussMemo.has(N))gaussMemo.set(N,totalLinking(sample(N,first[0],first[1]),sample(N,SECOND[0],SECOND[1]),gaussLinking));return gaussMemo.get(N)};const gv=gauss(n);$('pqGauss').textContent=gv.toFixed(6);$('pqErr').textContent=Math.abs(gv-H).toExponential(2);drawGaussPlot(gauss,n,H);
 $('pqNote').textContent=`F⁻¹(θ, φ) lies on the torus where |z₂|^${q} / |z₁|^${p} = tan(θ/2), cut out by ${q}·arg z₂ − ${p}·arg z₁ = φ. Each preimage is ${info.components===1?(info.knot==='unknot'?'an unknot':'a '+info.knot):info.label}${info.components>1?', and its components link each other '+(p*q/info.components**2)+' times':''}. Each gold component links each teal one ${p*q/info.components**2} times, so the total is ${info.components}² · ${p*q/info.components**2} = ${H} = pq.`}
function drawGaussPlot(gauss,n,H){const svg=$('gaussPlot');svg.replaceChildren();const Ns=[16,24,32,48,64,96,128,192,256],lo=1e-5,hi=10,x=N=>54+(Math.log(N)-Math.log(16))/(Math.log(256)-Math.log(16))*346,y=e=>22+(Math.log10(hi)-Math.log10(Math.max(e,lo)))/(Math.log10(hi)-Math.log10(lo))*226;for(const e of [10,1,1e-1,1e-2,1e-3,1e-4,1e-5]){el(svg,'line',{x1:54,y1:y(e),x2:400,y2:y(e),stroke:'#314258'});el(svg,'text',{x:47,y:y(e)+4,'text-anchor':'end'},e>=1?String(e):e.toExponential(0))}for(const N of [16,32,64,128,256])el(svg,'text',{x:x(N),y:270,'text-anchor':'middle'},String(N));const data=Ns.map(N=>[N,Math.abs(gauss(N)-H)]);let d='';data.forEach(([N,e],i)=>d+=(i?'L':'M')+x(N).toFixed(1)+' '+y(e).toFixed(1)+' ');el(svg,'path',{d,fill:'none',stroke:'#63e6d4','stroke-width':2.5});for(const [N,e] of data)el(svg,'circle',{cx:x(N),cy:y(e),r:2.6,fill:'#63e6d4'});const ce=Math.abs(gauss(n)-H);el(svg,'circle',{cx:x(Math.max(16,Math.min(256,n))),cy:y(ce),r:5,fill:'#f4c477',stroke:'#09111e'});el(svg,'text',{x:226,y:287,'text-anchor':'middle'},'Samples per component N (log scale)')}
for(const id of ['pqP','pqQ','gaussN','pqTheta'])$(id).oninput=updatePQ;
for(const b of document.querySelectorAll('[data-pq]'))b.onclick=()=>{const [p,q]=b.dataset.pq.split(',');$('pqP').value=p;$('pqQ').value=q;updatePQ()};
$('savePq').onclick=()=>pqScene.png('hopf-invariant-preimages.png');
updatePQ();
