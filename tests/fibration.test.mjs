import test from 'node:test';import assert from 'node:assert/strict';
import {TAU,ray,hopf,stereo,fiber,project,tiltPole,torusRadii,circleThrough,mapPQ,pqRadii,preimagePQ,knotName,hopfInvariant,linkingNumber,gaussLinking,totalLinking,safeTilt,gcd} from '../docs/fibration-model.mjs';
const near=(a,b,e=1e-10)=>assert.ok(Math.abs(a-b)<e,a+' != '+b);
const proj=c=>c.map(z=>stereo(z));

test('fibers project to circles that are Villarceau circles of nested tori',()=>{for(const theta of [.3,1,Math.PI/2,2.2,2.8])for(const phi of [0,.9,4]){const {R,r,tilt,check}=torusRadii(theta);near(check,1,1e-9);const pts=fiber(theta,phi,40).map(z=>stereo(z));for(const [x,y,z] of pts)near((Math.hypot(x,y)-R)**2+z*z,r*r,1e-8);const c=circleThrough(pts[0],pts[13],pts[27]);near(c.radius,R,1e-8);near(Math.hypot(...c.centre),r,1e-8);near(c.centre[2],0,1e-9);near(Math.acos(Math.abs(c.normal[2])),tilt,1e-8);for(const p of pts)near(Math.hypot(p[0]-c.centre[0],p[1]-c.centre[1],p[2]-c.centre[2]),R,1e-8)}});

test('tilting the pole keeps fibers round and keeps them fibers',()=>{for(const alpha of [.4,1.1,2.5]){const pts=fiber(1.3,.7,30).map(z=>project(z,alpha)),c=circleThrough(pts[0],pts[9],pts[21]);for(const p of pts)near(Math.hypot(p[0]-c.centre[0],p[1]-c.centre[1],p[2]-c.centre[2]),c.radius,1e-7);for(const z of fiber(1.3,.7,12)){const t=tiltPole(z,alpha);near(t.reduce((s,v)=>s+v*v,0),1)}}});

test('any two Hopf fibers have linking number +1, matching the Gauss integral',()=>{const base=[[.4,.1],[1.2,2.3],[1.9,4.4],[2.6,1.0],[Math.PI/2,0]];for(let i=0;i<base.length;i++)for(let j=i+1;j<base.length;j++){const A=fiber(...base[i],200),B=fiber(...base[j],200),alpha=safeTilt([A,B]),a=A.map(z=>project(z,alpha)),b=B.map(z=>project(z,alpha));assert.equal(linkingNumber(a,b),1);assert.equal(linkingNumber(b,a),1);near(gaussLinking(a,b),1,5e-3)}});

test('linking number is independent of the projection pole',()=>{const A=fiber(.8,.2,180),B=fiber(2.1,3,180);for(const alpha of [0,.7,1.9,3.3,5])if(safeTilt([A,B])===safeTilt([A,B]))assert.equal(linkingNumber(A.map(z=>project(z,alpha)),B.map(z=>project(z,alpha))),1)});

test('preimages of [z1^p : z2^q] are gcd(p,q) torus-knot components on one torus',()=>{for(const [p,q] of [[1,1],[2,3],[3,2],[2,2],[3,3],[2,4],[2,5],[3,4],[5,5]])for(const [theta,phi] of [[.5,.2],[1.6,3.1],[2.4,5]]){const parts=preimagePQ(p,q,theta,phi,64),target=hopf(ray(theta,phi)),[r1,r2]=pqRadii(p,q,theta);assert.equal(parts.length,gcd(p,q));near(r2**q/r1**p,Math.tan(theta/2),1e-9);for(const c of parts)for(const z of c){mapPQ(z,p,q).forEach((v,i)=>near(v,target[i],1e-9));near(Math.hypot(z[0],z[1]),r1,1e-12)}}});

test('Hopf invariant of [z1^p : z2^q] is pq, by exact crossings and by the Gauss integral',()=>{for(const [p,q] of [[1,1],[1,3],[2,2],[2,3],[3,2],[3,3],[2,5],[3,4]]){const A=preimagePQ(p,q,55*Math.PI/180,35*Math.PI/180,360).map(proj),B=preimagePQ(p,q,118*Math.PI/180,205*Math.PI/180,360).map(proj);assert.equal(totalLinking(A,B),hopfInvariant(p,q));near(totalLinking(A,B,gaussLinking),p*q,.05)}});

test('Gauss midpoint sum converges toward the integer',()=>{const e=N=>Math.abs(totalLinking(preimagePQ(2,3,1,.6,N).map(proj),preimagePQ(2,3,2,3.6,N).map(proj),gaussLinking)-6);assert.ok(e(256)<e(64));assert.ok(e(64)<e(24));const ratio=e(128)/e(256);assert.ok(ratio>3.5&&ratio<4.5,'second order: '+ratio);assert.ok(e(256)<5e-3)});

test('components of one preimage link each other (p/g)(q/g) times',()=>{for(const [p,q] of [[2,2],[3,3],[2,4],[4,6]]){const g=gcd(p,q),A=preimagePQ(p,q,1.1,.4,300).map(proj),B=preimagePQ(p,q,2,1.5,300).map(proj);for(let i=0;i<g;i++){for(let j=i+1;j<g;j++)assert.equal(linkingNumber(A[i],A[j]),p*q/(g*g));for(let j=0;j<g;j++)assert.equal(linkingNumber(A[i],B[j]),p*q/(g*g))}}});

test('knot names',()=>{assert.equal(knotName(1,1).label,'unknot');assert.equal(knotName(2,3).knot,'trefoil');assert.equal(knotName(5,2).knot,'cinquefoil');assert.equal(knotName(4,6).label,'2 parallel trefoils');assert.equal(knotName(3,3).label,'3 parallel unknots');assert.throws(()=>preimagePQ(0,1,1,1));assert.throws(()=>pqRadii(1,1,0))});
