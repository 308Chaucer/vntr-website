(function(){
  var V=window.VNTR;

  /* ---------- SLATE workflows ---------- */
  var SL={
    record:{title:'How the record is built', cap:'Company figures come from the company or from public disclosure, and the two are kept separate.',
      steps:[
        {ic:'equity-and-cap-table',tg:'Source',nm:'Company stated',ds:'Founders, principals and finance chiefs enter their own figures.',note:'A principal, or a finance chief the principal authorizes, can override our assumptions with the company\'s own numbers.'},
        {ic:'investors-and-funds',tg:'Source',nm:'Public disclosure',ds:'Filings tied to public pension money and similar vehicles.',note:'Investor and limited partner data is assembled from the disclosure obligations that attach to public funds.'},
        {ic:'market-map',tg:'Record',nm:'One record per firm',ds:'Placed on a single archetype spine with tags.',note:'Each figure keeps its basis: company stated, public disclosure or VNTR estimate.'},
        {ic:'comparable-companies',tg:'Intel',nm:'Intel',ds:'Universe, relationships, comparables and benchmarks.',note:'Intel is the research side: who owns what, who knows whom, and what assets have traded for.'},
        {ic:'data-room',tg:'Execute',nm:'Execute',ds:'Pipeline, data rooms, documents and reporting.',note:'Execute runs a process on the same record, with the client able to see every communication.'}
      ]},
    release:{title:'Benchmark release', cap:'Compensation and transaction aggregates pass four antitrust safe harbor rules before release. The rules are built into the architecture.',
      steps:[
        {ic:'report',tg:'Submit',nm:'Contribution',ds:'A member submits compensation or transaction data.',note:'Contributions are accepted only from validated members.'},
        {ic:'timeline',tg:'Age',nm:'12 month aging',ds:'Inputs are held for 12 months.',note:'No current data is exchanged between competitors.'},
        {ic:'buyer-universe',tg:'Count',nm:'Five contributors',ds:'At least five independent contributors per aggregate.',note:'An aggregate with fewer than five contributors is not released.'},
        {ic:'valuation-range',tg:'Cap',nm:'25 percent cap',ds:'No contributor above 25 percent of an aggregate.',note:'An aggregate dominated by one contributor is not released.'},
        {ic:'fraud-prevention-and-identity',tg:'Anonymize',nm:'Anonymization',ds:'Identity is removed before any figure is shown.',note:'Members see the aggregate and never the contributors behind it.'},
        {ic:'market-update',tg:'Release',nm:'Benchmark',ds:'The aggregate is published to members.',note:'Position level compensation and transaction comparables are released in this form only.'}
      ]},
    member:{title:'Membership', cap:'Access is limited to principal owners and chief executives, validated before entry and re-confirmed each year.',
      steps:[
        {ic:'definitive-agreement',tg:'Verify',nm:'Corporate filings',ds:'Ownership or office is checked against filings.',note:'An applicant\'s role is confirmed from corporate records.'},
        {ic:'fraud-prevention-and-identity',tg:'Verify',nm:'Identity',ds:'The individual is verified.',note:'Identity verification is completed before any data is visible.'},
        {ic:'enterprise-software',tg:'Admit',nm:'Access granted',ds:'Intel and Execute are opened to the member.',note:'Access is individual and is not transferable within a company.'},
        {ic:'timeline',tg:'Renew',nm:'Annual confirmation',ds:'Status is re-confirmed every year.',note:'Membership ends if the member no longer holds a qualifying role.'}
      ]}
  };
  var sf=document.getElementById('sl-flow');
  if(sf){
    var ctl=V.flow(sf, SL.record), st=document.getElementById('sl-title'), sc=document.getElementById('sl-cap');
    sc.textContent=SL.record.cap;
    document.getElementById('sl-tabs').addEventListener('click',function(ev){
      var b=ev.target.closest('button'); if(!b) return;
      [].forEach.call(this.querySelectorAll('button'),function(x){ x.classList.toggle('on',x===b); });
      var d=SL[b.dataset.f]; st.textContent=d.title; sc.textContent=d.cap; ctl.load(d);
    });
  }

  /* ---------- SLATE modules ---------- */
  var M={
    intel:[
      ['market-map','Asset mapping','Every firm in the covered subsectors on one archetype spine, with ownership, acquirer set, financing history and technology posture carried as attributes.'],
      ['investors-and-funds','Investors and limited partners','Investors in each asset and the limited partners behind them, assembled from public disclosure.'],
      ['buyer-universe','Relationship graph','Founders and finance chiefs connected by education, former employers and professional groups, giving a route to an owner through someone the owner knows.'],
      ['precedent-transactions','Transactions with provenance','Multiples carry the basis of every input. Derived figures are labeled derived and estimates are labeled estimates.'],
      ['working-capital','Compensation by position','Position level pay data, aggregated and anonymized under the Guardrails before release.'],
      ['due-diligence','Technology audits','Independent third party evaluations of freight technology products, for use in diligence.']
    ],
    exec:[
      ['timeline','Pipeline and mandates','Targets, stage, owner and next action, ordered by the stack rank the client approved.'],
      ['data-room','Private data rooms','Each process has its own instance, its own permissions and its own access log.'],
      ['nda','Execution documents','Non-disclosure agreements, letters of intent and signature workflow inside the process.'],
      ['apis-and-integration','Supervised communications','Email and message traffic with counterparties captured and retained to the standard a supervising broker-dealer requires.'],
      ['report','Investor reporting','Reporting to the ILPA templates for funds and family offices, produced from the record each quarter.'],
      ['management-meeting','Client transparency','A client sees the full communication record on its own process.']
    ],
    guard:[
      ['buyer-universe','Five contributor minimum','No aggregate is released with fewer than five independent contributors.'],
      ['valuation-range','Concentration cap','No contributor may represent more than 25 percent of a released aggregate.'],
      ['timeline','Data aging','Inputs age 12 months before they enter a benchmark.'],
      ['fraud-prevention-and-identity','Anonymization','Identity is removed before any figure is shown, and the rule cannot be switched off for a member.'],
      ['definitive-agreement','Validated membership','Access is tied to corporate filings and identity verification, re-confirmed annually.'],
      ['equity-and-cap-table','Basis of figures','Company figures are stated by the company or carried as a VNTR estimate, and the two are never merged.']
    ]
  };
  var body=document.getElementById('md-body');
  if(body){
    var draw=function(k){ body.innerHTML=M[k].map(function(m){ return '<div class="pn"><img class="ic" src="assets/icons/'+m[0]+'.svg" alt=""><h3>'+m[1]+'</h3><p>'+m[2]+'</p></div>'; }).join(''); };
    document.getElementById('md-tabs').addEventListener('click',function(ev){
      var b=ev.target.closest('button'); if(!b) return;
      [].forEach.call(this.querySelectorAll('button'),function(x){ x.classList.toggle('on',x===b); }); draw(b.dataset.t);
    });
    draw('intel');
  }

  /* ---------- market notes workflow ---------- */
  var nf=document.getElementById('note-flow');
  if(nf) V.flow(nf,{steps:[
    {ic:'market-update',tg:'Pull',nm:'Public series',ds:'Series pulled from primary sources with IDs and dates.',note:'Each series is recorded with its identifier and the date it was pulled.'},
    {ic:'financial-model',tg:'Calculate',nm:'VNTR calculation',ds:'Averages, ratios and comparisons computed in-house.',note:'Anything we compute is labeled VNTR calculated.'},
    {ic:'report',tg:'Label',nm:'Basis labeled',ds:'Every figure tagged as reported, calculated or estimated.',note:'A reported figure is never upgraded to confirmed.'},
    {ic:'valuation-range',tg:'Chart',nm:'Exhibits',ds:'Charts and tables numbered in order of appearance.',note:'Each exhibit carries a source line with series, calculations and pull date.'},
    {ic:'cim',tg:'Publish',nm:'Cited note',ds:'A PDF with disclosures and a bibliography.',note:'Notes are published by the firm and sent to clients.'}
  ]});

  /* ---------- market map ---------- */
  var DATA=[
    ['Assets','Owns the capacity, including robotics. Valued on utilization, replacement cost and contract quality.',[
      ['Truckload','truckload','Fragmented and cyclical, valued on utilization. Acquirers pay for lane density and driver retention.'],
      ['Less-than-truckload','less-than-truckload','Terminal real estate is the asset. Network density determines pricing power, and door count is harder to replicate than the fleet.'],
      ['Intermodal and rail','rail','Ramp access and chassis control determine margin. Upstream service reliability sets the ceiling on the value of a drayage or intermodal book.'],
      ['Ocean and air','ocean-freight','Rate volatility drives results. Buyers underwrite the customer book and the compliance function and normalize margin across the cycle.'],
      ['Ports and terminals','ports-and-terminals','Fixed nodes that monetize access. Valuation follows throughput commitments and the length of the concession.'],
      ['Cold chain','cold-chain','Capital intensity and energy cost separate the operators. Temperature-controlled space near population is scarce and trades accordingly.'],
      ['Robotics and automation','warehouse-robotics','The means by which technology controls an asset. We separate recurring service revenue from the equipment sale before pricing it, and validate throughput claims in the field.']]],
    ['Processing','Owns the data and the transaction flow, increasingly run by artificial intelligence.',[
      ['Transportation management','transportation-management','Pricing power sits with software that holds the shipper transaction, and much less with software that reports on it.'],
      ['Visibility','visibility-and-tracking','Tracking data is commoditizing. The durable position is held by the party that owns the integrations.'],
      ['Freight audit and payment','freight-audit-and-payment','Payment flow has high switching cost. Working capital mechanics are modeled before a software multiple is applied.'],
      ['Load boards and matching','load-board-and-marketplace','Liquidity concentrates in the largest networks. Subscale marketplaces are usually valued on their data.'],
      ['Managed transportation','control-tower','Contracted scope and the renewal record are the asset. Savings claims are checked against the shipper\'s own data.'],
      ['Data and AI infrastructure','ai-and-data-infrastructure','The cost of building software has fallen, so valuation compresses for any company that is not the system of record for the underlying data.']]],
    ['Agency','Owns the customer: sales organizations, agent books and driver pools.',[
      ['Freight brokerage','freight-brokerage-and-3pl','Gross margin per head and customer concentration determine the outcome. A brokerage that runs its own software is valued as a brokerage.'],
      ['Agent networks','negotiation','Valued as distribution. Agent retention and the commission split carry the valuation.'],
      ['Freight forwarding','freight-forwarding','The customer book and vertical expertise are the asset. Overhead and undifferentiated software reduce what a buyer will pay.'],
      ['Owner operator pools','drivers-and-workforce','Capacity sold on commission. Retention and the settlement terms determine the value of the pool.'],
      ['Customs brokerage','customs-and-trade','Compliance record and client tenure are the asset. Books trade to forwarders and to processing platforms.'],
      ['Vertical specialists','pallets','Automotive, aerospace, healthcare and project cargo books with specialist handling, valued on client tenure.']]]
  ];
  var map=document.getElementById('map'), detail=document.getElementById('detail');
  if(map){
    map.innerHTML=DATA.map(function(c,ci){
      return '<div class="mm-col"><h4>'+c[0]+'</h4><div class="d">'+c[1]+'</div>'+c[2].map(function(n,ni){
        return '<button class="mm-node" data-c="'+ci+'" data-n="'+ni+'"><img src="assets/icons/'+n[1]+'.svg" alt="">'+n[0]+'</button>'; }).join('')+'</div>';
    }).join('');
    var show=function(ci,ni){
      var c=DATA[ci], n=c[2][ni];
      [].forEach.call(map.querySelectorAll('.mm-node'),function(b){ b.classList.toggle('on', +b.dataset.c===ci && +b.dataset.n===ni); });
      function t(l){ return '<div class="pn stat" style="padding:14px 10px"><div class="lockv">000</div><div class="l">'+l+'</div></div>'; }
      detail.innerHTML='<div class="ex-body"><div class="two" style="align-items:center">'+
        '<div style="display:flex;gap:18px;align-items:flex-start"><img src="assets/icons/'+n[1]+'.svg" alt="" style="width:64px;flex:none">'+
        '<div><p class="label" style="margin-bottom:8px">'+c[0]+'</p><h3>'+n[0]+'</h3><p style="margin:0">'+n[2]+'</p></div></div>'+
        '<div><div class="row c4">'+t('Firms tracked')+t('Active acquirers')+t('Transactions')+t('Observed range')+'</div>'+
        '<div class="btns" style="margin-top:14px"><a class="btn" href="https://slate.vntr.co">Open in SLATE</a><a class="btn q" href="contact.html">Request this record</a></div></div>'+
        '</div></div>';
    };
    map.addEventListener('click',function(ev){ var b=ev.target.closest('.mm-node'); if(b) show(+b.dataset.c,+b.dataset.n); });
    show(1,5);
  }
})();
