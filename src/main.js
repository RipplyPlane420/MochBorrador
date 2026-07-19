// MAIN.JS - MOCHOMOS LUXURY SPA INTERACTIVE LOGIC

// 1. UTILIDAD DE CONVERSIÓN DE URL DE GOOGLE DRIVE A ENLACE DIRECTO OPTIMIZADO
// Para los archivos locales no realiza conversión, manteniendo la ruta del archivo.
function getDirectDriveUrl(url) {
  if (!url) return '';
  // Si es una ruta local de la carpeta Imagenes, retornar tal cual
  if (url.startsWith('/Imagenes') || url.startsWith('./Imagenes') || url.startsWith('Imagenes/')) {
    return url;
  }
  // Si por alguna razón queda alguna URL de Drive en el DOM, la procesa a thumbnail
  let fileId = '';
  if (url.includes('drive.google.com') && url.includes('/file/d/')) {
    const match = url.match(/\/file\/d\/([^\/]+)/);
    if (match && match[1]) fileId = match[1];
  } else if (url.includes('drive.google.com') && url.includes('id=')) {
    const match = url.match(/id=([^&]+)/);
    if (match && match[1]) fileId = match[1];
  } else if (url.includes('googleusercontent.com') && url.includes('/d/')) {
    const match = url.match(/\/d\/([^\/]+)/);
    if (match && match[1]) fileId = match[1];
  } else if (url.includes('googleusercontent.com') && url.includes('id=')) {
    const match = url.match(/id=([^&]+)/);
    if (match && match[1]) fileId = match[1];
  }

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
  }
  return url;
}

// Base de Datos de Platillos Auténticos de Mochomos (100% del PDF, ESTRICTAMENTE SIN PRECIOS)
const MENU_DATA = {
  entradas: {
    title: "Entradas",
    dishes: [
      // Mariscos
      { name: "Amarrados de Ostión", desc: "Ostión ahumado envuelto en finas láminas de filete de res macerados en limón y bañados en soya dulce." },
      { name: "Pulpo y Camarón al Bacanora", desc: "Sazonados con el toque especial de la casa a las finas hierbas y flameados con bacanora." },
      { name: "Pulpo al Grill", desc: "Finas tiras de pulpo fileteados, servidos con una salsa de ajo, perejil y chile colorado." },
      { name: "Pulpo Granielo", desc: "Finas láminas de pulpo, bañadas en una salsa de chile y nuez." },
      { name: "Pulpo a las Brasas", desc: "Tentáculos de pulpo marinados y llevados a las brasas, servido en plancha caliente y acompañado de tomates cherry asados y bañados en salsa de olivo, pimiento rojo y romero." },
      { name: "Pulpo Bañado (Barra)", desc: "Pulpo frito bañado con una salsa de ajo, chile tostado, cilantro, cebolla y un toque de limón." },
      { name: "Callos Mochomos", desc: "Orden de exquisitos callos empanizados enrollados en tocino y acompañados de mantequilla de ajo y limón." },
      { name: "Calamar Rebosado de la Casa", desc: "Tubos de calamar rebanados y empanizados acompañados de salsa de la casa." },
      { name: "Camarones Chiguili", desc: "Camarones guisados en salsa Mochomos de cerveza y chile, acompañados con aderezo a base de queso de cabra." },
      { name: "Camarones Mosky", desc: "Camarones macerados en limón, rellenos de aguacate, acompañados en sus dos salsas especiales de la casa." },
      { name: "Buñuelos de Camarón", desc: "Camarón salseado con combinación de chiles y tamarindo montados en buñuelos sobre queso crema y especies." },
      { name: "Carpaccio de Salmón", desc: "Finas láminas de lonja de salmón marinadas al momento en aceite de olivo, limón, alcaparras y queso de cabra." },
      { name: "Bocadillos de Atún", desc: "Trozos de atún sellados sobre fritura, mousse de salmón y bañado en salsa de pimientos." },
      { name: "Camarones Bañados", desc: "Camarones fritos con cabeza en salsa especial de la casa basada en ajo, chile tostado, cilantro, cebolla verde y un toque de limón. (Sujeto a existencia)" },
      { name: "Aguachile Alday", desc: "Camarón crudo marinado en una salsa especial a base de limón y chile." },
      { name: "Paté de Marlin", desc: "Aderezado con chipotle y pimiento rojo." },
      { name: "Tartar de Atún", desc: "Trozos frescos de atún aderezados con salsa especial y aguacate." },
      // Carnes (Entradas)
      { name: "Mochomos", desc: "Orden para tres personas de exquisita carne deshebrada frita con cebolla al estilo de Mochomos." },
      { name: "Chicharrones de Rib", desc: "Deliciosos trozos de carne adobados en salsas negras acompañados de cebolla y chile serrano." },
      { name: "Filete Yaqui", desc: "Medallones de filete de puerco bañados en salsa de mango con tomate deshidratado, manzana asada y jícama frita." },
      { name: "Pork Corn (Palomitas)", desc: "Trozos de costilla de puerco sazonados al estilo Mochomos acompañados de un dúo de salsas." },
      { name: "Papada de Puerco", desc: "Deliciosa papada asada al estilo Mochomos." },
      { name: "Papada Alday", desc: "Finas láminas de papada de puerco aderezadas con una salsa especial a base de limón y chile." },
      { name: "Pork Belly", desc: "Porción de faldón de puerco horneado a fuego lento en salsa de manzana, servido en trozos." },
      { name: "Gabachas", desc: "Finas tiras de New York sazonadas con nuestra especial salsa forno." },
      // Quesos
      { name: "Queso Fundido", desc: "Queso fundido premium con un ingrediente a escoger: chile verde, chorizo, chipotle u ostión." },
      { name: "Panela Frita", desc: "Queso regional bañado en salsa de chile verde tatemado." },
      { name: "Panela en Ajonjolí", desc: "Panela empanizada con semillas de ajonjolí, servida y bañada con salsa dulce, acompañada de rodajas de chile caribe." }
    ]
  },
  carnes: {
    title: "Carnes",
    dishes: [
      { name: "Rib Eye Mochomos", desc: "Delicioso corte marinado a las finas hierbas con la receta original de Mochomos." },
      { name: "Rib Eye a la Tabla", desc: "El mejor corte de rib eye de nuestra región, asado a la parrilla y servido en una tabla de mezquite con mantequilla de ajo Mochomos." },
      { name: "Rib Eye Steak", desc: "Corte asado al punto sobre plancha caliente acompañado de papas cambray." },
      { name: "Arrachera", desc: "Asada al punto con papas sazonadas, cebolla y chiles toreados. Acompañada de salsa especial de la casa." },
      { name: "Lomo de Cabrería", desc: "Pieza de filete con hueso asado al gusto, acompañado con papas cambray y salsa especial de la casa." },
      { name: "Filete Almendra", desc: "Tiernos medallones de res bañados en salsa blanca de almendra acompañados de una ensalada de espinacas con aderezo de miel." },
      { name: "Costilla Cargada", desc: "Pieza completa de costilla, horneada por largo tiempo y servida en su propio jugo, acompañada de papas sazonadas." },
      { name: "Rib Eye Añejo", desc: "Corte de Rib Eye asado al término deseado, añejado por 25 días a un grado ºC." },
      { name: "Filete Cereza", desc: "Delicioso filete de res bañado con nuestra única y original salsa de cerezas, acompañado con ensalada de la casa." },
      { name: "Filete Albahaca", desc: "Filete de res gratinado sobre láminas de tomate y queso, bañado con vinagreta. Acompañado de ensalada caprese." },
      { name: "Filete en su Jugo", desc: "Medallón de filete horneado y bañado con una reducción de carne, acompañado de papas paja con champiñones." },
      { name: "Filete Kawi", desc: "Medallones gratinados con queso de cabra, tomate deshidratado y coronados con espinacas fritas y tomate cherry confitado." },
      { name: "Filete Sun Dried", desc: "Medallones de filete de res bañados en salsa de tomate seco al sol y pimentón dulce, acompañado de verdura con mantequilla." },
      { name: "Brocheta de Cabrería con Camarón", desc: "Brocheta de cabrería, camarón y vegetales bañada con salsa especial de la casa con el sazón y estilo de Mochomos." },
      { name: "Tomahawk", desc: "Único corte de Rib Eye con hueso, asado al término deseado y servido sobre tabla de mezquite." },
      { name: "Filete Mantequilla", desc: "Medallones de filete de res bañados en salsa de mantequilla, ajo y limón con un toque de cilantro." }
    ]
  },
  mariscos: {
    title: "Mariscos",
    dishes: [
      { name: "Atún del Chef (200 grs)", desc: "Lonja de atún sellada a la plancha bañada en pesto de cilantro, acompañada de arroz azafrán." },
      { name: "Atún Sastre (200 grs)", desc: "Lonja de atún sellada a la plancha montada sobre tomate confitado y un toque de crema de chipotle suave." },
      { name: "Salmón Alcaparrado (250 grs)", desc: "Lonja de salmón a la plancha bañada con flor de alcaparra frita sobre una cama de espinacas frescas." },
      { name: "Salmón al Perejil (250 grs)", desc: "Sazonado y elaborado a la parrilla con cebolla y perejil fresco, acompañado de ensalada verde." },
      { name: "Salmón Colorado (250 grs)", desc: "Lonja de salmón bañado en salsa de Jamaica caliente, con su crujiente piel tostada." },
      { name: "Especial de Mariscos", desc: "Delicioso platillo de pulpo, camarón y callo fresco con la receta original de la casa basada en salsas negras." },
      { name: "Filete de Pescado Mar de Cortez (280 grs)", desc: "Lonja de pescado a la plancha con tomate, cebolla verde, aceitunas negras y alcaparras. (Sujeto a existencia)" },
      { name: "Filete de Pescado a la Brasa (280 grs)", desc: "Pescado en pasta de adobo de chiles secos y asado, servido con vegetales asados. (Sujeto a existencia)" },
      { name: "Filete de Pescado San Carlos (280 grs)", desc: "Filete de pescado marinado en ajo y soya dulce, servido sobre cama de arroz cremoso con espinacas, champiñones y tomate cherry. (Sujeto a existencia)" },
      { name: "Hongo Porteño", desc: "Rico hongo portobello relleno de pulpo y camarón con salsa cremosa y un toque de chipotle gratinado." }
    ]
  },
  tacos: {
    title: "Tacos",
    dishes: [
      { name: "Tacos de Camarón al Chipotle", desc: "Orden de tres tacos de camarón bañados con nuestra salsa especial de chipotle servidos en tortilla de maíz." },
      { name: "Tacos de Camarón al Cilantro", desc: "Orden de tres tacos de camarón bañados con nuestra salsa especial al cilantro servidos en tortilla de maíz." },
      { name: "Tacos de Filete de Puerco", desc: "Orden de tres tacos de filete de puerco asado, acompañados de una deliciosa salsa diabla y repollo marinado." },
      { name: "Tacos de Carne Asada", desc: "Orden de tres tacos de exquisita carne selecta servidos en tortilla de maíz o harina acompañado de salsa de la casa y guacamole." },
      { name: "Tacos Lechuga de Filete de Puerco", desc: "Lomo de puerco asado al punto y servido en hoja de lechuga aderezado con una reducción dulce de pimientos, almendra tostada, coronados con fritura de jícama (4 pzas.)." },
      { name: "Tacos Lechugones de Atún", desc: "Trozos de atún cocinados y finamente picados, servidos en hojas de lechuga, aderezados con una salsa roja y cebolla morada (3 pzas.). Disponibles también en tortilla de maíz." },
      { name: "Tacos de Marlin con Pulpo", desc: "Tacos semidorados de maíz rellenos de marlin y pulpo, aderezados con salsa de semillas de pepitas." },
      { name: "Tacos de Cola", desc: "Orden de tres tacos de maíz semidorados de cola de res y sazonada con cebolla, cilantro y una rebanada de aguacate." },
      { name: "Tostadas Puestas de Atún", desc: "Orden de tres tostadas de atún marinado en salsa de cítricos y salsas negras, coronada con finas rebanadas de aguacate y poro (Disponible también en salmón)." }
    ]
  },
  ensaladas: {
    title: "Ensaladas",
    dishes: [
      { name: "Ensalada Alfredo", desc: "Mezcla de lechuga, tomate, aguacate, pepino, cebolla morada, aderezado con vinagreta cítrica de la casa." },
      { name: "Ensalada del Campo", desc: "Combinación de lechugas frescas, queso de cabra, manzana verde, tomate cherry con vinagreta a base de cítricos." },
      { name: "Ensalada Mochomos", desc: "Deliciosa ensalada de espinaca aderezada con vinagreta balsámica y coronada con almendras, queso de cabra, arándanos y suprema de mandarina." }
    ]
  },
  vegano: {
    title: "Vegano",
    dishes: [
      { name: "Hongo Vegetariano", desc: "Hongo portobello relleno de tomate, queso panela, calabaza asada y gratinado con queso de cabra." },
      { name: "Torre de Betabel", desc: "Láminas de betabel intercaladas con queso de cabra aderezadas con una vinagreta de arándanos, escarchada con trozos de almendra tostadas." },
      { name: "Coliflor Almendrada", desc: "Coliflor salteada en jugo especial de la casa, espolvoreada con almendra tostada y acompañada con calabaza asada." },
      { name: "Carpaccio de Betabel", desc: "Finas láminas de betabel, acompañadas de frutos rojos, arúgula, queso de cabra y pepitas garapiñadas, bañada con un toque de vinagreta." },
      { name: "Coliflor Chiguili", desc: "Trozos de coliflor salteada con nuestra salsa Mochomos de cerveza y chile, acompañada con aderezo a base de queso de cabra." },
      { name: "Ceviche Vegano", desc: "Ceviche a base de calabaza con el único sabor Mochomos." },
      { name: "Vegetarian Mushroom", desc: "Relleno de tomate, queso panela y calabacín a la parrilla, cubierto con gratinado de queso de cabra." }
    ]
  },
  sopas: {
    title: "Sopas",
    dishes: [
      { name: "Sopa de Tortilla Sonorense", desc: "Sopa tradicional con base de caldo de res al puro estilo de Sonora." },
      { name: "Caldo de Queso", desc: "Caldo con rajas de chile verde, papas y queso regional con el sazón de la casa." }
    ]
  },
  granja: {
    title: "De la Granja",
    dishes: [
      { name: "Rib Eye de Puerco (300 grs)", desc: "Asado al carbón acompañado de crema de champiñones y puré de papa." },
      { name: "Rib Eye de Puerco al Durazno (300 grs)", desc: "Único rib eye marinado y asado a la parrilla, acompañado de ejotes salteados y duraznos asados. Coronado con penca de miel de abeja." },
      { name: "Tomahawk de Puerco", desc: "Corte fino de puerco al término, acompañado de mermelada de cebolla única de Mochomos." },
      { name: "Pork Belly Crujiente", desc: "Corte de pork belly con costra de chicharrón, acompañado con guacamole especial." },
      { name: "Chamorro de Puerco (480 grs)", desc: "Delicioso codillo horneado con el adobo e ingredientes originales de la casa acompañado de puré de papa." },
      { name: "Espárragos a la Ronca", desc: "Deliciosos espárragos envueltos en finas tiras de pechuga de pollo, asado al carbón sobre cama de arroz azafrán y salsa especial (En temporada)." },
      { name: "Pollo en Salsa de Queso", desc: "Pechuga a la plancha bañada en deliciosa salsa de queso, acompañada de vegetales a la mantequilla." },
      { name: "Torre de Pollo al Tamarindo", desc: "Medallones de pechuga de pollo rellenos de queso, montados sobre puré de papa y bañados en salsa de tamarindo y cebollín." }
    ]
  },
  ninos: {
    title: "Niños",
    dishes: [
      { name: "Dedos de Pollo o Pescado", desc: "Tiras crujientes de pollo o pescado empanizadas, acompañadas de papas fritas." },
      { name: "Tacos de Carne Asada", desc: "Tacos de suave carne asada en tortillas a elección." },
      { name: "Tacos de Pollo", desc: "Tacos de pechuga de pollo a la plancha." },
      { name: "Palomitas de Puerco", desc: "Trocitos de puerco sazonados y crujientes estilo palomita." }
    ]
  }
};

// Base de Datos de Imágenes de la Galería (Rutas de archivos locales)
const GALLERY_DATA = {
  platillos: [
    "/Imagenes/Galeria/Platillos/arrachera.jpg",
    "/Imagenes/Galeria/Platillos/atun-sastre.jpg",
    "/Imagenes/Galeria/Platillos/camarones-mosky.jpg",
    "/Imagenes/Galeria/Platillos/chicharrones-de-rib.jpg",
    "/Imagenes/Galeria/Platillos/ensalada-mochomos.jpg",
    "/Imagenes/Galeria/Platillos/esparragos-a-la-ronca.jpg",
    "/Imagenes/Galeria/Platillos/filete-en-su-jugo.jpg",
    "/Imagenes/Galeria/Platillos/filete-mantequilla.jpg",
    "/Imagenes/Galeria/Platillos/mochomos.jpg",
    "/Imagenes/Galeria/Platillos/piedra-caliente.jpg",
    "/Imagenes/Galeria/Platillos/pulpo-y-camaron-al-bacanora.jpg",
    "/Imagenes/Galeria/Platillos/rib-eye-anejo.jpg",
    "/Imagenes/Galeria/Platillos/salmon-colorado.jpg",
    "/Imagenes/Galeria/Platillos/tacos-de-filete.jpg",
    "/Imagenes/Galeria/Platillos/tacos-de-marlin-con-pulpo.jpg",
    "/Imagenes/Galeria/Platillos/tomahak.jpg"
  ],
  restaurantes: [
    "/Imagenes/Galeria/Restaurante/cdmx1.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx2.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx3.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx4.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx5.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx6.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx7.jpg",
    "/Imagenes/Galeria/Restaurante/cdmx8.jpg",
    "/Imagenes/Galeria/Restaurante/clc2.jpg",
    "/Imagenes/Galeria/Restaurante/h1.jpg",
    "/Imagenes/Galeria/Restaurante/h2.jpg",
    "/Imagenes/Galeria/Restaurante/h9.jpg",
    "/Imagenes/Galeria/Restaurante/h10.jpg",
    "/Imagenes/Galeria/Restaurante/h11.jpg",
    "/Imagenes/Galeria/Restaurante/obg1.jpg",
    "/Imagenes/Galeria/Restaurante/qro1.jpg",
    "/Imagenes/Galeria/Restaurante/qro2.jpg",
    "/Imagenes/Galeria/Restaurante/qro3.jpg"
  ]
};

// 2. FUNCIÓN DE INICIALIZACIÓN PRINCIPAL DEL SITIO
function initSite() {

  // A. PROCESAR TODAS LAS URL DE GOOGLE DRIVE EN EL DOM
  // Traduce imágenes estáticas en tags <img>
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.includes('drive.google.com')) {
      img.src = getDirectDriveUrl(src);
    }
  });

  // Traduce los logos del Footer
  const footerLogo = document.getElementById('footerLogo');
  if (footerLogo && footerLogo.src.includes('drive.google.com')) {
    footerLogo.src = getDirectDriveUrl(footerLogo.src);
  }

  // Traduce los fondos dinámicos [data-bg] (Menú y Parallax)
  document.querySelectorAll('[data-bg]').forEach(el => {
    const bgUrl = el.getAttribute('data-bg');
    if (bgUrl) {
      const direct = getDirectDriveUrl(bgUrl);
      el.style.backgroundImage = `url('${direct}')`;
    }
  });

  // Convertir las imágenes dentro de las cartas de menú directamente en CSS
  document.querySelectorAll('.menu-card').forEach(card => {
    const bgUrl = card.getAttribute('data-bg');
    if (bgUrl) {
      const direct = getDirectDriveUrl(bgUrl);
      const bgDiv = card.querySelector('.menu-card-bg');
      if (bgDiv) {
        bgDiv.style.backgroundImage = `url('${direct}')`;
      }
    }
  });

  // B. BUCLE COMPLETO DEL HERO (Portada -> Video -> Portada)
  const heroImage = document.getElementById('heroImage');
  const heroVideo = document.getElementById('heroVideo');

  if (heroImage && heroVideo) {
    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      // En móviles: solo mostrar la portada y ocultar/desactivar el video por completo (ahorra datos móviles)
      heroImage.classList.add('active');
      heroImage.style.display = 'block';
      heroVideo.classList.remove('active');
      heroVideo.style.display = 'none';
      heroVideo.pause();
    } else {
      // En desktop: inicializar y controlar el ciclo (portada -> video -> portada) mediante JS
      heroVideo.loop = false;
      heroVideo.pause();
      heroVideo.currentTime = 0;

      heroImage.classList.add('active');
      heroVideo.classList.remove('active');

      function startHeroLoop() {
        // 1. Mostrar la imagen de portada durante 4 segundos
        setTimeout(() => {
          heroVideo.currentTime = 0;

          // 2. Intentar reproducir el video
          heroVideo.play().then(() => {
            // 3. Cuando inicia la reproducción, hacemos el crossfade
            heroVideo.classList.add('active');
            heroImage.classList.remove('active');
          }).catch(error => {
            console.warn("La reproducción automática del video fue bloqueada, reintentando...", error);
            setTimeout(startHeroLoop, 3000);
          });
        }, 4000);
      }

      // Al finalizar el video completo, regresar a la imagen de portada y repetir el bucle
      heroVideo.addEventListener('ended', () => {
        heroImage.classList.add('active');
        heroVideo.classList.remove('active');
        // Esperar 4 segundos antes de volver a cruzar al video
        startHeroLoop();
      });

      // Iniciar bucle
      startHeroLoop();
    }
  }

  // C. NAVBAR EFECTO SCROLL (GLASSMORPHISM)
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.parentElement.classList.add('scrolled');
      } else {
        navbar.parentElement.classList.remove('scrolled');
      }
    });
  }

  // D. MENÚ MÓVIL TOGGLE
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      const isMobileMenuOpen = mobileMenu.classList.contains('active');
      if (isMobileMenuOpen) {
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');
      } else {
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // E. REVELADO SUAVE AL HACER SCROLL (INTERSECTION OBSERVER)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Revelar solo una vez
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up').forEach(el => {
    revealObserver.observe(el);
  });

  // F. MODAL / DRAWER INTERACTIVO DE PLATILLOS (SIN PRECIOS)
  const menuModal = document.getElementById('menuModal');
  const modalTitle = document.getElementById('modalTitle');
  const dishesList = document.getElementById('dishesList');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  function openMenuModal(categoryKey) {
    const categoryData = MENU_DATA[categoryKey];
    if (!categoryData) return;

    modalTitle.textContent = categoryData.title.toUpperCase();
    dishesList.innerHTML = '';

    categoryData.dishes.forEach(dish => {
      const dishItem = document.createElement('div');
      dishItem.className = 'dish-item';
      dishItem.innerHTML = `
        <h4 class="dish-name">${dish.name}</h4>
        <p class="dish-desc">${dish.desc}</p>
      `;
      dishesList.appendChild(dishItem);
    });

    menuModal.classList.add('active');
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  function closeMenuModal() {
    menuModal.classList.remove('active');
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  // Asignar clics a las tarjetas de menú
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      openMenuModal(category);
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeMenuModal);
    modalOverlay.addEventListener('click', closeMenuModal);
  }

  // G. GALERÍA MASONRY: FILTRADO Y RENDERIZADO DINÁMICO
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function renderGallery(filter) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    const imageUrls = GALLERY_DATA[filter] || [];
    imageUrls.forEach(url => {
      const directUrl = getDirectDriveUrl(url);

      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item loading reveal-up';
      
      const img = document.createElement('img');
      img.className = 'gallery-img';
      img.loading = 'lazy';
      img.alt = 'Mochomos Registro Visual';
      img.onload = () => {
        img.classList.add('loaded');
        galleryItem.classList.remove('loading');
      };
      img.src = directUrl;

      galleryItem.appendChild(img);

      // Clic para abrir Lightbox
      galleryItem.addEventListener('click', () => {
        if (lightbox && lightboxImg) {
          lightboxImg.src = directUrl;
          lightbox.classList.add('active');
          document.documentElement.classList.add('no-scroll');
          document.body.classList.add('no-scroll');
        }
      });

      galleryGrid.appendChild(galleryItem);

      // Observar el nuevo item cargado para el reveal
      revealObserver.observe(galleryItem);
    });
  }

  // Manejar clics de los botones de filtro
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      renderGallery(filter);
    });
  });

  // Cerrar Lightbox
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Renderizar la pestaña inicial (platillos) por defecto
  renderGallery('platillos');


}

// 3. EJECUCIÓN ROBUSTA DE LA INICIALIZACIÓN
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
