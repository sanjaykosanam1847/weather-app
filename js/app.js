/* ============================================================
   CampusConnect — shared app logic
   Vanilla JS, no framework. Handles theme, nav, scroll reveal,
   and reusable render helpers used across pages.
   ============================================================ */

/* ---------- Theme ---------- */
function ccInitTheme(){
  const saved = localStorage.getItem('cc-theme');
  const theme = saved || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  btn?.addEventListener('click', () => {
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', now);
    localStorage.setItem('cc-theme', now);
    btn.textContent = now === 'dark' ? '☀' : '☾';
  });
}

/* ---------- Mobile nav ---------- */
function ccInitNav(){
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  burger?.addEventListener('click', () => links.classList.toggle('open-mobile'));

  // Highlight active link based on filename
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a, .sidebar a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
}

/* ---------- Scroll reveal ---------- */
function ccInitReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.12 });
  els.forEach(e => io.observe(e));
}

/* ---------- Skeleton-to-content helper ---------- */
function ccRenderWithSkeleton(containerId, skeletonCount, renderFn, delay=350){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = Array.from({length:skeletonCount}).map(() => `<div class="skeleton skeleton-card"></div>`).join('');
  setTimeout(() => { el.innerHTML = renderFn(); ccInitReveal(); }, delay);
}

/* ---------- Credential card renderer (signature component) ---------- */
function ccCredentialCard(s){
  const badgeClass = s.type === 'Placement' ? 'badge-placement' : 'badge-internship';
  return `
  <article class="credential reveal">
    <span class="punch" aria-hidden="true"></span>
    <div class="credential-top">
      <div class="avatar">${s.photo}</div>
      <div>
        <div class="credential-name">${s.name}</div>
        <div class="credential-meta">${s.branch} · Batch ${s.batch} · CGPA ${s.cgpa}</div>
      </div>
      <span class="credential-badge ${badgeClass}">${s.type}</span>
    </div>
    <div class="credential-body">
      <div>
        <div class="credential-company">${s.company} — ${s.role}</div>
        <div class="credential-package">${s.package}</div>
      </div>
      <div class="tag-row">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <div class="credential-foot">
      <a href="profile-detail.html?id=${s.id}" class="btn btn-ghost btn-sm">View profile</a>
      <div class="icon-links">
        <a href="${s.linkedin}" title="LinkedIn" aria-label="LinkedIn">in</a>
        <a href="${s.github}" title="GitHub" aria-label="GitHub">gh</a>
        <a href="${s.leetcode}" title="LeetCode" aria-label="LeetCode">lc</a>
      </div>
    </div>
  </article>`;
}

function ccResourceCard(r){
  return `
  <article class="credential reveal">
    <span class="punch" aria-hidden="true"></span>
    <div class="credential-top">
      <div class="avatar">${r.type.slice(0,2).toUpperCase()}</div>
      <div>
        <div class="credential-name">${r.title}</div>
        <div class="credential-meta">${r.type} · ${r.company}</div>
      </div>
    </div>
    <div class="credential-body">
      <p style="color:var(--text-soft); font-size:.85rem; margin:0;">Shared by ${CC_DATA.seniors.find(s=>s.id===r.by)?.name || 'a senior'}</p>
    </div>
    <div class="credential-foot">
      <a href="${r.link}" class="btn btn-primary btn-sm">Open resource</a>
      <button class="btn btn-ghost btn-sm" onclick="ccToggleBookmark(this)">☆ Save</button>
    </div>
  </article>`;
}

function ccExperienceCard(e){
  const senior = CC_DATA.seniors.find(s => s.id === e.seniorId);
  return `
  <article class="credential reveal">
    <span class="punch" aria-hidden="true"></span>
    <div class="credential-top">
      <div class="avatar">${senior ? senior.photo : '??'}</div>
      <div>
        <div class="credential-name">${e.company} — ${e.role}</div>
        <div class="credential-meta">${senior ? senior.name : ''} · ${e.timeline}</div>
      </div>
      <span class="credential-badge">${e.difficulty}</span>
    </div>
    <div class="credential-body">
      <p style="margin:0; font-size:.85rem; color:var(--text-soft);"><strong style="color:var(--text)">OA:</strong> ${e.oa}</p>
      <p style="margin:0; font-size:.85rem; color:var(--text-soft);"><strong style="color:var(--text)">Tip:</strong> ${e.tips}</p>
    </div>
  </article>`;
}

function ccToggleBookmark(btn){
  const saved = btn.textContent.trim().startsWith('★');
  btn.textContent = saved ? '☆ Save' : '★ Saved';
}

document.addEventListener('DOMContentLoaded', () => {
  ccInitTheme();
  ccInitNav();
  ccInitReveal();
});
