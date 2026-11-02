// ---- Edit your content here ----
const SKILLS=[["HTML",4],["CSS",4],["JavaScript",4],["Python",4],["DBMS",4],["SQL",4],["AI Tools",2]]; // out of 5
const PROJECTS=[
 {n:"Personal Portfolio",t:"Website",d:"This responsive portfolio with dark/light themes, built with HTML, CSS and JavaScript."},
 {n:"Todo List",t:"Utility",d:"Add, complete and delete daily tasks, saved in the browser."},
 {n:"Food Delivery",t:"Web app",d:"Browse a menu, add items to a cart and see the order total."}
];
const ROLES=["web developer","Python learner","database enthusiast","problem solver"];
// --------------------------------
const $=s=>document.querySelector(s);
$("#year").textContent=new Date().getFullYear();

// Theme (saved preference, falls back to system setting)
const root=document.documentElement;
try{const s=localStorage.getItem("theme");
 root.dataset.theme=s||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");}catch{root.dataset.theme="light"}
$("#themeBtn").onclick=()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";
 try{localStorage.setItem("theme",root.dataset.theme)}catch{}};

// Mobile menu
const menu=$("#menu"),mb=$("#menuBtn");
mb.onclick=()=>mb.setAttribute("aria-expanded",menu.classList.toggle("open"));
menu.addEventListener("click",e=>{if(e.target.tagName==="A"){menu.classList.remove("open");mb.setAttribute("aria-expanded","false")}});

// Typing animation
let r=0,c=0,del=false;const el=$("#typed");
(function type(){const w=ROLES[r];c+=del?-1:1;el.textContent=w.slice(0,c);
 let t=del?40:90;
 if(!del&&c===w.length){del=true;t=1400}else if(del&&c===0){del=false;r=(r+1)%ROLES.length;t=300}
 setTimeout(type,t)})();

// Skills
$("#skillList").innerHTML=SKILLS.map(([n,v])=>`<div class="skill"><b>${n}</b><span class="dots" role="img" aria-label="${v} out of 5">${"●".repeat(v)}<em>${"●".repeat(5-v)}</em></span></div>`).join("");

// Projects + filter
function show(f){$("#projectList").innerHTML=PROJECTS.filter(p=>f==="all"||p.t===f)
 .map(p=>`<article class="proj"><h3>${p.n}</h3><p>${p.d}</p><div class="tags"><span class="tag">${p.t}</span></div></article>`).join("")}
show("all");
$("#filters").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;
 document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));show(b.dataset.f)};

// Scroll reveal + skill bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");
 io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(s=>io.observe(s));

// Active nav link + back to top
const links=[...document.querySelectorAll("nav a")];
addEventListener("scroll",()=>{$("#toTop").classList.toggle("show",scrollY>500);
 let cur="";document.querySelectorAll("main section").forEach(s=>{if(scrollY>=s.offsetTop-120)cur=s.id});
 links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+cur&&!a.classList.contains("pill")))},{passive:true});
$("#toTop").onclick=()=>scrollTo({top:0});

// Contact form (front-end feedback only)
$("#form").addEventListener("submit",e=>{e.preventDefault();
 const n=$("#name").value.trim(),m=$("#email").value.trim(),g=$("#msg").value.trim(),s=$("#status");
 if(!n||!g){s.className="err";s.textContent="Please enter your name and a message.";return}
 if(!/^\S+@\S+\.\S+$/.test(m)){s.className="err";s.textContent="Enter a valid email address, like you@example.com.";return}
 s.className="ok";s.textContent="Thanks, "+n+". Your message is ready to send.";e.target.reset()});
