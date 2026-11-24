import test from 'node:test';
import assert from 'node:assert/strict';
import {crossing,curvature,gap,index,holonomy,modes,fiberPoint} from '../docs/model.mjs';
const near=(a,b,eps=1e-9)=>assert.ok(Math.abs(a-b)<eps,`${a} != ${b}`);
test('round spectrum and curvature',()=>{near(curvature(1),72);near(gap(1),9);assert.equal(modes(2,1).filter(r=>r.value===9).reduce((s,r)=>s+r.mult,0),10);assert.equal(modes(2,1).filter(r=>r.value===20).reduce((s,r)=>s+r.mult,0),54)});
test('critical crossing and multiplicity',()=>{const r=modes(5,crossing,false);near(r[0].value,20);assert.equal(r.filter(x=>Math.abs(x.value-20)<1e-9).reduce((s,x)=>s+x.mult,0),34)});
test('first eigenvalue formula across deformations',()=>{for(let t of [.1,.2,crossing,.5,1,2,10])near(modes(12,t)[0].value,gap(t));assert.ok(curvature(.9)<72&&curvature(1.1)<72);assert.ok(gap(.9)>9&&gap(1.1)>9)});
test('index obstruction and duality',()=>{for(let k=-100;k<=100;k++){assert.notEqual(index(k),3);assert.equal(index(k),index(-k-5));assert.ok(Number.isInteger(index(k)))}assert.equal(index(0),1);assert.equal(index(1),5)});
test('phase and closed Hopf fibers',()=>{near(holonomy(0),0);near(holonomy(Math.PI/2),Math.PI);near(holonomy(Math.PI),2*Math.PI);for(let i=0;i<3;i++)near(fiberPoint(.7,1.1,0)[i],fiberPoint(.7,1.1,2*Math.PI)[i])});
