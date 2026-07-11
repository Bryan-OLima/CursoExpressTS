/* Curso Express 5 + TypeScript — navegação entre fases, checkboxes de tema
   e progresso salvo em localStorage. Um único script para todas as páginas. */
(() => {
  const STORAGE_KEY = "phaseState";

  const FASES = [
    { id: "0", label: "Fase 0", title: "Fundamentos", href: "fases/0/fase0.html" },
    { id: "1", label: "Fase 1", title: "Express básico", href: "fases/1/fase1.html" },
    { id: "2", label: "Fase 2", title: "TypeScript", href: "fases/2/fase2.html" },
    { id: "3", label: "Fase 3", title: "REST", href: "fases/3/fase3.html" },
    { id: "4", label: "Fase 4", title: "Middlewares", href: "fases/4/fase4.html" },
    { id: "5", label: "Fase 5", title: "Zod", href: "fases/5/fase5.html" },
    { id: "6", label: "Fase 6", title: "Camadas", href: "fases/6/fase6.html" },
    { id: "7", label: "Fase 7", title: "Erros", href: "fases/7/fase7.html" },
    { id: "8", label: "Fase 8", title: "Testes", href: "fases/8/fase8.html" },
    { id: "9", label: "Fase 9", title: "Banco e Prisma", href: "fases/9/fase9.html" },
    { id: "10", label: "Fase 10", title: "Autenticação", href: "fases/10/fase10.html" },
    { id: "11", label: "Fase 11", title: "Segurança", href: "fases/11/fase11.html" },
    { id: "12", label: "Fase 12", title: "Produção", href: "fases/12/fase12.html" },
    { id: "13", label: "Fase 13", title: "Avançado", href: "fases/13/fase13.html" },
    { id: "final", label: "Projeto final", title: "Agenda + chat", href: "fases/final/projetofinal.html" },
  ];

  const MANIFEST = {
    "0": ["modelo-mental", "cliente-servidor", "api", "fetch", "http-https", "url", "request-response", "headers-body", "json", "metodos-http", "status-http", "stateless", "processo-node", "event-loop", "variaveis-ambiente", "integracao", "edge-cases", "exercicios", "mini-projeto", "checklist", "referencias"],
    "1": ["modelo-mental", "express-retorno", "aplicacao", "listen", "rotas", "callback", "request-response", "ciclo", "status", "send", "json", "end", "comparacao-respostas", "rota-inexistente", "resposta-dupla", "headers-sent", "edge-cases", "health", "exercicios", "mini-projeto", "checklist", "referencias"],
    "2": ["modelo-mental", "inferencia", "type-interface", "estrutural", "tipos-express", "generics", "params", "body", "query", "response", "unknown-any", "narrowing", "type-guards", "opcionais", "unions", "readonly", "dtos", "runtime", "exemplo-completo", "erros-comuns", "edge-cases", "exercicios", "mini-projeto", "checklist", "referencias"],
    "3": ["objetivos", "rest", "recursos", "nomes", "metodos", "idempotencia", "put-patch", "entrada", "colecoes", "paginacao", "status", "erros", "aninhadas", "versionamento", "contratos", "projeto", "regras", "edge-cases", "exercicios", "checklist", "referencias"],
    "4": ["modelo-mental", "definicao", "assinatura", "next", "encerrar", "ordem", "global", "router", "rota", "multiplos", "mount", "built-in", "locals", "request-id", "logging", "tempo", "eventos", "contexto", "authn", "authz", "factory", "401-403", "async", "erros", "anti-patterns", "edge-cases", "estrutura", "exemplo", "exercicios", "mini-projeto", "checklist", "referencias"],
    "5": ["modelo", "externos", "runtime", "schema", "parse", "primitivos", "strings", "numeros", "objetos", "arrays", "opcionais", "unions", "body", "params", "query", "coercao", "preprocess", "transform", "infer", "composicao", "patch", "refine", "superrefine", "async", "middleware", "validated", "zoderror", "status", "antipatterns", "edgecases", "estrutura", "integrado", "exercicios", "projeto", "checklist", "referencias"],
    "6": ["modelo", "problema", "responsabilidade", "fluxo", "regra-negocio", "route", "controller", "service", "repository", "schema", "mapper", "types", "dependencias", "injecao", "interfaces", "transacoes", "concorrencia", "pureza", "por-camada", "por-modulo", "shared", "frontend", "crescimento", "anti-patterns", "edge-cases", "exemplo", "testabilidade", "exercicios", "mini-projeto", "checklist", "referencias"],
    "7": ["objetivo", "modelo-mental", "categorias", "throw", "encaminhamento", "middleware", "ordem", "headers", "app-error", "contrato", "mapeamento", "seguranca", "observabilidade", "implementacao", "edge-cases", "testes", "mini-projeto", "checklist", "referencias"],
    "8": ["visao-geral", "tipos", "unitario", "integracao", "http", "aaa", "vitest", "design", "doubles", "fake-repo", "mock-quando", "service", "supertest", "isolamento", "hooks", "casos", "edge", "erros", "cobertura", "antipadroes", "estrutura", "mini", "exercicios", "checklist", "referencias"],
    "9": ["modelo", "relacional", "tabela", "tipos", "chaves", "relacionamentos", "constraints", "indices", "sql", "joins", "transacoes", "concorrencia", "paginacao", "nmaisum", "orm", "instalacao", "schema", "models", "migrations", "client", "crud", "selectinclude", "filtros", "prisma-pagination", "prisma-transactions", "erros", "seed", "testdb", "repository", "money", "ownership", "antipatterns", "edgecases", "estrutura", "integrado", "exercicios", "projeto", "checklist", "referencias"],
    "10": ["modelo-mental", "identidade", "fluxo", "senhas", "hash", "algoritmos", "cadastro", "login", "sessao", "cookies", "jwt", "comparacao", "access-refresh", "rotacao", "logout", "cookie-flags", "csrf", "cors", "middleware", "contexto", "rbac", "ownership", "politicas", "recuperacao", "email", "rate-limit", "respostas", "modelagem", "testes", "erros", "edge-cases", "estrutura", "integrado", "exercicios", "mini-projeto", "checklist", "referencias"],
    "11": ["modelo", "ameacas", "camadas", "validacao", "superficie", "cors", "helmet", "https", "proxy", "trust-proxy", "rate-limit", "bruteforce", "payload", "timeouts", "mass-assignment", "injecao", "vazamento", "logs", "secrets", "uploads", "arquivos", "privilegio", "dependencias", "baseline", "auditoria", "antipatterns", "edgecases", "testes", "exercicios", "projeto", "checklist", "referencias"],
    "12": ["producao", "observabilidade", "logs", "niveis", "request-id", "metricas", "health", "liveness", "readiness", "startup", "shutdown", "process-errors", "config", "docker", "compose", "build", "deploy", "migrations", "openapi", "arquitetura", "edge-cases", "exercicios", "mini-projeto", "checklist", "referencias"],
    "13": ["modelo", "assincronia", "custos", "contratos", "uploads", "validacao-arquivos", "streams", "downloads", "cache", "etag", "compressao", "negociacao", "webhooks", "assinatura", "idempotencia", "timeouts", "retry", "circuit", "filas", "workers", "agendadas", "emails", "consistencia", "sse", "websocket", "comparacao", "escala", "antipatterns", "edgecases", "estrutura", "integrado", "testes", "exercicios", "projeto", "checklist", "referencias"],
    final: ["visao-geral", "objetivos", "arquitetura", "dominio", "modelo-dados", "autenticacao", "agenda", "disponibilidade", "chat", "notificacoes", "consistencia", "api", "testes", "producao", "roadmap", "edge-cases", "conclusao", "referencias"],
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      if (!parsed.home) parsed.home = {};
      return parsed;
    } catch {
      return { home: {} };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* localStorage indisponível (modo privado, quota etc.) — progresso não é salvo */
    }
  }

  function getFaseIdFromPath() {
    const path = location.pathname.replace(/\\/g, "/");
    const match = path.match(/\/fases\/([^/]+)\//);
    return match ? match[1] : null;
  }

  function basePrefix(faseId) {
    return faseId ? "../../" : "";
  }

  function computeFaseProgress(state, faseId) {
    const ids = MANIFEST[faseId] || [];
    const data = state[faseId] || {};
    const done = ids.filter((id) => data[id]).length;
    return { done, total: ids.length };
  }

  function isFaseComplete(state, faseId) {
    const { done, total } = computeFaseProgress(state, faseId);
    return total > 0 && done === total;
  }

  function setWholeFase(state, faseId, value) {
    const ids = MANIFEST[faseId] || [];
    const data = {};
    ids.forEach((id) => {
      data[id] = value;
    });
    state[faseId] = data;
    state.home[faseId] = value;
  }

  function syncHomeFlag(state, faseId) {
    state.home[faseId] = isFaseComplete(state, faseId);
  }

  function renderProgressBox(scopeSelector, label, done, total) {
    let box = document.querySelector(scopeSelector);
    if (!box) {
      box = document.createElement("div");
      box.className = "progress-box";
      box.dataset.scope = scopeSelector.includes("curso") ? "curso" : "fase";
      const aside = document.querySelector("aside");
      if (!aside) return;
      const nav = aside.querySelector("nav");
      if (nav) {
        aside.insertBefore(box, nav);
      } else {
        aside.appendChild(box);
      }
    }
    const pct = total ? Math.round((done / total) * 100) : 0;
    box.innerHTML =
      '<div class="progress-row"><span>' +
      label +
      "</span><span>" +
      done +
      "/" +
      total +
      '</span></div><div class="progress-track"><span class="progress-fill" style="width:' +
      pct +
      '%"></span></div>';
  }

  function buildPageNavLink(fase, faseId, extraClass, dirLabel) {
    const a = document.createElement("a");
    a.href = basePrefix(faseId) + fase.href;
    if (extraClass) a.className = extraClass;
    a.innerHTML =
      '<span class="dir">' + dirLabel + '</span><span class="label">' + fase.label + " · " + fase.title + "</span>";
    return a;
  }

  function buildPageNav(index, faseId) {
    const wrap = document.createElement("div");
    wrap.className = "page-nav";

    const prev = FASES[index - 1];
    if (prev) wrap.appendChild(buildPageNavLink(prev, faseId, "", "← Anterior"));

    const home = document.createElement("a");
    home.href = basePrefix(faseId) + "index.html";
    home.className = "home-link";
    home.innerHTML = '<span class="label">Índice do curso</span>';
    wrap.appendChild(home);

    const next = FASES[index + 1];
    if (next) wrap.appendChild(buildPageNavLink(next, faseId, "next", "Próxima →"));

    return wrap;
  }

  function injectPageNav(index, faseId) {
    const main = document.querySelector("main");
    if (!main) return;
    const container = main.querySelector(".content") || main;

    const footer = container.querySelector(":scope > footer, :scope > .footer-note") || document.querySelector("body > footer");

    container.insertBefore(buildPageNav(index, faseId), container.firstChild);

    const navBottom = buildPageNav(index, faseId);
    if (footer && footer.parentElement === container) {
      container.insertBefore(navBottom, footer);
    } else {
      container.appendChild(navBottom);
    }
  }

  function buildThemeCheckbox(state, faseId, themeId, data) {
    const label = document.createElement("label");
    label.className = "theme-check";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!data[themeId];

    const span = document.createElement("span");

    function refresh() {
      label.classList.toggle("done", input.checked);
      span.textContent = input.checked ? "Tema concluído" : "Marcar tema como concluído";
    }
    refresh();

    input.addEventListener("change", () => {
      data[themeId] = input.checked;
      refresh();
      syncHomeFlag(state, faseId);
      saveState(state);
      const progress = computeFaseProgress(state, faseId);
      renderProgressBox(".progress-box[data-scope='fase']", "Progresso da fase", progress.done, progress.total);
    });

    label.appendChild(input);
    label.appendChild(span);
    return label;
  }

  function wrapThemeBlocks(faseId) {
    const ids = MANIFEST[faseId];
    if (!ids || !ids.length) return;

    const anchors = ids.map((id) => document.getElementById(id)).filter(Boolean);

    anchors.forEach((el, index) => {
      const next = anchors[index + 1];
      const parent = el.parentNode;
      if (!parent) return;

      const wrapper = document.createElement("div");
      wrapper.className = "theme-block";
      parent.insertBefore(wrapper, el);

      let node = el;
      while (node && node !== next) {
        const following = node.nextSibling;
        wrapper.appendChild(node);
        node = following;
      }
    });
  }

  function injectThemeChecks(state, faseId) {
    const ids = MANIFEST[faseId];
    if (!ids || !ids.length) return;

    const data = state[faseId] || (state[faseId] = {});

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const wrapper = el.closest(".theme-block") || el.parentElement;
      const checkbox = buildThemeCheckbox(state, faseId, id, data);
      wrapper.appendChild(checkbox);
    });
  }

  function removeLegacyStubs() {
    document.querySelectorAll("aside .phase-switch").forEach((el) => el.remove());
    document.querySelectorAll("aside > .progress").forEach((el) => el.remove());
  }

  function injectSidebarToggle() {
    const layout = document.querySelector(".layout, .page");
    if (!layout) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sidebar-toggle";
    btn.setAttribute("aria-label", "Mostrar ou esconder o menu");

    function refresh() {
      btn.textContent = layout.classList.contains("sidebar-collapsed") ? "☰" : "✕";
    }

    if (localStorage.getItem("sidebarCollapsed") === "1") {
      layout.classList.add("sidebar-collapsed");
    }
    refresh();

    btn.addEventListener("click", () => {
      layout.classList.toggle("sidebar-collapsed");
      try {
        localStorage.setItem("sidebarCollapsed", layout.classList.contains("sidebar-collapsed") ? "1" : "0");
      } catch {
        /* localStorage indisponível */
      }
      refresh();
    });

    document.body.appendChild(btn);
  }

  function initFasePage(state, faseId) {
    const index = FASES.findIndex((f) => f.id === faseId);
    if (index === -1) return;

    removeLegacyStubs();
    injectPageNav(index, faseId);
    wrapThemeBlocks(faseId);
    injectThemeChecks(state, faseId);
    saveState(state);

    const progress = computeFaseProgress(state, faseId);
    renderProgressBox(".progress-box[data-scope='fase']", "Progresso da fase", progress.done, progress.total);
  }

  function injectHomePhaseControls(state) {
    FASES.forEach((fase) => {
      const sectionId = fase.id === "final" ? "final" : "fase" + fase.id;
      const section = document.getElementById(sectionId);
      if (!section) return;

      const { done, total } = computeFaseProgress(state, fase.id);
      const complete = isFaseComplete(state, fase.id);

      const row = document.createElement("label");
      row.className = "theme-check";
      row.classList.toggle("done", complete);
      row.classList.toggle("partial", !complete && done > 0);

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = complete;
      input.indeterminate = !complete && done > 0;

      const span = document.createElement("span");
      span.textContent = complete
        ? "Fase concluída"
        : done > 0
          ? "Em progresso — " + done + "/" + total + " temas"
          : "Marcar fase inteira como concluída";

      input.addEventListener("change", () => {
        setWholeFase(state, fase.id, input.checked);
        saveState(state);
        renderIndexProgress(state);
      });

      row.appendChild(input);
      row.appendChild(span);

      const footer = section.querySelector(".card-footer");
      if (footer) {
        footer.appendChild(row);
      } else {
        section.appendChild(row);
      }
    });
  }

  function renderIndexProgress(state) {
    const totalFases = FASES.length;
    const completedFases = FASES.filter((f) => isFaseComplete(state, f.id)).length;

    let totalThemes = 0;
    let doneThemes = 0;
    FASES.forEach((f) => {
      const p = computeFaseProgress(state, f.id);
      totalThemes += p.total;
      doneThemes += p.done;
    });

    let box = document.querySelector(".progress-box[data-scope='curso']");
    if (!box) {
      box = document.createElement("div");
      box.className = "progress-box";
      box.dataset.scope = "curso";
      const aside = document.querySelector("aside");
      if (aside) {
        const nav = aside.querySelector("nav");
        nav ? aside.insertBefore(box, nav) : aside.appendChild(box);
      }
    }
    const pct = totalThemes ? Math.round((doneThemes / totalThemes) * 100) : 0;
    box.innerHTML =
      '<div class="progress-row"><span>Progresso geral</span><span>' +
      completedFases +
      "/" +
      totalFases +
      ' fases</span></div><div class="progress-track"><span class="progress-fill" style="width:' +
      pct +
      '%"></span></div>';

    FASES.forEach((fase) => {
      const sectionId = fase.id === "final" ? "final" : "fase" + fase.id;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const label = section.querySelector(".theme-check");
      if (!label) return;
      const input = label.querySelector("input");
      const span = label.querySelector("span");
      const { done, total } = computeFaseProgress(state, fase.id);
      const complete = isFaseComplete(state, fase.id);
      input.checked = complete;
      input.indeterminate = !complete && done > 0;
      label.classList.toggle("done", complete);
      label.classList.toggle("partial", !complete && done > 0);
      span.textContent = complete
        ? "Fase concluída"
        : done > 0
          ? "Em progresso — " + done + "/" + total + " temas"
          : "Marcar fase inteira como concluída";
    });
  }

  function initIndexPage(state) {
    injectHomePhaseControls(state);
    renderIndexProgress(state);
    saveState(state);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const state = loadState();
    const faseId = getFaseIdFromPath();

    injectSidebarToggle();

    if (faseId && MANIFEST[faseId]) {
      initFasePage(state, faseId);
    } else if (!faseId) {
      initIndexPage(state);
    }
  });
})();
