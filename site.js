(function(){
  try{ if('scrollRestoration' in history) history.scrollRestoration='manual'; }catch(e){}
  if(!location.hash){ window.scrollTo(0,0); window.addEventListener('load',function(){ window.scrollTo(0,0); }); window.addEventListener('pageshow',function(){ window.scrollTo(0,0); }); }
  var PAGES=[['index.html','Focus'],['approach.html','Approach'],['intelligence.html','Intelligence']];
  var here=(location.pathname.split('/').pop()||'index.html');
  var BOOK='https://scheduler.zoom.us/markkummer';
  function lockup(){
    return '<a class="lockup" href="index.html" aria-label="VNTR Advisory"><img src="assets/logos/vntr_emblem_white.png" alt="">'+
      '<span class="lk"><span class="lk-v">VNTR</span><span class="lk-a">'+'ADVISORY'.split('').map(function(c){return '<span>'+c+'</span>';}).join('')+'</span></span></a>';
  }
  var nav=document.querySelector('header.nav');
  if(nav){
    nav.innerHTML='<div class="nav-in">'+lockup()+'<button class="nav-toggle" aria-expanded="false">Menu</button><nav class="nav-links">'+
      PAGES.map(function(p){return '<a href="'+p[0]+'"'+(p[0]===here?' class="on"':'')+'>'+p[1]+'</a>';}).join('')+
      '<a class="cta" href="contact.html">Contact</a>'+
      '<a class="cta login" href="https://slate.vntr.co" target="_blank" rel="noopener">Login</a></nav></div>';
    var t=nav.querySelector('.nav-toggle'), l=nav.querySelector('.nav-links');
    t.addEventListener('click',function(){ t.setAttribute('aria-expanded', l.classList.toggle('open')?'true':'false'); });
  }
  var f=document.querySelector('footer');
  if(f){
    f.innerHTML='<div class="wrap"><div class="ft">'+
      '<div>'+lockup()+'<div class="tagl">Institutional rigor.<br>Operator conviction.<br>Proprietary intelligence.</div></div>'+
      '<div class="col"><b>Office</b>VNTR Advisory, LLC<br>539 Bryant Street, Suite 305<br>San Francisco, California</div>'+
      '<div class="col"><b>Enquiries</b><a href="'+BOOK+'">Book 30 minutes</a><br><a href="contact.html">Contact the firm</a><br><a href="https://vntr.co">vntr.co</a></div>'+
      '<div class="col"><b>Site</b>'+PAGES.map(function(p){return '<a href="'+p[0]+'">'+p[1]+'</a>';}).join('<br>')+'<br><a href="https://slate.vntr.co">SLATE</a></div>'+
      '</div><div class="ft-rule"></div>'+
      '<p class="disc">VNTR Advisory, LLC is affiliated with GT Securities, Inc., member FINRA and SIPC. Securities transactions are conducted through GT Securities, Inc. '+
      'This website is for informational purposes only. Nothing on it is an offer to sell or a solicitation of an offer to buy any security, and nothing on it is investment, legal, accounting or tax advice. '+
      'Process illustrations are VNTR models built to show mechanics. They are not forecasts and no outcome shown is a representation of what any mandate will achieve. '+
      'Derived figures are labeled VNTR derived or VNTR estimate and are not statements by the companies named. Copyright 2026 VNTR Advisory, LLC. All rights reserved.</p></div>';
  }

  /* ---------- workflow animation engine ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* drag or click along a track: calls pick(fraction 0..1) */
  function scrub(track, pick){
    var down=false;
    function at(e){ var r=track.getBoundingClientRect(); pick(Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))); }
    track.addEventListener('pointerdown',function(e){ down=true; try{ track.setPointerCapture(e.pointerId); }catch(x){} at(e); e.preventDefault(); });
    track.addEventListener('pointermove',function(e){ if(down) at(e); });
    track.addEventListener('pointerup',function(){ down=false; });
    track.addEventListener('pointercancel',function(){ down=false; });
  }
  function flow(el, def){
    var steps, path, pos=0, timer=null, visible=false, userPaused=false, tiles=[], token, note, btn, track;
    function build(d){
      el.style.position='relative'; stop(); steps=d.steps; path=d.path || d.steps.map(function(s,i){return {s:i, note:s.note||s.ds};}); pos=0;
      el.innerHTML='<div class="flow-track"><img class="flow-token" src="assets/logos/vntr_emblem_platinum.png" alt="" draggable="false"></div>'+
        '<div class="flow-steps" style="grid-template-columns:repeat('+steps.length+',1fr)">'+
        steps.map(function(s,i){
          return '<button class="fs" data-i="'+i+'"><img src="assets/icons/'+s.ic+'.svg" alt="">'+
            (s.tg?'<div class="tg">'+s.tg+'</div>':'')+'<div class="nm">'+s.nm+'</div></button>';
        }).join('')+'</div>'+
        '<div style="display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap">'+
        '<div class="flow-note" style="flex:1;min-width:240px"></div>'+
        '<button class="btn q flow-btn" style="margin-top:12px;padding:9px 14px">Pause</button></div>';
      tiles=[].slice.call(el.querySelectorAll('.fs')); token=el.querySelector('.flow-token'); track=el.querySelector('.flow-track');
      note=el.querySelector('.flow-note'); btn=el.querySelector('.flow-btn');
      function goStep(i){ var k=0; for(var j=0;j<path.length;j++){ if(path[j].s===i){k=j;break;} } userPaused=true; stop(); pos=k; show(); }
      tiles.forEach(function(t){ t.addEventListener('click',function(){ goStep(+t.dataset.i); }); });
      /* the sailboat can be dragged, or the track clicked, to move between steps */
      scrub(track,function(fr){
        var best=0, bd=1e9, w=track.offsetWidth;
        tiles.forEach(function(t,i){ var c=t.offsetLeft+t.offsetWidth/2, d=Math.abs(c-fr*w); if(d<bd){bd=d;best=i;} });
        if(path[pos].s!==best || timer) goStep(best);
      });
      btn.addEventListener('click',function(){ if(timer){ userPaused=true; stop(); } else { userPaused=false; if(pos>=path.length-1) pos=0; show(); start(); } });
      show(); if(visible && !userPaused && !reduce) start();
    }
    function show(){
      var cur=path[pos], seen={};
      for(var j=0;j<pos;j++) seen[path[j].s]=1;
      tiles.forEach(function(t,i){ t.classList.toggle('on', i===cur.s); t.classList.toggle('seen', !!seen[i] && i!==cur.s); });
      var tl=tiles[cur.s]; token.style.left=(tl.offsetLeft+tl.offsetWidth/2)+'px';
      note.innerHTML='<b>'+steps[cur.s].nm+'.</b> <span>'+cur.note+'</span>';
      btn.textContent = timer ? 'Pause' : 'Play';
    }
    function start(){
      if(timer) return;
      timer=setInterval(function(){ pos = pos>=path.length-1 ? 0 : pos+1; show(); }, def.interval||2800);
      btn.textContent='Pause';
    }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } if(btn) btn.textContent='Play'; }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){ es.forEach(function(e){
        visible=e.isIntersecting; if(visible && !userPaused && !reduce) start(); else if(!visible) stop();
      });},{threshold:.35}).observe(el);
    }
    window.addEventListener('resize',function(){ if(tiles.length) show(); });
    build(def);
    return {load:function(d){ def=d; userPaused=false; build(d); }};
  }
  window.VNTR=window.VNTR||{}; window.VNTR.flow=flow; window.VNTR.scrub=scrub; window.VNTR.BOOK=BOOK; window.VNTR.reduce=reduce;
  function ext(root){ [].forEach.call((root||document).querySelectorAll('a[href^="http"]'),function(x){ x.target='_blank'; x.rel='noopener'; }); }
  window.VNTR.ext=ext; ext();
  window.addEventListener('load',function(){ ext(); });
})();

/* ---------- scroll: reveal, depth, pinned scrubbing ---------- */
(function(){
  var V=window.VNTR, reduce=V.reduce, stat=/[?&]static/.test(location.search);
  V.motion = !reduce && !stat;
  if(V.motion) document.documentElement.classList.add('motion');

  /* reveal on scroll, staggered inside rows */
  if(V.motion && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); if(e.target._count) e.target._count(); }
    });},{threshold:.12, rootMargin:'0px 0px -6% 0px'});
    V.reveal=function(root){
      [].forEach.call((root||document).querySelectorAll('.head, .row > *, .ex, .two > *, .tscroll, .rvl'),function(el){
        if(el.classList.contains('rv')) return;
        el.classList.add('rv');
        var sib=el.parentNode.classList.contains('row') ? [].indexOf.call(el.parentNode.children, el) : 0;
        el.style.transitionDelay=(sib*70)+'ms';
        var n=el.querySelector && el.querySelector('[data-count]');
        if(n){ el._count=function(){ countUp(n); }; }
        io.observe(el);
      });
    };
  } else { V.reveal=function(){}; }
  function countUp(n){
    var end=+n.dataset.count, suf=n.dataset.suffix||'', t0=null, dur=900;
    function tick(t){ if(!t0) t0=t; var p=Math.min(1,(t-t0)/dur); p=1-Math.pow(1-p,3);
      n.textContent=Math.round(end*p)+suf; if(p<1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }

  /* pinned scrubbing: a tall wrapper, a sticky stage, progress 0..1 */
  /* exhibits play on their own and are controlled from the sailboat track; nothing is tied to scroll position */
  var depth=[];
  V.depth=function(el, fn){ depth.push({el:el, fn:fn}); };
  var ticking=false;
  function update(){
    ticking=false;
    var y=window.pageYOffset, vh=window.innerHeight;
    if(V.motion) depth.forEach(function(d){
      var r=d.el.getBoundingClientRect();
      if(r.bottom<-200 || r.top>vh+200) return;
      d.fn((vh - r.top)/(vh + r.height), y);   // 0 entering from below, 1 leaving at top
    });
  }
  function req(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  window.addEventListener('load',function(){
    V.reveal();
    /* depth: section headings travel slower than the content beneath them */
    if(V.motion && window.matchMedia('(min-width:901px)').matches){
      [].forEach.call(document.querySelectorAll('section .head'),function(h){
        var inner=document.createElement('div'); inner.className='head-d';
        while(h.firstChild) inner.appendChild(h.firstChild); h.appendChild(inner);
        V.depth(h,function(p){ inner.style.transform='translate3d(0,'+((0.5-p)*34)+'px,0)'; });
      });
    }
    update();
  });
})();
