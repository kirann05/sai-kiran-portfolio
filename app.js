(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<i data-lucide="${escape(name)}" aria-hidden="true"></i>`;
  const heading = section => `<div class="section-label">${escape(section.label)}</div><h2>${escape(section.title)} <em>${escape(section.italic)}</em></h2>`;
  const pixelLogo = () => `<picture class="pixel-logo"><source media="(prefers-reduced-motion: reduce)" srcset="assets/sk-pixel.png"><img src="assets/sk-assemble.gif" alt="${escape(data.monogram)}" width="144" height="86"></picture>`;
  function renderNavigation() {
    document.querySelector('#site-header').innerHTML = `<nav class="nav" aria-label="Main navigation"><div class="container nav-inner"><a class="logo" href="#hero" aria-label="${escape(data.name)} home">${pixelLogo()}</a><div class="nav-links">${data.navigation.map(label => `<a href="#${label.toLowerCase()}">${escape(label)}</a>`).join('')}</div><button class="icon-button menu-button" aria-label="${data.ui.menu}" aria-controls="mobile-menu" aria-expanded="false">${icon('menu')}</button></div></nav>`;
  }
  function renderHero() {
    const hero = data.hero;
    return `<section id="hero" class="hero"><div class="container"><div class="hero-inner"><div class="status">${escape(hero.status)}</div><h1><span>${escape(hero.firstName)}</span><span class="surname">${escape(hero.lastName)}</span><em>${escape(hero.role)}</em></h1><p class="hero-bio">${escape(hero.bio)}</p><div class="actions"><a class="button primary" href="#projects">${escape(hero.actions[0])}${icon('arrow-up-right')}</a><a class="button" href="#contact">${escape(hero.actions[1])}</a><a class="button" href="${escape(data.resume)}" target="_blank">${escape(data.ui.resume)}${icon('download')}</a></div><div class="hero-stats">${hero.stats.map(stat=>`<div class="stat"><strong ${stat.id?`id="${stat.id}"`:''}>${escape(stat.value)}</strong><small>${escape(stat.label)}</small></div>`).join('')}</div></div></div></section>`;
  }
  function renderTicker() {
    const group = data.ticker.map(text => `<span>${escape(text)}</span>`).join('');
    return `<div class="ticker"><div class="ticker-track"><div class="ticker-group">${group}</div><div class="ticker-group" aria-hidden="true">${group}</div></div><button class="icon-button ticker-toggle" aria-label="${data.ui.pause}" aria-pressed="false">${icon('pause')}</button></div>`;
  }
  function renderAbout() {
    return `<section id="about" class="section"><div class="container">${heading(data.about)}<div class="about-grid"><div class="about-copy">${data.about.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}</div><dl class="info-list">${data.about.info.map(row=>`<div class="info-row">${icon(row.icon)}<div><dt>${escape(row.label)}</dt><dd>${escape(row.value)}</dd></div></div>`).join('')}</dl></div></div></section>`;
  }
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const state = {projects:[], filter:'All', source:data.ui.githubFallback};
  let revealObserver = null;
  const icons = () => { if (window.lucide) lucide.createIcons(); };
  const pills = list => `<div class="pills">${list.map(t=>`<span class="pill">${escape(t)}</span>`).join('')}</div>`;
  const externalLink = (url,label) => safeUrl(url) ? `<a class="text-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}${icon('arrow-up-right')}</a>` : '';
  function safeUrl(value) {
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  }
  function renderExperience() {
    return `<section id="experience" class="section"><div class="container">${heading(data.experience)}<div class="timeline">${data.experience.items.map(item=>`<article class="timeline-item reveal"><div class="timeline-date">${escape(item.date)}</div><h3>${escape(item.role)}</h3><p class="company">${escape(item.company)}</p>${item.focus?`<p class="role-focus">${escape(item.focus)}</p>`:''}<ul class="outcomes">${item.outcomes.map(line=>`<li>${escape(line)}</li>`).join('')}</ul>${pills(item.tech)}${item.paper?renderPaper(item.paper):''}</article>`).join('')}</div></div></section>`;
  }
  function renderPaper(paper) {
    return `<aside class="experience-paper" aria-label="Research publication"><div class="paper-icon">${icon('book-open')}</div><div><p class="paper-venue">${escape(paper.venue)}</p><h4>${escape(paper.title)}</h4><p>${escape(paper.summary)}</p><div class="actions">${externalLink(paper.url,data.ui.paper)}${externalLink(paper.pdf,data.ui.paperPdf)}${externalLink(paper.discussion,data.ui.discussion)}</div></div></aside>`;
  }
  function renderProjects() {
    return `<section id="projects" class="section"><div class="container">${heading(data.projects)}<p class="section-intro">${escape(data.projects.intro)}</p><div class="filter-bar" role="group" aria-label="Project filters">${data.projects.filters.map(filter=>`<button class="filter" data-filter="${escape(filter)}" aria-pressed="${filter==='All'}">${escape(filter)}</button>`).join('')}<span class="project-status" id="project-status">${escape(state.source)}</span></div><div class="project-grid" id="project-grid"></div><p class="sr-only" id="filter-result" role="status"></p></div></section>`;
  }
  function renderRecognition() {
    return `<section id="recognition" class="section"><div class="container">${heading(data.recognition)}<div class="recognition-grid">${data.recognition.items.map(item=>`<article class="recognition-card reveal">${icon(item.icon)}<h3>${escape(item.title)}</h3><p>${escape(item.text)}</p>${item.url?`<div class="actions">${externalLink(item.url,'Read paper')}</div>`:''}</article>`).join('')}</div></div></section>`;
  }
  function renderSkills() {
    return `<section id="skills" class="section"><div class="container">${heading(data.skills)}<div class="skills-grid">${data.skills.groups.map(group=>`<div class="skill-group reveal"><h3>${escape(group.title)}</h3><div class="pills">${group.items.map(skill=>`<button class="pill" data-skill="${escape(skill)}" aria-label="Show projects using ${escape(skill)}">${escape(skill)}</button>`).join('')}</div></div>`).join('')}</div></div></section>`;
  }
  function renderContact() {
    return `<section id="contact" class="section contact"><div class="container">${heading(data.contact)}<p>${escape(data.contact.intro)}</p><div class="email-line"><button class="email-copy" aria-label="${escape(data.ui.copy)}">${escape(data.email)}</button><a class="icon-button" href="mailto:${escape(data.email)}" aria-label="${escape(data.ui.email)}" title="${escape(data.ui.email)}">${icon('arrow-up-right')}</a></div><div class="contact-links">${externalLink(data.linkedin,'LinkedIn')}${externalLink(data.github,'GitHub')}<a class="text-link" href="${escape(data.resume)}" target="_blank">${escape(data.ui.resume)}${icon('arrow-up-right')}</a></div></div></section>`;
  }
  function repoCategories(repo) {
    const categories = new Set(data.repositoryCategories[repo.name] || []);
    if (repo.language === 'Python' || repo.language === 'Jupyter Notebook') categories.add('Python');
    (repo.topics || []).forEach(topic=>{
      if (/^aws|amazon-web-services/.test(topic)) categories.add('AWS');
      if (/node|express/.test(topic)) categories.add('Node.js');
      if (/machine-learning|llm|artificial-intelligence/.test(topic)) categories.add('AI/ML');
      if (/fullstack|full-stack/.test(topic)) categories.add('Full-stack');
    });
    return [...categories];
  }
  function mergeRepositories(repositories) {
    const repos = repositories.filter(r=>!r.fork&&!r.archived);
    const featured = data.projects.items.map(project=>{
      const repoName = data.repositoryAliases[project.id] || project.id;
      const repo = repos.find(r=>r.name.toLowerCase()===repoName.toLowerCase());
      return {...project,repoName:repo?.name,code:repo?.html_url||project.code,stars:repo?.stargazers_count,updated:repo?.updated_at};
    });
    const used = new Set(featured.map(p=>(p.repoName||p.id).toLowerCase()));
    const extra = repos.filter(r=>!used.has(r.name.toLowerCase())&&!data.excludedRepos.includes(r.name)).map(repo=>({
      id:repo.name,repoName:repo.name,name:repo.name.replace(/[-_]+/g,' ').trim(),
      description:repo.description || `Source code and experiments for ${repo.name.replace(/[-_]+/g,' ').trim()}.`,
      summary:repo.description || '', tech:[repo.language==='Jupyter Notebook'?'Python':repo.language,...(repo.topics||[])].filter(Boolean).slice(0,6),
      categories:repoCategories(repo),code:repo.html_url,live:safeUrl(repo.homepage)?repo.homepage:null,
      stars:repo.stargazers_count,updated:repo.updated_at,icon:repoCategories(repo).includes('AWS')?'cloud':repo.language==='Swift'?'smartphone':'code-2',badge:'Repository',notes:[]
    }));
    const order = id => { const n=data.projects.featuredRepos.indexOf(id); return n<0?999:n; };
    return [...featured,...extra].sort((a,b)=>order(a.id)-order(b.id));
  }
  function matches(project, filter) {
    if (filter === 'All') return true;
    return [...project.tech,...project.categories].some(tag=>tag.toLowerCase()===filter.toLowerCase());
  }
  function projectCard(project) {
    const updated = project.updated ? new Date(project.updated).toLocaleDateString('en-US',{month:'short',year:'numeric'}) : null;
    return `<article class="project-card" data-project="${escape(project.id)}"><div class="project-top">${icon(project.icon)}<span class="badge">${escape(project.badge)}</span></div><h3><button class="project-title" data-open="${escape(project.id)}" aria-label="Explore ${escape(project.name)}">${escape(project.name)}</button></h3><p class="project-description">${escape(project.description)}</p>${pills(project.tech.slice(0,6))}<div class="project-bottom"><div class="project-meta">${Number.isInteger(project.stars)?`<span>${icon('star')}${project.stars} ${escape(data.ui.stars)}</span>`:''}${updated?`<span>${escape(data.ui.updated)} ${escape(updated)}</span>`:''}</div><div class="project-links">${externalLink(project.code,data.ui.code)}${project.video?`<button class="text-link" data-demo="${escape(project.id)}">${escape(data.ui.demo)}${icon('play')}</button>`:externalLink(project.live,project.liveLabel||data.ui.live)}<button class="text-link detail-link" data-open="${escape(project.id)}" aria-label="${escape(data.ui.details)}: ${escape(project.name)}">${icon('plus')}</button></div></div></article>`;
  }
  function updateProjectGrid(animate=false) {
    const grid = document.querySelector('#project-grid');
    const oldRects = new Map([...grid.children].map(el=>[el.dataset.project,el.getBoundingClientRect()]));
    const visible = state.projects.filter(p=>matches(p,state.filter));
    grid.innerHTML = visible.length ? visible.map(projectCard).join('') : `<div class="empty"><p>${escape(data.ui.empty)}</p><button class="button" data-reset>${escape(data.ui.reset)}</button></div>`;
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===state.filter)));
    document.querySelector('#filter-result').textContent = `${visible.length} projects`;
    document.querySelector('#project-status').textContent = state.filter==='All'?state.source:state.filter;
    icons();
    if(revealObserver&&!reducedMotion.matches) grid.querySelectorAll('.project-card').forEach(card=>{
      card.classList.add('reveal');
      revealObserver.observe(card);
    });
    if(animate&&!reducedMotion.matches) [...grid.children].forEach(el=>{
      const old=oldRects.get(el.dataset.project), next=el.getBoundingClientRect();
      el.animate(old?[{transform:`translate(${old.left-next.left}px,${old.top-next.top}px)`},{transform:'none'}]:[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:180,easing:'ease-out'});
    });
  }
  const dialog = document.querySelector('#project-dialog');
  let dialogTrigger = null;
  let readmeController = null;
  function openProject(id, trigger, autoplay = false) {
    const project = state.projects.find(p=>p.id===id);
    if(!project) return;
    dialogTrigger=trigger;
    dialog.innerHTML = `<div class="dialog-header"><h2 id="dialog-title">${escape(project.name)}</h2><button class="icon-button" data-close aria-label="${data.ui.close}">${icon('x')}</button></div><div class="dialog-body">${project.video?`<div class="walkthrough" id="modal-video"><img src="${escape(project.image)}" alt="${escape(project.imageAlt)}" width="800" height="450"><button class="button primary walkthrough-play" data-play="${escape(project.video)}">${icon('play')}${escape(data.ui.play)}</button></div>`:project.image?`<img src="${escape(project.image)}" alt="${escape(project.imageAlt)}" width="800" height="440">`:''}<p>${escape(project.summary||project.description)}</p>${pills(project.tech)}${project.architecture?`<h3>${escape(data.ui.architecture)}</h3><div class="architecture">${project.architecture.map(([name,value])=>`<div><strong>${escape(name)}</strong><span>${escape(value)}</span></div>`).join('')}</div>`:''}${project.notes?.length?`<h3>${escape(data.ui.notes)}</h3>${project.notes.map(note=>`<p>${escape(note)}</p>`).join('')}`:''}${project.embed?`<iframe class="embed-frame" src="${escape(project.embed)}" title="Shris Bakery live website" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" referrerpolicy="strict-origin-when-cross-origin"></iframe>`:''}<div class="actions">${externalLink(project.code,data.ui.code)}${externalLink(project.live,project.video?data.ui.watchExternal:(project.liveLabel||data.ui.live))}${externalLink(project.discussion,data.ui.discussion)}</div>${project.repoName?`<h3>${escape(data.ui.readme)}</h3><pre class="readme" id="readme-content">${escape(data.ui.readmeLoading)}</pre>`:''}</div>`;
    dialog.showModal();dialog.scrollTop=0;document.body.classList.add('dialog-open');icons();
    if(autoplay&&project.video) playWalkthrough(project.video);
    if(project.repoName) fetchReadme(project.repoName);
  }
  function playWalkthrough(videoId) {
    const container=dialog.querySelector('#modal-video');
    if(!container||!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return;
    container.innerHTML=`<iframe title="NowServing walkthrough" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=1&playsinline=1&rel=0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    // Replace the poster in place so playback never opens below the visible content.
    dialog.scrollTop=0;
    container.querySelector('iframe').focus({preventScroll:true});
  }
  async function fetchReadme(repoName) {
    readmeController?.abort();
    const controller=new AbortController();
    readmeController=controller;
    const timeout=setTimeout(()=>controller.abort(),8000);
    try {
      const response=await fetch(`https://api.github.com/repos/${encodeURIComponent(data.githubUsername)}/${encodeURIComponent(repoName)}/readme`,{headers:{Accept:'application/vnd.github.raw+json'},signal:controller.signal});
      if(!response.ok) throw new Error('README unavailable');
      const text=await response.text();
      const target=dialog.querySelector('#readme-content');
      if(target&&readmeController===controller) target.textContent=text.slice(0,1800)+(text.length>1800?'\n...':'');
    } catch {
      const target=dialog.querySelector('#readme-content');
      if(target&&readmeController===controller) target.textContent=data.ui.readmeUnavailable;
    }
    finally {clearTimeout(timeout);}
  }
  async function fetchGithubRepos() {
    const cacheKey=`portfolio-v2-repos-${data.githubUsername}`;
    let cached;
    try { cached=JSON.parse(localStorage.getItem(cacheKey)); } catch { cached=null; }
    if(cached&&Date.now()-cached.time>=0&&Date.now()-cached.time<3600000&&validRepositories(cached.repos)) {
      applyRepositories(cached.repos,data.ui.githubLive);return;
    }
    const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),8000);
    try {
      const response=await fetch(`https://api.github.com/users/${encodeURIComponent(data.githubUsername)}/repos?per_page=100&sort=updated`,{signal:controller.signal});
      if(!response.ok) throw new Error('GitHub unavailable');
      const repos=await response.json();
      if(!validRepositories(repos)) throw new Error('Invalid repository data');
      applyRepositories(repos,data.ui.githubLive);
      try {localStorage.setItem(cacheKey,JSON.stringify({time:Date.now(),repos}));} catch { /* Browsing still works when storage is disabled. */ }
    } catch { /* The checked-in snapshot keeps projects available offline. */ }
    finally { clearTimeout(timeout); }
  }
  function validRepositories(repos) {
    return Array.isArray(repos)&&repos.every(repo=>repo&&typeof repo.name==='string'&&Array.isArray(repo.topics)&&repo.topics.every(topic=>typeof topic==='string'));
  }
  function applyRepositories(repos,source) {
    state.projects=mergeRepositories(repos);state.source=source;updateProjectGrid();
    document.querySelector('#repo-count').textContent=String(repos.filter(r=>!r.fork&&!r.archived).length)+(repos.length===100?'+':'');
  }
  function initNavigation() {
    const nav=document.querySelector('.nav'),menu=document.querySelector('#mobile-menu'),trigger=document.querySelector('.menu-button');
    menu.innerHTML=`<div class="dialog-header"><span class="logo">${pixelLogo()}</span><button class="icon-button" data-menu-close aria-label="${data.ui.close}">${icon('x')}</button></div><nav class="mobile-nav-inner">${data.navigation.map(label=>`<a href="#${label.toLowerCase()}">${escape(label)}</a>`).join('')}</nav>`;
    trigger.addEventListener('click',()=>{menu.showModal();document.body.classList.add('dialog-open');trigger.setAttribute('aria-expanded','true');});
    menu.addEventListener('click',event=>{if(event.target.closest('[data-menu-close],a'))menu.close();});
    menu.addEventListener('close',()=>{document.body.classList.remove('dialog-open');trigger.setAttribute('aria-expanded','false');trigger.focus();});
    function updateNavigation() {
      nav.classList.toggle('scrolled',scrollY>24);
      let active='';
      document.querySelectorAll('main section[id]').forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id;});
      document.querySelectorAll('.nav-links a').forEach(link=>{if(link.hash==='#'+active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    }
    let queued=false;
    addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{updateNavigation();queued=false;});}},{passive:true});
    addEventListener('resize',()=>{if(innerWidth>768&&menu.open)menu.close();});
    updateNavigation();
  }
  function initReveal() {
    if(!('IntersectionObserver' in window))return;
    const active=new Set();
    let queued=0;
    const selectors='.reveal,.project-card,.section h2,.about-grid,.contact .email-line,.contact-links';
    function paint(){
      queued=0;
      if(reducedMotion.matches)return;
      const height=innerHeight;
      // Read geometry before writing styles to avoid layout thrashing while scrolling.
      const positions=[...active].filter(el=>el.isConnected).map(el=>[el,el.getBoundingClientRect().top]);
      for(const [el,top] of positions){
        const p=revealProgress(top,height);
        el.style.setProperty('--scroll-opacity',(.38+.62*p).toFixed(3));
        el.style.setProperty('--scroll-y',`${((1-p)*22).toFixed(2)}px`);
        el.style.setProperty('--scroll-scale',(.976+.024*p).toFixed(4));
      }
    }
    function schedule(){if(!queued&&!reducedMotion.matches)queued=requestAnimationFrame(paint);}
    revealObserver=new IntersectionObserver(entries=>{
      for(const entry of entries){
        entry.target.classList.add('scroll-reveal');
        if(entry.isIntersecting)active.add(entry.target);else active.delete(entry.target);
      }
      schedule();
    },{rootMargin:'80px 0px',threshold:0});
    function sync(){
      document.body.classList.toggle('scroll-motion',!reducedMotion.matches);
      if(reducedMotion.matches){cancelAnimationFrame(queued);queued=0;}
      document.querySelectorAll(selectors).forEach(el=>revealObserver.observe(el));
      schedule();
    }
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
    reducedMotion.addEventListener('change',sync);sync();
  }
  function revealProgress(top,height){
    if(height<=0)return 1;
    const p=Math.max(0,Math.min(1,(height*.96-top)/(height*.32)));
    return p*p*(3-2*p);
  }
  function initCursor() {
    const pointer=matchMedia('(hover: hover) and (pointer: fine)');
    const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
    let x=0,y=0,rx=0,ry=0,frame=0;
    function animate() {
      rx+=(x-rx)*.18;ry+=(y-ry)*.18;
      ring.style.transform=`translate(${rx-ring.offsetWidth/2}px,${ry-ring.offsetHeight/2}px)`;
      if(Math.abs(rx-x)+Math.abs(ry-y)>.1)frame=requestAnimationFrame(animate);else frame=0;
    }
    function sync() {document.body.classList.toggle('custom-cursor',pointer.matches&&!reducedMotion.matches);if(reducedMotion.matches||!pointer.matches){cancelAnimationFrame(frame);frame=0;}}
    document.addEventListener('pointermove',event=>{
      if(!pointer.matches||reducedMotion.matches||event.pointerType!=='mouse')return;
      x=event.clientX;y=event.clientY;
      if(!dot.style.opacity){rx=x;ry=y;}
      dot.style.opacity=ring.style.opacity='1';dot.style.transform=`translate(${x-5}px,${y-5}px)`;
      document.body.classList.toggle('cursor-hover',!!event.target.closest('a,button,.project-card'));
      if(!frame)frame=requestAnimationFrame(animate);
    });
    document.documentElement.addEventListener('pointerleave',()=>{dot.style.opacity=ring.style.opacity='0';});
    pointer.addEventListener('change',sync);reducedMotion.addEventListener('change',sync);sync();
  }
  function initInteractions() {
    document.querySelector('#project-grid').addEventListener('click',event=>{
      const reset=event.target.closest('[data-reset]');if(reset){state.filter='All';updateProjectGrid(true);return;}
      if(event.target.closest('a'))return;
      const card=event.target.closest('[data-project]');if(card)openProject(card.dataset.project,event.target.closest('button')||card.querySelector('button'),!!event.target.closest('[data-demo]'));
    });
    document.querySelector('.filter-bar').addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(button){state.filter=button.dataset.filter;updateProjectGrid(true);}});
    document.querySelectorAll('[data-skill]').forEach(button=>{
      const highlight=enabled=>document.querySelectorAll('[data-project]').forEach(card=>{const project=state.projects.find(p=>p.id===card.dataset.project);card.classList.toggle('dimmed',enabled&&!matches(project,button.dataset.skill));});
      button.addEventListener('pointerenter',()=>highlight(true));button.addEventListener('pointerleave',()=>highlight(false));button.addEventListener('focus',()=>highlight(true));button.addEventListener('blur',()=>highlight(false));
      button.addEventListener('click',()=>{state.filter=button.dataset.skill;updateProjectGrid(true);document.querySelector('#projects').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});});
    });
    dialog.addEventListener('click',event=>{
      if(event.target===dialog||event.target.closest('[data-close]'))dialog.close();
      const play=event.target.closest('[data-play]');
      if(play) playWalkthrough(play.dataset.play);
    });
    dialog.addEventListener('close',()=>{readmeController?.abort();dialog.innerHTML='';document.body.classList.remove('dialog-open');dialogTrigger?.focus();});
    const ticker=document.querySelector('.ticker'),toggle=document.querySelector('.ticker-toggle');
    toggle.addEventListener('click',()=>{const paused=ticker.classList.toggle('paused');toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Resume ticker':data.ui.pause);toggle.innerHTML=icon(paused?'play':'pause');icons();});
    let toastTimer;
    document.querySelector('.email-copy').addEventListener('click',async()=>{
      const toast=document.querySelector('#toast');
      try {await navigator.clipboard.writeText(data.email);toast.textContent=data.ui.copied;}catch{toast.textContent=data.ui.copyFailed;}
      clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.textContent='';},4000);
    });
  }
  renderNavigation();
  document.querySelector('#main-content').innerHTML = renderHero()+renderTicker()+renderAbout()+renderExperience()+renderProjects()+renderRecognition()+renderSkills()+renderContact();
  document.querySelector('#site-footer').className='site-footer';
  document.querySelector('#site-footer').textContent=`${data.ui.footer} / ${new Date().getFullYear()}`;
  applyRepositories(data.repositorySnapshot,data.ui.githubFallback);
  initNavigation();initReveal();initCursor();initInteractions();icons();fetchGithubRepos();
})();
