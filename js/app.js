/*
    GameVault - Gaming Library Project
    This project uses JavaScript to display games and tournaments.
    The information is saved in the browser using localStorage.
*/
const STORAGE = { games: "gv_games_2026", users: "gv_users", session: "gv_session" };

// Starter game data. Some covers use official artwork links, while others use local fallback artwork.
const starterGames = [
  {id:1,name:"Call of Duty: Modern Warfare 4",genre:"Action",platform:"PC",rating:4.5,status:"Playing",release:"2026-10-22",image:'https://www.activision.com/content/dam/atvi/activision/atvi-touchui/activision/games/game-details/call-of-duty/modern-warfare-4/MWA_Meta.jpg'},
  {id:2,name:"Phantom Blade Zero",genre:"Action",platform:"PC",rating:4.8,status:"Playing",release:"2026-10-28",image:'https://image.api.playstation.com/vulcan/ap/rnd/202512/1206/8c42cb9cf076970e2fb638d5b608a89beb9d71eecdaac915.jpg'},
  {id:3,name:"CONTROL Resonant",genre:"Action",platform:"PC",rating:4.6,status:"Wishlist",release:"2026-09-24",image:'https://blog.de.playstation.com/uploads/sites/13/2026/02/b55c928a85d1e53ddd5a04bc79298daf1c846853.jpg'},
  {id:4,name:"EA SPORTS FC 27",genre:"Sports",platform:"PC",rating:4.3,status:"Playing",release:"2026-09-24",image:'https://image.api.playstation.com/vulcan/ap/rnd/202607/2321/c7c534e1e9b24ccf7ff11c429948f31494ccce402b452647.png'},
  {id:5,name:"NBA 2K27",genre:"Sports",platform:"PC",rating:4.1,status:"Playing",release:"2026-09-03",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3IyhzIQG2q35ik4jLzK5sARbwmWYmbPAPNaCZcVFsqntfwbSKvuYF-ko&s=10'},
  {id:6,name:"Onimusha: Way of the Sword",genre:"Action",platform:"PC",rating:4.6,status:"Wishlist",release:"2026-09-03",image:'https://www.capcom-games.com/onimusha/ws/assets/images/share.png'},
  {id:7,name:"The Blood of Dawnwalker",genre:"RPG",platform:"PC",rating:4.7,status:"Playing",release:"2026-09-02",image:'https://xboxwire.thesourcemediaassets.com/sites/2/2026/07/The_Blood_of_Dawnwalker_Key_Art_16x9-3e20dae7a0770483d297.jpg'},
  {id:8,name:"STAR WARS Zero Company",genre:"Strategy",platform:"PC",rating:4.4,status:"Wishlist",release:"2026-08-27",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDr4XX63HqFPWjSSZE4FAb9lt0ZXJPeENxORdHA2IuFASRb2jyX_nijoU&s=10'},
  {id:9,name:"Big Walk",genre:"Adventure",platform:"PC",rating:4.7,status:"Playing",release:"2026-08-04",image:'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch2/70010000109969/5864b7ecf7a65a0812e3421b6d6807434475f13176e99f4ea95e4fd142d1e86b'},
  {id:10,name:"Gears of War: E-Day",genre:"Action",platform:"PC",rating:4.5,status:"Completed",release:"2026-10-06",image:'https://image.news.livedoor.com/newsimage/stf/f/d/fd6a6_1838_20d01510f6deda71ff9dffe453c186d7-sq.jpg'},
  {id:11,name:"Forza Horizon 6",genre:"Racing",platform:"PC",rating:4.8,status:"Playing",release:"2026-05-18",image:'https://xboxwire.thesourcemediaassets.com/sites/2/2026/01/FH6_Evergreen_KeyArt_Branded-Horizontal_3840x2160-7591242f9c6791be6d45.jpg'},
  {id:12,name:"007 First Light",genre:"Adventure",platform:"PC",rating:4.6,status:"Wishlist",release:"2026-05-26",image:'https://eu-images.contentstack.com/v3/assets/blt8770191dea35bccc/bltdb2c355c909b4dd7/6841ab8f9b5879857c35d4a4/_007_First_Light_image_credit_PlayStation.jpg?width=1280&auto=webp&quality=80&disable=upscale'},
  {id:13,name:"PRAGMATA",genre:"Adventure",platform:"PC",rating:4.7,status:"Completed",release:"2026-04-16",image:'https://www.capcom-games.com/pragmata/assets/images/media/thumb/pv3.webp'},
  {id:14,name:"Resident Evil Requiem",genre:"Action",platform:"PC",rating:4.9,status:"Completed",release:"2026-02-26",image:'https://prcdn.freetls.fastly.net/release_image/13450/5651/13450-5651-13248ec25cab41bc5382cf18498f30bc-3900x3900.jpg?auto=webp&bg-color=fff&fit=bounds&format=jpeg&height=1350&quality=85%2C65&width=1950'},
  {id:15,name:"Nioh 3",genre:"RPG",platform:"PC",rating:4.5,status:"Playing",release:"2026-02-05",image:'https://cdn2.steamgriddb.com/grid/ff780b55451f6516ccb007d9fe237e02.png'}
];

// Tournament events use only the four games requested by the project owner.
const tournaments = [
  {id:1,name:"GameVault FC 27 Championship",game:"FC 27",date:"2026-12-05",prize:"RM 2,000",players:42,max:64,status:"Open",icon:"bi-controller"},
  {id:2,name:"Tekken Clash Tournament",game:"Tekken",date:"2026-12-12",prize:"RM 1,000",players:28,max:32,status:"Almost full",icon:"bi-lightning-charge"},
  {id:3,name:"Fortnite Battle Royale Cup",game:"Fortnite",date:"2026-12-19",prize:"RM 1,500",players:64,max:100,status:"Open",icon:"bi-crosshair"},
  {id:4,name:"Dota 2 Elite Showdown",game:"Dota 2",date:"2027-01-09",prize:"RM 3,000",players:48,max:64,status:"Open",icon:"bi-shield-fill"},
  {id:5,name:"FC 27 Weekend League",game:"FC 27",date:"2027-01-16",prize:"RM 750",players:32,max:32,status:"Closed",icon:"bi-trophy"}
];

let games = [];
let genreChart = null, analyticsGenreChart = null, participationChart = null;
let gameModal = null;

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE.games) || "null");
    games = Array.isArray(saved) && saved.length ? saved : starterGames.map(g => ({...g}));
  } catch { games = starterGames.map(g => ({...g})); }
  // Keep the starter collection current and prevent old demo data from showing.
  if (!localStorage.getItem(STORAGE.games)) saveGames();
}

// Save the current game list in the browser.
function saveGames() {
  try {
    localStorage.setItem(STORAGE.games, JSON.stringify(games));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}

function coverDetails(game) {
  const starter = starterGames.find(item => item.id === Number(game.id) && item.name === game.name);
  let imageLink = starter ? starter.image : (game.image || "");

  if (!imageLink || imageLink.startsWith("images/")) {
    imageLink = "https://placehold.co/600x900/202020/ffffff?text=Game+Cover";
  }

  return { primary: imageLink, secondary: "https://placehold.co/600x900/202020/ffffff?text=Game+Cover" };
}

function showToast(message) {
  const toastEl = document.getElementById("appToast");
  if (!toastEl || typeof bootstrap === "undefined") return;
  document.getElementById("toastMessage").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastEl).show();
}

function navigate(page) {
  document.querySelectorAll(".page-section").forEach(section => section.classList.add("d-none"));
  const target = document.getElementById(`page-${page}`);
  if (!target) return;
  target.classList.remove("d-none");
  document.querySelectorAll(".side-nav .nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === page));
  document.getElementById("currentPageLabel").textContent = page === "games" ? "Game Library" : page.charAt(0).toUpperCase() + page.slice(1);
  document.getElementById("sidebar").classList.remove("open");
  if (page === "analytics") renderAnalytics();
  if (page === "dashboard") renderDashboard();
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-MY",{day:"numeric",month:"short",year:"numeric"}).format(new Date(dateString+"T00:00:00"));
}

// Count the games in each genre for the charts.
function genreCounts() {
  let counts = {};
  for (let i = 0; i < games.length; i++) {
    let genre = games[i].genre;
    counts[genre] = (counts[genre] || 0) + 1;
  }
  return counts;
}

function chartOptions() {
  return {responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"bottom",labels:{color:"#aab0c2",padding:16,usePointStyle:true,pointStyle:"circle",font:{family:"Inter",size:10}}}}};
}

// Refresh the main parts of the website after changes.
function renderAll() {
  document.getElementById("navGameCount").textContent = games.length;
  renderDashboard();
  renderGames();
  renderTournaments();
}

function renderDashboard() {
  const avg = games.length ? games.reduce((s,g)=>s+Number(g.rating),0)/games.length : 0;
  document.getElementById("statGames").textContent = games.length;
  document.getElementById("statTournaments").textContent = tournaments.length;
  document.getElementById("statPlayers").textContent = tournaments.reduce((s,t)=>s+t.players,0);
  document.getElementById("statRating").textContent = avg.toFixed(1);

  if (typeof Chart !== "undefined") {
    const counts=genreCounts(), labels=Object.keys(counts), values=Object.values(counts);
    if (genreChart) genreChart.destroy();
    genreChart = new Chart(document.getElementById("genreChart"), {type:"doughnut",data:{labels,datasets:[{data:values,backgroundColor:["#ef4444","#f97316","#fb7185","#dc2626","#fca5a5","#991b1b"],borderColor:"#141414",borderWidth:4,hoverOffset:7}]},options:{...chartOptions(),cutout:"70%"}});
  }

  document.getElementById("dashboardEvents").innerHTML = tournaments.filter(t=>t.status!=="Closed").slice(0,3).map(t=>`
    <div class="event-row"><div class="event-date">${new Date(t.date+"T00:00:00").toLocaleDateString("en-MY",{month:"short",day:"numeric"}).toUpperCase()}</div><div class="event-info"><strong>${escapeHTML(t.name)}</strong><span>${escapeHTML(t.game)} · ${escapeHTML(t.prize)}</span></div><span class="event-tag">${escapeHTML(t.status)}</span></div>`).join("") || '<p class="muted small">No upcoming events.</p>';

  const recent = [...games].sort((a,b)=>new Date(b.addedAt || b.release)-new Date(a.addedAt || a.release)).slice(0,10);
  document.getElementById("recentGamesBody").innerHTML = recent.map(g=>{
    const cover=coverDetails(g);
    return `<tr><td><div class="table-game"><img class="mini-cover" src="${escapeHTML(cover.primary)}" data-fallback-url="${escapeHTML(cover.secondary)}" alt="${escapeHTML(g.name)} cover"><span class="mini-cover-fallback d-none"><i class="bi ${gameIcon(g.genre)}"></i></span><span>${escapeHTML(g.name)}</span></div></td><td>${escapeHTML(g.genre)}</td><td>${escapeHTML(g.platform)}</td><td><span class="rating">★</span> ${Number(g.rating).toFixed(1)}</td><td><span class="status-pill ${g.status.toLowerCase()}">${escapeHTML(g.status)}</span></td></tr>`;
  }).join("") || '<tr><td colspan="5" class="text-center muted">No games added yet.</td></tr>';
}

// Pick an icon based on the game's genre.
function gameIcon(genre) {
  let icons = {
    Action: "bi-lightning-charge",
    Adventure: "bi-compass",
    RPG: "bi-magic",
    Sports: "bi-trophy",
    Racing: "bi-speedometer2",
    Strategy: "bi-diagram-3"
  };
  return icons[genre] || "bi-controller";
}

function renderGames() {
  const search=(document.getElementById("gameSearch")?.value||"").toLowerCase();
  const genre=document.getElementById("genreFilter")?.value||"all";
  const platform=document.getElementById("platformFilter")?.value||"all";
  const filtered=games.filter(g=>g.name.toLowerCase().includes(search)&&(genre==="all"||g.genre===genre)&&(platform==="all"||g.platform===platform));
  document.getElementById("gameResultCount").textContent=`${filtered.length} ${filtered.length===1?"game":"games"} found`;
  document.getElementById("emptyGames").classList.toggle("d-none",filtered.length>0);
  document.getElementById("gamesGrid").innerHTML=filtered.map(g=>{
    const cover=coverDetails(g);
    return `<article class="game-card"><div class="game-cover"><img src="${escapeHTML(cover.primary)}" data-fallback-url="${escapeHTML(cover.secondary)}" alt="${escapeHTML(g.name)} cover art" loading="lazy"><div class="cover-fallback d-none"><i class="bi ${gameIcon(g.genre)}"></i><span>${escapeHTML(g.name)}</span></div><span class="genre-label">${escapeHTML(g.genre.toUpperCase())}</span></div>
    <div class="game-card-body"><div class="game-card-title">${escapeHTML(g.name)}</div><div class="game-card-meta"><span><i class="bi bi-display me-1"></i>${escapeHTML(g.platform)}</span><span class="rating">★ ${Number(g.rating).toFixed(1)}</span></div><div class="game-card-bottom"><span class="status-pill ${g.status.toLowerCase()}">${escapeHTML(g.status)}</span><div class="game-actions"><button class="btn-mini" data-edit="${g.id}" aria-label="Edit ${escapeHTML(g.name)}"><i class="bi bi-pencil"></i></button><button class="btn-mini" data-delete="${g.id}" aria-label="Delete ${escapeHTML(g.name)}"><i class="bi bi-trash"></i></button></div></div></div></article>`;
  }).join("");
  document.getElementById("navGameCount").textContent=games.length;
}

function renderTournaments() {
  const search=(document.getElementById("tourSearch")?.value||"").toLowerCase();
  const status=document.getElementById("tourStatusFilter")?.value||"all";
  const filtered=tournaments.filter(t=>(t.name.toLowerCase().includes(search)||t.game.toLowerCase().includes(search))&&(status==="all"||t.status===status));
  document.getElementById("tourTotal").textContent=tournaments.length;
  document.getElementById("tourOpen").textContent=tournaments.filter(t=>t.status==="Open"||t.status==="Almost full").length;
  document.getElementById("tourParticipants").textContent=tournaments.reduce((s,t)=>s+t.players,0);
  document.getElementById("tournamentGrid").innerHTML=filtered.map(t=>{
    const percent=Math.min(100,Math.round(t.players/t.max*100));
    const statusClass=t.status==="Closed"?"closed":t.status==="Almost full"?"full":"";
    return `<article class="tournament-card"><div class="tour-top"><div class="tour-game-icon"><i class="bi ${t.icon}"></i></div><span class="tour-status ${statusClass}">${escapeHTML(t.status)}</span></div><h3>${escapeHTML(t.name)}</h3><div class="tour-game">${escapeHTML(t.game)}</div><div class="tour-details"><div class="tour-detail"><i class="bi bi-calendar3 me-1"></i> DATE<strong>${formatDate(t.date)}</strong></div><div class="tour-detail"><i class="bi bi-award me-1"></i> PRIZE<strong>${escapeHTML(t.prize)}</strong></div></div><div class="tour-foot"><span>Registration progress</span><strong>${t.players}/${t.max} players</strong></div><div class="tour-progress"><span style="width:${percent}%"></span></div><div class="tour-foot"><span>${percent}% capacity reached</span><strong>${t.status==="Closed"?"Registration closed":"Registration available"}</strong></div></article>`;
  }).join("")||'<div class="empty-state"><i class="bi bi-search"></i><h3>No tournaments found</h3><p>Try another search or status.</p></div>';
}

function renderAnalytics() {
  const counts=genreCounts(),labels=Object.keys(counts),values=Object.values(counts);
  if (typeof Chart !== "undefined") {
    if(analyticsGenreChart)analyticsGenreChart.destroy();
    analyticsGenreChart=new Chart(document.getElementById("analyticsGenreChart"),{type:"bar",data:{labels,datasets:[{label:"Number of games",data:values,backgroundColor:"#ef4444",borderRadius:7,maxBarThickness:42}]},options:{...chartOptions(),plugins:{...chartOptions().plugins,legend:{display:false}},scales:{x:{ticks:{color:"#aab0c2"},grid:{display:false}},y:{beginAtZero:true,ticks:{color:"#aab0c2",precision:0},grid:{color:"#292e40"}}}}});
    if(participationChart)participationChart.destroy();
    participationChart=new Chart(document.getElementById("participationChart"),{type:"bar",data:{labels:tournaments.map(t=>t.game),datasets:[{label:"Registered players",data:tournaments.map(t=>t.players),backgroundColor:"#f97316",borderRadius:7,maxBarThickness:42}]},options:{...chartOptions(),indexAxis:"y",plugins:{...chartOptions().plugins,legend:{display:false}},scales:{x:{beginAtZero:true,ticks:{color:"#aab0c2",precision:0},grid:{color:"#292e40"}},y:{ticks:{color:"#aab0c2"},grid:{display:false}}}}});
  }
  const top=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0],avg=games.length?(games.reduce((s,g)=>s+Number(g.rating),0)/games.length).toFixed(1):"0.0";
  document.getElementById("analyticsSummary").innerHTML=[["Most popular genre",top?top[0]:"No data"],["Average game rating",`${avg} / 5`],["Games in collection",games.length],["Tournament events",tournaments.length],["Total participants",tournaments.reduce((s,t)=>s+t.players,0)],["Platforms represented",new Set(games.map(g=>g.platform)).size]].map(([label,value])=>`<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function openGameModal(game=null) {
  if (!gameModal) return;
  document.getElementById("gameForm").reset();
  document.getElementById("gameId").value=game?game.id:"";
  document.getElementById("gameModalTitle").textContent=game?"Edit game":"Add a game";
  if(game){document.getElementById("gameName").value=game.name;document.getElementById("gameGenre").value=game.genre;document.getElementById("gamePlatform").value=game.platform;document.getElementById("gameRating").value=game.rating;document.getElementById("gameStatus").value=game.status;document.getElementById("gameImage").value=game.image||"";}
  document.getElementById("gameFormError").classList.add("d-none");
  gameModal.show();
}

function getUsers() {
  try {
    let savedUsers = localStorage.getItem(STORAGE.users);
    return JSON.parse(savedUsers || "[]");
  } catch (error) {
    return [];
  }
}

function setAuthMode(mode) {
  const signup = mode === "signup";
  document.getElementById("loginForm").classList.toggle("d-none", signup);
  document.getElementById("signupForm").classList.toggle("d-none", !signup);
  document.getElementById("authTitle").textContent = signup ? "Create your account" : "Welcome back";
  document.getElementById("authSubtitle").textContent = signup ? "Join GameVault and organise your gaming space." : "Log in to access your gaming dashboard.";
  document.getElementById("loginError").classList.add("d-none");
  document.getElementById("signupError").classList.add("d-none");
}

function enterApp(user) {
  try {
    localStorage.setItem(STORAGE.session, JSON.stringify({ email:user.email, name:user.name }));
  } catch {}
  document.getElementById("authScreen").classList.add("d-none");
  document.getElementById("appShell").classList.remove("d-none");
  const displayName = user.name || "Gamer";
  document.getElementById("userName").textContent = displayName;
  document.getElementById("welcomeName").textContent = displayName;
  document.getElementById("userAvatar").textContent = displayName.trim().charAt(0).toUpperCase() || "G";
  renderAll();
  navigate("dashboard");
}

function bindAuthEvents() {
  const users = getUsers();
  if (!users.some(u => u.email === "guest@gamevault.com")) {
    users.push({ name:"Guest", email:"guest@gamevault.com", password:"guest123" });
    try { localStorage.setItem(STORAGE.users, JSON.stringify(users)); } catch {}
  }
  document.querySelectorAll("[data-auth-mode]").forEach(btn => btn.addEventListener("click", () => setAuthMode(btn.dataset.authMode)));
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const user = getUsers().find(u => u.email.toLowerCase() === email && u.password === password);
    const error = document.getElementById("loginError");
    if (!user) { error.textContent = "Incorrect email or password. Please try again."; error.classList.remove("d-none"); return; }
    enterApp(user);
  });
  document.getElementById("signupForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    const error = document.getElementById("signupError");
    if (password.length < 6) { error.textContent = "Password must contain at least 6 characters."; error.classList.remove("d-none"); return; }
    if (password !== confirm) { error.textContent = "The passwords do not match."; error.classList.remove("d-none"); return; }
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email)) { error.textContent = "This email already has an account. Please log in."; error.classList.remove("d-none"); return; }
    const user = { name, email, password };
    users.push(user);
    try { localStorage.setItem(STORAGE.users, JSON.stringify(users)); } catch {}
    enterApp(user);
  });
  document.getElementById("logoutBtn").addEventListener("click", () => {
    try { localStorage.removeItem(STORAGE.session); } catch {}
    document.getElementById("appShell").classList.add("d-none");
    document.getElementById("authScreen").classList.remove("d-none");
    document.getElementById("loginForm").reset();
    setAuthMode("login");
  });
}

// Connect buttons and forms to the website functions.
function bindEvents() {
  // Global fallback handler for broken cover images (avoids inline onerror CSP issues)
  document.addEventListener("error", e => {
    if (e.target && e.target.tagName === "IMG" && e.target.dataset.fallbackUrl) {
      const fallback = e.target.dataset.fallbackUrl;
      e.target.removeAttribute("data-fallback-url");
      e.target.src = fallback;
    }
  }, true);

  document.querySelectorAll("[data-page]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();navigate(el.dataset.page);}));
  document.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>navigate(el.dataset.go)));
  document.getElementById("mobileMenuBtn").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
  ["gameSearch","genreFilter","platformFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="gameSearch"?"input":"change",renderGames));
  ["tourSearch","tourStatusFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="tourSearch"?"input":"change",renderTournaments));
  document.getElementById("addGameBtn").addEventListener("click",()=>openGameModal());
  document.getElementById("gamesGrid").addEventListener("click",e=>{
    const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");
    if(edit){const game=games.find(g=>g.id===Number(edit.dataset.edit));if(game)openGameModal(game);}
    if(del){const id=Number(del.dataset.delete),game=games.find(g=>g.id===id);if(game&&confirm(`Delete "${game.name}" from your library?`)){games=games.filter(g=>g.id!==id);saveGames();renderAll();showToast("Game deleted from your library.");}}
  });
  document.getElementById("gameForm").addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("gameName").value.trim(),rating=Number(document.getElementById("gameRating").value),image=document.getElementById("gameImage").value.trim();
    if(!name||rating<1||rating>5){const err=document.getElementById("gameFormError");err.textContent="Enter a game title and a rating from 1 to 5.";err.classList.remove("d-none");return;}
    const id=document.getElementById("gameId").value,existing=id?games.find(g=>g.id===Number(id)):null,record={id:id?Number(id):Date.now(),name,genre:document.getElementById("gameGenre").value,platform:document.getElementById("gamePlatform").value,rating,status:document.getElementById("gameStatus").value,image,release:existing?.release||new Date().toISOString().slice(0,10),addedAt:existing?.addedAt||(id?undefined:Date.now())};
    if(id){games=games.map(g=>g.id===Number(id)?record:g);showToast("Game details updated.");}else{games.push(record);showToast("New game added to your library.");}
    saveGames();
    if (gameModal) gameModal.hide();
    renderAll();
  });
}

// Run this code when the page has finished loading.
document.addEventListener("DOMContentLoaded",()=>{
  loadData();
  const modalEl = document.getElementById("gameModal");
  if (modalEl && typeof bootstrap !== "undefined") {
    gameModal = new bootstrap.Modal(modalEl);
  }
  bindEvents();
  bindAuthEvents();
  document.getElementById("todayLabel").textContent=new Intl.DateTimeFormat("en-MY",{day:"numeric",month:"short",year:"numeric"}).format(new Date());
  let session = null;
  try { session = JSON.parse(localStorage.getItem(STORAGE.session) || "null"); } catch {}
  const user = session && getUsers().find(u => u.email === session.email);
  if (user) enterApp(user); else setAuthMode("login");
});
