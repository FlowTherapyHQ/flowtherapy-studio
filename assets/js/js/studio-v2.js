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
 const names={'FlowClinic':'FlowClinic','SpecialtyFlow':'SpecialtyFlow','FlowSpa':'FlowSpa','FlowBoost':'FlowBoost','Recovery Lab':'Recovery Lab'};
 nav.querySelectorAll('.studio-dropdown a[href="#services"]').forEach(link=>{
  const wanted=names[link.textContent.trim()];if(!wanted)return;
  link.addEventListener('click',()=>{
   const sections=Array.from(menu.querySelectorAll(':scope > details.ft-service-group'));
   const target=sections.find(el=>el.querySelector(':scope > summary')?.textContent.replace(/\s+/g,' ').toLowerCase().includes(wanted.toLowerCase()));
   if(target){target.open=true;window.requestAnimationFrame(()=>target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));}
  });
 });
})();

/* V2 editorial sections. No changes to existing service cards, booking, drawers or original content. */
(function(){
 const main=document.querySelector('body.flowtherapy-home main');
 if(!main || document.querySelector('.ft-v2-values'))return;
 const make=(html)=>{const wrapper=document.createElement('div');wrapper.innerHTML=html.trim();return wrapper.firstElementChild;};
 const values=make(`<section class="ft-v2-values" aria-labelledby="ft-v2-values-heading"><div class="ft-v2-values-inner"><div class="ft-v2-values-intro"><p class="ft-v2-eyebrow">The FlowTherapy experience</p><h2 id="ft-v2-values-heading">More Than a Massage</h2><p>Therapeutic care, restorative tools, and personalized attention—because your wellness deserves more.</p><a href="#about">What makes us different →</a></div><div class="ft-v2-value-grid"><article class="ft-v2-value"><span class="ft-v2-value-icon" aria-hidden="true">✧</span><h3>Trauma-Informed Care</h3><p>A safe, supportive space for your healing journey.</p></article><article class="ft-v2-value"><span class="ft-v2-value-icon" aria-hidden="true">♡</span><h3>Personalized Treatment</h3><p>Every session tailored to your unique needs.</p></article><article class="ft-v2-value"><span class="ft-v2-value-icon" aria-hidden="true">◉</span><h3>Restorative Tools</h3><p>Hot towels, cupping, muscle release, aroma and more.</p></article><article class="ft-v2-value"><span class="ft-v2-value-icon" aria-hidden="true">♧</span><h3>Whole-Person Wellness</h3><p>Supporting your body, mind, and nervous system.</p></article></div></div></section>`);
 const paths=[
 ['▦','FlowStart','New clients start here.','#flowstart','Learn more →'],
 ['✿','FlowPass','Wellness made routine.','#services','View details →'],
 ['◉','FlowPack','Save more. Flow longer.','#services','View details →'],
 ['♧','FlowGift','Wellness always fits.','https://app.squareup.com/gift/MLV560DXHSF4H/order','Explore →'],
 ['⌂','FlowMobile','Therapeutic massage at your location.','#services','Learn more →'],
 ['♧','FlowChair','On-site chair massage for your team.','#services','Learn more →']
 ];
 const pathways=make(`<section class="ft-v2-pathways" aria-labelledby="ft-v2-pathways-heading"><div class="ft-v2-pathways-inner"><div class="ft-v2-pathways-intro"><p class="ft-v2-eyebrow">More ways to flow</p><h2 id="ft-v2-pathways-heading">Wellness Your Way</h2><p>Flexible options to fit your lifestyle.</p></div><div class="ft-v2-pathways-grid">${paths.map(([icon,title,desc,href,cta])=>`<a class="ft-v2-path" href="${href}" data-ft-v2-path="${title}"><span class="ft-v2-path-icon" aria-hidden="true">${icon}</span><strong>${title}</strong><span>${desc}</span><b>${cta}</b></a>`).join('')}</div></div></section>`);
 const flowstart=main.querySelector('.ft-flowstart');
 if(flowstart){flowstart.before(values);flowstart.before(pathways);}
 else {main.querySelector('#services')?.after(values,pathways);}
 pathways.querySelectorAll('[data-ft-v2-path]').forEach(link=>link.addEventListener('click',function(e){
  const title=this.dataset.ftV2Path;
  if(title==='FlowPass'||title==='FlowPack'||title==='FlowMobile'||title==='FlowChair'){
   const more=main.querySelector('details.ft-more-ways');if(more)more.open=true;
   const trigger=[...document.querySelectorAll('.ft-explore-trigger')].find(x=>x.textContent.toLowerCase().includes(title.toLowerCase()));
   if(trigger){e.preventDefault();trigger.click();}
  }
  if(title==='FlowStart'){const target=main.querySelector('.ft-flowstart');if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}}
 }));
})();
