(function(g){
const W=10080;
function hm(s){const[h,m]=String(s).split(':').map(Number);return h*60+m}
function segs(b){const out=[],s=hm(b.start),e=hm(b.end);let len=e-s;if(len<=0)len+=1440;
 for(const d of b.days){let a=(d*1440+s)%W,l=len;while(l>0){const take=Math.min(l,W-a);out.push([a,a+take]);l-=take;a=0}}return out}
function inter(x,y){let t=0;for(const[a,b]of x)for(const[c,d]of y){const lo=Math.max(a,c),hi=Math.min(b,d);if(hi>lo)t+=hi-lo}return t}
function week(blocks){
 const S=blocks.map(segs),per=blocks.map((b,i)=>S[i].reduce((t,[a,c])=>t+c-a,0)/60);
 const days=[];
 for(let d=0;d<7;d++){const lo=d*1440,hi=lo+1440,cl=[];
  S.forEach(ss=>ss.forEach(([a,b])=>{const x=Math.max(a,lo),y=Math.min(b,hi);if(y>x)cl.push([x,y])}));
  cl.sort((p,q)=>p[0]-q[0]);let busy=0,cur=lo,end=lo,longest=0;
  for(const[a,b]of cl){if(a>end){busy+=end-cur;longest=Math.max(longest,a-end);cur=a;end=b}else end=Math.max(end,b)}
  busy+=end-cur;longest=Math.max(longest,hi-end);days.push({busy:busy/60,free:(1440-busy)/60,longestFree:longest/60})}
 const overlaps=[];for(let i=0;i<S.length;i++)for(let j=i+1;j<S.length;j++){const m=inter(S[i],S[j]);if(m>0)overlaps.push({a:i,b:j,minutes:m})}
 const busy=days.reduce((t,x)=>t+x.busy,0);
 return{perBlock:per,days,overlaps,busy,free:168-busy}}
g.week=week;g.segs=segs;g.hm=hm;if(typeof module!=='undefined')module.exports={week,segs,hm};
})(typeof window!=='undefined'?window:globalThis);
