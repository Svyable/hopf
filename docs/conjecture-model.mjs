import {atlas,graph,parseRules} from './workbench-model.mjs';
import {norms,additive} from './structure-model.mjs';
export const metrics={
 rules:['states','edges','sinks','cyclic','normalForms','joinable'],
 signs:['u2Power','u3Power','maxFourier','meanAbs','size','sumSize','energy']
};
export const examples=[
 {id:'termination',domain:'rules',premises:[{key:'cyclic',op:'=',value:0}],conclusion:{key:'joinable',op:'=',value:1},title:'Every terminating reachable rewrite graph is joinable'},
 {id:'closure',domain:'rules',premises:[{key:'sinks',op:'=',value:1}],conclusion:{key:'joinable',op:'=',value:1},title:'One bottom component implies joinability'},
 {id:'uniformity',domain:'signs',premises:[],conclusion:{key:'u3Power',op:'>=',other:'u2SquaredPower'},title:'U³ is at least U²'},
 {id:'energy',domain:'signs',premises:[{key:'size',op:'>',value:0}],conclusion:{key:'energyTimesSum',op:'>=',other:'sizeFourth'},title:'Additive energy satisfies Cauchy–Schwarz'}
];
const keys={rules:metrics.rules,signs:[...metrics.signs,'u2SquaredPower','energyTimesSum','sizeFourth']};
export function validate(c){if(!c||!keys[c.domain]||!Array.isArray(c.premises)||c.premises.length>6)throw Error('Invalid conjecture');for(const p of [...c.premises,c.conclusion]){if(!p||!keys[c.domain].includes(p.key)||!['=','!=','<','<=','>','>='].includes(p.op)||!(p.other?keys[c.domain].includes(p.other):Number.isFinite(p.value)))throw Error('Invalid predicate')}return c}
export function matches(r,p){const a=r[p.key],b=p.other?r[p.other]:p.value;switch(p.op){case '=':return a===b;case '!=':return a!==b;case '<':return a<b;case '<=':return a<=b;case '>':return a>b;case '>=':return a>=b}}
let ruleCache,signCache;
export function dataset(domain){if(domain==='rules')return ruleCache??=atlas().map(r=>({...r,cyclic:+r.cyclic,joinable:+r.joinable}));if(domain==='signs')return signCache??=Array.from({length:256},(_,mask)=>{const f=Array.from({length:8},(_,i)=>mask&(1<<i)?-1:1),n=norms(f),a=additive(f.map((v,i)=>v===1?i:-1).filter(i=>i>=0),8);return {mask,u2Power:Number(n.u2num),u3Power:Number(n.u3num),u2SquaredPower:Number(n.u2num)**2/512,maxFourier:Math.max(...n.w.map(Math.abs)),meanAbs:Math.abs(n.w[0]),size:a.set.length,sumSize:a.sumset.length,energy:a.energy,energyTimesSum:a.energy*a.sumset.length,sizeFourth:a.set.length**4}});throw Error('Unknown domain')}
export function search(c){validate(c);const rows=dataset(c.domain),eligible=rows.filter(r=>c.premises.every(p=>matches(r,p))),fails=eligible.filter(r=>!matches(r,c.conclusion));return {total:rows.length,eligible:eligible.length,failures:fails.length,status:!eligible.length?'VACUOUS':fails.length?'REFUTED':'FINITE PASS',witnesses:fails.slice(0,32),first:fails[0]??null}}
export function certificate(c){return {schema:'hopf-conjecture-1',conjecture:c,result:search(c)}}
export function verify(v){if(v?.schema!=='hopf-conjecture-1')return false;try{return JSON.stringify(search(v.conjecture))===JSON.stringify(v.result)}catch{return false}}
