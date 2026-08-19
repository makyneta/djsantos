(function(){
  "use strict";

  var translations = {
    pt: {
      skip:"Saltar para o conteúdo",
      nav_bio:"Biografia",
      nav_music:"Música",
      nav_gallery:"Galeria",
      nav_connect:"Contacto",
      hero_eyebrow:"DJ &amp; Producer · Portugal",
      hero_lead:"Afro House e House com groove, tensão e atmosfera — pensado para a pista, da estreia ao último tema.",
      hero_cta:"Ouvir MAYE",
      hero_cta_secondary:"Bookings",
      meta_release_label:"Lançamento",
      meta_genre_label:"Género",
      meta_base_label:"Base",
      bio_tag_kicker:"BASE",
      bio_tag:"Portugal",
      bio_eyebrow:"Biografia",
      bio_title:"O som",
      bio_p1:"<strong>SANTÖS</strong> é um DJ e produtor português dedicado a Afro House e House, com sets pensados para construir energia, groove e uma leitura clara da pista.",
      bio_p2:"A partir de Portugal, o projecto foca-se em ritmo, conexão e atmosferas positivas — do club ao open-air — com uma identidade consistente entre palco e estúdio.",
      bio_p3:"Com referências em Danni Gato, Shimza e Lilocox, o estilo mistura percussão afro com house contemporâneo, privilegiando tensão, emoção e um groove que se sustenta ao longo do set.",
      release_eyebrow:"Single de estreia",
      release_feat_label:"feat.",
      release_desc:"O primeiro single de SANTÖS: Afro House feito para a pista, disponível em todas as plataformas.",
      release_btn:"Ouvir agora",
      gallery_eyebrow:"Ao vivo",
      gallery_title:"Em set",
      gallery_cap1:"Night set",
      gallery_cap2:"Open-air",
      gallery_cap3:"Studio",
      connect_eyebrow:"Contacto",
      connect_title:"Bookings &amp; redes",
      connect_lead:"Para datas, collabs e imprensa, o contacto passa pelas redes. Sets, lançamentos e agenda aparecem primeiro aqui.",
      booking_title:"Bookings",
      booking_text:"Pedidos de palco e eventos via Instagram.",
      booking_btn:"Enviar pedido"
    },
    en: {
      skip:"Skip to content",
      nav_bio:"Biography",
      nav_music:"Music",
      nav_gallery:"Gallery",
      nav_connect:"Contact",
      hero_eyebrow:"DJ &amp; Producer · Portugal",
      hero_lead:"Afro House and House with groove, tension and atmosphere — built for the floor, from the opener to the last track.",
      hero_cta:"Listen to MAYE",
      hero_cta_secondary:"Bookings",
      meta_release_label:"Release",
      meta_genre_label:"Genre",
      meta_base_label:"Based in",
      bio_tag_kicker:"BASED IN",
      bio_tag:"Portugal",
      bio_eyebrow:"Biography",
      bio_title:"The sound",
      bio_p1:"<strong>SANTÖS</strong> is a Portuguese DJ and producer focused on Afro House and House, with sets built to hold energy, groove and a clear reading of the floor.",
      bio_p2:"Working from Portugal, the project is about rhythm, connection and a positive atmosphere — from clubs to open-air — with a consistent identity between stage and studio.",
      bio_p3:"Drawing on Danni Gato, Shimza and Lilocox, the style blends Afro percussion with contemporary house, favouring tension, emotion and a groove that holds across the set.",
      release_eyebrow:"Debut single",
      release_feat_label:"feat.",
      release_desc:"SANTÖS’s debut single: Afro House built for the dance floor, out now on all platforms.",
      release_btn:"Listen now",
      gallery_eyebrow:"Live",
      gallery_title:"On set",
      gallery_cap1:"Night set",
      gallery_cap2:"Open-air",
      gallery_cap3:"Studio",
      connect_eyebrow:"Contact",
      connect_title:"Bookings &amp; socials",
      connect_lead:"Dates, collabs and press go through socials. Sets, releases and the calendar land there first.",
      booking_title:"Bookings",
      booking_text:"Stage and event requests via Instagram.",
      booking_btn:"Send request"
    }
  };

  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  var header = document.getElementById("siteHeader");

  function setNavOpen(open){
    navLinks.classList.toggle("open", open);
    header.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-lock", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    var en = document.documentElement.lang === "en";
    burger.setAttribute("aria-label", open ? (en ? "Close menu" : "Fechar menu") : (en ? "Open menu" : "Abrir menu"));
  }

  function closeNav(){ setNavOpen(false); }

  burger.addEventListener("click", function(){
    setNavOpen(!navLinks.classList.contains("open"));
  });
  navLinks.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", closeNav);
  });
  window.addEventListener("keydown", function(e){
    if(e.key === "Escape") closeNav();
  });

  function applyLang(lang){
    document.documentElement.lang = lang;
    try{ localStorage.setItem("santos-lang", lang); }catch(e){}
    document.getElementById("btn-pt").classList.toggle("active", lang === "pt");
    document.getElementById("btn-en").classList.toggle("active", lang === "en");
    var dict = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      if(dict[key] !== undefined) el.innerHTML = dict[key];
    });
    closeNav();
  }

  document.getElementById("btn-pt").addEventListener("click", function(){ applyLang("pt"); });
  document.getElementById("btn-en").addEventListener("click", function(){ applyLang("en"); });

  var saved = null;
  try{ saved = localStorage.getItem("santos-lang"); }catch(e){}
  if(saved === "pt" || saved === "en"){
    applyLang(saved);
  } else if((navigator.language || "pt").toLowerCase().indexOf("pt") === -1){
    applyLang("en");
  }

  function onScroll(){ header.classList.toggle("scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.14 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in-view"); });
  }
})();