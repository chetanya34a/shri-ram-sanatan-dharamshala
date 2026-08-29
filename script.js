const design=document.getElementById("design");
const hi=document.getElementById("imageHi");
const en=document.getElementById("imageEn");
const modal=document.getElementById("modal");
const contentBox=document.getElementById("modalContent");
const closeBtn=document.getElementById("closeModal");

const mapsUrl="https://maps.app.goo.gl/XeY1s6ZQkjkhzDxR7?g_st=ac";
const phone="tel:+919466459871";
const whatsapp="https://wa.me/919466459871";

const content={
hi:{
home:["॥ श्री राम ॥","श्री राम सनातन धर्मशाला","शिवाजी कॉलोनी, रोहतक में आपका हार्दिक स्वागत है। धर्मशाला सभी के लिए खुली है और स्वच्छ, शांत एवं सुरक्षित वातावरण में उचित कीमतों पर सुविधाएँ उपलब्ध हैं।","🏠"],
about:["ॐ","हमारे बारे में","श्री राम सनातन धर्मशाला शिवाजी कॉलोनी, रोहतक में स्थित एक सेवा-भाव से समर्पित स्थान है। सभी आगंतुकों का स्वागत है। पूरे परिसर की साफ-सफाई और उचित रखरखाव का विशेष ध्यान रखा जाता है।","🛕"],
facilities:["✦","हमारी विशेषताएँ","• सभी के लिए खुला<br>• स्वच्छ एवं सुव्यवस्थित<br>• उचित मूल्य पर बुकिंग<br>• सुरक्षित एवं शांत वातावरण<br>• उत्तम सुविधाएँ","⭐"],
booking:["₹","बुकिंग एवं पूछताछ","कमरे, हॉल या कार्यक्रम की बुकिंग के लिए Ramesh Kumar (बबली) से सीधे संपर्क करें।","📅"],
location:["📍","स्थान","शिवाजी कॉलोनी, रोहतक, हरियाणा","📍"],
contact:["☎","संपर्क","Ramesh Kumar (बबली)<br><strong>9466459871</strong>","☎"]},
en:{
home:["॥ SHRI RAM ॥","Shri Ram Sanatan Dharamshala","A warm welcome to Shri Ram Sanatan Dharamshala in Shivaji Colony, Rohtak. Open for everyone, with a clean, peaceful and safe environment and facilities at reasonable prices.","🏠"],
about:["ॐ","About Us","Shri Ram Sanatan Dharamshala is a service-oriented place in Shivaji Colony, Rohtak. Everyone is welcome. Special attention is given to cleanliness and proper maintenance of the premises.","🛕"],
facilities:["✦","Our Highlights","• Open for Everyone<br>• Clean & Well Maintained<br>• Booking at Reasonable Prices<br>• Safe & Peaceful Environment<br>• Excellent Facilities","⭐"],
booking:["₹","Booking & Enquiry","For room, hall or event booking, contact Ramesh Kumar (बबली) directly.","📅"],
location:["📍","Location","Shivaji Colony, Rohtak, Haryana","📍"],
contact:["☎","Contact","Ramesh Kumar (बबली)<br><strong>9466459871</strong>","☎"]}};

let lang=localStorage.getItem("dharamshala-lang")||"hi";

function setLanguage(next){
  lang=next;
  design.src=next==="hi"?"assets/hindi-design.png":"assets/english-design.png";
  document.documentElement.lang=next;
  hi.setAttribute("aria-pressed",next==="hi");
  en.setAttribute("aria-pressed",next==="en");
  document.querySelectorAll(".real-nav [data-hi][data-en]").forEach(el=>{
    el.textContent=next==="hi"?el.dataset.hi:el.dataset.en;
  });
  localStorage.setItem("dharamshala-lang",next);
}

function openModal(key){
  const [symbol,title,body]=content[lang][key];
  let actions="";
  if(key==="booking"||key==="contact"){
    actions=`<div class="modal-actions">
      <a class="action orange" href="${phone}">☎ 9466459871</a>
      <a class="action green" href="${whatsapp}" target="_blank" rel="noopener">◉ WhatsApp</a>
    </div>`;
  }else if(key==="location"){
    actions=`<div class="modal-actions">
      <a class="action blue" href="${mapsUrl}" target="_blank" rel="noopener">📍 ${lang==="hi"?"Google Maps पर स्थान देखें":"Open Google Maps"}</a>
    </div>`;
  }else if(key==="home"){
    actions=`<div class="modal-actions">
      <a class="action orange" href="${phone}">☎ 9466459871</a>
      <a class="action blue" href="${mapsUrl}" target="_blank" rel="noopener">📍 Google Maps</a>
    </div>`;
  }
  contentBox.innerHTML=`<div class="modal-symbol">${symbol}</div><h2>${title}</h2><p>${body}</p>${key==="about"?`<div class="modal-note">${lang==="hi"?"स्वच्छता, सेवा और सद्भाव हमारी प्राथमिकता है।":"Cleanliness, service and harmony are our priorities."}</div>`:""}${actions}`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  closeBtn.focus();
}

function closeModalNow(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

hi.addEventListener("click",()=>setLanguage("hi"));
en.addEventListener("click",()=>setLanguage("en"));

document.querySelectorAll("[data-modal]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".nav-hotspots [data-modal]").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    openModal(btn.dataset.modal);
  });
});

closeBtn.addEventListener("click",closeModalNow);
modal.addEventListener("click",e=>{if(e.target===modal)closeModalNow()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModalNow()});

setLanguage(lang);
