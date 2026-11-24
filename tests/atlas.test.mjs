import test from 'node:test';
import assert from 'node:assert/strict';
import {bott,lineIndex,ray,overlap,distance,projector} from '../docs/atlas-model.mjs';
const near=(a,b,eps=1e-10)=>assert.ok(Math.abs(a-b)<eps,a+' != '+b);
test('Bott line weights reproduce CP4 index',()=>{for(let k=-20;k<=20;k++)assert.equal(bott([k,0,0,0,0]).index,lineIndex(4,k))});
test('known representation dimensions and singular weights',()=>{assert.equal(bott([1,0,0,0,0]).dimension,5);assert.equal(bott([1,1,0,0,0]).dimension,10);assert.equal(bott([2,0,0,0,0]).dimension,15);assert.equal(bott([-1,0,0,0,0]).dimension,0);assert.equal(bott([-5,0,0,0,0]).degree,4);assert.equal(bott([-5,0,0,0,0]).index,1);assert.equal(bott([0,1,0,0,0]).index,0)});
test('homogeneous obstruction and common shift invariance',()=>{for(let k=-12;k<=12;k++)for(let a=0;a<=4;a++)for(let b=0;b<=4;b++)for(let c=0;c<=4;c++){let w=[k,a+b+c,b+c,c,0],r=bott(w);assert.ok(r.dimension===0||r.dimension===1||r.dimension>=5);assert.equal(r.index,bott(w.map(x=>x+2)).index)}});
test('absolute index three by dimension',()=>{for(let n=1;n<=4;n++){let matches=[];for(let k=-20;k<=20;k++)if(Math.abs(lineIndex(n,k))===3)matches.push(k);assert.deepEqual(matches,n===1?[-4,2]:n===2?[-4,1]:[])}});
test('common phase invariance and ray orthogonality',()=>{let a=ray([1,2,3,4,5],[.1,.2,.3,.4,.5]),b=ray([1,2,3,4,5],[.1,.2,.3,.4,.5],1.234);near(overlap(a,b),1);near(distance(a,b),0,1e-7);let p=projector(a),q=projector(b);p.forEach((row,i)=>row.forEach(([re,im],j)=>{near(re,q[i][j][0]);near(im,q[i][j][1])}));let u=ray([1,1,1,1,1],[0,0,0,0,0]),v=ray([1,1,0,0,0],[0,Math.PI,0,0,0]);near(overlap(u,v),0);near(distance(u,v),Math.PI/2);assert.throws(()=>ray([0],[0]),RangeError)});
