/* Shared, dependency-free data functions. Identifiers remain strings. */
(function(root){
'use strict';
function parseCSV(text){const rows=[];let row=[],field='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))rows.push(row);row=[];field='';}else field+=c;}if(field||row.length){row.push(field);rows.push(row);}const headers=rows.shift();return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??''])));}
const number=v=>v===''||v==null?null:Number(v);
function prepare(rows){return rows.map(r=>{const price=number(r.sale_price),area=number(r.living_area_sqft);let dom=null;if(r.list_date&&r.contract_date){const days=(Date.parse(r.contract_date)-Date.parse(r.list_date))/86400000;if(Number.isFinite(days)&&days>=0)dom=days;}return {...r,price,area,distance:number(r.miles_to_campus),dom,ppsf:area>0?price/area:null};});}
function eligible(r){return Number.isFinite(r.price)&&r.price>=10000&&r.price<=5000000;}
function filter(rows,f={}){return rows.filter(r=>eligible(r)&&(!f.campus||r.university===f.campus)&&(!f.city||r.city===f.city)&&(!f.distance||(r.distance!==null&&r.distance<=Number(f.distance)))&&(!f.budget||r.price<=Number(f.budget)));}
function median(values){const a=values.filter(v=>v!==null&&Number.isFinite(v)).sort((a,b)=>a-b),n=a.length;return n?(a[Math.floor((n-1)/2)]+a[Math.floor(n/2)])/2:null;}
function summary(rows){return {count:rows.length,median:median(rows.map(r=>r.price)),ppsf:median(rows.map(r=>r.ppsf)),dom:median(rows.map(r=>r.dom)),domCount:rows.filter(r=>r.dom!==null).length,areaCount:rows.filter(r=>r.ppsf!==null).length};}
function cities(rows){const groups=new Map();rows.forEach(r=>{const key=r.city+', '+r.state;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r);});return [...groups].map(([label,rs])=>({label,city:rs[0].city,state:rs[0].state,count:rs.length,median:median(rs.map(r=>r.price))})).sort((a,b)=>b.median-a.median||a.label.localeCompare(b.label));}
const bins=[{lo:10000,hi:250000,label:'<$250k'},{lo:250000,hi:500000,label:'$250–500k'},{lo:500000,hi:750000,label:'$500–750k'},{lo:750000,hi:1000000,label:'$750k–1m'},{lo:1000000,hi:1250000,label:'$1–1.25m'},{lo:1250000,hi:1500000,label:'$1.25–1.5m'},{lo:1500000,hi:2000000,label:'$1.5–2m'},{lo:2000000,hi:Infinity,label:'$2m+'}];
function histogram(rows){return bins.map(b=>({...b,count:rows.filter(r=>r.price>=b.lo&&r.price<b.hi).length}));}
const api={parseCSV,prepare,eligible,filter,median,summary,cities,histogram};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.HomeData=api;
})(typeof globalThis!=='undefined'?globalThis:this);
