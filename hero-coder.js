(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const roles = data.experience.items;
  const projects = data.projects.items;
  const source = (label, href) => ({label, href});
  const workSource = source('Experience', '#experience');
  const projectSource = source('Projects', '#projects');
  const paperSource = source('Published paper', roles[1].paper.url);
  const answers = {
    intro: {title:'whoami', text:`I'm ${data.name}, a software engineer at Morgan Stanley building backend systems and agentic AI. Previously: healthcare AI research at the University of Massachusetts and real-time dashboards at Hexaware. I also build FitLive and NowServing.`, links:[workSource,source('Resume PDF',data.resume)]},
    work: {title:'experience', text:roles.map(r=>`${r.role} at ${r.company} (${r.date}).`).join(' '), links:[workSource]},
    morgan: {title:'Morgan Stanley', text:roles[0].outcomes.slice(0,3).join(' '), tech:roles[0].tech, details:roles[0].outcomes.slice(3).join(' '), links:[workSource]},
    research: {title:'research', text:roles[1].outcomes[0]+' '+roles[1].outcomes[5], tech:roles[1].tech, details:roles[1].outcomes.slice(1,4).join(' '), links:[paperSource,workSource]},
    hexaware: {title:'Hexaware', text:roles[2].outcomes.slice(0,3).join(' '), tech:roles[2].tech, details:roles[2].outcomes.slice(3).join(' '), links:[workSource]},
    projects: {title:'projects', text:projects.slice(0,2).map(p=>p.name+': '+p.description).join(' '), links:[projectSource]},
    skills: {title:'toolkit', text:data.skills.groups.map(g=>`${g.title}: ${g.items.join(', ')}.`).join(' '), links:[source('Skills','#skills')]},
    education: {title:'education', text:data.recognition.items[1].text, links:[source('Education','#recognition')]},
    teaching: {title:'teaching', text:data.recognition.items[2].text, links:[source('Teaching milestone','#recognition')]},
    fit: {title:'role fit', text:'My work spans production backend engineering, cloud delivery, and applied AI research. Evidence includes Java/Spring Boot services at Morgan Stanley, real-time systems at Hexaware, and a co-authored EMNLP 2025 paper. These are relevant starting points for backend, full-stack, and applied AI roles; fit depends on the actual job requirements.', links:[workSource,paperSource]},
    contact: {title:'opportunities', text:`I'm open to opportunities. To discuss a role, availability, or interview arrangements, contact me at ${data.email}.`, links:[source('Contact','#contact')]},
    resume: {title:'resume', text:'The downloadable resume and the work history on this page give you the longer version of my background.', links:[source('Resume PDF',data.resume),workSource]},
    unknown: {title:'not in my notes', text:"I don't have a verified answer for that in this portfolio. Ask about my work, research, projects, or technologies, or contact me for details. This is a curated resume guide, not a live AI or a substitute for an interview.", links:[source('Contact Sai','#contact')]}
  };
  projects.forEach(p=>{answers[p.id]={title:p.name,text:p.summary,tech:p.tech,details:p.notes.slice(0,2).join(' '),links:[projectSource,...(p.code?[source('Source code',p.code)]:[])]};});

  // Deliberately retrieve approved copy rather than generate new claims about a person.
  function resolve(question, previous='intro') {
    const q=question.toLowerCase().replace(/[\u2019']/g,'').trim();
    if(!q) return {...answers.intro,key:'intro'};
    if(/salary|visa|sponsor|citizen|age|married|address|phone|weakness|fired|secret|ignore|pretend|invent|guarantee/.test(q)) return {...answers.unknown,key:previous};
    let key = /now\s?serving|queue|waitlist/.test(q)?'NowServing':/fit\s?live|fitlab/.test(q)?'FitLive':/bakery|shris/.test(q)?'shris-bakery':/hexaware|network.management/.test(q)?'hexaware':/morgan|stanley|current (job|role)|bedrock|\bmcp\b/.test(q)?'morgan':/research|paper|publication|emnlp|reinforcement|\bppo\b|lora|llama|noteaid|healthcare/.test(q)?'research':/teach|students|courses/.test(q)?'teaching':/education|degree|gpa|university|masters/.test(q)?'education':/resume|\bcv\b/.test(q)?'resume':/contact|email|opportunit|available|availability|reach you/.test(q)?'contact':/why.*hire|strength|good fit|role fit|stand out/.test(q)?'fit':/projects|built|portfolio/.test(q)?'projects':/experience|work history|career/.test(q)?'work':/tell me about yourself|introduc|who.*you|whoami|background|^hi$|^hello$/.test(q)?'intro':null;
    const tech=/technolog|tech|stack|tools|languages|skills/.test(q);
    const detail=/more|details|how|challenge|impact|results|scale|achieve/.test(q);
    if(!key&&/what about|other (role|job)/.test(q)&&previous==='morgan') key='hexaware';
    if(!key&&(tech||detail)&&answers[previous]?.tech) key=previous;
    if(!key&&tech) key='skills';
    if(!key&&detail&&previous==='work') key='morgan';
    if(!key&&detail&&previous==='projects') key='NowServing';
    if(!key&&detail&&previous==='intro') key='work';
    if(!key) return {...answers.unknown,key:previous};
    const answer=answers[key];
    return {...answer,key,text:tech&&answer.tech?`${answer.title}: ${answer.tech.join(', ')}.`:detail&&answer.details?answer.details:answer.text};
  }

  function characterPose(tick=0, still=false, gaze=0) {
    if(still)return {wave:0,sip:0,eyes:1,gaze:0};
    const phase=((tick%216)+216)%216;
    const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
    const sip=phase>=78&&phase<140?ease((phase-78)/14)*ease((140-phase)/16):0;
    return {wave:0,sip,eyes:tick%53<2?.12:1,gaze:Math.max(-1,Math.min(1,gaze))};
  }
  // An original vector drawing keeps the hands and headphones legible at every size.
  const characterMarkup=`<div class="coder-art" aria-hidden="true"><svg class="coder-person" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path class="person-chair" d="M146 249V173Q146 150 169 150H253Q276 150 276 173V249"/>
      <path class="person-clothes" d="M174 141L155 147Q133 151 127 177L120 212L145 223L157 194L153 259H272L268 194L291 214L310 197L291 166Q283 152 251 141Z"/>
      <path class="person-seam" d="M175 143L192 178L211 165L229 178L250 143M211 165V257M170 220L185 216M233 216L251 220M185 177V200M235 177V200"/>
      <path class="person-skin" d="M194 121V145Q209 162 229 145V121"/>
      <g class="person-head">
        <path class="person-band" d="M158 88V71C158 7 264 7 264 71V88"/>
        <path class="person-band-inner" d="M166 76C166 20 256 20 256 76"/>
        <path class="person-skin" d="M175 63Q174 43 208 41Q245 40 247 66L244 103Q238 131 212 138Q181 130 176 103Z"/>
        <path class="person-hair" d="M173 76Q163 45 183 33Q194 21 208 29Q232 18 246 37Q260 48 248 80L240 57Q229 61 218 47Q204 64 190 53L178 79Z"/>
        <path class="person-hair-line" d="M183 44Q198 37 205 38M217 35Q236 32 244 48"/>
        <rect class="person-ear" x="157" y="72" width="16" height="34" rx="7"/>
        <rect class="person-ear" x="249" y="72" width="16" height="34" rx="7"/>
        <path class="person-ear-detail" d="M163 81V97M259 81V97"/>
        <path class="person-brow" d="M185 77L199 75M223 75L237 77"/>
        <g class="person-eyes"><ellipse cx="194" cy="88" rx="2.5" ry="3.2"/><ellipse cx="230" cy="88" rx="2.5" ry="3.2"/></g>
        <path class="person-feature" d="M211 87L207 101L214 102M199 113Q211 122 225 112"/>
        <path class="person-stubble" d="M187 109L189 113M190 116L194 120M198 125L202 127M218 128L222 126M230 121L234 117"/>
      </g>
      <g class="person-resting-hand">
        <path class="person-clothes" d="M127 178Q111 204 125 231L144 250L159 239L143 214L146 191"/>
        <path class="person-cuff" d="M140 241L154 232L162 242L148 252Z"/>
        <path class="person-skin" d="M151 248Q161 240 169 250L181 255Q185 259 179 261L168 257L167 266Q165 270 162 266L161 259L159 267Q155 270 154 265L153 258Q145 259 147 254Z"/>
        <path class="person-feature" d="M159 252L168 254"/>
      </g>
      <path class="person-forearm person-clothes" d="M289 192Q310 207 323 208L332 217Q306 237 281 211Z"/>
      <g class="person-coffee">
        <path class="person-steam" d="M309 180Q305 175 310 168M322 180Q327 174 322 168"/>
        <path class="person-cup-handle" d="M331 196H338Q348 204 337 213H331"/>
        <path class="person-cup" d="M301 191H333L330 219Q316 225 304 219Z"/>
        <path class="person-coffee-top" d="M304 195H330"/>
        <path class="person-skin" d="M335 206L326 204Q320 205 324 210L334 213Q343 211 339 207Z"/>
      </g>
    </g></svg></div>`;
  window.SAI_GUIDE={resolve,characterPose};
  const hero=document.querySelector('.hero-inner');
  if(!hero) return;
  const root=document.createElement('aside');
  root.className='hero-coder';root.setAttribute('aria-label','Ask Sai, resume guide');
  root.innerHTML=`<pre class="coder-art" aria-hidden="true"></pre><div class="coder-terminal"><div class="coder-topline"><h2>ASK SAI / 01</h2><small>Resume-backed answers</small><button class="coder-motion" aria-label="Pause coder animation" aria-pressed="false" title="Pause coder animation"><i data-lucide="pause" aria-hidden="true"></i></button></div><div class="coder-answer" tabindex="0" role="region" aria-label="Resume guide answer"><p class="coder-command"></p><p class="coder-copy"></p><div class="coder-sources"></div></div><div class="coder-questions" aria-label="Suggested questions"></div><form class="coder-form"><span class="coder-prompt" aria-hidden="true">&gt;</span><label class="sr-only" for="coder-question">Ask about Sai's experience</label><input id="coder-question" name="question" maxlength="240" autocomplete="off" placeholder="Tell me about yourself" required><button class="coder-send" type="submit" aria-label="Ask question" title="Ask question"><i data-lucide="arrow-up-right" aria-hidden="true"></i></button></form></div><p class="coder-footnote">Curated answers. No AI generation. Questions stay in this tab.</p><span class="sr-only coder-announcement" role="status" aria-live="polite" aria-atomic="true"></span>`;
  root.querySelector('.coder-art').outerHTML=characterMarkup;
  const screen=root.querySelector('.coder-terminal');
  const monitor=document.createElement('div');monitor.className='coder-monitor';
  screen.before(monitor);monitor.append(screen);
  const chin=document.createElement('div');chin.className='monitor-chin';chin.setAttribute('aria-hidden','true');chin.innerHTML='<span>SK / PERSONAL TERMINAL</span><span class="monitor-led"></span>';monitor.append(chin);
  const stand=document.createElement('div');stand.className='monitor-stand';stand.setAttribute('aria-hidden','true');monitor.after(stand);
  hero.insertBefore(root,hero.querySelector('.hero-stats'));
  window.lucide?.createIcons();
  const art=root.querySelector('.coder-art'),copy=root.querySelector('.coder-copy'),command=root.querySelector('.coder-command'),links=root.querySelector('.coder-sources'),suggestions=root.querySelector('.coder-questions'),input=root.querySelector('input'),motion=root.querySelector('.coder-motion');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  art.removeAttribute('aria-hidden');art.querySelector('svg').setAttribute('aria-hidden','true');
  const palm=document.createElementNS('http://www.w3.org/2000/svg','svg');palm.setAttribute('viewBox','0 0 420 260');palm.setAttribute('aria-hidden','true');palm.classList.add('coder-rest-palm');
  const restingHand=art.querySelector('.person-resting-hand .person-skin').cloneNode(true);restingHand.setAttribute('stroke-width','2');palm.append(restingHand);art.append(palm);
  const peekButton=document.createElement('button');peekButton.type='button';peekButton.className='coder-peek-trigger';peekButton.setAttribute('aria-label','Invite Sai for a coffee');peekButton.title='Coffee break';art.append(peekButton);
  let coffeeBreak=false,breakTick=0,armed=true;
  let previous='intro',tick=0,gaze=0,paused=false,visible=false,frame=0,last=0,lastArt='';
  const coffee=art.querySelector('.person-coffee'),forearm=art.querySelector('.person-forearm'),head=art.querySelector('.person-head'),eyes=art.querySelector('.person-eyes');
  function show(question,announce=true) {
    const result=resolve(question,previous);previous=result.key;
    command.textContent='> '+result.title;
    copy.textContent=result.text;
    links.replaceChildren(...result.links.map(item=>{
      const a=document.createElement('a');a.textContent=item.label;a.href=item.href;
      if(item.href.startsWith('https:')||item.href.endsWith('.pdf')){a.target='_blank';a.rel='noopener noreferrer';}
      return a;
    }));
    const options=result.tech?['Which technologies?','Tell me more','Other projects']:['My experience','My research','My projects'];
    suggestions.replaceChildren(...options.map(label=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>show(label));return b;}));
    root.querySelector('.coder-answer').scrollTop=0;
    if(announce&&!reduced.matches)copy.animate([{opacity:.3,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:180,easing:'ease-out'});
    if(announce)root.querySelector('.coder-announcement').textContent=result.title+'. '+result.text;
  }
  function draw() {
    const pose=coffeeBreak?characterPose(70+breakTick,paused||reduced.matches,gaze):characterPose(0,true,0);
    const next=JSON.stringify(pose);
    if(next===lastArt)return;
    lastArt=next;
    const x=-79*pose.sip,y=-79*pose.sip;
    coffee.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    forearm.setAttribute('d',`M281 204Q289 223 301 216L${332+x} ${217+y}L${323+x} ${208+y}Q302 209 289 192Z`);
    head.setAttribute('transform',`rotate(${(pose.sip*5).toFixed(2)} 211 139)`);
    eyes.setAttribute('transform',`translate(${pose.gaze*1.5} 88) scale(1 ${pose.eyes}) translate(0 -88)`);
    art.dataset.gesture=pose.sip>0?'coffee':'rest';
  }
  function loop(time) {
    if(time-last>=1000/12){tick++;if(coffeeBreak){breakTick++;if(breakTick>=76){coffeeBreak=false;art.classList.remove('is-emerging');peekButton.setAttribute('aria-expanded','false');}}draw();last=time;}
    frame=coffeeBreak?requestAnimationFrame(loop):0;
  }
  function sync() {
    cancelAnimationFrame(frame);frame=0;
    if(paused||reduced.matches||document.hidden||!visible){coffeeBreak=false;art.classList.remove('is-emerging');peekButton.setAttribute('aria-expanded','false');}
    art.dataset.paused=String(paused||reduced.matches);draw();
    if(coffeeBreak&&visible&&!document.hidden&&!paused&&!reduced.matches)frame=requestAnimationFrame(loop);
  }
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(root);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  motion.addEventListener('click',()=>{paused=!paused;motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Resume coder animation':'Pause coder animation');motion.title=motion.getAttribute('aria-label');motion.innerHTML=`<i data-lucide="${paused?'play':'pause'}" aria-hidden="true"></i>`;window.lucide?.createIcons();sync();});
  root.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||reduced.matches||paused)return;const bounds=root.getBoundingClientRect();gaze=event.clientX<bounds.left+bounds.width*.33?-1:event.clientX>bounds.left+bounds.width*.67?1:0;});
  root.addEventListener('pointerleave',()=>{gaze=0;});
  function invite(){if(coffeeBreak||paused||reduced.matches)return;coffeeBreak=true;breakTick=0;armed=false;art.classList.add('is-emerging');peekButton.setAttribute('aria-expanded','true');sync();}
  peekButton.setAttribute('aria-expanded','false');
  peekButton.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&armed)invite();});
  art.addEventListener('pointerleave',()=>{if(!coffeeBreak)armed=true;});
  peekButton.addEventListener('click',invite);
  root.querySelector('form').addEventListener('submit',event=>{event.preventDefault();const question=input.value.trim();if(!question)return;show(question);input.value='';input.focus();});
  show('whoami',false);draw();
})();
