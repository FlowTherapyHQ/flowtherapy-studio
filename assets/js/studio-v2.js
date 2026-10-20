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

/* Make V2 service menu labels open their corresponding existing accordion. */
(function(){
 const nav=document.querySelector('.studio-header .studio-nav');
 const menu=document.querySelector('.ft-services-menu');
 if(!nav||!menu)return;
 const names={'FlowClinic':'FlowClinic','SpecialtyFlow':'SpecialtyFlow','SpaFlow':'SpaFlow','FlowBoost':'FlowBoost','Recovery Lab':'Recovery Lab'};
 nav.querySelectorAll('.studio-dropdown a[href="#services"]').forEach(link=>{
  const wanted=names[link.textContent.trim()];if(!wanted)return;
  link.addEventListener('click',()=>{
   const sections=Array.from(menu.querySelectorAll(':scope > details.ft-service-group'));
   const target=sections.find(el=>el.querySelector(':scope > summary')?.textContent.replace(/\s+/g,' ').toLowerCase().includes(wanted.toLowerCase()));
   if(target){target.open=true;window.requestAnimationFrame(()=>target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));}
  });
 });
})();

// Category tiles open and reveal the corresponding service group.
document.querySelectorAll('.studio-card').forEach(card=>{if(card.dataset.studioOpenMore)return;const label=card.querySelector('h2')?.textContent.trim();card.addEventListener('click',()=>{const group=Array.from(document.querySelectorAll('.ft-services-menu > details')).find(d=>d.querySelector('summary strong')?.textContent.includes(label));if(group){group.open=true;requestAnimationFrame(()=>group.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));}});});
