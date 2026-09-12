(function(){
  const API='https://chezlanoisette--7ba67b72a3f411f186a31607ee4eb77e.web.val.run';
  const TOKEN_KEY='enneBServerAdminToken';
  let hydrating=false;
  const keys={music:'enneBMusicLibrary',program:'enneBProgram',announcements:'enneBAnnouncements'};
  const oldSet=Storage.prototype.setItem;
  const token=()=>localStorage.getItem(TOKEN_KEY)||'';
  const isAdminServer=()=>{try{return typeof isAdmin==='function'&&isAdmin()}catch(e){return false}};
  async function saveServer(key,value){
    const t=token();
    if(!t||!isAdminServer()||hydrating)return;
    try{await fetch(API+'/api/admin/content',{method:'PUT',headers:{'Content-Type':'application/json','Authorization':'Bearer '+t},body:JSON.stringify({key,value})})}catch(e){console.warn('Val Town server unavailable',e)}
  }
  Storage.prototype.setItem=function(k,v){
    oldSet.call(this,k,v);
    if(this===localStorage&&Object.values(keys).includes(k)&&!hydrating){try{saveServer(Object.keys(keys).find(x=>keys[x]===k),JSON.parse(v))}catch(e){}}
  };
  async function hydrate(){
    try{
      const r=await fetch(API+'/api/content',{cache:'no-store'});if(!r.ok)return;
      const d=await r.json();hydrating=true;
      for(const [key,store] of Object.entries(keys))if(Array.isArray(d[key])&&d[key].length)oldSet.call(localStorage,store,JSON.stringify(d[key]));
      hydrating=false;
      ['displayMusic','displayProgram','displayAnnouncements','displayAdminProgram'].forEach(fn=>{try{if(typeof window[fn]==='function')window[fn]()}catch(e){}});
    }catch(e){hydrating=false;console.warn('Val Town content load failed',e)}
  }
  function addControls(){
    if(!isAdminServer()||document.getElementById('serverAdminBox'))return;
    const box=document.createElement('div');box.id='serverAdminBox';box.style.cssText='background:#0b0b0b;border:1px solid #d4af37;border-radius:12px;padding:14px;margin:12px 0;color:#fff';
    box.innerHTML='<b style="color:#d4af37">🖥️ Serveur réel Val Town</b><div style="font-size:12px;color:#aaa;margin:6px 0">Les contenus enregistrés sont partagés avec tous les visiteurs.</div><button id="vtLogin">🔐 Connecter le serveur</button><button id="vtLogout" style="background:#333;color:#fff">Déconnecter</button><span id="vtState" style="font-size:12px;margin-left:8px"></span>';
    const target=document.querySelector('#adminPanel')||document.querySelector('[id*=admin]')||document.body.firstElementChild; (target||document.body).prepend(box);
    const state=()=>{box.querySelector('#vtState').textContent=token()?'● Connecté':'● Non connecté';box.querySelector('#vtState').style.color=token()?'#6f6':'#999'};
    box.querySelector('#vtLogin').onclick=()=>{window.open(API+'/admin','_blank');setTimeout(()=>{const t=prompt('Colle le jeton affiché par le panneau Admin Val Town :');if(t)localStorage.setItem(TOKEN_KEY,t.trim());state()},500)};
    box.querySelector('#vtLogout').onclick=()=>{localStorage.removeItem(TOKEN_KEY);state()};state();
  }
  window.addEventListener('load',()=>{hydrate();setInterval(addControls,1000);setTimeout(addControls,800)});
})();