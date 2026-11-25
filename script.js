  // 1. Geração Dinâmica do Favicon Oficial com o Emblema 3D ProVerde
    function injectOfficialFavicon() {
      try {
        const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <rect width="200" height="200" rx="44" fill="#05090A"/>
          <path d="M46 98 C52 56,90 36,134 35 C152 35,164 30,172 22 C156 44,132 53,102 58 C74 63,56 76,46 98 Z" fill="#94A1AA"/>
          <path d="M54 134 C72 112,132 62,178 18 C178 66,166 108,140 125 C114 141,80 138,54 134 Z" fill="#127D80"/>
          <path d="M28 174 C33 122,62 79,108 67 C142 58,164 42,178 18 C160 58,132 90,92 112 C58 130,38 148,28 174 Z" fill="#4CE8D4"/>
          <path d="M32 185 C44 155,72 146,108 145 C134 144,152 135,164 118 C153 151,126 169,92 168 C62 167,44 172,32 185 Z" fill="#246E5F"/>
        </svg>`;
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = 'data:image/svg+xml,' + encodeURIComponent(faviconSvg);
        document.head.appendChild(link);
      } catch (e) {
        console.warn('Favicon dinâmico ignorado:', e);
      }
    }

    function initIcons() {
      try {
        if (window.lucide) window.lucide.createIcons();
      } catch (e) {
        console.warn('Lucide indisponível:', e);
      }
    }

    // Toast elegante sem usar alert()
    let toastTimer = null;
    function showToast(msg) {
      const box = document.getElementById('pv-toast');
      const txt = document.getElementById('pv-toast-text');
      if (!box || !txt) return;
      txt.textContent = msg;
      box.classList.remove('opacity-0', 'translate-y-4');
      box.classList.add('opacity-100', 'translate-y-0');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        box.classList.add('opacity-0', 'translate-y-4');
        box.classList.remove('opacity-100', 'translate-y-0');
      }, 3400);
    }

    // Cópia segura para área de transferência
    function copyText(value, feedback) {
      try {
        const area = document.createElement('textarea');
        area.value = value;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
        showToast(feedback || 'Copiado!');
      } catch (e) {
        showToast('Não foi possível copiar automaticamente.');
      }
    }

    // Alternância de Alto Contraste
    function toggleHighContrast() {
      document.body.classList.toggle('high-contrast');
      const active = document.body.classList.contains('high-contrast');
      const btn = document.getElementById('contrast-toggle-btn');
      if (btn) btn.setAttribute('aria-pressed', String(active));
      showToast(active ? 'Modo de alto contraste ativado.' : 'Contraste padrão restaurado.');
    }

    /* ==========================================================================
       2. MENU MOBILE, MEGA-DROPDOWN & INDICADOR LUMINOSO DESLIZANTE
       ========================================================================== */
    function toggleMobileDrawer() {
      const drawer = document.getElementById('mobile-drawer');
      const btn = document.getElementById('mobile-drawer-btn');
      if (!drawer) return;
      const opening = drawer.classList.contains('hidden');
      drawer.classList.toggle('hidden');
      if (btn) btn.setAttribute('aria-expanded', String(opening));
    }

    function closeMobileDrawer() {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer) drawer.classList.add('hidden');
    }

    function toggleMegaDropdown(e) {
      e.stopPropagation();
      const wrap = document.getElementById('solucoes-dropdown-wrap');
      if (wrap) wrap.classList.toggle('open');
    }

    function closeMegaDropdown() {
      const wrap = document.getElementById('solucoes-dropdown-wrap');
      if (wrap) wrap.classList.remove('open');
    }

    document.addEventListener('click', (e) => {
      const wrap = document.getElementById('solucoes-dropdown-wrap');
      if (wrap && !wrap.contains(e.target)) {
        wrap.classList.remove('open');
      }
    });

    // Indicador deslizante na Navbar Desktop
    function moveNavIndicator(el) {
      const indicator = document.getElementById('nav-active-indicator');
      const nav = document.getElementById('desktop-nav');
      if (!indicator || !nav || !el) return;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      indicator.style.left = `${elRect.left - navRect.left + 12}px`;
      indicator.style.width = `${Math.max(24, elRect.width - 24)}px`;
    }

    /* ==========================================================================
       3. HERO CARROSSEL DE 3 CENÁRIOS + TELEMETRIA DINÂMICA DO ORBE 3D
       ========================================================================== */
    const heroScenarios = [
      {
        tag: 'CENÁRIO 01 · METODOLOGIA PRÓPRIA HANDS-ON',
        headingHtml: 'Revertemos cenários de escassez em <span class="text-grad-turquoise-silver">vantagem competitiva e crescimento seguro</span>',
        desc: 'Orientamos e capacitamos empresas de médio e grande porte na integração prática de ESG — adequando a estratégia à sua realidade financeira e operacional sem soluções meramente teóricas.',
        btn1Label: 'Simular Maturidade ESG',
        btn1Href: '#simulador',
        btn2Label: 'Explorar Soluções Hands-On',
        btn2Href: '#solucoes',
        b1Kicker: 'Resposta Rápida',
        b1Val: 'Diagnóstico de Escassez',
        b2Kicker: 'Padrão Global',
        b2Val: 'GRI · SASB · ISSB',
        b3Kicker: 'Valor Equilibrado',
        b3Val: 'Impacto Positivo 360º'
      },
      {
        tag: 'CENÁRIO 02 · FINANÇAS SUSTENTÁVEIS & APORTES',
        headingHtml: 'Destrave linhas de <span class="text-grad-turquoise-silver">Crédito Verde e atraia investidores</span> com metas auditáveis',
        desc: 'Estruturamos os indicadores técnicos, relatórios ESG e metas de performance exigidos por bancos e fundos para reduzir seu custo de capital e proteger seu valor de mercado.',
        btn1Label: 'Avaliar Prontidão p/ Crédito',
        btn1Href: '#simulador',
        btn2Label: 'Ver Pilar de Capital Verde',
        btn2Href: '#solucoes',
        b1Kicker: 'Liquidez B2B',
        b1Val: 'Dossiê de Crédito Verde',
        b2Kicker: 'Risco & Retorno',
        b2Val: 'Metas SPTs Auditáveis',
        b3Kicker: 'Competitividade',
        b3Val: 'Menor Spread Bancário'
      },
      {
        tag: 'CENÁRIO 03 · TRANSPARÊNCIA & CONFORMIDADE GLOBAL',
        headingHtml: 'Governança rigorosa <span class="text-grad-turquoise-silver">contra o greenwashing</span> nos padrões GRI, SASB e ISSB',
        desc: 'Conduzimos a atualização sustentável de empresas tradicionais com clareza absoluta na governança, lastro documental e conformidade com as normas IFRS S1/S2.',
        btn1Label: 'Solicitar Diagnóstico Executivo',
        btn1Href: '#contato',
        btn2Label: 'Comparar Diferenciais E·S·G',
        btn2Href: '#compromissos',
        b1Kicker: 'Integridade',
        b1Val: 'Zero Greenwashing',
        b2Kicker: 'Normas IFRS S1/S2',
        b2Val: 'Conformidade CVM / ISSB',
        b3Kicker: 'Reputação Blindada',
        b3Val: '100% Rastreável'
      }
    ];

    let currentHeroIdx = 0;
    let heroElapsedPct = 0;
    let heroPlaying = true;
    const HERO_INTERVAL_MS = 6800;
    const HERO_STEP_MS = 68;

    function selectHeroSlide(index) {
      currentHeroIdx = (index + heroScenarios.length) % heroScenarios.length;
      heroElapsedPct = 0;
      const s = heroScenarios[currentHeroIdx];

      document.getElementById('hero-tag').textContent = s.tag;
      document.getElementById('hero-heading').innerHTML = s.headingHtml;
      document.getElementById('hero-description').textContent = s.desc;
      document.getElementById('hero-btn-primary-label').textContent = s.btn1Label;
      document.getElementById('hero-btn-primary').setAttribute('href', s.btn1Href);
      document.getElementById('hero-btn-secondary-label').textContent = s.btn2Label;
      document.getElementById('hero-btn-secondary').setAttribute('href', s.btn2Href);

      // Atualiza os 3 badges flutuantes ao redor do Emblema Oficial 3D
      document.getElementById('orb-badge-1-kicker').textContent = s.b1Kicker;
      document.getElementById('orb-badge-1-val').textContent = s.b1Val;
      document.getElementById('orb-badge-2-kicker').textContent = s.b2Kicker;
      document.getElementById('orb-badge-2-val').textContent = s.b2Val;
      document.getElementById('orb-badge-3-kicker').textContent = s.b3Kicker;
      document.getElementById('orb-badge-3-val').textContent = s.b3Val;

      for (let i = 0; i < 3; i++) {
        const bar = document.getElementById(`hero-prog-${i}`);
        const idxEl = document.getElementById(`hero-idx-${i}`);
        const lblEl = document.getElementById(`hero-lbl-${i}`);
        if (bar) bar.style.width = i < currentHeroIdx ? '100%' : '0%';
        if (idxEl) {
          idxEl.classList.toggle('text-proverde-300', i === currentHeroIdx);
          idxEl.classList.toggle('text-silver-400', i !== currentHeroIdx);
        }
        if (lblEl) {
          lblEl.classList.toggle('text-white', i === currentHeroIdx);
          lblEl.classList.toggle('text-silver-400', i !== currentHeroIdx);
        }
      }
    }

    function stepHeroSlide(dir) {
      selectHeroSlide(currentHeroIdx + dir);
    }

    function toggleHeroPlayback() {
      heroPlaying = !heroPlaying;
      const btn = document.getElementById('hero-playpause-btn');
      if (btn) {
        btn.innerHTML = heroPlaying
          ? '<i data-lucide="pause" class="w-4 h-4"></i>'
          : '<i data-lucide="play" class="w-4 h-4"></i>';
        initIcons();
      }
    }

    /* ==========================================================================
       4. INTERAÇÃO 3D TILT NO ORBE DO EMBLEMA + CANVAS DE ONDAS ORGÂNICAS
       ========================================================================== */
    function initHero3DTilt() {
      const orb = document.getElementById('hero-3d-orb');
      if (!orb) return;

      orb.addEventListener('mousemove', (e) => {
        const rect = orb.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = x * 16;
        const rotX = -y * 16;
        orb.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      });

      orb.addEventListener('mouseleave', () => {
        orb.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    }

    // Canvas de Ondas Orgânicas e Partículas nas cores oficiais ProVerde
    let canvasCtx = null;
    let canvasW = 0;
    let canvasH = 0;
    let waveTick = 0;
    const particles = [];

    function resizeAuroraCanvas() {
      const canvas = document.getElementById('hero-aurora-canvas');
      if (!canvas) return;
      const parent = canvas.parentElement;
      canvasW = canvas.width = parent.clientWidth;
      canvasH = canvas.height = parent.clientHeight;
    }

    function initAuroraCanvas() {
      const canvas = document.getElementById('hero-aurora-canvas');
      if (!canvas) return;
      canvasCtx = canvas.getContext('2d');
      resizeAuroraCanvas();

      particles.length = 0;
      const count = Math.min(34, Math.max(16, Math.floor(canvasW / 45)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvasW,
          y: Math.random() * canvasH,
          r: Math.random() * 2.1 + 0.7,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.35 - 0.1,
          color: i % 3 === 0 ? 'rgba(217,226,231,0.38)' : 'rgba(76,232,212,0.42)'
        });
      }
    }

    function animateAuroraCanvas() {
      if (!canvasCtx) return;
      canvasCtx.clearRect(0, 0, canvasW, canvasH);
      waveTick += 0.012;

      // 3 ondas orgânicas inspiradas nas 3 lâminas do Emblema ProVerde
      const waveConfigs = [
        { amp: 28, freq: 0.0028, speed: 1.0, yRatio: 0.68, stroke: 'rgba(76, 232, 212, 0.16)', width: 2 },
        { amp: 36, freq: 0.0021, speed: 0.7, yRatio: 0.76, stroke: 'rgba(50, 168, 150, 0.14)', width: 2.5 },
        { amp: 22, freq: 0.0034, speed: 1.3, yRatio: 0.58, stroke: 'rgba(155, 168, 176, 0.10)', width: 1.4 }
      ];

      waveConfigs.forEach((w) => {
        canvasCtx.beginPath();
        for (let x = 0; x <= canvasW; x += 18) {
          const y = canvasH * w.yRatio + Math.sin(x * w.freq + waveTick * w.speed) * w.amp;
          if (x === 0) canvasCtx.moveTo(x, y);
          else canvasCtx.lineTo(x, y);
        }
        canvasCtx.strokeStyle = w.stroke;
        canvasCtx.lineWidth = w.width;
        canvasCtx.stroke();
      });

      // Partículas sutis flutuantes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = canvasH + 10;
        if (p.x < -10) p.x = canvasW + 10;
        if (p.x > canvasW + 10) p.x = -10;

        canvasCtx.beginPath();
        canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        canvasCtx.fillStyle = p.color;
        canvasCtx.fill();
      });

      requestAnimationFrame(animateAuroraCanvas);
    }

    /* ==========================================================================
       5. DOSSIÊ EXECUTIVO EM MODAL PARA AS SOLUÇÕES (01 A 04)
       ========================================================================== */
    const solutionsCatalog = [
      {
        code: '01',
        title: 'Diagnóstico Rápido para Crise e Escassez ESG',
        horizon: 'Prazo estimado: 15 a 21 dias úteis',
        summary: 'Metodologia proprietária da ProVerde desenhada para médias e grandes empresas sob pressão imediata de escassez de insumos, passivos ambientais ou exigências urgentes de clientes e órgãos reguladores.',
        deliverables: [
          'Varredura 360º de vulnerabilidades operacionais, hídricas, energéticas e regulatórias',
          'Plano de ação emergencial (Quick Wins) focado em preservação de caixa e continuidade',
          'Mapeamento preliminar de riscos materiais para apresentação ao Conselho / Diretoria',
          'Cronograma tático de transição da vulnerabilidade para o crescimento seguro'
        ],
        kpis: 'Redução de perdas críticas · Mitigação de autuações · Alívio rápido de OPEX'
      },
      {
        code: '02',
        title: 'Adequação Estratégica à Realidade Financeira e Operacional',
        horizon: 'Implementação modular Hands-On (3 a 6 meses)',
        summary: 'Diferente de consultorias puramente teóricas, adequamos cada projeto sustentável ao orçamento e à capacidade operacional específica de médias e grandes empresas.',
        deliverables: [
          'Projetos práticos de ecoeficiência industrial, reuso de água, energia e economia circular',
          'Inventário completo de emissões GEE (GHG Protocol) com metas factíveis de descarbonização',
          'Homologação socioambiental da cadeia crítica de fornecedores B2B',
          'Capacitação hands-on das equipas internas para sustentar os indicadores no longo prazo'
        ],
        kpis: 'Payback claro por iniciativa · Redução de intensidade carbónica · Eficiência operacional'
      },
      {
        code: '03',
        title: 'Desbloqueio de Crédito Verde & Relatórios para Investidores',
        horizon: 'Estruturação de dossiê em 30 a 45 dias',
        summary: 'Preparamos toda a arquitetura de dados e governança exigida por bancos e fundos de investimento para liberar aportes financeiros e linhas de Crédito Verde com taxas competitivas.',
        deliverables: [
          'Dossiê de elegibilidade ESG para bancos de fomento, bancos privados e fundos',
          'Modelagem de KPIs e metas SPTs (Sustainability Performance Targets) para linhas verdes',
          'Preparação para due diligence socioambiental em rodadas de M&A ou emissão de dívida',
          'Relatório executivo de impacto e retorno para acionistas e comités de crédito'
        ],
        kpis: 'Acesso a linhas verdes · Redução potencial do custo de capital · Atração de investidores'
      },
      {
        code: '04',
        title: 'Governança, Compliance Regulatório & Frameworks Globais (GRI, SASB, ISSB)',
        horizon: 'Ciclo completo de reporte e asseguração',
        summary: 'Atualização permanente frente às métricas internacionais para blindar sua reputação contra acusações de greenwashing e atender reguladores e grandes contas globais.',
        deliverables: [
          'Matriz de Dupla Materialidade (impacto socioambiental + materialidade financeira)',
          'Elaboração de Relatório de Sustentabilidade alinhado aos padrões GRI e SASB setorial',
          'Adequação às normas internacionais ISSB (IFRS S1 e IFRS S2) e Resolução CVM 193',
          'Estruturação de Data Book rastreável pronto para auditoria / asseguração externa'
        ],
        kpis: '100% de lastro documental · Zero Greenwashing · Conformidade regulatória global'
      }
    ];

    function openSolutionModal(idx) {
      const item = solutionsCatalog[idx];
      const modal = document.getElementById('solution-modal');
      const body = document.getElementById('solution-modal-body');
      if (!item || !modal || !body) return;

      body.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-display font-extrabold bg-proverde-400/20 text-proverde-300 border border-proverde-300/35">
            SOLUÇÃO ${item.code} · METODOLOGIA PROVERDE
          </span>
          <span class="text-xs text-silver-400 font-medium">${item.horizon}</span>
        </div>
        <h3 id="sol-modal-title" class="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">${item.title}</h3>
        <p class="text-sm sm:text-base text-silver-200 leading-relaxed">${item.summary}</p>
        <div class="space-y-2.5 pt-1">
          <p class="text-xs font-display font-extrabold uppercase tracking-widest text-proverde-300">Entregáveis Tangíveis (Hands-On)</p>
          <ul class="space-y-2">
            ${item.deliverables.map(d => `
              <li class="flex items-start gap-2.5 text-sm text-silver-100">
                <span class="w-5 h-5 rounded-full bg-proverde-400/25 text-proverde-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <span>${d}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="p-4 rounded-2xl bg-obsidian-950/80 border border-proverde-300/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="text-[10px] uppercase tracking-widest text-silver-400 font-bold">KPIs Monitorados</p>
            <p class="text-xs sm:text-sm font-semibold text-proverde-200 mt-0.5">${item.kpis}</p>
          </div>
          <a href="#contato" onclick="closeSolutionModal(); preselectChallenge(${idx})" class="btn-pv-primary px-5 py-2.5 text-xs shrink-0">
            <span>Solicitar esta Solução</span>
          </a>
        </div>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      initIcons();
    }

    function closeSolutionModal() {
      const modal = document.getElementById('solution-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    function preselectChallenge(idx) {
      const select = document.getElementById('f-desafio');
      if (select && select.options[idx]) {
        select.selectedIndex = idx;
      }
    }

    /* ==========================================================================
       6. FILTRO DE COMPROMISSOS (TODOS | E | S | G)
       ========================================================================== */
    function filterEsgAxis(axis) {
      document.querySelectorAll('.axis-btn').forEach((btn) => {
        const active = btn.getAttribute('data-axis-btn') === axis;
        btn.className = active
          ? 'axis-btn px-4 py-2 rounded-xl font-display font-bold text-xs bg-gradient-to-r from-proverde-400 to-proverde-300 text-obsidian-950 transition-all'
          : 'axis-btn px-4 py-2 rounded-xl font-display font-bold text-xs text-silver-200 hover:text-white transition-all';
      });

      document.querySelectorAll('[data-axis-card]').forEach((card) => {
        const cardAxis = card.getAttribute('data-axis-card');
        card.classList.toggle('hidden', axis !== 'all' && cardAxis !== axis);
      });
    }

    /* ==========================================================================
       7. SIMULADOR INTERATIVO DE MATURIDADE & PRONTIDÃO ESG
       ========================================================================== */
    let selectedCompanyTier = 'Média Empresa';

    function setSimCompanyTier(tier) {
      selectedCompanyTier = tier;
      document.querySelectorAll('.tier-btn').forEach((btn) => {
        const active = btn.getAttribute('data-tier') === tier;
        btn.className = active
          ? 'tier-btn py-2.5 px-3.5 rounded-xl font-display font-bold text-xs bg-pine-900 text-proverde-300 border border-proverde-400/40 transition-all'
          : 'tier-btn py-2.5 px-3.5 rounded-xl font-display font-bold text-xs bg-white/80 text-slate-700 border border-slate-300/70 hover:border-proverde-500 transition-all';
      });
      recalcSimulator();
    }

    function applySimPreset(v1, v2, v3, v4) {
      document.getElementById('slider-escassez').value = v1;
      document.getElementById('slider-gov').value = v2;
      document.getElementById('slider-credito').value = v3;
      document.getElementById('slider-normas').value = v4;
      recalcSimulator();
      showToast('Perfil de simulação carregado!');
    }

    function recalcSimulator() {
      const v1 = parseInt(document.getElementById('slider-escassez').value, 10) || 0;
      const v2 = parseInt(document.getElementById('slider-gov').value, 10) || 0;
      const v3 = parseInt(document.getElementById('slider-credito').value, 10) || 0;
      const v4 = parseInt(document.getElementById('slider-normas').value, 10) || 0;

      document.getElementById('lbl-slider-escassez').textContent = `${v1}%`;
      document.getElementById('lbl-slider-gov').textContent = `${v2}%`;
      document.getElementById('lbl-slider-credito').textContent = `${v3}%`;
      document.getElementById('lbl-slider-normas').textContent = `${v4}%`;

      document.getElementById('bar-txt-1').textContent = `${v1}%`;
      document.getElementById('bar-fill-1').style.width = `${v1}%`;
      document.getElementById('bar-txt-2').textContent = `${v2}%`;
      document.getElementById('bar-fill-2').style.width = `${v2}%`;
      document.getElementById('bar-txt-3').textContent = `${v3}%`;
      document.getElementById('bar-fill-3').style.width = `${v3}%`;
      document.getElementById('bar-txt-4').textContent = `${v4}%`;
      document.getElementById('bar-fill-4').style.width = `${v4}%`;

      const score = Math.round(v1 * 0.28 + v2 * 0.24 + v3 * 0.24 + v4 * 0.24);
      document.getElementById('sim-total-pct').textContent = String(score);

      const circumference = 314.16;
      const offset = circumference - (score / 100) * circumference;
      const circle = document.getElementById('sim-gauge-circle');
      if (circle) {
        circle.style.strokeDashoffset = String(offset);
        circle.style.stroke = score < 40 ? '#FBBF24' : score < 72 ? '#4CE8D4' : '#57E2CC';
      }

      const pill = document.getElementById('sim-status-pill');
      const title = document.getElementById('sim-diag-title');
      const desc = document.getElementById('sim-diag-desc');
      const action = document.getElementById('sim-priority-action');

      // Identifica o eixo mais vulnerável para recomendação cirúrgica
      const axes = [
        { name: 'Gestão de Escassez & Recursos', val: v1, rec: 'Iniciar pelo Pilar 01 (Diagnóstico Rápido de 15 dias) para estancar gargalos operacionais e converter perdas em margem.' },
        { name: 'Governança & Controles', val: v2, rec: 'Estruturar governança transparente e metas auditáveis com equipes internas para blindar a operação contra greenwashing.' },
        { name: 'Prontidão p/ Crédito Verde', val: v3, rec: 'Modelar dossiê ESG e metas SPTs (Pilar 03) para destravar linhas de Crédito Verde e financiamentos com menor custo de capital.' },
        { name: 'Conformidade GRI / SASB / ISSB', val: v4, rec: 'Adequar relatórios às normas GRI, SASB e ISSB/IFRS S1-S2 (Pilar 04) para atender bancos, investidores e grandes clientes.' }
      ].sort((a, b) => a.val - b.val);

      if (score < 40) {
        pill.textContent = 'Alerta · Vulnerabilidade';
        pill.className = 'px-3 py-1 rounded-full text-xs font-display font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40';
        title.textContent = `Prioridade de reversão de escassez e blindagem para ${selectedCompanyTier}`;
        desc.textContent = 'A operação apresenta exposição elevada a riscos regulatórios, encarecimento de insumos ou restrição a linhas de crédito sustentável.';
      } else if (score < 72) {
        pill.textContent = 'Estruturação Tática';
        pill.className = 'px-3 py-1 rounded-full text-xs font-display font-bold bg-proverde-400/20 text-proverde-300 border border-proverde-300/35';
        title.textContent = `Oportunidade clara de ganho competitivo e captação para ${selectedCompanyTier}`;
        desc.textContent = 'Sua empresa já possui bases importantes, mas precisa integrar métricas auditáveis para capturar retorno financeiro e Crédito Verde.';
      } else {
        pill.textContent = 'Liderança & Expansão';
        pill.className = 'px-3 py-1 rounded-full text-xs font-display font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-300/40';
        title.textContent = `Alta maturidade estratégica para liderança setorial (${selectedCompanyTier})`;
        desc.textContent = 'Excelente prontidão para asseguração independente IFRS S1/S2, captação sofisticada e posicionamento institucional de referência.';
      }

      action.textContent = `Eixo prioritário detectado (${axes[0].name} — ${axes[0].val}%): ${axes[0].rec}`;
    }

    function transferDiagnosisToForm() {
      const v1 = document.getElementById('slider-escassez').value;
      const v2 = document.getElementById('slider-gov').value;
      const v3 = document.getElementById('slider-credito').value;
      const v4 = document.getElementById('slider-normas').value;
      const total = document.getElementById('sim-total-pct').textContent;
      const priority = document.getElementById('sim-priority-action').textContent;

      const porteSelect = document.getElementById('f-porte');
      if (porteSelect) {
        for (let i = 0; i < porteSelect.options.length; i++) {
          if (porteSelect.options[i].value === selectedCompanyTier) {
            porteSelect.selectedIndex = i;
            break;
          }
        }
      }

      const resumoField = document.getElementById('f-resumo');
      if (resumoField) {
        resumoField.value =
          `[Índice de Resiliência ProVerde: ${total}% | Porte: ${selectedCompanyTier}]\n` +
          `• Escassez & Recursos: ${v1}% | Governança: ${v2}% | Crédito Verde: ${v3}% | GRI/SASB/ISSB: ${v4}%\n` +
          `• Diagnóstico: ${priority}\n\n` +
          `Solicito contacto de um especialista sênior da ProVerde para avaliar nosso plano de ação.`;
      }

      document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
      showToast('Diagnóstico preenchido automaticamente no formulário!');
    }

    /* ==========================================================================
       8. FORMULÁRIO B2B, NEWSLETTER, FAQ & OBSERVERS
       ========================================================================== */
    function toggleFaqItem(idx) {
      for (let i = 0; i < 2; i++) {
        const ans = document.getElementById(`faq-ans-${i}`);
        const chev = document.getElementById(`faq-chevron-${i}`);
        if (!ans || !chev) continue;
        if (i === idx) {
          const opening = ans.classList.contains('hidden');
          ans.classList.toggle('hidden', !opening);
          chev.style.transform = opening ? 'rotate(180deg)' : 'rotate(0deg)';
        } else {
          ans.classList.add('hidden');
          chev.style.transform = 'rotate(0deg)';
        }
      }
    }

   const PROVERDE_GATEWAY_EMAIL = "executivoProVerde@gmail.com";
const WEB3FORMS_ACCESS_KEY = "3b737262-ec81-476f-8092-2b376b475e13"; 

async function submitExecutiveForm(event) {
  event.preventDefault();

  // Bloqueio silencioso de bots (honeypot)
  const honey = document.getElementById("f-honey");
  if (honey && honey.value.trim() !== "") return;

  const fields = [
    { id: "f-nome", err: "err-f-nome", check: (v) => v.trim().length >= 3 },
    { id: "f-cargo", err: "err-f-cargo", check: (v) => v.trim().length >= 2 },
    { id: "f-empresa", err: "err-f-empresa", check: (v) => v.trim().length >= 2 },
    { id: "f-email", err: "err-f-email", check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: "f-resumo", err: "err-f-resumo", check: (v) => v.trim().length >= 10 }
  ];

  let isValid = true;
  fields.forEach(({ id, err, check }) => {
    const input = document.getElementById(id);
    const errEl = document.getElementById(err);
    const ok = check(input.value);

    errEl.classList.toggle("hidden", ok);
    input.classList.toggle("border-rose-500", !ok);
    if (!ok) isValid = false;
  });

  if (!isValid) return;

  const btnSubmit = document.getElementById("btn-submit-exec");
  const btnLabel = document.getElementById("btn-submit-label");
  const errorBox = document.getElementById("form-gateway-error");

  // Aviso claro caso a chave ainda não tenha sido colada
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "COLE_SUA_ACCESS_KEY_AQUI") {
    errorBox.textContent = "Configuração pendente: cole sua Access Key do Web3Forms na constante WEB3FORMS_ACCESS_KEY no script.";
    errorBox.classList.remove("hidden");
    return;
  }

  const nome = document.getElementById("f-nome").value.trim();
  const cargo = document.getElementById("f-cargo").value.trim();
  const empresa = document.getElementById("f-empresa").value.trim();
  const email = document.getElementById("f-email").value.trim();
  const porte = document.getElementById("f-porte").value;
  const desafio = document.getElementById("f-desafio").value;
  const resumo = document.getElementById("f-resumo").value.trim();

  const ano = new Date().getFullYear();
  const protocolo = `PV-${ano}-${Math.floor(1000 + Math.random() * 9000)}`;

  errorBox.classList.add("hidden");
  btnSubmit.disabled = true;
  btnLabel.textContent = "Enviando para Mesa Executiva...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `[ProVerde B2B] Diagnóstico Executivo — ${empresa} (${protocolo})`,
        from_name: "Portal ProVerde",
        email: email, // Define automaticamente o "Responder para" (Reply-To) do cliente
        Protocolo: protocolo,
        Nome: nome,
        Cargo: cargo,
        Empresa: empresa,
        Porte: porte,
        "Desafio Principal": desafio,
        "Resumo da Demanda": resumo
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Não foi possível enviar pelo gateway.");
    }

    document.getElementById("protocol-code").textContent = protocolo;
    document.getElementById("executive-form").classList.add("hidden");
    document.getElementById("form-confirmation").classList.remove("hidden");
  } catch (err) {
    console.error("Erro no gateway ProVerde:", err);

    const mailtoBody = encodeURIComponent(
      `Protocolo: ${protocolo}\nNome: ${nome}\nCargo: ${cargo}\nEmpresa: ${empresa}\nE-mail: ${email}\nPorte: ${porte}\nDesafio: ${desafio}\n\nResumo:\n${resumo}`
    );
    const mailtoHref = `mailto:${PROVERDE_GATEWAY_EMAIL}?subject=${encodeURIComponent(`[ProVerde B2B] ${empresa} (${protocolo})`)}&body=${mailtoBody}`;

    errorBox.innerHTML = `
      Falha no envio automático (${err.message}). Verifique sua conexão ou
      <a href="${mailtoHref}" class="underline font-bold text-rose-800">clique aqui para enviar pelo seu e-mail</a>.
    `;
    errorBox.classList.remove("hidden");
  } finally {
    btnSubmit.disabled = false;
    btnLabel.textContent = "Confirmar Solicitação Executiva";
  }
}

function resetExecutiveForm() {
  const form = document.getElementById("executive-form");
  form.reset();
  form.classList.remove("hidden");
  document.getElementById("form-confirmation").classList.add("hidden");
  document.getElementById("form-gateway-error").classList.add("hidden");
}

    function submitNewsletter(e) {
      e.preventDefault();
      const input = document.getElementById('news-email');
      const msg = document.getElementById('news-msg');
      if (!input || !input.value.includes('@')) return;
      msg.textContent = `✓ E-mail ${input.value} cadastrado no Boletim Executivo ProVerde.`;
      msg.classList.remove('hidden');
      input.value = '';
      showToast('Inscrição confirmada no Boletim ProVerde!');
    }

    function runCounters() {
      document.querySelectorAll('.counter-num').forEach((el) => {
        if (el.dataset.done === '1') return;
        el.dataset.done = '1';
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const start = performance.now();
        const duration = 1400;

        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * ease));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        }
        requestAnimationFrame(tick);
      });
    }

    // Fechar modal com ESC ou clique externo
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSolutionModal();
        closeMegaDropdown();
      }
    });

    document.getElementById('solution-modal').addEventListener('click', (e) => {
      if (e.target.id === 'solution-modal') closeSolutionModal();
    });

    window.addEventListener('resize', () => {
      resizeAuroraCanvas();
      const activeNav = document.querySelector('.nav-item.active-nav') || document.querySelector('.nav-item');
      if (activeNav) moveNavIndicator(activeNav);
    });

    // Inicialização completa no window.onload
    window.onload = function () {
      injectOfficialFavicon();
      initIcons();
      selectHeroSlide(0);
      recalcSimulator();
      initHero3DTilt();
      initAuroraCanvas();
      animateAuroraCanvas();
      runCounters();

      // Timer do Carrossel Hero Estilo Suzano
      setInterval(() => {
        if (!heroPlaying) return;
        heroElapsedPct += (HERO_STEP_MS / HERO_INTERVAL_MS) * 100;
        const bar = document.getElementById(`hero-prog-${currentHeroIdx}`);
        if (bar) bar.style.width = `${Math.min(100, heroElapsedPct)}%`;
        if (heroElapsedPct >= 100) {
          stepHeroSlide(1);
        }
      }, HERO_STEP_MS);

      // Hover e Scroll Spy para o Indicador Luminoso da Navbar
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach((item) => {
        item.addEventListener('mouseenter', () => moveNavIndicator(item));
      });

      const sections = ['inicio', 'a-proverde', 'solucoes', 'compromissos', 'simulador', 'contato'];
      window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-navbar');
        if (nav) {
          nav.classList.toggle('shadow-2xl', window.scrollY > 24);
          nav.classList.toggle('bg-obsidian-950/95', window.scrollY > 24);
        }

        let currentSection = 'inicio';
        sections.forEach((id) => {
          const sec = document.getElementById(id);
          if (sec && window.scrollY >= sec.offsetTop - 180) {
            currentSection = id;
          }
        });

        const matchedNav = document.querySelector(`[data-nav-target="${currentSection}"]`);
        if (matchedNav) {
          navItems.forEach(n => n.classList.remove('active-nav', 'text-white'));
          matchedNav.classList.add('active-nav', 'text-white');
          moveNavIndicator(matchedNav);
        }
      });

      // IntersectionObserver para animações suaves de entrada
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
      } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      }
    };