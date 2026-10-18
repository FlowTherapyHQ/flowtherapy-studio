/* V2 navigation layer; legacy site scripts and drawer behaviors are retained. */
(function () {
 const header=document.querySelector('.studio-header');
 if(!header)return;
 const nav=header.querySelector('.studio-nav');
 const toggle=header.querySelector('.studio-mobile-toggle');
 toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
 header.querySelectorAll('.studio-nav details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)header.querySelectorAll('.studio-nav details').forEach(o=>{if(o!==d)o.open=false;});}));
 header.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}));
 document.querySelectorAll('[data-studio-open]').forEach(a=>a.addEventListener('click',()=>{const target=document.getElementById(a.dataset.studioOpen);if(target&&target.tagName==='DETAILS')target.open=true;}));
 document.querySelectorAll('[data-studio-open-more]').forEach(a=>a.addEventListener('click',()=>{const target=document.querySelector('details.ft-more-ways');if(target)target.open=true;}));
 document.querySelectorAll('[data-studio-explore]').forEach(a=>a.addEventListener('click',(event)=>{
  event.preventDefault();const group=document.querySelector('details.ft-more-ways');if(group)group.open=true;
  const trigger=document.querySelector('.ft-explore-trigger[data-explore="'+a.dataset.studioExplore+'"]');
  if(trigger){trigger.click();document.getElementById(a.dataset.studioExplore)?.scrollIntoView({behavior:'smooth',block:'center'});}else document.getElementById('services')?.scrollIntoView({behavior:'smooth'});
 }));
 document.querySelectorAll('[data-studio-access]').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();const id=a.dataset.studioAccess==='music'?'ft-soul-button':'ft-text-size';document.getElementById(id)?.click();}));
})();
