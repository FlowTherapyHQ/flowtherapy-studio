(() => {
 const $=s=>document.querySelector(s);
 const menu=$('#fm-menu-dialog'),plans=$('#fm-plan-dialog'),info=$('#fm-info-dialog');
 const focusBack=new WeakMap();
 const open=d=>{if(!d)return;focusBack.set(d,document.activeElement);if(!d.open)d.showModal();};
 const close=d=>{if(d?.open)d.close();};
 [menu,plans,info].filter(Boolean).forEach(d=>{
  d.addEventListener('close',()=>focusBack.get(d)?.focus());
  d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d);}});
 });
 document.querySelectorAll('[data-dialog-close]').forEach(b=>b.addEventListener('click',()=>close(b.closest('dialog'))));
 const services=$('#services');
 if(services&&$('#fm-menu-mount'))$('#fm-menu-mount').append(services);
 function showMenu(label){
  if(!services)return;
  const groups=Array.from(services.querySelectorAll('.ft-services-menu > details.ft-service-group'));
  groups.forEach(g=>g.open=label!=='all'&&g.querySelector('summary')?.textContent.toLowerCase().includes(label.toLowerCase()));
  open(menu);menu.scrollTop=0;
  if(label!=='all')requestAnimationFrame(()=>groups.find(g=>g.open)?.scrollIntoView({block:'start'}));
 }
 document.querySelectorAll('[data-menu]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showMenu(a.dataset.menu);}));
 document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const map={signature:'ft-open-signature-drawer',focused:'ft-open-focused-drawer',lymph:'ft-open-lymph-drawer'};const id=map[a.dataset.service];if(id)document.getElementById(id)?.click();else window.open('https://flowtherapy.noterro.com/service/321429/CrownFlow','_blank','noopener');}));
 services?.querySelectorAll('[aria-haspopup="dialog"]').forEach(b=>b.addEventListener('click',()=>close(menu),true));
 const panels=['flowpass-explore','flowpack-explore'].map(id=>document.getElementById(id)).filter(Boolean);
 // Mount both panels once; retain existing choice and enrollment listeners.
 panels.forEach(p=>$('#fm-plan-mount')?.append(p));
 function showPlan(id){
  const panel=document.getElementById(id);if(!panel||!plans)return;
  panels.forEach(p=>p.hidden=p!==panel);
  plans.querySelector('.fm-dialog-heading h2').textContent=id==='flowpass-explore'?'FlowPass':'FlowPack';
  open(plans);plans.scrollTop=0;
 }
 document.querySelectorAll('[data-plan-open]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showPlan(a.dataset.planOpen);}));
 document.querySelectorAll('.ft-plan-enroll').forEach(b=>b.addEventListener('click',()=>{if(!b.disabled){close(plans);close(menu);}},true));
 const descriptions={respect:['Respect Massage','FlowTherapy provides professional, therapeutic massage in a respectful environment. Your comfort, consent, and boundaries guide each session. You may request a change, decline a technique, or stop the session at any time. Sexual requests, harassment, and inappropriate behavior are not accepted.'],privacy:['Privacy','Please use the secure Noterro portal for health history and appointment information. Avoid sending sensitive health information through ordinary email. For questions about how your information is handled, contact hello@discoverflowtherapy.com.'],accessibility:['Accessibility','We aim to make FlowTherapy welcoming and easy to use. This website supports keyboard navigation and reduced motion. Use the text-size control in the header to enlarge the page. For booking assistance or to discuss access needs at the studio, call or text 512-790-FLOW.']};
 document.querySelectorAll('[data-info]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const entry=descriptions[a.dataset.info];if(!entry)return;const [title,text]=entry;$('#fm-info-title').textContent=title;$('#fm-info-copy').textContent=text;open(info);}));
 const toggle=$('.fm-menu-toggle'),nav=$('#fm-nav');toggle?.addEventListener('click',()=>{const yes=nav?.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(Boolean(yes)));});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}));
 let textLevel=0;$('#fm-text')?.addEventListener('click',()=>{textLevel=(textLevel+1)%3;document.querySelectorAll('.fm-main,.fm-footer').forEach(el=>el.style.zoom=String(1+textLevel*.1));});
 const wasReload=performance.getEntriesByType('navigation')[0]?.type==='reload';
 function hash(){if(location.hash==='#flowpass')showPlan('flowpass-explore');else if(location.hash==='#flowpack')showPlan('flowpack-explore');else if(location.hash==='#services'){if(!wasReload)showMenu('all');history.replaceState(null,'',location.pathname+location.search);}}
 window.addEventListener('hashchange',hash);hash();
})();

/* Enrollment stays inside the plan dialog. */
(() => {
 const dialog=document.getElementById('fm-plan-dialog');
 const mount=document.getElementById('fm-plan-mount');
 const formView=document.getElementById('ft-enroll-form-view');
 const successView=document.getElementById('ft-enroll-success');
 if(!dialog||!mount||!formView||!successView)return;
 const stage=document.createElement('div');stage.id='fm-enrollment-stage';stage.hidden=true;
 stage.style.cssText='color:#06283e;padding:12px 0;';
 const back=document.createElement('button');back.type='button';back.textContent='← Back to plan details';
 back.style.cssText='background:transparent;border:0;color:#06283e;text-decoration:underline;padding:10px 0;margin-bottom:14px;font:inherit;cursor:pointer;';
 stage.append(back,formView,successView);dialog.append(stage);
 let selectedPanel=null,trigger=null;
 const details=()=>{
  stage.hidden=true;mount.hidden=false;
  dialog.querySelector('.fm-dialog-heading h2').textContent=selectedPanel?.id==='flowpack-explore'?'FlowPack':'FlowPass';
  dialog.scrollTop=0;
 };
 back.addEventListener('click',()=>{details();trigger?.focus();});
 document.addEventListener('click',event=>{
  const button=event.target.closest('.ft-plan-enroll');
  if(button&&dialog.contains(button)){
   if(button.disabled)return;
   event.preventDefault();event.stopImmediatePropagation();
   selectedPanel=button.closest('.ft-plan-explore');trigger=button;
   const choice=selectedPanel?.querySelector('.ft-plan-choice[aria-pressed="true"]');
   if(!choice)return;
   const plan=choice.dataset.plan,price=choice.dataset.price;
   document.getElementById('ft-enroll-plan').textContent=`${plan} — ${price}`;
   document.getElementById('ft-enroll-plan-field').value=plan;
   document.getElementById('ft-enroll-price-field').value=price;
   document.getElementById('ft-enroll-title').textContent=selectedPanel.id==='flowpass-explore'?'Start My Membership':'Get My FlowPack';
   formView.hidden=false;successView.hidden=true;mount.hidden=true;stage.hidden=false;
   const status=formView.querySelector('.fm-submit-status');if(status)status.textContent='';
   dialog.querySelector('.fm-dialog-heading h2').textContent='Your enrollment request';
   dialog.scrollTop=0;formView.querySelector('input:not([type="hidden"])')?.focus();
  }
  if(event.target.closest('#ft-enroll-done')&&stage.contains(event.target)){
   event.preventDefault();event.stopImmediatePropagation();dialog.close();
  }
 },true);
 dialog.addEventListener('close',()=>{details();document.body.classList.remove('ft-modal-open');});
 const style=document.createElement('style');style.textContent=`
 #fm-plan-dialog #fm-enrollment-stage[hidden],#fm-plan-dialog #fm-plan-mount[hidden],#fm-plan-dialog #ft-enroll-form-view[hidden],#fm-plan-dialog #ft-enroll-success[hidden]{display:none!important;}
 #fm-plan-dialog #fm-enrollment-stage{background:#f5edde;border-radius:12px;padding:18px;color:#06283e;}
 #fm-plan-dialog #fm-enrollment-stage h2,#fm-plan-dialog #fm-enrollment-stage h3,#fm-plan-dialog #fm-enrollment-stage p,#fm-plan-dialog #fm-enrollment-stage label,#fm-plan-dialog #fm-enrollment-stage span,#fm-plan-dialog #fm-enrollment-stage strong{color:#06283e;}
 #fm-plan-dialog .ft-enroll-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
 #fm-plan-dialog .ft-enroll-field--full{grid-column:1/-1;}
 #fm-plan-dialog .ft-enroll-field label{display:block;margin-bottom:6px;}
 #fm-plan-dialog .ft-enroll-field input,#fm-plan-dialog .ft-enroll-field textarea{box-sizing:border-box;width:100%;background:white;color:#06283e;border:1px solid #9eafb5;border-radius:8px;padding:12px;font:400 16px Arial,sans-serif;}
 #fm-plan-dialog .ft-enroll-submit{background:#06283e;color:white;border:0;border-radius:28px;padding:14px 22px;cursor:pointer;}
 #fm-plan-dialog .ft-enroll-submit:disabled{opacity:.6;}
 #fm-plan-dialog .ft-enroll-ack{display:flex;align-items:flex-start;gap:10px;margin:18px 0;}
 #fm-plan-dialog .ft-enroll-ack input{flex-shrink:0;margin-top:5px;}
 @media(max-width:480px){#fm-plan-dialog .ft-enroll-grid{grid-template-columns:1fr;}}
 `;document.head.append(style);
})();
