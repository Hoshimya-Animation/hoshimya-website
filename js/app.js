// app.js

// Botones
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

// Detectar preferencias del navegador
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';

// Recuperar valores guardados o usar los del navegador
let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
let currentLang = localStorage.getItem('lang') || browserLang;

// --- Tema ---
function applyTheme(mode){
  currentTheme = mode;
  document.documentElement.classList.toggle('dark', mode === 'dark');
  themeToggle.textContent = mode === 'dark' ? '🌞' : '🌙';
  localStorage.setItem('theme', mode);
}

// Inicializar tema
applyTheme(currentTheme);

// Toggle tema
themeToggle.addEventListener('click', () => {
  const next = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// --- Idioma ---
function applyLang(lang){
  currentLang = lang;
  langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
  localStorage.setItem('lang', lang);

  // Redirige según idioma
  if(lang === 'en'){
    window.location.href = "/en/index.html"; // versión en inglés
  } else if (lang === 'es'){
    window.location.href = "/index.html";    // versión en español
  }
}

// Inicializar idioma solo la primera vez
if (!localStorage.getItem('lang')) {
  applyLang(browserLang);
} else {
  if (langToggle) {
    langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
  }
}


// Toggle idioma manual (redirige al hacer clic)
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    applyLang(nextLang);
  });
}



//Normilizar busqueda
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
}

async function buscarEnPaginas(term, paginas) {
  let resultados = [];

  for (const pagina of paginas) {
    try {
      const res = await fetch(pagina);
      if (!res.ok) continue; // si la página no existe, saltar
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const articles = doc.querySelectorAll('article.card');
      

      articles.forEach(article => {
        const tagsAttr = normalizar(article.getAttribute('data-tags') || '');
        const text = normalizar(article.textContent);

        if (tagsAttr.includes(term) || text.includes(term)) {
          resultados.push(article.outerHTML);
        }
      });
    } catch (err) {
      console.error("Error al leer", pagina, err);
    }
  }

  return resultados;
}

document.addEventListener('DOMContentLoaded', () => {
  const q = document.getElementById('q');
  const searchBtn = document.getElementById('searchBtn');
  const articlesContainer = document.querySelector('.articles-container');
  if (!q || !searchBtn || !articlesContainer) return;
  const contenidoOriginal = articlesContainer.innerHTML;
  searchBtn.addEventListener('click', async () => {
    const term = normalizar(q.value.trim());
    if (!term) {
      articlesContainer.innerHTML = contenidoOriginal; // reset
      return;
    }

    const paginas = ['es/noticias.html','en/news.html', /* agrega más páginas según sea necesario */];
    const resultados = await buscarEnPaginas(term, paginas);

    articlesContainer.innerHTML = resultados.length
      ? resultados.join('')
      : `<p>No se encontraron resultados para "${term}"</p>`;
  });
});







// Newsletter (demo)
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  // Envía backend con fetch()
  alert(`Gracias por suscribirte: ${email}.`);
  e.target.reset();

});



