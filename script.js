// Language state
let currentLang='zh';
function toggleLang(){
  currentLang=currentLang==='zh'?'en':'zh';
  document.querySelectorAll('[data-zh]').forEach(el=>{
    const txt=el.getAttribute('data-'+currentLang);
    if(txt!==null)el.innerHTML=txt;
  });
  document.documentElement.lang=currentLang==='zh'?'zh-CN':'en';
  document.querySelectorAll('.lang-toggle').forEach(btn=>{btn.textContent=currentLang==='zh'?'EN':'中文'});
}

// Switch to main app after CTA click
function enterApp(){
  const hero=document.querySelector('.hero');
  const app=document.querySelector('.main-app');
  if(hero)hero.style.display='none';
  if(app){app.classList.add('active');window.scrollTo({top:0,behavior:'auto'})}
  switchTab('company',document.querySelector('.tab-btn[data-tab="company"]'));
}
function openAppToTab(tabId){
  const hero=document.querySelector('.hero');
  const app=document.querySelector('.main-app');
  if(hero)hero.style.display='none';
  if(app){app.classList.add('active');window.scrollTo({top:0,behavior:'auto'})}
  const btn=document.querySelector('.tab-btn[data-tab="'+tabId+'"]');
  switchTab(tabId,btn);
}
/* ---- 首页珠宝轮播 ---- */
let carouselIdx=0, carouselCount=0, carouselTimer=null;
function carouselGo(i){
  const slides=document.querySelectorAll('.carousel-slide');
  const dots=document.querySelectorAll('.carousel-dot');
  if(!slides.length)return;
  carouselIdx=(i+slides.length)%slides.length;
  slides.forEach((s,idx)=>s.classList.toggle('active',idx===carouselIdx));
  dots.forEach((d,idx)=>d.classList.toggle('active',idx===carouselIdx));
}
function carouselNext(){carouselGo(carouselIdx+1)}
function carouselPrev(){carouselGo(carouselIdx-1)}
function startCarousel(){
  carouselCount=document.querySelectorAll('.carousel-slide').length;
  if(!carouselCount)return;
  if(carouselTimer)clearInterval(carouselTimer);
  carouselTimer=setInterval(carouselNext,4500);
  // 鼠标悬停暂停
  const c=document.getElementById('hero-carousel');
  if(c){
    c.addEventListener('mouseenter',()=>{if(carouselTimer)clearInterval(carouselTimer)});
    c.addEventListener('mouseleave',startCarousel);
  }
}

function backToHero(){
  const hero=document.querySelector('.hero');
  const app=document.querySelector('.main-app');
  if(hero)hero.style.display='flex';
  if(app)app.classList.remove('active');
  window.scrollTo({top:0,behavior:'auto'});
}

// Tab switch
function switchTab(tabId,btnEl){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  if(btnEl)btnEl.classList.add('active');
  else{
    const alt=document.querySelector('.tab-btn[data-tab="'+tabId+'"]');
    if(alt)alt.classList.add('active');
  }
  const panel=document.getElementById('tab-'+tabId);
  if(panel)panel.classList.add('active');
  document.querySelector('.mobile-drawer')?.classList.remove('open');
  const header=document.querySelector('.app-header');
  if(header)window.scrollTo({top:header.offsetTop,behavior:'smooth'});
}

// Particles
function initParticles(){
  const container=document.querySelector('.hero-particles');
  if(!container)return;
  for(let i=0;i<45;i++){
    const p=document.createElement('div');
    p.className='particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(7+Math.random()*13)+'s';
    p.style.animationDelay=Math.random()*10+'s';
    const s=(1+Math.random()*2)+'px';
    p.style.width=s;p.style.height=s;
    container.appendChild(p);
  }
}

// Nav scroll effect (for app header)
function initHeaderScroll(){
  const h=document.querySelector('.app-header');
  if(!h)return;
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(y>20){h.style.boxShadow='0 10px 40px rgba(0,0,0,.5)'}
    else{h.style.boxShadow='none'}
  });
}

// Scroll animations
function initScrollAnimations(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
  },{threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
}

// Mobile menu
function initMobileMenu(){
  const btn=document.querySelector('.mobile-menu-btn');
  const drawer=document.querySelector('.mobile-drawer');
  if(btn&&drawer){
    btn.addEventListener('click',()=>drawer.classList.toggle('open'));
  }
}

// Init
document.addEventListener('DOMContentLoaded',()=>{
  initParticles();
  initHeaderScroll();
  initScrollAnimations();
  initMobileMenu();
  initAuth();
  startCarousel();
});

/* ============ 财气珠宝店 - 登录注册模块 ============ */
const CQ_USERS_KEY='caiqi_jewelry_users_v1';
const CQ_CURUSER_KEY='caiqi_jewelry_current_v1';

function readUsers(){try{return JSON.parse(localStorage.getItem(CQ_USERS_KEY)||'{}')}catch(e){return {}}}
function writeUsers(u){localStorage.setItem(CQ_USERS_KEY,JSON.stringify(u))}
function getCurrent(){try{return JSON.parse(localStorage.getItem(CQ_CURUSER_KEY)||'null')}catch(e){return null}}
function setCurrent(u){if(u)localStorage.setItem(CQ_CURUSER_KEY,JSON.stringify(u));else localStorage.removeItem(CQ_CURUSER_KEY)}
function pwHash(pw){
  let h=2166136261>>>0;
  for(let i=0;i<pw.length;i++){h^=pw.charCodeAt(i);h=Math.imul(h,16777619)}
  return 'h_'+h.toString(16)+'_'+pw.length;
}

// ---- 密码强度检测 ----
function pwChecks(pw){
  return {
    len: pw.length>=8,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    digit: /\d/.test(pw),
    spec: /[^A-Za-z0-9]/.test(pw)
  };
}
function pwScore(pw){
  const c=pwChecks(pw);
  const types=[c.lower,c.upper,c.digit,c.spec].filter(Boolean).length;
  if(!c.len||types<2)return 0;
  if(types===2)return 1;
  if(types===3)return 2;
  if(types>=4)return 3;
  return 1;
}

// ---- 初始化 ----
function initAuth(){
  refreshUserChip();
  bindAuthUIActions();
  document.addEventListener('click',e=>{
    const menu=document.querySelector('.user-menu');
    const chip=document.querySelector('.user-chip');
    if(menu&&chip&&!chip.contains(e.target)&&!menu.contains(e.target))menu.classList.remove('open');
  });
  // 输入框联动
  const bind=ids=>{ids.forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.addEventListener('input',updateFormButtons);
  })};
  bind(['login-phone','login-password','reg-phone','reg-username','reg-password','reg-confirm','reg-wechat','reg-email','forgot-phone','forgot-email','reset-phone','reset-temp-pw','reset-new-pw','reset-confirm-pw']);
  const rp=document.getElementById('reg-phone');
  if(rp)rp.addEventListener('input',()=>{rp.value=rp.value.replace(/\D/g,'').substring(0,11)});
  const lp=document.getElementById('login-phone');
  if(lp)lp.addEventListener('input',()=>{lp.value=lp.value.replace(/\D/g,'').substring(0,11)});
}
function refreshUserChip(){
  const pairs=[['header-login-wrap','header-user-wrap'],['hero-login-wrap','hero-user-wrap']];
  const u=getCurrent();
  pairs.forEach(pair=>{
    const wrapLogin=document.getElementById(pair[0]);
    const wrapUser=document.getElementById(pair[1]);
    if(!wrapLogin||!wrapUser)return;
    if(u){wrapLogin.style.display='none';wrapUser.style.display='block'}
    else{wrapLogin.style.display='block';wrapUser.style.display='none'}
  });
  if(u){
    const nameChar=(u.username||u.phone||'财').trim().charAt(0).toUpperCase();
    document.querySelectorAll('.user-avatar').forEach(av=>av.textContent=nameChar);
    document.querySelectorAll('.user-chip .name').forEach(nm=>nm.textContent=u.username||u.phone);
    document.querySelectorAll('.um-phone').forEach(phoneEl=>{
      phoneEl.innerHTML='账号：'+(u.phone?u.phone.substring(0,3)+'****'+u.phone.substring(7):u.username)
    });
  }
}

// ---- 打开/关闭 Auth Modal ----
function openAuth(mode){
  const m=document.getElementById('auth-modal');
  if(!m)return;
  m.classList.add('active');
  if(mode==='forgot'){switchAuthTab('forgot');return}
  if(mode==='reset'){switchAuthTab('reset');return}
  switchAuthTab(mode==='register'?'register':'login');
  clearAuthMsg();
  const a1=document.getElementById('agree-terms-check');if(a1)a1.classList.remove('checked');
  const a2=document.getElementById('agree-terms-check-reg');if(a2)a2.classList.remove('checked');
  if(mode==='register')refreshPwStrength();
  updateFormButtons();
}
function closeAuth(){document.getElementById('auth-modal')?.classList.remove('active')}
function switchAuthTab(tab){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.toggle('active',f.dataset.form===tab));
  clearAuthMsg();
  updateFormButtons();
}
function toggleAgree(el){el.classList.toggle('checked');updateFormButtons()}
function clearAuthMsg(){
  document.querySelectorAll('.auth-error,.auth-success').forEach(e=>{e.style.display='none';e.textContent=''});
}
function showAuthError(msg){
  const actives=document.querySelectorAll('.auth-form.active .auth-error');
  const el=actives.length>0?actives[0]:document.getElementById('auth-error-common');
  if(el){el.textContent=msg;el.style.display='block'}
}
function showAuthSuccess(msg){
  const actives=document.querySelectorAll('.auth-form.active .auth-success');
  const el=actives.length>0?actives[0]:document.getElementById('auth-success-common');
  if(el){el.textContent=msg;el.style.display='block'}
}

// ---- 按钮禁用校验 ----
function isLoginFormValid(){
  const phone=(document.getElementById('login-phone').value||'').trim();
  const pw=document.getElementById('login-password').value;
  const agree=document.getElementById('agree-terms-check')?.classList.contains('checked');
  return phone.length===11&&pw.length>=1&&agree;
}
function isRegFormValid(){
  const phone=(document.getElementById('reg-phone').value||'').trim();
  const name=(document.getElementById('reg-username').value||'').trim();
  const pw=document.getElementById('reg-password').value;
  const cpw=document.getElementById('reg-confirm').value;
  const wechat=(document.getElementById('reg-wechat').value||'').trim();
  const email=(document.getElementById('reg-email').value||'').trim();
  const agree=document.getElementById('agree-terms-check-reg')?.classList.contains('checked');
  const c=pwChecks(pw);const types=[c.lower,c.upper,c.digit,c.spec].filter(Boolean).length;
  const pwOK=c.len&&types>=3;
  const emailOK=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return phone.length===11&&name.length>=1&&pwOK&&cpw===pw&&agree&&wechat.length>=1&&emailOK;
}
function updateFormButtons(){
  const lb=document.getElementById('login-btn');
  const rb=document.getElementById('register-btn');
  if(lb)lb.disabled=!isLoginFormValid();
  if(rb)rb.disabled=!isRegFormValid();
}

// ---- 密码强度UI ----
function refreshPwStrength(){
  const pw=document.getElementById('reg-password').value||'';
  const bars=document.querySelectorAll('.pw-bar');
  const score=pwScore(pw);
  bars.forEach((b,i)=>{
    b.classList.remove('l1','l2','l3');
    if(i<score)b.classList.add('l'+Math.max(score,1));
  });
  const c=pwChecks(pw);
  const h=document.getElementById('pw-hint');
  if(h){
    const tag=ok=>ok?'<span class="ok">✔</span>':'<span class="bad">✘</span>';
    h.innerHTML=tag(c.len)+' 至少8位 &nbsp;&nbsp; '+tag(c.upper||c.lower)+' 含字母 &nbsp;&nbsp; '+tag(c.digit)+' 含数字 &nbsp;&nbsp; '+tag(c.spec)+' 含特殊符号<br>'+
    '<small>至少3种组合（大小写字母、数字、特殊符号）</small>';
  }
  updateFormButtons();
}

// ---- 密码可见切换 ----
function togglePw(inputId,btn){
  const i=document.getElementById(inputId);if(!i)return;
  const show=i.type==='password';
  i.type=show?'text':'password';
  if(btn)btn.textContent=show?'隐藏':'显示';
}

// ---- 执行登录 / 注册 ----
function doLogin(){
  clearAuthMsg();
  const agree=document.getElementById('agree-terms-check').classList.contains('checked');
  if(!agree){showAuthError('请先勾选同意用户协议和隐私政策');return}
  const phone=(document.getElementById('login-phone').value||'').trim();
  const pw=document.getElementById('login-password').value;
  if(phone.length!==11||!/^1\d{10}$/.test(phone)){showAuthError('请输入正确的11位手机号');return}
  if(!pw){showAuthError('请输入密码');return}
  const users=readUsers();
  const u=users[phone];
  if(!u){showAuthError('该手机号尚未注册，请先注册');return}
  if(u.pwHash!==pwHash(pw)){showAuthError('密码错误，请重试');return}
  const cur={phone:u.phone,username:u.username,loginAt:Date.now()};
  setCurrent(cur);
  showAuthSuccess('登录成功！欢迎来到财气珠宝店');
  setTimeout(()=>{closeAuth();refreshUserChip()},700);
}
function doRegister(){
  clearAuthMsg();
  const agree=document.getElementById('agree-terms-check-reg').classList.contains('checked');
  if(!agree){showAuthError('请先勾选同意用户协议和隐私政策');return}
  const phone=(document.getElementById('reg-phone').value||'').trim();
  const username=(document.getElementById('reg-username').value||'').trim();
  const pw=document.getElementById('reg-password').value;
  const cpw=document.getElementById('reg-confirm').value;
  const wechat=(document.getElementById('reg-wechat').value||'').trim();
  const email=(document.getElementById('reg-email').value||'').trim();
  if(phone.length!==11||!/^1\d{10}$/.test(phone)){showAuthError('请输入正确的11位手机号');return}
  if(!username){showAuthError('请输入用户名');return}
  if(!wechat){showAuthError('请输入微信号或QQ号');return}
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showAuthError('请输入正确的邮箱地址');return}
  const c=pwChecks(pw);const types=[c.lower,c.upper,c.digit,c.spec].filter(Boolean).length;
  if(!(c.len&&types>=3)){showAuthError('密码强度不足：至少8位，且含大小写/数字/特殊符号中至少3种');return}
  if(cpw!==pw){showAuthError('两次密码输入不一致');return}
  const users=readUsers();
  if(users[phone]){showAuthError('该手机号已注册，请直接登录');return}
  users[phone]={phone,username,pwHash:pwHash(pw),wechat,email,createdAt:Date.now()};
  writeUsers(users);
  const cur={phone,username,loginAt:Date.now()};
  setCurrent(cur);
  showAuthSuccess('注册成功！已自动登录，欢迎加入财气珠宝店');
  setTimeout(()=>{closeAuth();refreshUserChip()},900);
}
function doLogout(){
  setCurrent(null);
  document.querySelector('.user-menu')?.classList.remove('open');
  refreshUserChip();
}
function toggleUserMenu(){document.querySelector('.user-menu')?.classList.toggle('open')}

// ---- 忘记密码 / 重置密码 ----
function switchToForgot(){
  switchAuthTab('forgot');
  clearAuthMsg();
  // 清空找回密码表单
  const fp=document.getElementById('forgot-phone');if(fp)fp.value='';
  const fe=document.getElementById('forgot-email');if(fe)fe.value='';
  const fr=document.getElementById('forgot-result');if(fr){fr.style.display='none';fr.innerHTML=''}
}
function generateTempPassword(){
  const upper='ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower='abcdefghijkmnpqrstuvwxyz';
  const digit='23456789';
  const spec='!@#$%';
  const all=upper+lower+digit+spec;
  // 确保至少各一种
  let pw=[upper[Math.floor(Math.random()*upper.length)],lower[Math.floor(Math.random()*lower.length)],digit[Math.floor(Math.random()*digit.length)],spec[Math.floor(Math.random()*spec.length)]];
  for(let i=0;i<6;i++)pw.push(all[Math.floor(Math.random()*all.length)]);
  // 打乱
  for(let i=pw.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pw[i],pw[j]]=[pw[j],pw[i]]}
  return pw.join('');
}
function doForgotPassword(){
  clearAuthMsg();
  const phone=(document.getElementById('forgot-phone').value||'').trim();
  const email=(document.getElementById('forgot-email').value||'').trim();
  if(phone.length!==11||!/^1\d{10}$/.test(phone)){showAuthError('请输入正确的11位手机号');return}
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showAuthError('请输入正确的邮箱地址');return}
  const users=readUsers();
  const u=users[phone];
  if(!u){showAuthError('该手机号尚未注册');return}
  if(u.email!==email){showAuthError('邮箱与注册时不一致，请核对后重试');return}
  // 生成临时密码
  const tempPw=generateTempPassword();
  u.pwHash=pwHash(tempPw);
  users[phone]=u;
  writeUsers(users);
  // 显示结果（模拟邮件发送）
  const fr=document.getElementById('forgot-result');
  if(fr){
    fr.style.display='block';
    fr.className='auth-success';
    fr.style.lineHeight='2';
    fr.innerHTML='<strong>新密码已发送至您的邮箱！</strong><br>'+
      '手机号：'+phone.substring(0,3)+'****'+phone.substring(7)+'<br>'+
      '邮箱：'+email.substring(0,2)+'***'+email.substring(email.indexOf('@'))+'<br><br>'+
      '<span style="font-size:12px;color:#807868">（演示环境无法真实发送邮件，您的新临时密码为：</span>'+
      '<code style="background:rgba(212,175,55,.1);padding:2px 8px;border-radius:4px;color:#d4af37;font-size:14px;letter-spacing:1px">'+tempPw+'</code>'+
      '<span style="font-size:12px;color:#807868">）</span><br><br>'+
      '<button type="button" class="auth-btn" style="margin-top:4px" onclick="switchToReset(\''+phone+'\')">前往重置密码</button>'+
      '<button type="button" class="auth-btn-secondary" style="margin-top:4px" onclick="switchAuthTab(\'login\')">用临时密码登录</button>';
  }
  // 清空表单
  const fp=document.getElementById('forgot-phone');if(fp)fp.value='';
  const fe=document.getElementById('forgot-email');if(fe)fe.value='';
}
function switchToReset(phone){
  switchAuthTab('reset');
  clearAuthMsg();
  const rp=document.getElementById('reset-phone');
  if(rp&&phone)rp.value=phone;
}
function refreshResetPwStrength(){
  const pw=document.getElementById('reset-new-pw').value||'';
  const bars=document.querySelectorAll('#reset-pw-bars .pw-bar');
  const score=pwScore(pw);
  bars.forEach((b,i)=>{
    b.classList.remove('l1','l2','l3');
    if(i<score)b.classList.add('l'+Math.max(score,1));
  });
  const c=pwChecks(pw);
  const h=document.getElementById('reset-pw-hint');
  if(h){
    const tag=ok=>ok?'<span class="ok">✔</span>':'<span class="bad">✘</span>';
    h.innerHTML=tag(c.len)+' 至少8位 &nbsp;&nbsp; '+tag(c.upper||c.lower)+' 含字母 &nbsp;&nbsp; '+tag(c.digit)+' 含数字 &nbsp;&nbsp; '+tag(c.spec)+' 含特殊符号';
  }
}
function doResetPassword(){
  clearAuthMsg();
  const phone=(document.getElementById('reset-phone').value||'').trim();
  const tempPw=document.getElementById('reset-temp-pw').value;
  const newPw=document.getElementById('reset-new-pw').value;
  const confirmPw=document.getElementById('reset-confirm-pw').value;
  if(phone.length!==11||!/^1\d{10}$/.test(phone)){showAuthError('请输入正确的11位手机号');return}
  if(!tempPw){showAuthError('请输入邮箱中收到的临时密码');return}
  const users=readUsers();
  const u=users[phone];
  if(!u){showAuthError('该手机号尚未注册');return}
  if(u.pwHash!==pwHash(tempPw)){showAuthError('临时密码不正确，请检查邮箱');return}
  const c=pwChecks(newPw);const types=[c.lower,c.upper,c.digit,c.spec].filter(Boolean).length;
  if(!(c.len&&types>=3)){showAuthError('新密码强度不足：至少8位，且含大小写/数字/特殊符号中至少3种');return}
  if(confirmPw!==newPw){showAuthError('两次密码输入不一致');return}
  u.pwHash=pwHash(newPw);
  users[phone]=u;
  writeUsers(users);
  showAuthSuccess('密码重置成功！请使用新密码登录');
  // 清空重置表单
  ['reset-phone','reset-temp-pw','reset-new-pw','reset-confirm-pw'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
  setTimeout(()=>{switchAuthTab('login')},1500);
}

// ---- 协议弹窗 ----
function openTerms(which){
  const mask=document.getElementById('terms-modal');
  const h=document.getElementById('terms-modal-title');
  const b=document.getElementById('terms-modal-body');
  if(!mask||!h||!b)return;
  if(which==='user'){
    h.textContent='用户服务协议';
    b.innerHTML=TERMS_USER;
  }else{
    h.textContent='隐私政策';
    b.innerHTML=TERMS_PRIVACY;
  }
  mask.classList.add('active');
}
function closeTerms(){document.getElementById('terms-modal')?.classList.remove('active')}

function bindAuthUIActions(){
  // 预留钩子
}

/* ============ 协议文本 ============ */
const TERMS_USER = `
<h1>用户服务协议</h1>
<p class="tm-meta">更新日期：2026年8月5日 &nbsp; 运营主体：晨轩贺（个人开发者） &nbsp; 对外项目名称：紫道丹焰、财气珠宝店</p>

<h2>一、协议的接受</h2>
<p>欢迎您使用财气珠宝店（以下简称"本平台"）。本协议是您（即用户）与运营主体晨轩贺（个人开发者，对外项目名称为紫道丹焰、财气珠宝店）之间就使用本平台相关服务所订立的协议。请您在注册或使用本平台服务前，仔细阅读本协议。一经勾选同意并完成注册，即视为您已充分理解并接受本协议的全部条款。</p>

<h2>二、服务内容</h2>
<p>本平台为珠宝文化品鉴、产品展示、线上购买引导及个性化定制信息服务。包括但不限于：珠宝分类浏览、定制咨询、品牌故事展示、四大线上平台（淘宝、微信、抖音、小红书）店铺入口引导等。</p>
<p>本平台保留随时变更、中断或终止部分或全部服务的权利，并将通过站内公告或其他合理方式进行通知。</p>

<h2>三、账号注册与使用</h2>
<p>1. 您承诺注册时提供真实、准确、完整的个人信息，并在信息变更时及时更新。</p>
<p>2. 您应妥善保管账号与密码，因您本人原因造成账号被盗、密码泄漏等风险，由您自行承担相应后果。</p>
<p>3. 您不得将账号以出借、赠与、售卖、转让等方式提供给第三方使用。</p>
<p>4. 注册手机号绑定后，可接收重要通知，可随时申请解绑。</p>

<h2>四、用户行为规范</h2>
<p>您在使用本平台过程中应遵守中华人民共和国相关法律法规及公序良俗，不得发布违法、侵权、虚假、骚扰、破坏公共利益的内容。不得实施任何破坏本平台服务器安全、干扰平台正常运营的行为。</p>

<h2>五、产品信息与交易</h2>
<p>1. 本平台所展示的珠宝产品信息、图片、故事文案等仅供参考，具体以对应平台（淘宝/微信/抖音/小红书）店铺详情与实物为准。</p>
<p>2. 因珠宝需质检环节，实际发货周期约15天左右，具体以各平台店铺规则为准。</p>
<p>3. 本平台承诺所售珠宝附带权威检测证书、支持全国复检，假一赔三、终身保养。</p>

<h2>六、知识产权</h2>
<p>本平台所有内容，包括文字、图片、Logo、页面设计、故事文案、作品组合等，均归运营主体或原作者所有，未经书面授权不得复制、传播、商用或用于其他任何商业目的。</p>

<h2>七、免责声明</h2>
<p>1. 因不可抗力或非本平台原因导致的服务中断、数据丢失等，本平台不承担责任。</p>
<p>2. 玄学分类与能量文化相关内容源于传统文化，仅供精神文化参考与佩戴美学欣赏，不构成任何形式的收益承诺与医疗建议。</p>

<h2>八、协议修改</h2>
<p>本平台有权根据需要不定期修订本协议条款。修订版将在页面上公布，自公布之日起生效。继续使用服务即视为您接受修订后的条款。</p>

<h2>九、联系我们</h2>
<p>如您对本协议有疑问或建议，可通过以下方式联系：</p>
<p>📧 邮箱：heshangrong@outlook.com</p>
<p>💬 微信客服：cdcdc13513</p>
`;

const TERMS_PRIVACY = `
<h1>隐私政策</h1>
<p class="tm-meta">更新日期：2026年8月5日 &nbsp; 运营主体：晨轩贺（个人开发者） &nbsp; 对外项目名称：紫道丹焰、财气珠宝店</p>

<p><strong style="color:#e0d8cc;">重要提示：本平台仅限18岁及以上用户使用</strong></p>

<p>本平台深知个人信息对您的重要性，我们将按照法律法规的要求，采取相应的安全保护措施，致力于保护您的个人信息安全可控。</p>

<h2>一、信息收集</h2>
<p>当您注册账号时，我们将收集您主动提供的以下信息：手机号、用户名、密码（加密存储），用于账号识别、登录验证及重要通知。</p>
<p>如您仅进行浏览，不注册账号，我们不会收集您的可识别身份信息。</p>

<h2>二、信息使用</h2>
<p>1. 用于您的账号登录、身份验证和安全保护；</p>
<p>2. 向您发送重要服务通知（如发货提醒、规则变更）；</p>
<p>3. 改善平台的用户体验和产品服务质量；</p>
<p>4. 遵守法律法规要求及司法、行政机构的合法要求。</p>

<h2>三、信息存储与保护</h2>
<p>您的个人账号信息加密存储于浏览器本地和服务端。我们采用行业标准的安全措施保护您的信息。密码不以明文形式保存。</p>
<p>我们仅在实现服务所需的最短时间内保留您的信息，法律法规另有规定的除外。</p>

<h2>四、信息共享</h2>
<p>本平台不会向任何无关第三方出售、出租或共享您的个人信息，除非：</p>
<p>1. 获得您的明确同意；</p>
<p>2. 法律法规要求或司法/行政机关合法要求；</p>
<p>3. 为完成交易必须与物流、质检、支付等必要服务方共享的必要信息（仅在相应目的范围内）。</p>

<h2>五、您的权利</h2>
<p>您有权随时：查看和更正您的个人信息；删除您的账号；撤回授权同意；要求导出您的数据。请通过邮箱或微信客服联系我们处理。</p>

<h2>六、第三方平台</h2>
<p>本平台提供到以下第三方电商平台的入口链接：</p>
<p>• 淘宝：财气珠宝大促店支持私人定制</p>
<p>• 微信：财气珠宝店</p>
<p>• 抖音：财气珠宝店紫道丹焰公司</p>
<p>• 小红书：财气珠宝店 - 紫道丹焰公司</p>
<p>您进入上述第三方平台后，其个人信息处理规则以对应平台的隐私政策为准。</p>

<h2>七、特别说明（AI聊天记录）</h2>
<p>双川赴月模块AI聊天记录保存6个月，到期自动删除；使用AI聊天的用户支持主动删除聊天记录，删除后服务器不可恢复。</p>

<h2>八、未成年人保护</h2>
<p>本平台仅限18岁及以上用户使用。若您是未满18周岁的未成年人，请您在监护人陪同下阅读本政策并停止注册或使用。</p>

<h2>九、联系与投诉</h2>
<p>如您对本政策有任何疑问、意见、建议或投诉，请联系我们：</p>
<p>📧 邮箱：heshangrong@outlook.com</p>
<p>💬 微信客服：cdcdc13513</p>
`;
