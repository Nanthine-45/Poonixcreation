// Poonix Creation storefront — edit the products and contact details below.
const WHATSAPP_NUMBER = ""; // Add your WhatsApp number with country code, digits only. Example: 919876543210
const CONTACT_EMAIL = "hello@poonixcreation.com";
const INSTAGRAM_URL = "https://instagram.com/"; // Replace with your Instagram profile URL.

const products = [
{id:1,name:"Daisy Mini Tote",category:"Bags",price:599,description:"A cheerful everyday mini bag",image:"teddy.webp",tag:"Bestseller",bg:"#f3dfe5"},

{id:2,name:"Pastel Bloom Bouquet",category:"Flowers",price:349,description:"Forever flowers, made by hand",image:"flower.webp",tag:"Handmade",bg:"#eee6f4"},

{id:3,name:"Tiny Tulip Keychain",category:"Keychains",price:149,description:"A tiny pop of colour for your keys",image:"tulip.webp",tag:"Cute pick",bg:"#f8e8d7"},

{id:4,name:"Cloud Nine Shoulder Bag",category:"Bags",price:799,description:"Soft texture, sweet little details",image:"bag.webp",tag:"New",bg:"#e4e9dc"},

{id:5,name:"Sunshine Crochet Daisy",category:"Flowers",price:199,description:"A little sunshine that never fades",image:"daisy.webp",tag:"",bg:"#f6edcf"},

{id:6,name:"Berry Sweet Charm",category:"Keychains",price:129,description:"A playful handmade bag charm",image:"berry.webp",tag:"",bg:"#f5dfe0"},

{id:7,name:"Gift Box of Blooms",category:"Gifts",price:499,description:"A thoughtful gift for someone lovely",image:"gift.webp",tag:"Gift idea",bg:"#e9e2f0"},

{id:8,name:"Cozy Crochet Pouch",category:"Gifts",price:399,description:"A sweet home for little essentials",image:"pouch.webp",tag:"",bg:"#e7e9df"}
];
let cart = JSON.parse(localStorage.getItem("poonixCart") || "[]");
let activeFilter = "All";
const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const money = value => "₹" + value.toLocaleString("en-IN");

function renderProducts(){
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const visible = products.filter(p => (activeFilter === "All" || p.category === activeFilter) &&
    (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)));
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image" style="background:${p.bg}">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
        <span class="product-emoji" aria-hidden="true">${p.emoji}</span>
        <button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button>
      </div>
      <div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><span class="product-price">${money(p.price)}</span></div>
    </article>`).join("");
  emptyState.hidden = visible.length !== 0;
}
function saveCart(){localStorage.setItem("poonixCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your little bag ♡");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
  const count=cart.reduce((sum,x)=>sum+x.qty,0);
  const total=cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("cartTitleCount").textContent=`(${count})`;
  document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(p=>p.id===x.id);return `
    <div class="cart-row"><div class="cart-thumb" style="background:${p.bg}">${p.emoji}</div>
    <div><h4>${p.name}</h4><small>${money(p.price)} each</small><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div>
    <button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`}).join(""):`<div class="empty-state">Your bag is waiting for something lovely ♡</div>`;
  document.getElementById("checkoutButton").disabled=!cart.length;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");}
function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2200);}
function checkout(){
  if(!cart.length)return;
  const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `${p.name} x ${x.qty} — ${money(p.price*x.qty)}`;});
  const total=cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  const message=`Hello Poonix Creation! I'd like to place an order:\n${lines.join("\n")}\nSubtotal: ${money(total)}\nPlease confirm availability and delivery details.`;
  if(!WHATSAPP_NUMBER){showToast("Add your WhatsApp number in script.js to enable ordering.");return;}
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));
  const qty=e.target.closest("[data-qty]");if(qty)changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));
  const remove=e.target.closest("[data-remove]");if(remove)changeQty(Number(remove.dataset.remove),-999);
  const filter=e.target.closest("[data-filter]");if(filter){activeFilter=filter.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===filter));renderProducts();}
});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("continueShopping").addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",checkout);
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");const open=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("contactEmail").href=`mailto:${CONTACT_EMAIL}`;
document.getElementById("contactEmail").textContent=CONTACT_EMAIL;
document.getElementById("instagramLink").href=INSTAGRAM_URL;
renderProducts();renderCart();
