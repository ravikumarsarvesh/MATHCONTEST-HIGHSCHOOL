var FCARDS=[
{q:'Sum of triangle angles?',a:'180°',h:'Fundamental.',t:'geometry',c:'pascal'},
{q:'Circle area?',a:'πr²',h:'r=radius.',t:'geometry',c:'pascal'},
{q:'Pythagorean theorem?',a:'a²+b²=c²',h:'c=hypotenuse.',t:'geometry',c:'pascal'},
{q:'BEDMAS?',a:'Brackets,Exponents,Division,Multiplication,Addition,Subtraction',h:'Order of ops.',t:'algebra',c:'pascal'},
{q:'Rectangle perimeter?',a:'2(l+w)',h:'l=length,w=width.',t:'geometry',c:'pascal'},
{q:'Primes < 20?',a:'2,3,5,7,11,13,17,19',h:'8 total. 1 is NOT prime.',t:'number',c:'pascal'},
{q:'Slope-intercept form?',a:'y=mx+b',h:'m=slope,b=y-int.',t:'algebra',c:'pascal'},
{q:'Integers a to b inclusive?',a:'b-a+1',h:'Don\'t forget +1!',t:'number',c:'pascal'},
{q:'Complement rule?',a:'P(A\')=1-P(A)',h:'Often easier.',t:'probability',c:'pascal'},
{q:'nth term arithmetic seq?',a:'a₁+(n-1)d',h:'d=common diff.',t:'algebra',c:'pascal'},
{q:'Quadratic formula?',a:'(-b±√(b²-4ac))/2a',h:'ax²+bx+c=0.',t:'algebra',c:'cayley'},
{q:'C(n,r)?',a:'n!/(r!(n-r)!)',h:'Order doesn\'t matter.',t:'combinatorics',c:'cayley'},
{q:'Sum 1+2+...+n?',a:'n(n+1)/2',h:'Gauss.',t:'algebra',c:'cayley'},
{q:'Distance formula?',a:'√((x₂-x₁)²+(y₂-y₁)²)',h:'From Pythagoras.',t:'geometry',c:'cayley'},
{q:'Divisor count?',a:'(e₁+1)(e₂+1)...',h:'From prime factorization.',t:'number',c:'cayley'},
{q:'Geometric series sum?',a:'a(rⁿ-1)/(r-1)',h:'r≠1.',t:'algebra',c:'cayley'},
{q:'Trapezoid area?',a:'½(b₁+b₂)h',h:'Avg bases × height.',t:'geometry',c:'cayley'},
{q:'Pigeonhole?',a:'n items, m boxes, n>m → one has ≥2',h:'Existence proof.',t:'combinatorics',c:'cayley'},
{q:'Exterior angle regular n-gon?',a:'360°/n',h:'All equal.',t:'geometry',c:'cayley'},
{q:'Diagonals of n-gon?',a:'n(n-3)/2',h:'Each vertex to non-adjacent.',t:'geometry',c:'cayley'},
{q:'Cone volume?',a:'⅓πr²h',h:'⅓ of cylinder.',t:'geometry',c:'fermat'},
{q:'(a+b)²?',a:'a²+2ab+b²',h:'Binomial.',t:'algebra',c:'fermat'},
{q:'a≡b(mod n)?',a:'Same remainder ÷n',h:'Modular arithmetic.',t:'number',c:'fermat'},
{q:'Trailing zeros n!?',a:'⌊n/5⌋+⌊n/25⌋+...',h:'Count 5s.',t:'number',c:'fermat'},
{q:'Inclusion-Exclusion?',a:'|A∪B|=|A|+|B|-|A∩B|',h:'Avoid double-count.',t:'combinatorics',c:'fermat'},
{q:'AM≥GM?',a:'(a+b)/2≥√(ab)',h:'Equality when a=b.',t:'algebra',c:'fermat'},
{q:'Sphere volume?',a:'(4/3)πr³',h:'SA=4πr².',t:'geometry',c:'fermat'},
{q:'Inscribed circle (right △)?',a:'r=(a+b-c)/2',h:'c=hypotenuse.',t:'geometry',c:'fermat'},
{q:'Circular permutations?',a:'(n-1)!',h:'Fix one, arrange rest.',t:'combinatorics',c:'fermat'},
{q:'Grid paths right/up?',a:'C(m+n,n)',h:'m rights, n ups.',t:'combinatorics',c:'fermat'},
{q:'Units digit cycles?',a:'Period divides 4',h:'7:7,9,3,1...',t:'number',c:'cayley'}
];

var SOLUTIONS={pascal:[
{title:'Order of Operations',d:'easy',q:'(2×0)+(2×5)',steps:['Multiply: 0, 10','Add: 10'],tip:'BEDMAS always.',ref:'Pascal 2025 Q1'},
{title:'Pythagorean Theorem',d:'medium',q:'AB=8,AC=17. BC²?',steps:['BC²=17²-8²','=225'],tip:'Hypotenuse is longest.',ref:'Pascal 2025 Q13'},
{title:'Maximize with Constraints',d:'medium',q:'10 ints sum 30. Largest?',steps:['Min 9 at 1','30-9=21'],tip:'Minimize rest to maximize one.',ref:'Pascal 2025 Q12'},
{title:'Factorial Recognition',d:'medium',q:'n!=3!×5!×7!',steps:['6×120×5040','=3628800=10!'],tip:'Know factorials to 10!',ref:'Pascal 2025 Q17'},
{title:'Counting Digits',d:'hard',q:'4-digit all even?',steps:['{2,4,6,8}=4 first','5³=125 rest','500'],tip:'Watch leading digit!',ref:'Cayley 2024 Q17'},
{title:'Inclusion-Exclusion',d:'hard',q:'1-100: div 3 or 5?',steps:['33+20-6=47'],tip:'|A∪B|=|A|+|B|-|A∩B|.',ref:'Pascal 2024 Q20'},
{title:'Algebraic Identity',d:'hard',q:'a+b=7,ab=10. a²+b²?',steps:['(a+b)²=49','a²+b²=49-20=29'],tip:'Key identity.',ref:'Fermat 2024 Q8'},
{title:'Quiz Logic',d:'hard',q:'3 students, 2 right each',steps:['Q3=24 (all agree)','Deduce Q1=15, Q2=38','Sum=77'],tip:'Use constraints systematically.',ref:'Pascal 2025 Q15'}
],cayley:[
{title:'Expression Eval',d:'easy',q:'2×0+2×4',steps:['0+8=8'],tip:'BEDMAS.',ref:'Cayley 2024 Q1'},
{title:'Telescoping',d:'medium',q:'√(product)=1/8',steps:['Product=1/n','n=64'],tip:'Look for cancellation.',ref:'Cayley 2024 Q16'},
{title:'Line Translation',d:'medium',q:'y=3x+5 right 2',steps:['x→(x-2)','y=3x-1'],tip:'Right: x→(x-h).',ref:'Cayley 2024 Q18'},
{title:'Speed-Time',d:'hard',q:'4/5 time. x% increase?',steps:['Factor=5/4','25%'],tip:'Speed∝1/time.',ref:'Cayley 2024 Q20'},
{title:'Perfect Squares',d:'easy',q:'Which is perfect square?',steps:['4⁷=2¹⁴','Even exponent ✓'],tip:'Prime base, even exp.',ref:'Cayley 2024 Q8'},
{title:'Inscribed Circle',d:'hard',q:'Right △ 6,8. r?',steps:['c=10','r=(6+8-10)/2=2'],tip:'r=(a+b-c)/2.',ref:'Cayley 2023 Q21'},
{title:'Units Digit',d:'hard',q:'7²⁰²⁴ units?',steps:['Cycle: 7,9,3,1','2024mod4=0→1'],tip:'Period divides 4.',ref:'Cayley 2024 Q23'},
{title:'Composite Functions',d:'hard',q:'f(g(3))?',steps:['g(3)=9','f(9)=19'],tip:'Inside-out.',ref:'Cayley 2022 Q16'}
],fermat:[
{title:'Function Eval',d:'easy',q:'f(2)=3(4)-2(2)+1',steps:['12-4+1=9'],tip:'Powers first.',ref:'Fermat 2024 Q3'},
{title:'Logarithms',d:'medium',q:'log₂(x)=5',steps:['2⁵=32'],tip:'log_b(x)=n⟺bⁿ=x.',ref:'Fermat 2023 Q10'},
{title:'Modular Arithmetic',d:'medium',q:'2¹⁰⁰ mod 3',steps:['2≡-1','(-1)¹⁰⁰=1'],tip:'(-1)^even=1.',ref:'Fermat 2022 Q12'},
{title:'Trailing Zeros',d:'hard',q:'50! zeros?',steps:['10+2=12'],tip:'Count 5s.',ref:'Fermat 2023 Q18'},
{title:'Sum of Squares',d:'hard',q:'a+b=10,ab=21. a²+b²?',steps:['100-42=58'],tip:'(a+b)²=a²+2ab+b².',ref:'Fermat 2023 Q19'},
{title:'Geometric Series',d:'medium',q:'1+2+...+2¹⁰',steps:['2¹¹-1=2047'],tip:'S=a(rⁿ-1)/(r-1).',ref:'Fermat 2022 Q17'},
{title:'Complementary Counting',d:'hard',q:'P(not all same)?',steps:['120-11=109','109/120'],tip:'P(A)=1-P(A\').',ref:'Fermat 2025 Q20'},
{title:'Grid Paths',d:'hard',q:'(0,0)→(4,3)',steps:['C(7,3)=35'],tip:'Lattice paths=combinations.',ref:'Fermat 2024 Q22'}
]};

var CHEATSHEET=[
{cat:'Algebra',formulas:[
{f:'(a+b)²=a²+2ab+b²',use:'Expanding, finding a²+b²',sc:'a²+b²=(a+b)²-2ab'},
{f:'a²-b²=(a+b)(a-b)',use:'Factoring',sc:'Look for difference of squares'},
{f:'Quadratic: (-b±√(b²-4ac))/2a',use:'ax²+bx+c=0',sc:'Discriminant<0: no real roots'},
{f:'Arithmetic sum: n(a₁+aₙ)/2',use:'Evenly spaced numbers',sc:'Also n/2(2a₁+(n-1)d)'},
{f:'Geometric sum: a(rⁿ-1)/(r-1)',use:'Powers, doubling',sc:'Infinite: a/(1-r) when |r|<1'},
{f:'Exponents: aᵐ×aⁿ=aᵐ⁺ⁿ',use:'Simplifying',sc:'a⁰=1, a⁻ⁿ=1/aⁿ'}
]},
{cat:'Geometry',formulas:[
{f:'Triangle: ½bh',use:'Any triangle',sc:'Also ½ab·sinC'},
{f:'Pythagoras: a²+b²=c²',use:'Right triangles',sc:'Triples: 3-4-5, 5-12-13, 8-15-17'},
{f:'Circle: A=πr², C=2πr',use:'Area, circumference',sc:'Sector: (θ/360)πr²'},
{f:'Polygon angles: (n-2)×180°',use:'Interior sum',sc:'Each regular: (n-2)×180/n'},
{f:'Sphere: V=(4/3)πr³',use:'3D',sc:'SA=4πr²'},
{f:'Inscribed circle: r=(a+b-c)/2',use:'Right triangle inradius',sc:'General: r=Area/s'}
]},
{cat:'Number Theory',formulas:[
{f:'GCD×LCM=a×b',use:'Finding LCM from GCD',sc:'Factor into primes first'},
{f:'Divisors: (e₁+1)(e₂+1)...',use:'Counting factors',sc:'From prime factorization'},
{f:'Trailing zeros: ⌊n/5⌋+⌊n/25⌋+...',use:'Factorials',sc:'Count factors of 5'},
{f:'Units digit: period divides 4',use:'Large powers',sc:'2:2,4,8,6 | 3:3,9,7,1 | 7:7,9,3,1'}
]},
{cat:'Counting & Probability',formulas:[
{f:'C(n,r)=n!/(r!(n-r)!)',use:'Choosing subsets',sc:'C(n,r)=C(n,n-r)'},
{f:'Inclusion-Exclusion: |A∪B|=|A|+|B|-|A∩B|',use:'Overlapping sets',sc:'"At least one"→complement'},
{f:'Grid paths: C(m+n,n)',use:'Lattice paths',sc:'m rights + n ups'},
{f:'Circular perms: (n-1)!',use:'Round table',sc:'Fix one, arrange rest'},
{f:'Pigeonhole: n in m boxes→≥⌈n/m⌉',use:'Existence proofs',sc:'Must happen'}
]}];

function getCEMCRating(p){if(p>=90)return{label:'Distinction',cls:'rate-dist',desc:'Top ~10%'};if(p>=70)return{label:'Merit',cls:'rate-merit',desc:'Top ~25%'};if(p>=50)return{label:'Median',cls:'rate-med',desc:'Around median'};return{label:'Developing',cls:'d-easy',desc:'Below median — focus on Part A'};}
function getImprovements(rev){var tw={};rev.forEach(function(r){if(r.status!=='correct')tw[r.q.t]=(tw[r.q.t]||0)+1;});
var tips={algebra:'Practice equations and factoring.',geometry:'Draw diagrams. Memorize formulas.',number:'Work on prime factorization and mod arithmetic.',combinatorics:'Master C(n,r). Think: does order matter?',probability:'Define sample space first. Use complements.'};
return Object.entries(tw).sort(function(a,b){return b[1]-a[1];}).map(function(e){return{topic:e[0],count:e[1],tip:tips[e[0]]||''};});}

document.getElementById('tabbar').addEventListener('click',function(e){
  var tab=e.target.closest('.tab');if(!tab)return;var id=tab.getAttribute('data-pnl');
  document.querySelectorAll('.pnl').forEach(function(p){p.classList.remove('on');});
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on');});
  document.getElementById('pnl-'+id).classList.add('on');tab.classList.add('on');
  if(id==='prog')renderProgress();if(id==='sol')showSol('pascal',document.querySelector('.sbtn'));if(id==='cheat')renderCheat();});

function showYT(c){var C=c.charAt(0).toUpperCase()+c.slice(1);
  var h='<div class="stitle">'+C+' Papers (2015–2025)</div><table class="yt"><tr><th>Year</th><th>Paper</th><th>Solutions</th><th>Diff</th></tr>';
  PAPERS[c].forEach(function(p){var dc=p.difficulty==='easy'?'d-easy':p.difficulty==='medium'?'d-med':'d-hard';
    h+='<tr><td>'+p.year+'</td><td><a href="'+p.contest+'" target="_blank">📄 '+p.year+' '+C+'</a></td><td><a href="'+p.solution+'" target="_blank">✅ Solutions</a></td><td><span class="dbadge '+dc+'">'+p.difficulty.toUpperCase()+'</span></td></tr>';});
  h+='</table>';document.getElementById('yt-area').innerHTML=h;}

var fcList=[],fcIdx=0;
function loadFC(){var c=document.getElementById('fc-c').value,t=document.getElementById('fc-t').value;
  fcList=FCARDS.filter(function(f){return f.c===c&&(t==='all'||f.t===t);});if(!fcList.length)fcList=FCARDS.filter(function(f){return f.c===c;});fcIdx=0;showFC();}
function shuffFC(){for(var i=fcList.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fcList[i];fcList[i]=fcList[j];fcList[j]=t;}fcIdx=0;showFC();}
function showFC(){if(!fcList.length)return;document.getElementById('fcard').classList.remove('flip');var f=fcList[fcIdx];document.getElementById('fc-q').textContent=f.q;document.getElementById('fc-a').textContent=f.a;document.getElementById('fc-h').textContent=f.h;document.getElementById('fc-cnt').textContent=(fcIdx+1)+'/'+fcList.length;}
function flipFC(){document.getElementById('fcard').classList.toggle('flip');}
function fcPrev(){if(fcIdx>0){fcIdx--;showFC();}}
function fcNext(){if(fcIdx<fcList.length-1){fcIdx++;showFC();}}

var mockQs=[],mockAnswers={},mockTimer=null,mockSecs=3600;
function startMock(){var c=document.getElementById('m-c').value,diff=document.getElementById('m-d').value;
  var pool=QB.filter(function(q){return q.c===c;});
  if(diff!=='mixed'){var f=pool.filter(function(q){return q.d===diff;});if(f.length>=10)pool=f;}
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  mockQs=pool.slice(0,30);mockAnswers={};
  document.getElementById('m-setup').style.display='none';document.getElementById('m-res').style.display='none';document.getElementById('m-area').style.display='block';
  var C=c.charAt(0).toUpperCase()+c.slice(1);document.getElementById('m-title').textContent=C+' Mock Test';document.getElementById('m-qc').textContent=mockQs.length+' Qs';
  var h='';mockQs.forEach(function(q,i){var dc=q.d==='easy'?'d-easy':q.d==='medium'?'d-med':'d-hard';
    h+='<div class="qblk"><div class="qn">Q'+(i+1)+' <span class="dbadge '+dc+'">'+q.d.toUpperCase()+'</span> <span style="font-size:.68rem;color:var(--sub)">'+q.ref+'</span></div>';
    h+='<div class="qt">'+q.q+'</div><div class="opts">';
    q.o.forEach(function(o,j){h+='<button class="obtn" data-q="'+i+'" data-o="'+j+'" onclick="pickOpt('+i+','+j+')">'+String.fromCharCode(65+j)+') '+o+'</button>';});
    h+='</div></div>';});
  document.getElementById('m-qs').innerHTML=h;mockSecs=3600;updateTimer();
  if(mockTimer)clearInterval(mockTimer);mockTimer=setInterval(function(){mockSecs--;updateTimer();if(mockSecs<=0){clearInterval(mockTimer);submitMock();}},1000);
  if(window.MathJax&&MathJax.typeset)MathJax.typeset();}
function updateTimer(){var m=Math.floor(mockSecs/60),s=mockSecs%60;document.getElementById('m-timer').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');if(mockSecs<300)document.getElementById('m-timer').style.color='#f44336';}
function pickOpt(qi,oi){mockAnswers[qi]=oi;document.querySelectorAll('[data-q="'+qi+'"]').forEach(function(b){b.classList.remove('sel');});document.querySelector('[data-q="'+qi+'"][data-o="'+oi+'"]').classList.add('sel');document.getElementById('m-pbar').style.width=(Object.keys(mockAnswers).length/mockQs.length*100)+'%';}

function submitMock(){if(mockTimer)clearInterval(mockTimer);var correct=0,wrong=0,skipped=0,review=[];
  mockQs.forEach(function(q,i){var p=mockAnswers[i];if(p===undefined){skipped++;review.push({q:q,i:i,status:'skipped',picked:-1});}else if(p===q.a){correct++;review.push({q:q,i:i,status:'correct',picked:p});}else{wrong++;review.push({q:q,i:i,status:'wrong',picked:p});}});
  var pct=Math.round(correct/mockQs.length*100),rating=getCEMCRating(pct);saveProgress(document.getElementById('m-c').value,pct);var impr=getImprovements(review);
  var h='<div class="rbox"><div class="sbig">'+correct+'/'+mockQs.length+'</div><div class="ssub">'+pct+'% <span class="cemc-rating '+rating.cls+'">'+rating.label+'</span></div><div style="font-size:.82rem;color:var(--sub)">'+rating.desc+'</div>';
  h+='<div class="rsum"><div class="scard"><div class="sv sc">'+correct+'</div><div class="sl">Correct</div></div><div class="scard"><div class="sv sw">'+wrong+'</div><div class="sl">Wrong</div></div><div class="scard"><div class="sv ss">'+skipped+'</div><div class="sl">Skipped</div></div><div class="scard"><div class="sv" style="color:var(--txt)">'+pct+'%</div><div class="sl">Score</div></div></div>';
  if(impr.length){h+='<div class="improve-box" style="text-align:left"><strong>📌 Areas to Improve:</strong><ul style="margin-top:8px;padding-left:20px">';impr.forEach(function(im){h+='<li><strong>'+im.topic+'</strong> ('+im.count+' wrong): '+im.tip+'</li>';});h+='</ul></div>';}
  h+='<div style="margin-top:16px"><button class="btn" style="padding:10px 30px" onclick="resetMock()">Try Again</button></div></div>';
  h+='<div class="rev"><div class="stitle">📋 Review</div>';
  review.forEach(function(r){h+='<div class="ri '+(r.status==='correct'?'rok':'')+'"><div class="riq"><strong>Q'+(r.i+1)+':</strong> '+r.q.q+'</div><div class="ria">';
    if(r.status==='skipped')h+='<span class="riw">Skipped</span> · ';else h+='You: <span class="'+(r.status==='correct'?'ric':'riw')+'">'+String.fromCharCode(65+r.picked)+') '+r.q.o[r.picked]+'</span> · ';
    h+='Answer: <span class="ric">'+String.fromCharCode(65+r.q.a)+') '+r.q.o[r.q.a]+'</span></div><div class="ris"><strong>Why:</strong> '+r.q.rat+'</div><div class="ri-ref">📚 '+r.q.ref+'</div></div>';});
  h+='</div>';document.getElementById('m-area').style.display='none';document.getElementById('m-res').innerHTML=h;document.getElementById('m-res').style.display='block';if(window.MathJax&&MathJax.typeset)MathJax.typeset();}
function resetMock(){document.getElementById('m-res').style.display='none';document.getElementById('m-area').style.display='none';document.getElementById('m-setup').style.display='block';}

function showSol(c,btn){document.querySelectorAll('.sbtn').forEach(function(b){b.classList.remove('on');});if(btn)btn.classList.add('on');
  var sols=SOLUTIONS[c]||[],C=c.charAt(0).toUpperCase()+c.slice(1);
  var h='<div class="stitle">'+C+' Solutions</div>';
  sols.forEach(function(s,i){var dc=s.d==='easy'?'d-easy':s.d==='medium'?'d-med':'d-hard';
    h+='<div class="solblk"><h3>'+(i+1)+'. '+s.title+' <span class="dbadge '+dc+'">'+s.d.toUpperCase()+'</span></h3><div style="margin-bottom:10px;font-size:.9rem">'+s.q+'</div><ol class="slist">';
    s.steps.forEach(function(st){h+='<li>'+st+'</li>';});h+='</ol><div class="tipbox"><strong>💡</strong> '+s.tip+'</div><div style="font-size:.72rem;color:var(--sub);margin-top:6px;font-style:italic">'+s.ref+'</div></div>';});
  document.getElementById('sol-content').innerHTML=h;}

function renderCheat(){var h='';CHEATSHEET.forEach(function(sec){
  h+='<div class="cheat-section"><h3>'+sec.cat+'</h3><table><tr><th style="width:35%">Formula</th><th style="width:30%">When to Use</th><th style="width:35%">Shortcut</th></tr>';
  sec.formulas.forEach(function(f){h+='<tr><td><strong>'+f.f+'</strong></td><td>'+f.use+'</td><td class="shortcut">'+f.sc+'</td></tr>';});h+='</table></div>';});
  document.getElementById('cheat-content').innerHTML=h;}

function saveProgress(c,p){var d=JSON.parse(localStorage.getItem('uwContest')||'{}');if(!d[c])d[c]={tests:0,totalScore:0,best:0,history:[]};d[c].tests++;d[c].totalScore+=p;if(p>d[c].best)d[c].best=p;d[c].history.push({date:new Date().toLocaleDateString(),score:p});localStorage.setItem('uwContest',JSON.stringify(d));}
function renderProgress(){var d=JSON.parse(localStorage.getItem('uwContest')||'{}'),h='';
  ['pascal','cayley','fermat'].forEach(function(c){var C=c.charAt(0).toUpperCase()+c.slice(1),info=d[c]||{tests:0,totalScore:0,best:0,history:[]};
    var avg=info.tests?Math.round(info.totalScore/info.tests):0,rating=getCEMCRating(avg);
    var bc=c==='pascal'?'var(--pascal)':c==='cayley'?'var(--cayley)':'var(--fermat)';
    h+='<div style="background:var(--cbg);border-radius:12px;padding:20px;margin-bottom:16px;border-left:4px solid '+bc+'"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:1.1rem;font-weight:700">'+C+'</span><span class="cemc-rating '+rating.cls+'">'+rating.label+'</span></div>';
    h+='<div class="lvlw"><div class="lvlb" style="width:'+Math.min(avg,100)+'%"></div></div><div class="lvli"><span>Avg: '+avg+'%</span><span>Best: '+info.best+'%</span></div>';
    h+='<div style="margin-top:6px;font-size:.82rem;color:var(--sub)">Tests: '+info.tests+' · '+rating.desc+'</div>';
    if(info.history.length){h+='<div style="margin-top:6px;font-size:.78rem;color:var(--sub)">Recent: ';info.history.slice(-5).forEach(function(e){h+=e.date+':'+e.score+'% ';});h+='</div>';}h+='</div>';});
  h+='<div style="text-align:center;margin-top:16px;color:var(--sub);font-size:.82rem">Developing→Median(50%)→Merit(70%)→Distinction(90%)</div>';
  h+='<div style="text-align:center;margin-top:12px"><button class="btn" style="background:#555" onclick="if(confirm(\'Reset?\')){localStorage.removeItem(\'uwContest\');renderProgress();}">Reset</button></div>';
  document.getElementById('prog-content').innerHTML=h;}

window.addEventListener('DOMContentLoaded',function(){showYT('pascal');showSol('pascal',document.querySelector('.sbtn'));renderCheat();});
