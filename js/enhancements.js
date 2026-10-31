/* Progressive enhancement: accessible motion, navigation and feedback */
document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.append(progress);
  const paintProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? Math.min(100,window.scrollY/max*100) : 0) + '%';
  };
  window.addEventListener('scroll', paintProgress, {passive:true});
  window.addEventListener('resize', paintProgress, {passive:true});
  paintProgress();
  const skip = document.createElement('a');
  skip.href='#about';skip.className='skip-link';skip.textContent='Skip to content';
  document.body.prepend(skip);
  if (toggle && nav) {
    toggle.setAttribute('aria-controls','nav-menu');
    toggle.setAttribute('aria-expanded',String(nav.classList.contains('active')));
    const sync = () => toggle.setAttribute('aria-expanded',String(nav.classList.contains('active')));
    toggle.addEventListener('click',sync);
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',sync));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&nav.classList.contains('active')){
        nav.classList.remove('active');sync();toggle.focus();
        const icon=toggle.querySelector('i');if(icon)icon.className='fa-solid fa-bars-staggered';
      }
    });
  }
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    a.rel='noopener noreferrer';
    if(!a.getAttribute('aria-label') && a.querySelector('i') && !a.textContent.trim()){
      a.setAttribute('aria-label',a.title || (a.href.includes('github')?'GitHub':'External profile'));
    }
  });
  const toast = document.getElementById('form-toast');
  if (toast) {toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');}
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const cards=document.querySelectorAll('.section-header,.about-text-card,.about-edu-card,.experience-card,.skill-category-card,.project-card,.cert-card,.contact-info-card,.contact-form-card');
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}
      });
    },{threshold:.08,rootMargin:'0px 0px -35px 0px'});
    cards.forEach(card=>{card.classList.add('reveal-ready');observer.observe(card);});
  }
});
