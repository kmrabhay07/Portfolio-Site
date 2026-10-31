/** Responsive navigation polish, independent of animation libraries. */
document.addEventListener('DOMContentLoaded', () => {
  const menu=document.getElementById('nav-menu');
  const toggle=document.getElementById('nav-toggle');
  if(!menu || !toggle) return;
  const desktop=window.matchMedia('(min-width: 1121px)');
  const icon=toggle.querySelector('i');
  const closeMenu=()=>{
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded','false');
    if(icon) icon.className='fa-solid fa-bars-staggered';
  };
  const sync=()=>{
    if(desktop.matches) closeMenu();
    toggle.setAttribute('aria-expanded',String(menu.classList.contains('active')));
  };
  desktop.addEventListener?.('change',sync);
  document.addEventListener('pointerdown',e=>{
    if(!menu.classList.contains('active'))return;
    if(!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu();
  });
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  // Existing nav script handles toggling; this synchronizes state across sizes.
  sync();
});
