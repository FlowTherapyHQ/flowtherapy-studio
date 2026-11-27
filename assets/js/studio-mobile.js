(() => {
  const head = document.querySelector('studio-mobile-header');
  const foot = document.querySelector('studio-mobile-footer');
  if (!head || !foot) return;
  const logo = '<img src="/assets/images/flowtherapy-logo.png" alt="FlowTherapy Massage Co.">';
  const event = location.pathname.endsWith('/private-events.html');
  const flowChair = location.pathname.endsWith('/corporate-wellness.html');
  const musicControl = flowChair ? '' : '<details><summary>♫ Soul Flow</summary></details>';
  const home = '/index.html';
  const link = ([name,href]) => `<a href="${href}">${name}</a>`;
  const links = entries => entries.map(link).join('');
  const forms = ['Client Forms','/pages/client-forms.html'];
  head.innerHTML = `<header><a class="sm-brand" href="/index.html">${logo}</a><button class="sm-size" aria-label="Change text size">AAA</button>${musicControl}<a class="sm-action" href="${event?'#private-event-inquiry':'https://flowtherapy.noterro.com/'}">${event?'Plan Your Event':'Book Now'} →</a><button class="sm-menu" aria-controls="sm-nav" aria-expanded="false" aria-label="Menu">☰</button><nav id="sm-nav" hidden>${links([['More Ways to Flow',home+'#ways'],['About',home+'#about'],['Resources',home+'#flowhub'],forms,['Contact','#studio-contact']])}</nav></header>`;
  foot.innerHTML = `<footer><div class="sm-identity">${logo}<p>FlowTherapy Massage Co.</p><i>Discover the Rhythm of Relaxation.</i></div><div class="sm-columns"><section><h2>Quick Links</h2><a href="/index.html">Home</a><a href="/pages/client-forms.html">Client Forms</a><a href="/pages/flowmobile.html">FlowMobile</a><a href="/pages/corporate-wellness.html">FlowChair Anywhere</a><a href="/pages/private-events.html">Private Flow Events</a></section><section><h2>Policies</h2>${links([['Booking &amp; Cancellation','/pages/booking-cancellation.html'],['Respect Massage',home+'#respect-dialog'],['Privacy',home+'#privacy-dialog'],['Accessibility',home+'#accessibility-dialog']])}</section></div><section class="sm-contact"><h2>Contact</h2><a href="tel:+17373873569">737-387-FLOW</a><p>512-233-1764 (fax)</p><a href="mailto:hello@discoverflowtherapy.com">hello@discoverflowtherapy.com</a><p>FlowMobile serves Austin &amp; Central Texas</p></section><p class="sm-end">© ${new Date().getFullYear()} FlowTherapy Massage Co.<br>Better Bodywork Begins Here.</p></footer>`;
  const nav = head.querySelector('nav'), button = head.querySelector('.sm-menu');
  function toggle(open){nav.hidden = !open;button.setAttribute('aria-expanded',String(open));}
  button.onclick = () => { if (player) player.open = false; toggle(nav.hidden); };
  document.addEventListener('click', e => {if(!head.contains(e.target) || e.target.closest('#sm-nav a'))toggle(false);});
  document.addEventListener('keydown', e => {if(e.key==='Escape' && !nav.hidden){toggle(false);button.focus();}});
  let level = 0;
  head.querySelector('.sm-size').onclick = () => {level=(level+1)%3;document.body.style.setProperty('--sm-scale',String(1+level*.1));};
  const player=head.querySelector('details');
  if (player) player.ontoggle=()=>{if(player.open) toggle(false); if(player.open && !player.querySelector('iframe'))player.insertAdjacentHTML('beforeend','<iframe title="Soul Flow playlist" width="100%" height="152" src="https://open.spotify.com/embed/playlist/35kOQC6udy7D7cbl1kyhpG"></iframe>');};
  document.documentElement.classList.add('sm-ready');
  function followHash(){
    if(location.hash==='#studio-contact'){
      const target=matchMedia('(max-width:800px)').matches ? foot.querySelector('.sm-contact') : document.querySelector('.fm-footer,.preview-footer,#site-footer');
      target?.scrollIntoView();
    }
    if(['#privacy-dialog','#respect-dialog','#accessibility-dialog'].includes(location.hash)){
      const dialog=document.getElementById(location.hash.slice(1));if(dialog && !dialog.open)dialog.showModal();
    }
  }
  addEventListener('hashchange',followHash);
  addEventListener('load',followHash);
  followHash();
})();
