/**
 * main.js — Landing page / portfólio
 *
 * Responsabilidades:
 *  1. Dados do conteúdo (fácil de editar em um só lugar)
 *  2. Traduções (PT / EN)
 *  3. Renderização das seções dinâmicas
 *  4. Interruptor de idioma
 *  5. Tema claro / escuro
 *  6. Menu mobile, header e link ativo
 *  7. Animações de entrada (IntersectionObserver)
 */
(() => {
  'use strict';

  /* ======================================================================
     1. DADOS — edite aqui para personalizar o conteúdo
     ====================================================================== */
  const data = {
    stack: [
      'JavaScript', 'Node', 'React', 'Java', 'Python', 'Spring Boot', 'Microservices',
      'PostgreSQL', 'MySQL', 'MariaDB', 'SQL', 'Docker', 'SDD', 'Scrum', 'Figma', 'Git', 'GitHub'
    ],

    journey: [
      {
        initials: 'FI',
        company: 'FitInsur',
        period: { pt: '2026 — atual', en: '2026 — now' },
        role: { pt: 'Desenvolvedor de Software Full Stack', en: 'Full Stack Software Developer' },
        desc: {
          pt: 'Atuação no desenvolvimento e manutenção de aplicações SaaS, garantindo o bom funcionamento da plataforma, implementando novas funcionalidades e produtos de acordo com as regras de negócio, além de identificar e corrigir eventuais bugs.',
          en: 'Developing and maintaining SaaS applications, ensuring the platform runs smoothly, implementing new features and products according to business rules, and identifying and fixing bugs.'
        }
      }
    ],

    projects: [
      {
        title: 'Pokédex',
        repo: 'https://github.com/gustavoconce/pokedex',
        demo: 'https://gustavoconce.github.io/pokedex/',
        desc: {
          pt: 'Pokédex web que consome a PokéAPI para buscar e exibir informações sobre Pokémon, com requisições assíncronas e manipulação dinâmica do DOM.',
          en: 'Web Pokédex that consumes the PokéAPI to fetch and display Pokémon information, using asynchronous requests and dynamic DOM manipulation.'
        },
        tags: ['HTML5', 'CSS3', 'JavaScript', 'PokéAPI', 'REST API', 'GitHub Pages']
      }
    ],

    certs: [
      {
        badge: 'React',
        title: { pt: 'React: desenvolvendo com JavaScript', en: 'React: developing with JavaScript' },
        issuer: 'Alura',
        url: 'https://cursos.alura.com.br/certificate/2a9394f4-f735-4274-83dd-46df93a08cdb?lang'
      },
      {
        badge: 'JS',
        title: { pt: 'JavaScript: consumindo e tratando dados de uma API', en: 'JavaScript: consuming and handling data from an API' },
        issuer: 'Alura',
        url: 'https://cursos.alura.com.br/certificate/67e15ba4-a17b-4853-8d02-240705cd126b?lang'
      },
      {
        badge: 'SQL',
        title: 'SQL for Data Science',
        issuer: 'University of California, Davis',
        url: 'https://www.coursera.org/account/accomplishments/verify/LGO05U3OEFIQ'
      }
    ],

    // Seção de vídeos está oculta no HTML (atributo "hidden" em #videosGrid).
    // Adicione itens aqui e remova o "hidden" quando quiser exibi-los.
    videos: [
      // {
      //   title: { pt: 'Título', en: 'Title' },
      //   duration: '10 min',
      //   tags: 'JavaScript · React',
      //   url: 'https://www.youtube.com/@gustaconcedev',
      //   desc: { pt: 'Descrição', en: 'Description' }
      // }
    ],

    articles: [
      {
        title: {
          pt: 'Java tem mais de 30 anos. Por que ainda está em alta?',
          en: 'Java is over 30 years old. Why is it still trending?'
        },
        minutes: 4,
        url: 'https://www.linkedin.com/in/gustavoconce',
        desc: {
          pt: 'Por que uma linguagem com mais de 30 anos continua sendo tão relevante?',
          en: 'Why does a language over 30 years old remain so relevant?'
        }
      }
    ]
  };

  /* ======================================================================
     2. TRADUÇÕES dos textos estáticos (chaves = data-i18n no HTML)
     ====================================================================== */
  const i18n = {
    en: {
      'nav.about': 'About',
      'nav.journey': 'Journey',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'hero.eyebrow': 'Software Developer · Fullstack',
      'hero.quote': '“Dedication makes<br>dreams come true.”',
      'hero.bio': 'Full Stack Software Developer with experience in JavaScript (Node JS, React JS), Java, Python and AI, using Spec-Driven Development as my main methodology.',
      'cta.email': 'Send e-mail',
      'cta.resumeEn': 'Resume · EN',
      'cta.resumePt': 'Resume · PT',
      'about.eyebrow': 'About',
      'about.text': 'Graduated in Information Systems from <mark>FIAP</mark>. I have <mark>intermediate English</mark> and I am truly passionate about <mark>software development</mark>. Outside VS Code, I enjoy basketball and One Piece :)',
      'stack.title': 'Tools I work with',
      'journey.eyebrow': 'Journey',
      'journey.title': 'Where I have worked',
      'projects.eyebrow': 'Projects',
      'projects.title': 'My PokeDex',
      'projects.subtitle': 'Because every good dev has a pokedex :)',
      'projects.repo': 'Repository ↗',
      'projects.demo': 'Live demo ↗',
      'certs.eyebrow': 'Certifications',
      'certs.verified': 'Verified credential',
      'certs.view': 'View certificate ↗',
      'yt.eyebrow': 'On YouTube',
      'yt.title': 'Where I think out loud...',
      'yt.lead': 'Coming soon',
      'yt.visit': 'Visit the channel ↗',
      'articles.eyebrow': 'Articles',
      'articles.title': 'Some public notes',
      'articles.lead': 'I write about technology, software development and experiences.',
      'articles.read': 'Read on LinkedIn ↗',
      'articles.minutes': 'min read',
      'contact.title': 'Contact',
      'contact.lead': 'New connections are always welcome!'
    },
    // Textos PT dos elementos estáticos são lidos do próprio HTML;
    // aqui ficam apenas os usados nos templates JS.
    pt: {
      'projects.repo': 'Repositório ↗',
      'projects.demo': 'Ver online ↗',
      'certs.verified': 'Credencial verificada',
      'certs.view': 'Ver certificado ↗',
      'articles.minutes': 'min de leitura'
    }
  };

  /* ======================================================================
     3. UTILITÁRIOS
     ====================================================================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** Lê/grava no localStorage com segurança (modo privado pode bloquear). */
  const storage = {
    get: (key) => { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set: (key, val) => { try { localStorage.setItem(key, val); } catch (_) { /* ignora */ } }
  };

  /** Escapa HTML para evitar injeção ao montar templates. */
  const escapeHTML = (str) => String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  const state = {
    lang: storage.get('lang') === 'en' ? 'en' : 'pt'
  };

  /** Retorna o texto no idioma atual (aceita string simples ou {pt, en}). */
  const t = (value) => (typeof value === 'object' ? value[state.lang] : value);

  /** Texto de interface traduzido (chave do dicionário i18n). */
  const label = (key) => i18n[state.lang][key];

  const chips = (tags, extra = '') =>
    tags.map((tag) => `<li class="chip ${extra}">${escapeHTML(tag)}</li>`).join('');

  const external = 'target="_blank" rel="noopener noreferrer"';

  /* ======================================================================
     4. RENDERIZAÇÃO DAS SEÇÕES
     ====================================================================== */
  const render = {
    stack() {
      $('#stackList').innerHTML = chips(data.stack);
    },

    journey() {
      $('#timeline').innerHTML = data.journey.map((job) => `
        <li class="timeline__item reveal">
          <div class="timeline__logo" aria-hidden="true">${escapeHTML(job.initials)}</div>
          <div>
            <div class="timeline__head">
              <h3 class="timeline__company">${escapeHTML(job.company)}</h3>
              <span class="timeline__period">${escapeHTML(t(job.period))}</span>
            </div>
            <p class="timeline__role">${escapeHTML(t(job.role))}</p>
            <p class="timeline__desc">${escapeHTML(t(job.desc))}</p>
          </div>
        </li>`).join('');
    },

    projects() {
      $('#projectsGrid').innerHTML = data.projects.map((p, i) => `
        <article class="card card--hover project reveal">
          <div class="project__top">
            <span class="project__index">${String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 class="project__title">${escapeHTML(p.title)}</h3>
          <p class="project__desc">${escapeHTML(t(p.desc))}</p>
          <ul class="chips">${chips(p.tags, 'chip--sm')}</ul>
          <div class="project__links">
            <a class="link" href="${escapeHTML(p.repo)}" ${external}>${label('projects.repo')}</a>
            ${p.demo ? `<a class="link" href="${escapeHTML(p.demo)}" ${external}>${label('projects.demo')}</a>` : ''}
          </div>
        </article>`).join('');
    },

    certs() {
      $('#certsGrid').innerHTML = data.certs.map((c) => `
        <article class="card cert reveal">
          <div class="cert__badge" aria-hidden="true">${escapeHTML(c.badge)}</div>
          <div class="cert__body">
            <span class="cert__label mono">${label('certs.verified')}</span>
            <h3 class="cert__title">${escapeHTML(t(c.title))}</h3>
            <p class="cert__issuer">${escapeHTML(c.issuer)}</p>
            <a class="link" href="${escapeHTML(c.url)}" ${external}>${label('certs.view')}</a>
          </div>
        </article>`).join('');
    },

    videos() {
      $('#videosGrid').innerHTML = data.videos.map((v) => `
        <a class="card video reveal" href="${escapeHTML(v.url)}" ${external}>
          <span class="video__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
          </span>
          <div>
            <div class="video__head">
              <h3 class="video__title">${escapeHTML(t(v.title))}</h3>
              <span class="badge">${escapeHTML(v.duration)}</span>
            </div>
            <p class="video__tags">${escapeHTML(v.tags)}</p>
            <p class="video__desc">${escapeHTML(t(v.desc))}</p>
          </div>
        </a>`).join('');
    },

    articles() {
      $('#articlesGrid').innerHTML = data.articles.map((a) => `
        <a class="card article reveal" href="${escapeHTML(a.url)}" ${external}>
          <h3 class="article__title">${escapeHTML(t(a.title))}</h3>
          <p class="article__desc">${escapeHTML(t(a.desc))}</p>
          <span class="article__meta">${a.minutes} ${label('articles.minutes')}</span>
        </a>`).join('');
    },

    all() {
      this.stack();
      this.journey();
      this.projects();
      this.certs();
      this.videos();
      this.articles();
    }
  };

  /* ======================================================================
     5. INTERRUPTOR DE IDIOMA
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
      // Posição da "bolinha": false = PT, true = EN
      $('#langToggle').setAttribute('aria-checked', String(state.lang === 'en'));

      render.all();
      animations.observe();
    },

    toggle() {
      state.lang = state.lang === 'pt' ? 'en' : 'pt';
      storage.set('lang', state.lang);
      lang.apply();
    }
  };

  /* ======================================================================
     6. TEMA CLARO / ESCURO
     ====================================================================== */
  const theme = {
    current() {
      const manual = document.documentElement.dataset.theme;
      if (manual) return manual;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    toggle() {
      const next = theme.current() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      storage.set('theme', next);
      $('meta[name="theme-color"]').content = next === 'dark' ? '#0b0b0c' : '#f5f5f7';
    }
  };

  /* ======================================================================
     7. NAVEGAÇÃO (menu mobile, header e link ativo)
     ====================================================================== */
  const nav = {
    el: null,
    btn: null,

    init() {
      this.el = $('#nav');
      this.btn = $('#menuToggle');

      this.btn.addEventListener('click', () => this.setOpen(!this.el.classList.contains('is-open')));

      // Fecha o menu ao clicar em um link ou pressionar Esc
      $$('.nav__link').forEach((link) => link.addEventListener('click', () => this.setOpen(false)));
      document.addEventListener('keydown', (e) => e.key === 'Escape' && this.setOpen(false));

      this.watchScroll();
      this.watchSections();
    },

    setOpen(open) {
      this.el.classList.toggle('is-open', open);
      this.btn.setAttribute('aria-expanded', String(open));
      this.btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    },

    /** Adiciona borda ao header após rolar a página. */
    watchScroll() {
      const header = $('#header');
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },

    /** Destaca no menu a seção visível. */
    watchSections() {
      const links = $$('.nav__link');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.toggle('is-active', l.hash === `#${entry.target.id}`));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });

      links.forEach((l) => {
        const section = $(l.hash);
        if (section) observer.observe(section);
      });
    }
  };

  /* ======================================================================
     8. ANIMAÇÕES DE ENTRADA
     ====================================================================== */
  const animations = {
    observer: null,

    observe() {
      // Sem suporte: mostra tudo imediatamente
      if (!('IntersectionObserver' in window)) {
        $$('.reveal').forEach((el) => el.classList.add('is-visible'));
        return;
      }

      this.observer ??= new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      $$('.reveal:not(.is-visible)').forEach((el) => this.observer.observe(el));
    }
  };

  /* ======================================================================
     9. INICIALIZAÇÃO
     ====================================================================== */
  const init = () => {
    lang.cacheDefaults();
    lang.apply();
    nav.init();

    $('#themeToggle').addEventListener('click', theme.toggle);
    $('#langToggle').addEventListener('click', lang.toggle);
    $('#year').textContent = new Date().getFullYear();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
