(function(){
  var V=window.VNTR;
  var bk=document.getElementById('book'); if(bk) bk.href=V.BOOK;

  /* ---------- mandate workflows ---------- */
  var MD={
    buy:{title:'Exclusive buy-side', cap:'One acquirer in a defined lane.',
      steps:[
        {ic:'market-sizing',tg:'Scope',nm:'Thesis and lane',ds:'Define the acquisition thesis and the exclusive lane.',note:'The lane is written into the engagement: subsector, buyer type, revenue band and sourcing channel.'},
        {ic:'market-map',tg:'Map',nm:'Target universe',ds:'Map every firm in the lane on the archetype taxonomy.',note:'Each target carries ownership, financing history, technology posture and our estimated revenue band. We walk you through every qualified target profile, and you set the ranking.'},
        {ic:'buyside',tg:'Originate',nm:'Proprietary outreach',ds:'Approach owners directly, principal to principal.',note:'Owners are reached through the relationship graph, ahead of any banker-led process.'},
        {ic:'due-diligence',tg:'Underwrite',nm:'Diligence and valuation',ds:'Read the data, test the thesis with operators, set the price.',note:'Every figure in the valuation is labeled by its basis before it reaches the acquirer.'},
        {ic:'closing',tg:'Close',nm:'Negotiation and close',ds:'Letter of intent, documents and signing.',note:'We stay on the mandate through signing and the handoff to integration.'}
      ]},
    corp:{title:'Corporate development', cap:'An outsourced corporate development function.',
      steps:[
        {ic:'buyer-universe',tg:'Build',nm:'Pipeline',ds:'A standing pipeline of targets in the acquirer\'s lanes.',note:'The pipeline is maintained continuously and reviewed with management on a fixed cadence.'},
        {ic:'comparable-companies',tg:'Screen',nm:'Screening',ds:'Rank targets on fit, probability and price.',note:'Targets that fail on culture, concentration or seller expectations are removed early.'},
        {ic:'valuation-range',tg:'Price',nm:'Valuation discipline',ds:'A valuation range set before any conversation on price.',note:'The range is built on transactions the comparable buyers have completed.'},
        {ic:'board-and-governance',tg:'Approve',nm:'Board material',ds:'Investment memoranda and board papers.',note:'Material is prepared to the standard a sponsor or lender would expect to see.'},
        {ic:'merger',tg:'Integrate',nm:'Integration sequencing',ds:'Order of integration steps after signing.',note:'Sequencing covers systems, customers and people, in the order that protects revenue.'}
      ]},
    cap:{title:'Capital markets', cap:'Post Series A raises, exclusive by subsector.',
      steps:[
        {ic:'financial-model',tg:'Prepare',nm:'Materials and model',ds:'Operating model, use of proceeds and investor materials.',note:'We raise for companies that have closed a Series A or later round.'},
        {ic:'investors-and-funds',tg:'Anchor',nm:'Anchor investors',ds:'Sovereign funds and family offices are approached first.',note:'An anchor commitment sets terms before the round is shown more widely.'},
        {ic:'capital-raise',tg:'Place',nm:'Venture placement',ds:'The round is taken to venture investors with an anchor in place.',note:'An anchored round draws venture investors toward terms that are already set.'},
        {ic:'term-sheet-and-loi',tg:'Terms',nm:'Term sheet',ds:'Negotiate economics, control and protective provisions.',note:'We review the provisions that affect founders most at exit, as set out in Funds Flow.'},
        {ic:'closing',tg:'Close',nm:'Close and funds flow',ds:'Documents, signatures and the closing statement.',note:'The closing statement is reviewed line by line before funds move.'}
      ]},
    sell:{title:'Sell-side', cap:'Reserved for companies we have already served.',
      steps:[
        {ic:'management-meeting',tg:'Curate',nm:'Curate with the client',ds:'Cut the names other banks would send to down to the serious buyers.',note:'The list is curated with the client before the process starts. No buyer is contacted until the client has approved it.'},
        {ic:'positioning-map',tg:'Rank',nm:'Stack rank',ds:'Rank the curated list by probability of close.',note:'Each buyer carries a cultural read and its record in diligence.'},
        {ic:'teaser',tg:'Release',nm:'Release in waves',ds:'Highest probability buyers first, six names at a time.',note:'A later wave is released only if the previous one did not produce a letter of intent.'},
        {ic:'term-sheet-and-loi',tg:'Stop',nm:'Three or four letters',ds:'Release stops once three or four letters are in hand.',note:'The process runs longer than a broad auction and produces as many letters or more, from buyers more likely to close.'},
        {ic:'definitive-agreement',tg:'Close',nm:'Select and sign',ds:'Exclusivity, confirmatory diligence and signing.',note:'Engagement and document terms follow the positions set out in Funds Flow.'}
      ]}
  };
  var mdEl=document.getElementById('md-flow');
  if(mdEl){
    var mdFlow=V.flow(mdEl, MD.buy), tt=document.getElementById('md-title'), tc=document.getElementById('md-cap');
    tc.textContent=MD.buy.cap;
    document.getElementById('md-tabs').addEventListener('click',function(ev){
      var b=ev.target.closest('button'); if(!b) return;
      [].forEach.call(this.querySelectorAll('button'),function(x){ x.classList.toggle('on',x===b); });
      var d=MD[b.dataset.m]; tt.textContent=d.title; tc.textContent=d.cap; mdFlow.load(d);
    });
  }

  /* ---------- diligence workflow ---------- */
  var dd=document.getElementById('dd-flow');
  if(dd) V.flow(dd,{steps:[
    {ic:'data-room',tg:'Ingest',nm:'Source files',ds:'Load data, contracts, rate files and operating reports.',note:'Files are taken from the data room in their original form.'},
    {ic:'ai-and-data-infrastructure',tg:'Read',nm:'Machine reading',ds:'Models read the full file set and extract the figures.',note:'Coverage is the full population of records, in place of a sample.'},
    {ic:'due-diligence',tg:'Check',nm:'Banker review',ds:'The banker who owns the mandate checks each finding.',note:'Exceptions and outliers are traced back to the source record.'},
    {ic:'report',tg:'Label',nm:'Basis labeled',ds:'Each figure is tagged with where it came from.',note:'Filing, press, interview, management, VNTR research or VNTR estimate.'},
    {ic:'pitch-book',tg:'Deliver',nm:'Client page',ds:'The figure reaches the client with its label attached.',note:'A derived figure is shown as derived and is never attributed to the company.'}
  ]});

  /* ---------- concept validation workflow ---------- */
  var vf=document.getElementById('val-flow');
  if(vf) V.flow(vf,{steps:[
    {ic:'market-sizing',tg:'Define',nm:'Client concept',ds:'The thesis, product or facility design to be tested.',note:'The concept is written down with the assumptions it depends on.'},
    {ic:'management-meeting',tg:'Review',nm:'Operating executives',ds:'Fortune 1000 supply chain executives review it.',note:'Executives respond on how they would buy, deploy and pay for it.'},
    {ic:'warehouse-robotics',tg:'Test',nm:'Test units',ds:'Discounted test units from our robotics and equipment network.',note:'Throughput and payback are observed on the floor before they are modeled.'},
    {ic:'financial-model',tg:'Underwrite',nm:'Underwritten thesis',ds:'The model is rebuilt on what was observed.',note:'Assumptions that did not hold are replaced with measured results.'}
  ]});

  /* ---------- three-way sort ---------- */
  /* each operating model, and the pieces it separates into: [label, side, icon] */
  var MODELS=[
    ['Truckload carrier','truckload',[['Fleet and equipment','a','truckload'],['Owner operator pool','g','drivers-and-workforce']]],
    ['LTL carrier','less-than-truckload',[['Terminals and fleet','a','less-than-truckload'],['Rating and billing','p','report']]],
    ['Intermodal and drayage','rail',[['Chassis and containers','a','containers-and-leasing'],['Drayage owner operators','g','ocean-freight']]],
    ['Warehouse operator','as-rs-and-automation',[['Buildings and equipment','a','as-rs-and-automation'],['Warehouse management','p','enterprise-software']]],
    ['Freight brokerage','freight-brokerage-and-3pl',[['Operations and carrier pay','p','freight-audit-and-payment'],['Sales agents','g','negotiation']]],
    ['Freight forwarder','freight-forwarding',[['Customs and documentation','p','customs-and-trade'],['Customer book','g','management-meeting']]],
    ['Managed transportation','control-tower',[['Planning and execution','p','control-tower']]],
    ['Load board','load-board-and-marketplace',[['Matching and marketplace','p','load-board-and-marketplace']]],
    ['Freight payment and factoring','working-capital',[['Payment and factoring','p','working-capital']]],
    ['Telematics vendor','telematics-and-eld',[['Devices','a','telematics-and-eld'],['Data and compliance','p','visibility-and-tracking']]],
    ['TMS vendor','transportation-management',[['Transaction record','p','transportation-management']]],
    ['Robotics and automation','warehouse-robotics',[['Robotics','a','warehouse-robotics']]]
  ];
  var SIDE={a:'Assets',p:'Processing',g:'Agency'};
  var COLS=[['a','Assets','Owns the capacity: equipment, facilities, vehicles and robotics.',.27],
            ['p','Processing','Owns the data and the transaction: operations, carrier pay, matching and the system of record.',.46],
            ['g','Agency','Owns the customer or the driver: sales agents, customer books and owner operator pools.',.27]];
  var TITLES=['Today','Consolidation','The sort','Valuation'];
  var CAPS=[
    'Twelve operating models, each run today as one integrated company.',
    'Each model is separating into the pieces it is made of.',
    'The pieces regroup by what they own: the capacity, the transaction, or the customer.',
    'Three businesses remain, each valued on its own multiple of EBITDA.'
  ];
  function deal(t,d){ return '<div class="deal"><b>'+t+'</b>'+d+'</div>'; }
  function tile(n,l,d){ return '<div class="stat" style="padding:2px 10px"><div class="n" style="font-size:32px">'+n+'</div><div class="l">'+l+'</div><div class="d">'+d+'</div></div>'; }
  var FOOT=[
    '<p style="margin:0;font-size:14px">Each integrated company is valued as a single business.</p>',
    '<div class="row c3">'+
      '<div><h4>Assets</h4>'+deal('DSV acquires DB Schenker','EUR 14.3bn enterprise value, completed April 2025.')+deal('Platform Science takes Trimble telematics','Completed February 2025.')+'</div>'+
      '<div><h4>Processing</h4>'+deal('Roper and DAT acquire the Convoy platform','About $250m, closed July 2025.')+deal('WiseTech acquires E2open','$2.1bn enterprise value, completed August 2025.')+'</div>'+
      '<div><h4>Agency</h4>'+deal('AD Ports and Noatum acquire MBS Logistics','EUR 70m enterprise value, signed May 2026.')+'</div>'+
    '</div>',
    '<p style="margin:0;font-size:14px">Technology controls assets through robotics and processing through artificial intelligence.</p>',
    '<p style="margin:0;font-size:14px">Once separated, processing carries the highest multiple and agency the lowest.</p>'
  ];
  var stage=document.getElementById('sx-stage');
  if(!stage) return;
  var foot=document.getElementById('sx-foot'), cap=document.getElementById('sx-cap'), ttl=document.getElementById('sx-title'),
      seg=document.getElementById('sx-steps');
  var bands=COLS.map(function(c){
    var b=document.createElement('div'); b.className='sx-band'; stage.appendChild(b);
    var h=document.createElement('div'); h.className='sx-colh'; h.innerHTML='<b>'+c[1]+'</b><i>'+c[2]+'</i>'; stage.appendChild(h);
    return {band:b, head:h};
  });
  var SIDES=[['a','truckload','6x to 8x','Technology controls assets through robotics.'],['p','transportation-management','13.6x','Technology controls processing through artificial intelligence.'],['g','management-meeting','2x to 3x','']];
  var sides=SIDES.map(function(s,i){
    var d=document.createElement('div'); d.className='sx-side';
    d.innerHTML='<img src="assets/icons/'+s[1]+'.svg" alt=""><b>'+COLS[i][1]+'</b><p>'+COLS[i][2]+(s[3]?' '+s[3]:'')+'</p><div class="n">'+s[2]+'</div><div class="u">Enterprise value to EBITDA</div>';
    stage.appendChild(d); return d;
  });
  var parents=[], kids=[];
  MODELS.forEach(function(m,mi){
    var d=document.createElement('div'); d.className='sx-node sx-par';
    d.innerHTML='<img src="assets/icons/'+m[1]+'.svg" alt=""><span>'+m[0]+'</span>'; stage.appendChild(d); parents.push(d);
    m[2].forEach(function(k,ki){
      var e=document.createElement('div'); e.className='sx-node sx-kid';
      e.innerHTML='<img src="assets/icons/'+k[2]+'.svg" alt=""><span>'+k[0]+'</span><em>'+SIDE[k[1]]+'</em>'; stage.appendChild(e);
      kids.push({el:e, m:mi, i:ki, n:m[2].length, side:k[1]});
    });
  });
  var step=0, live=true;   /* stage keeps one height so the page never jumps between steps */
  function put(el,x,y){ el.style.transform='translate('+Math.round(x)+'px,'+Math.round(y)+'px)'; }
  var maxH=0, lastW=0;
  function layout(){
    var W=stage.clientWidth, narrow=W<700, gap=14, headH=narrow?78:80, rowH=narrow?96:82;
    /* sorted geometry */
    var geo={}, yoff=0, x0=0, sortedH=0;
    COLS.forEach(function(c,ci){
      var wSort=narrow?W:Math.round((W-2*gap)*c[3]), n=kids.filter(function(k){return k.side===c[0];}).length;
      var per=Math.max(2,Math.floor((wSort-16)/(narrow?90:104))), rows=Math.ceil(n/per);
      var w=(step===3 && !narrow)?Math.round((W-2*gap)/3):wSort;
      geo[c[0]]={x:narrow?0:x0, y:narrow?yoff:0, w:w, per:per, rows:rows, h:(step===3&&narrow)?270:headH+rows*rowH+8, i:0};
      if(narrow) yoff+=geo[c[0]].h+gap; else x0+=w+gap;
      sortedH=Math.max(sortedH, geo[c[0]].h);
    });
    if(narrow) sortedH=yoff-gap; else COLS.forEach(function(c){ geo[c[0]].h=sortedH; });
    /* today geometry: a grid of cells */
    var cols=narrow?2:4, rws=Math.ceil(MODELS.length/cols), cw=W/cols, ch=narrow?112:Math.max(98,sortedH/rws), todayH=rws*ch;
    var H = live ? Math.max(todayH,sortedH) : (step<2 ? todayH : sortedH);      /* constant height while scroll drives it */
    if(live){ ch=H/rws; }
    parents.forEach(function(p,mi){
      var cx=(mi%cols)*cw+cw/2, cy=Math.floor(mi/cols)*ch+ch/2-38;
      put(p,cx,cy); p.classList.toggle('off', step>0); p.setAttribute('aria-hidden', step>0?'true':'false');
    });
    kids.forEach(function(k){
      var cx=(k.m%cols)*cw+cw/2, cy=Math.floor(k.m/cols)*ch+ch/2-42;
      if(step<2){
        var spread=narrow?cw/4:Math.min(58,cw/4-4), dx = k.n===1 ? 0 : (k.i===0?-spread:spread);
        put(k.el, cx+(step===1?dx:0), cy);
      } else if(step===2){
        var g=geo[k.side], j=g.i++, cellw=(g.w-16)/g.per;
        put(k.el, g.x+8+(j%g.per)*cellw+cellw/2, g.y+headH+Math.floor(j/g.per)*rowH);
      } else {
        var g3=geo[k.side]; put(k.el, g3.x+g3.w/2, g3.y+26);
      }
      k.el.classList.toggle('on', step>0 && step<3); k.el.setAttribute('aria-hidden', (step>0 && step<3)?'false':'true');
      k.el.classList.toggle('tagged', step===1);
    });
    COLS.forEach(function(c,ci){
      var g=geo[c[0]], b=bands[ci], on=step>=2;
      b.band.style.left=g.x+'px'; b.band.style.top=g.y+'px'; b.band.style.width=g.w+'px'; b.band.style.height=g.h+'px'; b.band.style.bottom='auto';
      b.head.style.left=g.x+'px'; b.head.style.top=g.y+'px'; b.head.style.width=g.w+'px';
      b.band.classList.toggle('on',on); b.head.classList.toggle('on',step===2);
      var sd=sides[ci]; sd.style.left=g.x+'px'; sd.style.width=g.w+'px'; sd.style.top=(g.y+Math.max(0,(g.h-sd.offsetHeight)/2))+'px'; sd.classList.toggle('on',step===3); sd.setAttribute('aria-hidden', step===3?'false':'true'); b.head.setAttribute('aria-hidden', step===2?'false':'true');
    });
    if(W!==lastW){ lastW=W; maxH=0; } maxH=Math.max(maxH,H); stage.style.height=maxH+'px';
  }
  var token=document.getElementById('sx-token');
  function tok(frac){ token.style.left=(Math.max(.03,Math.min(.97,frac))*100)+'%'; }
  function render(){
    ttl.textContent=TITLES[step]; cap.textContent=CAPS[step];
    [].forEach.call(seg.querySelectorAll('button'),function(b){ b.classList.toggle('on', +b.dataset.s===step); });
    foot.innerHTML=FOOT[step]; layout();
    tok((step+.5)/4); stage.classList.toggle('pop', step===3);
  }
  function setStep(s){ if(s===step) return; step=s; render(); }
  function footLock(){ foot.style.minHeight=''; if(!live) return; var mx=0; for(var s=0;s<4;s++){ foot.innerHTML=FOOT[s]; mx=Math.max(mx,foot.offsetHeight); } foot.style.minHeight=mx+'px'; foot.innerHTML=FOOT[step]; }
  footLock(); render();
  /* plays on its own; the sailboat track, the labels and the button all control it */
  var sxBtn=document.getElementById('sx-play'), sxTimer=null, sxVisible=false, sxUser=false, HOLD=[3200,3600,4200,6000];
  function sxStop(){ if(sxTimer){ clearTimeout(sxTimer); sxTimer=null; } sxBtn.textContent='Play'; }
  function sxTick(){ sxTimer=setTimeout(function(){ step=(step+1)%4; render(); sxTick(); }, HOLD[step]); }
  function sxStart(){ if(sxTimer) return; sxBtn.textContent='Pause'; sxTick(); }
  function sxGo(n){ sxUser=true; sxStop(); if(n!==step){ step=n; render(); } }
  sxBtn.addEventListener('click',function(){ if(sxTimer){ sxUser=true; sxStop(); } else { sxUser=false; sxStart(); } });
  seg.addEventListener('click',function(ev){ var b=ev.target.closest('button'); if(b) sxGo(+b.dataset.s); });
  V.scrub(document.getElementById('sx-track'),function(fr){ sxGo(Math.min(3,Math.floor(fr*4))); });
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){ es.forEach(function(e){
      sxVisible=e.isIntersecting; if(sxVisible && !sxUser && !V.reduce) sxStart(); else if(!sxVisible) sxStop();
    });},{threshold:.3}).observe(stage);
  }
  window.addEventListener('resize',function(){ footLock(); layout(); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ footLock(); layout(); });

  /* ---------- depth ---------- */
  var hero=document.getElementById('hero'), hc=document.getElementById('hero-copy'), hs=document.getElementById('hero-ship');
  if(hero && window.matchMedia('(min-width:901px)').matches){
    V.depth(hero,function(p,y){
      var k=Math.min(1,y/600);
      hc.style.transform='translate3d(0,'+(-y*0.10)+'px,0)'; hc.style.opacity=String(1-k*0.75);
      hs.style.transform='translateY(-50%) translate3d(0,'+(y*0.16)+'px,0) scale('+(1+k*0.10)+')';
    });
  }
})();
