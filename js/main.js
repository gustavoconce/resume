/**
 * main.js — Portfolio minimalista
 *
 *  1. Dados do conteúdo
 *  2. Traduções (PT / EN)
 *  3. Utilitários
 *  4. Renderização das listas
 *  5. Idioma
 *  6. Tema
 *  7. Navegação entre painéis (hash)
 *  8. Loader com animação do nome
 *  9. Inicialização
 */
(() => {
  'use strict';

  /* ======================================================================
     1. DADOS
     ====================================================================== */
  const data = {
    stack: [
      'JavaScript', 'Node', 'React', 'Java', 'Python', 'Spring Boot', 'Microservices',
      'PostgreSQL', 'MySQL', 'MariaDB', 'SQL', 'Docker', 'SDD', 'Scrum', 'Figma', 'Git', 'GitHub'
    ],

    journey: [
      {
        title: 'FitInsur',
        meta: [
          { pt: '2026 — atual', en: '2026 — now' },
          { pt: 'Desenvolvedor de Software Full Stack', en: 'Full Stack Software Developer' }
        ],
        desc: {
          pt: 'Atuação no desenvolvimento e manutenção de aplicações SaaS, garantindo o bom funcionamento da plataforma, implementando novas funcionalidades e produtos de acordo com as regras de negócio, além de identificar e corrigir eventuais bugs.',
          en: 'Developing and maintaining SaaS applications, ensuring the platform runs smoothly, implementing new features and products according to business rules, and identifying and fixing bugs.'
        }
      }
    ],

    projects: [
      {
        title: { pt: 'Minha PokeDex', en: 'My PokeDex' },
        meta: ['HTML5', 'CSS3', 'JavaScript', 'PokéAPI', 'GitHub Pages'],
        desc: {
          pt: 'Pokédex web que consome a PokéAPI para buscar e exibir informações sobre Pokémon, com requisições assíncronas e manipulação dinâmica do DOM.',
          en: 'Web Pokédex that consumes the PokéAPI to fetch and display Pokémon information, using asynchronous requests and dynamic DOM manipulation.'
        },
        links: [
          { label: 'link.repo', url: 'https://github.com/gustavoconce/pokedex' },
          { label: 'link.demo', url: 'https://gustavoconce.github.io/pokedex/' }
        ]
      }
    ],

    certs: [
      {
        title: { pt: 'React: desenvolvendo com JavaScript', en: 'React: developing with JavaScript' },
        meta: ['Alura'],
        links: [{ label: 'link.cert', url: 'https://cursos.alura.com.br/certificate/2a9394f4-f735-4274-83dd-46df93a08cdb?lang' }]
      },
      {
        title: { pt: 'JavaScript: consumindo e tratando dados de uma API', en: 'JavaScript: consuming and handling data from an API' },
        meta: ['Alura'],
        links: [{ label: 'link.cert', url: 'https://cursos.alura.com.br/certificate/67e15ba4-a17b-4853-8d02-240705cd126b?lang' }]
      },
      {
        title: 'SQL for Data Science',
        meta: ['University of California, Davis'],
        links: [{ label: 'link.cert', url: 'https://www.coursera.org/account/accomplishments/verify/LGO05U3OEFIQ' }]
      }
    ],

    articles: [
      {
        title: {
          pt: 'Java tem mais de 30 anos. Por que ainda está em alta?',
          en: 'Java is over 30 years old. Why is it still trending?'
        },
        meta: [{ pt: '4 min de leitura', en: '4 min read' }],
        desc: {
          pt: 'Por que uma linguagem com mais de 30 anos continua sendo tão relevante?',
          en: 'Why does a language over 30 years old remain so relevant?'
        },
        links: [{ label: 'link.linkedin', url: 'https://www.linkedin.com/pulse/java-tem-mais-de-30-anos-por-que-ainda-est%C3%A1-em-alta-santos-concei%C3%A7%C3%A3o-qwuzf/' }]
      }
    ]
  };

  /* ======================================================================
     2. TRADUÇÕES (chaves = data-i18n no HTML ou rótulos usados no JS)
     ====================================================================== */
  const i18n = {
    en: {
      'role': 'Software Developer · Fullstack',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.journey': 'Journey',
      'nav.projects': 'Projects',
      'nav.certs': 'Certifications',
      'nav.articles': 'Articles',
      'nav.contact': 'Contact',
      'home.quote': '“Dedication makes dreams come true.”',
      'home.bio': 'Full Stack Software Developer with experience in JavaScript (Node JS, React JS), Java, Python and AI, using Spec-Driven Development as my main methodology.',
      'cta.email': 'Send e-mail ↗',
      'cta.resumePt': 'Resume · PT ↗',
      'cta.resumeEn': 'Resume · EN ↗',
      'about.text': 'Graduated in Information Systems from <mark>FIAP</mark>. I have <mark>intermediate English</mark> and I am truly passionate about <mark>software development</mark>. Outside VS Code, I enjoy basketball and One Piece :)',
      'stack.title': 'Tools I work with',
      'journey.title': 'Where I have worked',
      'projects.title': 'My PokeDex',
      'projects.subtitle': 'Because every good dev has a pokedex :)',
      'yt.title': 'Where I think out loud...',
      'yt.lead': 'Coming soon',
      'yt.visit': 'Visit the channel ↗',
      'articles.title': 'Some public notes',
      'articles.lead': 'I write about technology, software development and experiences.',
      'contact.lead': 'New connections are always welcome!',
      'link.repo': 'Repository ↗',
      'link.demo': 'Live demo ↗',
      'link.cert': 'View certificate ↗',
      'link.linkedin': 'Read on LinkedIn ↗'
    },
    // Textos PT estáticos são lidos do HTML; aqui só os rótulos do JS.
    pt: {
      'link.repo': 'Repositório ↗',
      'link.demo': 'Ver online ↗',
      'link.cert': 'Ver certificado ↗',
      'link.linkedin': 'Ler no LinkedIn ↗'
    }
  };

  /* ======================================================================
     3. UTILITÁRIOS
     ====================================================================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** localStorage seguro (pode estar bloqueado em modo privado). */
  const storage = {
    get: (key) => { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set: (key, val) => { try { localStorage.setItem(key, val); } catch (_) { /* ignora */ } }
  };

  const escapeHTML = (str) => String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  const state = {
    lang: storage.get('lang') === 'en' ? 'en' : 'pt'
  };

  /** Texto no idioma atual (string simples ou objeto {pt, en}). */
  const t = (value) => (typeof value === 'object' ? value[state.lang] : value);

  const label = (key) => i18n[state.lang][key];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     4. RENDERIZAÇÃO
     ====================================================================== */
  /** Template genérico de item: título grande, meta, descrição e links. */
  const itemTemplate = (item) => `
    <li class="item">
      <h3 class="item__title">${escapeHTML(t(item.title))}</h3>
      ${item.meta ? `<p class="item__meta">${item.meta.map((m) => `<span>${escapeHTML(t(m))}</span>`).join('')}</p>` : ''}
      ${item.desc ? `<p class="item__desc">${escapeHTML(t(item.desc))}</p>` : ''}
      ${item.links ? `<p class="item__links">${item.links.map((l) =>
        `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener noreferrer">${label(l.label)}</a>`).join('')}</p>` : ''}
    </li>`;

  const render = () => {
    $('#stackList').innerHTML = data.stack.map((s) => `<li>${escapeHTML(s)}</li>`).join('');
    $('#journeyList').innerHTML = data.journey.map(itemTemplate).join('');
    $('#projectsList').innerHTML = data.projects.map(itemTemplate).join('');
    $('#certsList').innerHTML = data.certs.map(itemTemplate).join('');
    $('#articlesList').innerHTML = data.articles.map(itemTemplate).join('');
  };

  /* ======================================================================
     5. IDIOMA
     ====================================================================== */
  const lang = {
    /** Guarda o HTML original (PT) de cada elemento traduzível. */
    cacheDefaults() {
      $$('[data-i18n]').forEach((el) => {
        i18n.pt[el.dataset.i18n] ??= el.innerHTML.trim();
      });
    },

    apply() {
      const dict = i18n[state.lang];
      $$('[data-i18n]').forEach((el) => {
        const value = dict[el.dataset.i18n];
        if (value) el.innerHTML = value;
      });

      document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
      $('#langToggle').setAttribute('aria-checked', String(state.lang === 'en'));
      render();
    },

    toggle() {
      state.lang = state.lang === 'pt' ? 'en' : 'pt';
      storage.set('lang', state.lang);
      lang.apply();
    }
  };

  /* ======================================================================
     6. TEMA (escuro padrão / claro off-white)
     ====================================================================== */
  const theme = {
    current: () => document.documentElement.dataset.theme || 'dark',

    set(value) {
      document.documentElement.dataset.theme = value;
      storage.set('theme', value);
      $('meta[name="theme-color"]').content = value === 'dark' ? '#0d0d0d' : '#f4f2ee';
      $$('[data-theme-set]').forEach((btn) =>
        btn.setAttribute('aria-pressed', String(btn.dataset.themeSet === value)));
    },

    init() {
      theme.set(theme.current());
      $$('[data-theme-set]').forEach((btn) =>
        btn.addEventListener('click', () => theme.set(btn.dataset.themeSet)));
    }
  };

  /* ======================================================================
     7. NAVEGAÇÃO ENTRE PAINÉIS
     Cada item do menu mostra um painel; o hash da URL guarda o estado.
     ====================================================================== */
  const router = {
    panels: [],
    links: [],

    init() {
      this.panels = $$('.panel');
      this.links = $$('.menu a');
      window.addEventListener('hashchange', () => this.show(location.hash));
      this.show(location.hash);
    },

    show(hash) {
      const id = hash.replace('#', '');
      const target = this.panels.find((p) => p.id === id) || this.panels[0];

      this.panels.forEach((p) => { p.hidden = p !== target; });
      this.links.forEach((a) => {
        if (a.hash === `#${target.id}`) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });

      // Cada painel começa do topo (a rolagem acontece dentro de .content)
      $('#content').scrollTop = 0;
    }
  };

  /* ======================================================================
     7.1 CONFIGURAÇÕES (mobile) — painel de tema/idioma aberto pelo botão
     ====================================================================== */
  const settings = {
    init() {
      const btn = $('#settingsToggle');
      const panel = $('#settings');

      const setOpen = (open) => {
        panel.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      };

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!panel.classList.contains('is-open'));
      });

      // Fecha ao clicar fora ou pressionar Esc
      document.addEventListener('click', (e) => {
        if (!panel.contains(e.target)) setOpen(false);
      });
      document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
    }
  };

  /* ======================================================================
     8. LOADER — nome surge com letras "embaralhadas" que se resolvem
     ====================================================================== */
  const loader = {
    glyphs: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

    run() {
      const el = $('#loaderName');
      const text = el.textContent;

      if (prefersReducedMotion) return this.finish(0);

      // Um <span> por letra, inicialmente invisível
      el.innerHTML = [...text].map(() => '<span>&nbsp;</span>').join('');
      const spans = $$('span', el);
      const randomGlyph = () => this.glyphs[Math.floor(Math.random() * this.glyphs.length)];

      const stepMs = 45;        // intervalo entre quadros
      const revealEvery = 2;    // a cada N quadros uma letra se fixa
      const total = text.length * revealEvery + 8;
      let frame = 0;

      const tick = () => {
        spans.forEach((span, i) => {
          const char = text[i];
          const fixedAt = i * revealEvery + 6;
          if (char === ' ') span.innerHTML = '&nbsp;';
          else if (frame >= fixedAt) span.textContent = char;
          else if (frame >= i * revealEvery * 0.5) span.textContent = randomGlyph();
        });

        frame += 1;
        if (frame <= total) {
          setTimeout(tick, stepMs);
        } else {
          $('.loader__sub').classList.add('is-visible');
          this.finish(900);
        }
      };

      tick();
    },

    finish(delay) {
      setTimeout(() => {
        $('#loader').classList.add('is-done');
        document.body.classList.remove('is-loading');
      }, delay);
    }
  };

  /* ======================================================================
     9. INICIALIZAÇÃO
     ====================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    lang.cacheDefaults();
    lang.apply();
    theme.init();
    router.init();
    settings.init();
    loader.run();

    $('#langToggle').addEventListener('click', lang.toggle);
    $('#year').textContent = new Date().getFullYear();
  });
})();
