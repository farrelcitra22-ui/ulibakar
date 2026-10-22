// GANTI nomor di bawah dengan nomor WhatsApp bisnis Anda, gunakan format internasional tanpa + atau spasi.
const WHATSAPP_NUMBER = "6281389616959";


const products = [
  {
    id: "uli-bakar serundeng",
    name: "Uli Bakar Serundeng",
    desc: "Minimal pemesanan 2pcs.",
    price: 6000,
    image: "images/Uli-Bakar.jpg",
    tag: "BEST SELLER"
  },
  {
    id: "uli-original",
    name: "Uli Bakar Original",
    desc: "Minimal pemesanan 2pcs.",
    price: 6000,
    image: "images/Uli-Original.jpg",
    tag: "WENAK"
  },
  {
    id: "uli-goreng",
    name: "Uli Goreng",
    desc: "Minimal pemesanan 2pcs.",
    price: 6000,
    image: "images/Uli-Goreng.jpg",
    tag: "GURIH"
  },
  {
    id: "gemblong",
    name: "Gemblong",
    desc: "Minimal pemesanan 2pcs.",
    price: 6000,
    image: "images/Gemblong.jpg",
    tag: "MANIS"
  },
  {
    id: "cucur",
    name: "Cucur",
    desc: "Minimal pemesanan 2pcs.",
    price: 6000,
    image: "images/Cucur.jpg",
    tag: "MANIS"
  },
  {
    id: "pulungan",
    name: "Pulungan",
    desc: "Uli original dibungkus daun pisang berat 1/2kg.",
    price: 22000,
    image: "images/Pulungan.jpg",
    tag: "HEMAT"
  }
];

const cart = {};
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
const menuGrid = document.getElementById("menuGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const itemCount = document.getElementById("itemCount");
const toast = document.getElementById("toast");

document.getElementById("year").textContent = new Date().getFullYear();


function renderMenu() {
  menuGrid.innerHTML = products.map(p => `
    <article class="menu-card">
      <div class="menu-image">
        <span class="tag">${p.tag}</span>
        <img
          src="${p.image}"
          alt="${p.name}"
          class="product-image"
          onerror="this.style.display='none'"
        >
      </div>

      <div class="menu-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>

        <div class="menu-bottom">
          <span class="price">${rupiah(p.price)}</span>
          <button class="add-btn" data-add="${p.id}">
            + Tambah
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function showToast(message){
  toast.textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600);
}
function addItem(id,delta=1){
  cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();
}
function getLines(){return products.filter(p=>cart[p.id]).map(p=>({...p,qty:cart[p.id],subtotal:p.price*cart[p.id]}))}
function getTotal(){return getLines().reduce((sum,p)=>sum+p.subtotal,0)}
function renderCart(){
  const lines=getLines(),count=lines.reduce((s,p)=>s+p.qty,0);
  itemCount.textContent=`${count} item`;cartTotal.textContent=rupiah(getTotal());
  cartItems.innerHTML=lines.length?lines.map(p=>`
    <div class="cart-row"><div><strong>${p.name}</strong><small>${rupiah(p.price)} × ${p.qty} = ${rupiah(p.subtotal)}</small></div>
      <div class="qty-controls"><button aria-label="Kurangi ${p.name}" data-delta="-1" data-id="${p.id}">−</button><span>${p.qty}</span><button aria-label="Tambah ${p.name}" data-delta="1" data-id="${p.id}">+</button></div></div>`).join("")
    :'<p class="empty-cart">Belum ada menu. Pilih menu favoritmu di atas.</p>';
}
function orderDetails(){
  const lines=getLines();
  if(!lines.length){showToast("Keranjang masih kosong. Tambahkan menu dulu.");return null}
  const name=document.getElementById("customerName").value.trim();
  if(!name){showToast("Isi nama pemesan terlebih dahulu.");document.getElementById("customerName").focus();return null}
  return {lines,name,phone:document.getElementById("customerPhone").value.trim(),type:document.getElementById("orderType").value,payment:document.getElementById("paymentMethod").value,address:document.getElementById("customerAddress").value.trim(),note:document.getElementById("orderNote").value.trim(),total:getTotal()};
}
function makeOrderText(o){
  const lines=o.lines.map((p,i)=>`${i+1}. ${p.name} x${p.qty} — ${rupiah(p.subtotal)}`).join("\n");
  return `Halo Bang Par Par, saya mau pesan:\n\n${lines}\n\nTotal: ${rupiah(o.total)}\nNama: ${o.name}\nNo. HP: ${o.phone||"-"}\nJenis pesanan: ${o.type}\nMetode pembayaran: ${o.payment}\nAlamat/catatan lokasi: ${o.address||"-"}\nCatatan dapur: ${o.note||"-"}\n\nMohon konfirmasi ketersediaan dan total akhir. Terima kasih!`;
}
function makeReceipt(o){
  const now=new Date();
  const date=now.toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"})+" "+now.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});
  document.getElementById("receipt").innerHTML=`
    <h2>ULI BAKAR BANG PAR PAR</h2><p class="center">Tabur Serundeng • Bambu Apus</p><p class="center">Jakarta Timur</p>
    <div class="line"></div><p>Tanggal: ${date}</p><p>Nama: ${escapeHtml(o.name)}</p><p>Pesanan: ${escapeHtml(o.type)}</p><p>Pembayaran: ${escapeHtml(o.payment)}</p>
    <div class="line"></div><table>${o.lines.map(p=>`<tr><td>${escapeHtml(p.name)}<br>${p.qty} x ${rupiah(p.price)}</td><td class="right">${rupiah(p.subtotal)}</td></tr>`).join("")}</table>
    <div class="line"></div><table><tr class="total"><td>TOTAL</td><td class="right">${rupiah(o.total)}</td></tr></table>
    ${o.note?`<p>Catatan: ${escapeHtml(o.note)}</p>`:""}${o.address?`<p>Alamat: ${escapeHtml(o.address)}</p>`:""}
    <div class="line"></div><p class="foot">Terima kasih sudah memesan!<br>Rasa tradisional, bikin kangen.</p>`;
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

menuGrid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b){addItem(b.dataset.add);showToast("Menu ditambahkan ke keranjang.")}});
cartItems.addEventListener("click",e=>{const b=e.target.closest("[data-delta]");if(b)addItem(b.dataset.id,Number(b.dataset.delta))});
document.getElementById("clearCart").addEventListener("click",()=>{Object.keys(cart).forEach(k=>delete cart[k]);renderCart();showToast("Keranjang dikosongkan.")});
document.getElementById("sendWhatsApp").addEventListener("click",()=>{
  const o=orderDetails();if(!o)return;
  if(!/^62\d{8,15}$/.test(WHATSAPP_NUMBER)){showToast("Atur nomor WhatsApp di file script.js terlebih dahulu.");return}
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(makeOrderText(o))}`,"_blank","noopener");
});
document.getElementById("printReceipt").addEventListener("click",()=>{
  const o=orderDetails();if(!o)return;makeReceipt(o);window.print();
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
renderMenu();renderCart();
