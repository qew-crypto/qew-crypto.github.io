(function(){
  var $=function(i){return document.getElementById(i)},gate=$('gate'),site=$('site'),bgm=$('bgm'),snd=$('sound'),btn=$('enter'),
      root=document.body,still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  root.classList.add('locked');
  btn.addEventListener('click',function(){
    bgm.volume=.6;bgm.play().catch(function(){snd.classList.add('off')});
    gate.classList.add('open');snd.hidden=false;
    setTimeout(function(){site.classList.add('show');type()},500);
    setTimeout(function(){gate.classList.add('gone');root.classList.remove('locked');reveal()},1500);
  });
  snd.addEventListener('click',function(){
    if(bgm.paused){bgm.play();snd.classList.remove('off')}else{bgm.pause();snd.classList.add('off')}
  });

  // parallax (mouse / touch / gyro)
  function par(x,y){root.style.setProperty('--mx',x.toFixed(3));root.style.setProperty('--my',y.toFixed(3))}
  addEventListener('mousemove',function(e){par(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5)});
  addEventListener('touchmove',function(e){var t=e.touches[0];par(t.clientX/innerWidth-.5,t.clientY/innerHeight-.5)},{passive:true});
  addEventListener('deviceorientation',function(e){if(e.gamma!=null)par(Math.max(-.5,Math.min(.5,e.gamma/60)),Math.max(-.5,Math.min(.5,(e.beta-45)/90)))});

  // typing
  var phrases=['Python • вайбкодинг • боты','Крутой и точка','夜空の鷹'],pi=0,ci=0,del=false,el=$('typed'),started=false;
  function type(){
    if(started)return;started=true;
    (function tick(){
      var w=phrases[pi];ci+=del?-1:1;el.textContent=w.slice(0,ci);
      var d=del?35:75;
      if(!del&&ci===w.length){del=true;d=1600}else if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;d=300}
      setTimeout(tick,d);
    })();
  }

  // scroll reveal + card glow
  function reveal(){
    var io=new IntersectionObserver(function(a){a.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
    document.querySelectorAll('.rv').forEach(function(n,i){n.style.transitionDelay=(i%3)*80+'ms';io.observe(n)});
  }
  document.querySelectorAll('.card').forEach(function(c){
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')});
  });

  // particles from image sprites
  var c=$('sky'),x=c.getContext('2d'),W,H,d=Math.min(devicePixelRatio||1,2),petals=[],flies=[],shoot=[];
  function img(u){var i=new Image();i.src=u;return i}
  var IP=img('assets/img/petal.png'),IF=img('assets/img/firefly.png'),IS=img('assets/img/streak.png');
  function R(a,b){return a+Math.random()*(b-a)}
  function mk(init){return{x:R(0,W),y:init?R(0,H):-20*d,s:R(12,26)*d,vy:R(.5,1.3)*d,vx:R(.2,.8)*d,r:R(0,6.3),vr:R(-.03,.03),p:R(0,6.3)}}
  function size(){W=c.width=innerWidth*d;H=c.height=innerHeight*d;var m=innerWidth<640?.6:1;
    petals=[];for(var i=0;i<28*m;i++)petals.push(mk(true));
    flies=[];for(var i=0;i<18*m;i++)flies.push({x:R(0,W),y:R(H*.55,H),p:R(0,6.3),s:R(.2,.6)*d})}
  size();addEventListener('resize',size);
  // hawk wing flap (two image frames)
  var hk=document.querySelector('.hawk');if(hk&&!still){var fr=0;setInterval(function(){fr^=1;hk.src=fr?hk.dataset.b:hk.dataset.a},220)}
  (function draw(){
    x.clearRect(0,0,W,H);
    if(!still){
      if(Math.random()<.004&&shoot.length<2)shoot.push({x:R(W*.3,W),y:R(0,H*.3),l:0});
      shoot=shoot.filter(function(s){s.x-=14*d;s.y+=6*d;s.l++;x.globalAlpha=1;x.save();x.translate(s.x,s.y);x.rotate(-.4);x.drawImage(IS,0,0,150*d,5*d);x.restore();return s.x>-200&&s.l<120});
      petals.forEach(function(p,i){p.p+=.03;p.r+=p.vr;p.y+=p.vy;p.x+=p.vx+Math.sin(p.p*.7)*.6*d;
        x.save();x.translate(p.x,p.y);x.rotate(p.r);x.scale(1,Math.abs(Math.cos(p.p))*.7+.3);x.globalAlpha=.9;x.drawImage(IP,-p.s/2,-p.s/2,p.s,p.s);x.restore();
        if(p.y>H+20||p.x>W+20)petals[i]=mk(false)});
      flies.forEach(function(f){f.p+=.02;f.x+=Math.sin(f.p)*f.s;f.y+=Math.cos(f.p*.8)*f.s;x.globalAlpha=.4+.6*Math.abs(Math.sin(f.p*2));x.drawImage(IF,f.x-12*d,f.y-12*d,24*d,24*d)});
      requestAnimationFrame(draw);
    }
  })();
})();
