var O=Object.defineProperty;var M=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var k=(e,n,t)=>n in e?O(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,y=(e,n)=>{for(var t in n||(n={}))C.call(n,t)&&k(e,t,n[t]);if(M)for(var t of M(n))T.call(n,t)&&k(e,t,n[t]);return e};const W=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};W();const d={w:0,h:0},w={player:"green",enemy:"red",shootingEnemy:"purple"},B=e=>{let n=!1,t,i={};window.document.addEventListener("keydown",s=>{switch(s.code){case"KeyA":e.speed.x=-e.speed.common;break;case"KeyD":e.speed.x=e.speed.common;break;case"KeyW":e.speed.y=-e.speed.common;break;case"KeyS":e.speed.y=e.speed.common;break}}),window.document.addEventListener("keyup",s=>{switch(s.code){case"KeyA":e.speed.x<0&&(e.speed.x=0);break;case"KeyD":e.speed.x>0&&(e.speed.x=0);break;case"KeyW":e.speed.y<0&&(e.speed.y=0);break;case"KeyS":e.speed.y>0&&(e.speed.y=0);break}}),window.document.addEventListener("mousedown",s=>{i.x=s.clientX,i.y=s.clientY,n=!0,t=setInterval(()=>e.shoot(i))}),window.document.addEventListener("mousemove",s=>{n&&(i.x=s.clientX,i.y=s.clientY)}),window.document.addEventListener("mouseup",s=>{n=!1,t&&clearInterval(t)})},g=document.getElementById("canvas"),r=g.getContext("2d"),A=()=>{d.w=g.width=window.innerWidth,d.h=g.height=window.innerHeight},p=({color:e,size:n,position:t})=>{r.beginPath(),r.fillStyle=e,r.arc(t.x,t.y,n,0,2*Math.PI),r.fill()},N=({color:e,width:n,position:t,size:i,value:s})=>{r.beginPath(),r.strokeStyle=e,r.lineWidth=n,r.arc(t.x,t.y,i,0,s*2*Math.PI),r.stroke()},S=({color:e,width:n,height:t,position:i})=>{r.beginPath(),r.fillStyle=e,r.rect(i.x,i.y,n,t),r.fill()},R=({text:e,position:n,size:t,color:i})=>{r.fillStyle=i,r.font=`${t}px serif`,r.fillText(e,n.x,n.y)},$=()=>{r.clearRect(0,0,window.innerWidth,window.innerHeight)};window.document.addEventListener("resize",A);A();const c=(e=0,n=0)=>({x:typeof e=="number"?e:e.x,y:typeof e=="number"?n:e.y,add:function(t){return c(this.x+t.x,this.y+t.y)},sub:function(t){return c(this.x-t.x,this.y-t.y)},mul:function(t){return c(this.x*t,this.y*t)},length:function(){return Math.hypot(Math.abs(this.x),Math.abs(this.y))},distanceTo:function(t){return c(t).sub(this).length()},setLength:function(t){const i=this.length();return c(this.x*t/i,this.y*t/i)},perpendicular:function(){return c(-this.y,this.x)}}),q=({color:e,damage:n,size:t,speed:i,owner:s,position:o})=>({color:e,damage:n,size:t,speed:i,owner:s,position:o,disabled:!1,draw:()=>p({color:e,size:t,position:o}),animate:function(){o.x+=i.x,o.y+=i.y,(o.x<0||o.x>d.w||o.y<0||o.y>d.h)&&(this.disabled=!0)}}),z=(e,n)=>c(e.position).sub(n.position).length()<=e.size+n.size,h={players:[],bullets:[],draw:function(){$(),this.players.forEach(e=>e.draw()),this.bullets.forEach(e=>e.draw())},animate:function(){this.players.forEach(e=>e.animate()),this.bullets.forEach(e=>e.animate()),this.checkCollisions(),this.removeOrphans()},removeOrphans:function(){this.players=this.players.filter(e=>!e.disabled),this.bullets=this.bullets.filter(e=>!e.disabled)},checkCollisions:function(){this.players.forEach(e=>{this.bullets.forEach(n=>{z(e,n)&&n.owner.type!==e.type&&(e.getDamage(n.damage)&&n.owner.score++,n.disabled=!0)}),this.players.forEach(n=>{z(e,n)&&n.type!==e.type&&n.hit(e)})})},isLevelFinished:function(){return this.players.every(e=>e.type==="player")}};var U="/assets/sfx_wpn_laser8.cb202200.wav",X="/assets/sfx_wpn_laser7.80507108.wav",Y="/assets/sfx_wpn_punch4.924bdca5.wav";const j=()=>{let e=new Date().getTime();return"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){let t=(e+Math.random()*16)%16|0;return e=Math.floor(e/16),(n=="x"?t:t&3|8).toString(16)})},D=({color:e,health:n,canShoot:t,size:i,hearts:s,speed:o,damage:l,position:a,bulletSpeed:F,type:b,logic:v=null,cooldown:E})=>{const H=j();let x=null;const L=()=>x===null||+new Date>x?(x=+new Date+E*1e3,!0):!1,u={color:e,health:n,canShoot:t,size:i,hearts:s,speed:o,damage:l,position:a,type:b,uuid:H,cooldown:E,score:0,fullHealth:n,draw:function(){p({color:e,size:i,position:a}),N({color:"black",size:i,width:2,position:a,value:this.health/this.fullHealth})},animate:function(){v&&v(this,h),a.x=a.x+this.speed.x>d.w-u.size||a.x+this.speed.x<0+u.size/2?a.x:a.x+this.speed.x,a.y=a.y+this.speed.y>d.h-u.size||a.y+this.speed.y<0+u.size/2?a.y:a.y+this.speed.y},shoot:function(f){if(L()){(b==="player"?new Audio(U):new Audio(X)).play();const _=c(f).sub(a).setLength(F);h.bullets.push(q({color:e,damage:l,size:3,speed:_,owner:this,position:{x:a.x,y:a.y}}))}},hit:function(f){return!t&&L()?(new Audio(Y).play(),f.getDamage(l)):!1},getDamage:function(f){if(this.health-=f,this.health<=0)if(this.hearts>1)this.hearts--,this.health=this.fullHealth;else return this.disabled=!0,!0;return!1}};return h.players.push(u),u},G=(e,n)=>{let t=null,i=-1;if(n.players.forEach(s=>{if(s.type!==e.type){const o=c(s.position).distanceTo(e.position);(!t||o<i)&&(t=s,i=o)}}),t!==null){const s=e.speed.common;if(!e.canShoot)i>e.size?e.speed=y({common:s},c(t.position).sub(e.position).setLength(s)):e.speed.x=e.speed.y=0;else{let o=c(t.position).sub(e.position).setLength(s*.01);(i>20*e.size||i<5*e.size)&&(o=c(t.position).sub(e.position).setLength(s),i<5*e.size&&(o=o.mul(-1))),o=o.add(o.perpendicular().setLength(s)).setLength(s),e.speed=y({common:s},o),e.shoot(t.position)}}},J=()=>{const e=D({color:w.player,health:30,canShoot:!0,size:10,type:"player",hearts:3,speed:{x:0,y:0,common:5},damage:1,position:{x:d.w/2,y:d.h/2},bulletSpeed:10,cooldown:.1});return B(e),e},Q=e=>(e||(e={health:10,canShoot:Math.random()>.5,size:10,speed:{x:0,y:0,common:.3},damage:1,bulletSpeed:10,cooldown:1}),D(y({color:e.canShoot?w.shootingEnemy:w.enemy,type:"enemy",hearts:1,position:{x:Math.random()*d.w,y:Math.random()*d.h},logic:G},e))),V=e=>{const n=Math.random()<.7;let t,i,s;return s=.3+2.7*Math.random(),n?(t=.05+1.95*Math.random(),i=1+Math.min(e*.2*t,25)):(t=1+3*Math.random(),i=1+Math.min(e*.1*t/s,25)),Q({health:10+.2*e,size:10+Math.min(20,e*2),bulletSpeed:10,speed:{x:0,y:0,common:s},canShoot:n,damage:i,cooldown:t})},P=e=>{const n=Math.random()<.5?1:1+Math.random()*e,t=[];for(let s=0;s<n;++s)t.push(Math.random());const i=t.reduce((s,o)=>s+o,0);t.forEach(s=>{const o=s/i,l=1+o*(e-1);V(l)})},Z=(e,n)=>{S({color:"black",width:e.fullHealth*3,height:20,position:{x:10,y:10}}),S({color:"green",width:e.health*3,height:20,position:{x:10,y:10}}),R({text:`score: ${e.score}  level: ${n}`,color:"black",size:30,position:{x:10,y:90}});for(let t=0;t<e.hearts;t++)p({color:"red",size:10,position:{x:20+t*30,y:50}})};let m=1;const K=()=>{h.animate(),h.draw(),h.players.length&&Z(h.players[0],m),h.isLevelFinished()&&(m++,P(m)),window.requestAnimationFrame(K)},ee=()=>{J(),P(m),K()};ee();
