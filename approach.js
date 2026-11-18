(function(){
  var V=window.VNTR;
  var bk=document.getElementById('book'); if(bk) bk.href=V.BOOK;

  /* ---------- Exhibit 1: process workflows ---------- */
  var PF={
    stag:{title:'Staggered process', cap:'Release and count repeat until three or four letters of intent are in hand.',
      steps:[
        {ic:'positioning-map',tg:'Rank',nm:'Stack rank',ds:'Rank buyers by probability of close.'},
        {ic:'management-meeting',tg:'Approve',nm:'Seller approval',ds:'The seller sets the final list.'},
        {ic:'teaser',tg:'Release',nm:'Release a wave',ds:'Six names, top of the list first.'},
        {ic:'term-sheet-and-loi',tg:'Count',nm:'Count letters',ds:'Letters of intent in hand.'},
        {ic:'bids-and-offers',tg:'Stop',nm:'Stop release',ds:'Three or four letters reached.'},
        {ic:'due-diligence',tg:'Select',nm:'Select a buyer',ds:'Exclusivity and confirmatory diligence.'},
        {ic:'definitive-agreement',tg:'Sign',nm:'Sign',ds:'Purchase agreement executed.'}
      ],
      path:[
        {s:0,note:'Each qualified buyer is ranked on probability of close, with a read on how it behaves in diligence. Buyers with a record of re-trading or of long diligence that fails move down the list or come off it.'},
        {s:1,note:'We present an overview of each buyer and our view of what it will pay, based on transactions it has completed. The seller approves, reorders or strikes names.'},
        {s:2,note:'Wave 1. The six highest probability buyers are approached. The memorandum goes only to those that clear a first conversation.'},
        {s:3,note:'One letter of intent in hand after wave 1. Release continues.'},
        {s:2,note:'Wave 2. The next six names are approached.'},
        {s:3,note:'Two letters of intent in hand. Release continues.'},
        {s:2,note:'Wave 3. Six more names are approached.'},
        {s:3,note:'Three letters of intent in hand.'},
        {s:4,note:'Release stops at 18 of 40 names. The remaining names are not contacted.'},
        {s:5,note:'One counterparty is selected and granted exclusivity for confirmatory diligence.'},
        {s:6,note:'Documents are negotiated on the terms in the letter of intent and the purchase agreement is signed.'}
      ], interval:2500},
    auction:{title:'Broad auction', cap:'The conventional two-round process, run on a fixed calendar across the whole field.',
      steps:[
        {ic:'teaser',tg:'Release',nm:'Teaser to all',ds:'All 40 buyers contacted at once.',note:'Every name on the list learns the company is for sale in the same week.'},
        {ic:'nda',tg:'Sign',nm:'Non-disclosure',ds:'Agreements signed across the field.',note:'In the model, 28 of 40 parties sign and 12 decline.'},
        {ic:'cim',tg:'Distribute',nm:'Memorandum',ds:'Sent to every party that signed.',note:'28 parties now hold the confidential memorandum, including competitors.'},
        {ic:'bids-and-offers',tg:'Round 1',nm:'Indications',ds:'First round bids on a fixed date.',note:'The field is cut on indications of interest. Parties that drop keep the memorandum.'},
        {ic:'management-meeting',tg:'Meet',nm:'Management meetings',ds:'Presentations to the remaining field.',note:'In the model, seven buyers meet management.'},
        {ic:'term-sheet-and-loi',tg:'Round 2',nm:'Bid date',ds:'Letters of intent on a fixed date.',note:'Four letters of intent are received on the bid date.'},
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
  var N=40, WEEKS=24;
  function rec(a,c,d,l,o){ return {a:a,c:c,d:d,l:l,o:o}; }
  function build(f){ var r=[]; for(var i=0;i<N;i++) r.push(f(i)); return r; }
  var AUCTION={name:'Broad auction',
    phase:[[0,'Preparation. Nothing in market.'],[2,'All 40 buyers contacted in a single release.'],[4,'Non-disclosure agreements signed. 28 parties receive the memorandum.'],
      [8,'Indications of interest requested from the full field.'],[11,'Field cut. Management meetings under way.'],[14,'Bid date. Four letters of intent received.'],
      [17,'Exclusivity granted. Confirmatory diligence.'],[21,'Documents negotiated. Signing.']],
    buyers:build(function(i){
      if(i>=28) return rec(2,null,null,null,4);
      if(i>=16) return rec(2,4,null,null,8);
      if(i>=7)  return rec(2,4,null,null,11);
      if(i>=4)  return rec(2,4,11,null,14);
      if(i>=1)  return rec(2,4,11,14,17);
      return rec(2,4,11,14,null);
    })};
  var STAG={name:'Staggered process',
    phase:[[0,'Preparation. Buyers stack ranked and the list approved by the seller.'],[2,'Wave 1 released to the six highest probability buyers.'],
      [5,'Wave 2 released to the next six names.'],[7,'First letter of intent in hand.'],[8,'Wave 3 released to six more names.'],
      [11,'Three letters of intent. Release stops at 18 of 40 names.'],[13,'Counterparty selected.'],[15,'Exclusivity granted. Confirmatory diligence.'],[19,'Documents negotiated. Signing.']],
    buyers:build(function(i){
      switch(i){
        case 0: return rec(2,3,5,7,null);  case 3: return rec(2,3,5,9,13);  case 7: return rec(5,6,8,11,13);
        case 1: return rec(2,3,null,null,4); case 4: return rec(2,3,null,null,6); case 2: return rec(2,null,null,null,4);
        case 5: return rec(2,null,null,null,5); case 8: return rec(5,6,8,null,11); case 9: return rec(5,6,null,null,9);
        case 6: return rec(5,null,null,null,7); case 10: return rec(5,null,null,null,8); case 11: return rec(5,null,null,null,8);
        case 13: return rec(8,9,10,null,12); case 14: return rec(8,9,null,null,12); case 12: return rec(8,null,null,null,10);
        case 15: case 16: case 17: return rec(8,null,null,null,11);
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
      play=document.getElementById('play'), reset=document.getElementById('reset'), week=0, timer=null, pinned=false;
  function tile(n,l){ return '<div class="pn stat" style="padding:12px 10px"><div class="n" style="font-size:26px">'+n+'</div><div class="l">'+l+'</div></div>'; }
  function lane(t,w){
    var m=met(t,w);
    return '<div class="lane"><div class="lane-h"><div class="lane-n">'+t.name+'</div><div class="lane-s">'+ph(t,w)+'</div></div>'+
      '<div class="dots">'+t.buyers.map(function(b){ var s=st(b,w); return '<i class="dot'+(s?' s'+s:'')+'"></i>'; }).join('')+'</div>'+
      '<div class="row c4">'+tile(m.a,'Buyers approached')+tile(m.c,'Received the memorandum')+tile(m.d,'In diligence')+tile(m.l,'Letters of intent')+'</div></div>';
  }
  function render(){
    wk.textContent=week; slider.value=week;
    phase.textContent = week===0 ? 'Preparation. Nothing in market.' : 'Both tracks shown against the same 40 name list.';
    lanes.innerHTML=lane(AUCTION,week)+lane(STAG,week);
  }
  function stop(){ if(timer){ clearInterval(timer); timer=null; play.textContent='Play'; } }
  play.addEventListener('click',function(){
    if(timer){ stop(); return; } if(week>=WEEKS) week=0; play.textContent='Pause';
    timer=setInterval(function(){ week++; render(); if(week>=WEEKS) stop(); },420);
  });
  reset.addEventListener('click',function(){ stop(); week=0; render(); });
  var pin=V.pin(document.getElementById('sim-pin'),{len:2.2,
    on:function(p){ var w=Math.round(p*WEEKS); if(w!==week){ week=w; render(); } },
    mode:function(on){ pinned=on; if(on) stop(); }});
  slider.addEventListener('input',function(){ stop(); if(pinned) pin.scrollTo(+slider.value/WEEKS); else { week=+slider.value; render(); } });
  render(); pin.set();
})();
