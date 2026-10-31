/** Fluid UI: pointer effects are intentionally opt-in for fine pointers only. */
document.addEventListener('DOMContentLoaded', () => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduced.matches) return;
  const cursor=document.createElement('div');
  cursor.className='fluid-cursor-light';
  cursor.setAttribute('aria-hidden','true');
  document.body.appendChild(cursor);
  let pointerX=-1000,pointerY=-1000,currentX=-1000,currentY=-1000,frame=0,visible=false;
  const animate=()=>{
    currentX+=(pointerX-currentX)*.11;
    currentY+=(pointerY-currentY)*.11;
    cursor.style.transform='translate3d('+(currentX-230)+'px,'+(currentY-230)+'px,0)';
    if(visible || Math.abs(pointerX-currentX)>.5 || Math.abs(pointerY-currentY)>.5) frame=requestAnimationFrame(animate);
    else frame=0;
  };
  window.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse')return;
    pointerX=e.clientX;pointerY=e.clientY;
    if(!visible){visible=true;cursor.classList.add('is-visible');}
    if(!frame)frame=requestAnimationFrame(animate);
  },{passive:true});
  document.addEventListener('pointerleave',()=>{visible=false;cursor.classList.remove('is-visible');});
  window.addEventListener('blur',()=>{visible=false;cursor.classList.remove('is-visible');});
  const cards=[...document.querySelectorAll('.project-card,.skill-category-card,.cert-card,.stat-card')];
  for(const card of cards){
    card.classList.add('fluid-card');
    let raf=0,localX=0,localY=0,rx=0,ry=0;
    const paint=()=>{
      card.style.setProperty('--fluid-x',localX+'px');
      card.style.setProperty('--fluid-y',localY+'px');
      card.style.setProperty('--fluid-rotate-x',rx+'deg');
      card.style.setProperty('--fluid-rotate-y',ry+'deg');
      raf=0;
    };
    card.addEventListener('pointermove',e=>{
      const rect=card.getBoundingClientRect();
      localX=e.clientX-rect.left;localY=e.clientY-rect.top;
      rx=Math.max(-3,Math.min(3,(.5-localY/rect.height)*6));
      ry=Math.max(-3,Math.min(3,(localX/rect.width-.5)*6));
      if(!raf)raf=requestAnimationFrame(paint);
    },{passive:true});
    card.addEventListener('pointerleave',()=>{
      if(raf)cancelAnimationFrame(raf);
      raf=0;rx=0;ry=0;
      card.style.setProperty('--fluid-rotate-x','0deg');
      card.style.setProperty('--fluid-rotate-y','0deg');
    });
  }
  for(const button of document.querySelectorAll('.hero-buttons .btn,.nav-actions .btn')){
    button.classList.add('fluid-magnetic');
    let raf=0,x=0,y=0;
    button.addEventListener('pointermove',e=>{
      const r=button.getBoundingClientRect();
      x=Math.max(-9,Math.min(9,(e.clientX-r.left-r.width/2)*.10));
      y=Math.max(-7,Math.min(7,(e.clientY-r.top-r.height/2)*.10));
      if(!raf)raf=requestAnimationFrame(()=>{button.style.setProperty('--fluid-mx',x+'px');button.style.setProperty('--fluid-my',y+'px');raf=0;});
    },{passive:true});
    button.addEventListener('pointerleave',()=>{
      if(raf)cancelAnimationFrame(raf);raf=0;
      button.style.setProperty('--fluid-mx','0px');
      button.style.setProperty('--fluid-my','0px');
    });
  }
});
