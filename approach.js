(function(){
  var V=window.VNTR;
  var bk=document.getElementById('book'); if(bk) bk.href=V.BOOK;

  /* ---------- Exhibit 1: process workflows ---------- */
  var PF={
    stag:{title:'Staggered Process (VNTR Methodology)', cap:'Curated with the client, released in waves to pre-vetted buyers.',
      steps:[
        {ic:'management-meeting',tg:'Curate',nm:'Curate with the client',ds:'Cut the same 200 names to the serious buyers.'},
        {ic:'positioning-map',tg:'Rank',nm:'Stack rank',ds:'Rank the curated list by probability of close.'},
        {ic:'teaser',tg:'Release',nm:'Release a wave',ds:'Six names, top of the list first.'},
        {ic:'term-sheet-and-loi',tg:'Count',nm:'Count letters',ds:'Letters of intent in hand.'},
        {ic:'bids-and-offers',tg:'Stop',nm:'Stop release',ds:'Three or four letters reached.'},
        {ic:'due-diligence',tg:'Select',nm:'Select a buyer',ds:'Exclusivity and confirmatory diligence.'},
        {ic:'definitive-agreement',tg:'Sign',nm:'Sign',ds:'Purchase agreement executed.'}
      ],
      path:[
        {s:0,note:'We start from the same 200 names other investment banks would contact and go through them with the client before anything is sent. Buyers that are not qualified, or that have a record of re-trading or of long diligence that fails, come off. The size of the curated list varies by mandate.'},
        {s:1,note:'Each remaining buyer is ranked on probability of close, with an overview of how it behaves in diligence and our view of what it will pay, based on transactions it has completed. The client approves the order.'},
        {s:2,note:'Wave 1. The six highest probability buyers are approached. The memorandum goes only to those that clear a first conversation.'},
        {s:3,note:'One letter of intent in hand after wave 1. Release continues.'},
        {s:2,note:'Wave 2. The next six names are approached.'},
        {s:3,note:'Two letters of intent in hand. Release continues.'},
        {s:2,note:'Wave 3. Six more names are approached.'},
        {s:3,note:'Three letters of intent in hand. Release continues.'},
        {s:2,note:'Wave 4. Six more names are approached.'},
        {s:3,note:'Four letters of intent in hand, as many as a broad auction produces or more, over a longer period.'},
        {s:4,note:'In the model, release stops after 24 names. The rest of the curated list is not contacted.'},
        {s:5,note:'One counterparty is selected and granted exclusivity for confirmatory diligence.'},
        {s:6,note:'Documents are negotiated on the terms in the letter of intent and the purchase agreement is signed.'}
      ], interval:2500},
    auction:{title:'Broad Auction (Other Investment Banks)', cap:'About 200 names on a fixed calendar.',
      steps:[
        {ic:'teaser',tg:'Release',nm:'Teaser to 200',ds:'About 200 names contacted at once.',note:'Within the first week about 25 percent of that market has worked out who is for sale, before signing anything.'},
        {ic:'nda',tg:'Sign',nm:'Non-disclosure',ds:'Agreements signed across the field.',note:'About 70 percent sign, many of them to see the numbers.'},
        {ic:'cim',tg:'Distribute',nm:'Memorandum',ds:'Sent to every party that signed.',note:'About 140 parties now hold the confidential memorandum, including competitors.'},
        {ic:'bids-and-offers',tg:'Round 1',nm:'Indications',ds:'First round bids on a fixed date.',note:'The field is cut on indications of interest. Parties that drop keep the memorandum.'},
        {ic:'management-meeting',tg:'Meet',nm:'Management meetings',ds:'Presentations to the remaining field.',note:'In the model, eight buyers meet management.'},
        {ic:'term-sheet-and-loi',tg:'Round 2',nm:'Bid date',ds:'Letters of intent on a fixed date.',note:'In the model, three letters of intent are received on the bid date.'},
        {ic:'definitive-agreement',tg:'Sign',nm:'Exclusivity and signing',ds:'One buyer selected, documents signed.',note:'One buyer is selected for exclusivity, confirmatory diligence and signing.'}
      ], interval:2500}
  };
  var pf=document.getElementById('pf-flow');
  if(pf){
    var ctl=V.flow(pf, PF.stag), pt=document.getElementById('pf-title'), pc=document.getElementById('pf-cap');
    pc.textContent=PF.stag.cap;
    document.getElementById('pf-tabs').addEventListener('click',function(ev){
      var b=ev.target.closest('button'); if(!b) return;
      [].forEach.call(this.querySelectorAll('button'),function(x){ x.classList.toggle('on',x===b); });
      var d=PF[b.dataset.p]; pt.textContent=d.title; pc.textContent=d.cap; ctl.load(d);
    });
  }

  /* ---------- Exhibit 2: release simulation ---------- */
  var WEEKS=28;
  /* a: approached, c: knows who is for sale, d: diligence, l: letter of intent, o: out */
  function rec(a,c,d,l,o){ return {a:a,c:c,d:d,l:l,o:o}; }
  function build(n,f){ var r=[]; for(var i=0;i<n;i++) r.push(f(i)); return r; }
  var AUCTION={name:'Broad Auction (Other Investment Banks), 200 names',
    phase:[[0,'Preparation. Nothing in market.'],[1,'Teaser sent to 200 names. About 50 identify the seller before signing anything.'],
      [4,'Non-disclosure agreements signed, many to see the numbers. 140 parties hold the memorandum.'],
      [8,'Indications of interest requested from the full field.'],[11,'Field cut. Management meetings under way.'],[14,'Bid date. Three letters of intent received.'],
      [17,'Exclusivity granted. Confirmatory diligence.'],[21,'Documents negotiated. Signing.']],
    buyers:build(200,function(i){
      var k = i<50 ? 1 : 4;                          /* 50 identify the seller in week 1, 90 more on signing */
      if(i>=140) return rec(1,null,null,null,4);     /* 60 never sign */
      if(i>=24)  return rec(1,k,null,null,8);
      if(i>=8)   return rec(1,k,null,null,11);
      if(i>=3)   return rec(1,k,11,null,14);
      if(i>=1)   return rec(1,k,11,14,17);
      return rec(1,k,11,14,null);
    })};
  var STAG={name:'Staggered Process (VNTR Methodology), curated list, 40 shown',
    phase:[[0,'Preparation. The same 200 names curated with the client and stack ranked.'],[2,'Wave 1 released to the six highest probability buyers.'],
      [6,'Wave 2 released to the next six names.'],[8,'First letter of intent in hand.'],[10,'Wave 3 released to six more names.'],
      [12,'Second letter of intent in hand.'],[14,'Wave 4 released to six more names.'],[16,'Third letter of intent in hand.'],
      [20,'Four letters of intent. Release stops after 24 names.'],[22,'Counterparty selected.'],[23,'Exclusivity granted. Confirmatory diligence.'],[27,'Documents negotiated. Signing.']],
    buyers:build(40,function(i){
      switch(i){
        case 0: return rec(2,3,5,8,null);       case 3: return rec(2,3,6,12,22);
        case 1: return rec(2,3,null,null,5);    case 4: return rec(2,3,null,null,7);
        case 2: return rec(2,null,null,null,4); case 5: return rec(2,null,null,null,5);
        case 7: return rec(6,7,10,16,22);       case 8: return rec(6,7,9,null,12);     case 9: return rec(6,7,null,null,10);
        case 6: return rec(6,null,null,null,8); case 10: case 11: return rec(6,null,null,null,9);
        case 13: return rec(10,11,13,null,16);  case 14: return rec(10,11,null,null,14);
        case 12: return rec(10,null,null,null,12); case 15: case 16: case 17: return rec(10,null,null,null,13);
        case 19: return rec(14,15,17,20,22);    case 20: return rec(14,15,null,null,17);
        case 18: return rec(14,null,null,null,16); case 21: case 22: case 23: return rec(14,null,null,null,17);
        default: return rec(null,null,null,null,null);
      }
    })};
  function st(b,w){
    if(b.a===null || w<b.a) return 0;
    if(b.o!==null && w>=b.o) return 5;
    if(b.l!==null && w>=b.l) return 4;
    if(b.d!==null && w>=b.d) return 3;
    if(b.c!==null && w>=b.c) return 2;
    return 1;
  }
  function met(t,w){ var m={a:0,c:0,d:0,l:0}; t.buyers.forEach(function(b){
    if(b.a!==null && w>=b.a) m.a++; if(b.c!==null && w>=b.c) m.c++; var s=st(b,w); if(s===3) m.d++; if(s===4) m.l++; }); return m; }
  function ph(t,w){ var p=t.phase[0][1]; t.phase.forEach(function(e){ if(w>=e[0]) p=e[1]; }); return p; }
  var lanes=document.getElementById('lanes'); if(!lanes) return;
  var slider=document.getElementById('slider'), wk=document.getElementById('wk'), phase=document.getElementById('phase'),
      week=0;
  function tile(n,l){ return '<div class="pn stat" style="padding:12px 10px"><div class="n" style="font-size:26px">'+n+'</div><div class="l">'+l+'</div></div>'; }
  function lane(t,w){
    var m=met(t,w);
    return '<div class="lane"><div class="lane-h"><div class="lane-n">'+t.name+'</div><div class="lane-s">'+ph(t,w)+'</div></div>'+
      '<div class="dots">'+t.buyers.map(function(b){ var s=st(b,w); return '<i class="dot'+(s?' s'+s:'')+'"></i>'; }).join('')+'</div>'+
      '<div class="row c4">'+tile(m.a,'Buyers approached')+tile(m.c,'Know who is for sale')+tile(m.d,'In diligence')+tile(m.l,'Letters of intent')+'</div></div>';
  }
  function render(){
    wk.textContent=week; slider.value=week;
    phase.textContent = week===0 ? 'Preparation. Nothing in market.' : 'The same 200 names, two release strategies.';
    lanes.innerHTML=lane(AUCTION,week)+lane(STAG,week);
  }
  var simBtn=document.getElementById('sim-play'), simTimer=null, simVisible=false, simUser=false;
  function simStop(){ if(simTimer){ clearTimeout(simTimer); simTimer=null; } simBtn.textContent='Play'; }
  function simTick(){ simTimer=setTimeout(function(){ week = week>=WEEKS ? 0 : week+1; render(); simTick(); }, week>=WEEKS ? 4500 : 700); }
  function simStart(){ if(simTimer) return; simBtn.textContent='Pause'; simTick(); }
  simBtn.addEventListener('click',function(){ if(simTimer){ simUser=true; simStop(); } else { simUser=false; if(week>=WEEKS){ week=0; render(); } simStart(); } });
  slider.addEventListener('input',function(){ simUser=true; simStop(); week=+slider.value; render(); });
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){ es.forEach(function(e){
      simVisible=e.isIntersecting; if(simVisible && !simUser && !V.reduce) simStart(); else if(!simVisible) simStop();
    });},{threshold:.3}).observe(lanes);
  }
  render();
})();
