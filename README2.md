<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub README Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Inter', sans-serif; }
    body { background: #030304; }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #444; }

    .glass {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.08);
    }

    .gradient-text {
      background: linear-gradient(135deg, #FFFFFF 0%, #a5b4fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gradient-text-purple {
      background: linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #fb7185 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gradient-text-green {
      background: linear-gradient(135deg, #34d399 0%, #a5b4fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .badge {
      background: rgba(99,102,241,0.15);
      border: 1px solid rgba(99,102,241,0.3);
      color: #a5b4fc;
      padding: 2px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 500;
    }

    .badge-green {
      background: rgba(52,211,153,0.15);
      border: 1px solid rgba(52,211,153,0.3);
      color: #34d399;
    }

    .badge-orange {
      background: rgba(251,146,60,0.15);
      border: 1px solid rgba(251,146,60,0.3);
      color: #fb923c;
    }

    .badge-pink {
      background: rgba(251,113,133,0.15);
      border: 1px solid rgba(251,113,133,0.3);
      color: #fb7185;
    }

    .stat-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 20px;
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(99,102,241,0.3);
      transform: translateY(-2px);
    }

    .tech-icon {
      width: 52px; height: 52px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 14px;
      font-size: 24px;
      transition: all 0.3s ease;
      cursor: default;
    }
    .tech-icon:hover {
      transform: translateY(-4px) scale(1.1);
    }

    .project-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    .project-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #6366f1, transparent);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .project-card:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(99,102,241,0.2);
      transform: translateY(-2px);
    }
    .project-card:hover::before { opacity: 1; }

    .social-btn {
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: #94a3b8;
      font-size: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .social-btn:hover {
      background: rgba(99,102,241,0.15);
      border-color: rgba(99,102,241,0.4);
      color: #a5b4fc;
      transform: translateY(-3px);
    }

    .typing-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      background: #6366f1;
      margin-left: 2px;
      animation: blink 1s step-end infinite;
      vertical-align: text-bottom;
    }
    @keyframes blink { 50% { opacity: 0; } }

    .reveal {
      opacity: 0;
      transform: translateY(30px) scale(0.98);
      transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
      filter: blur(10px);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }

    .pulse-dot {
      width: 8px; height: 8px;
      background: #34d399;
      border-radius: 50%;
      position: relative;
    }
    .pulse-dot::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 1px solid #34d399;
      animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
    }
    @keyframes ping {
      75%, 100% { transform: scale(2.5); opacity: 0; }
    }

    .language-bar {
      height: 6px;
      border-radius: 999px;
      overflow: hidden;
      display: flex;
      gap: 2px;
    }
    .language-bar > div {
      height: 100%;
      border-radius: 999px;
      transition: width 1.5s cubic-bezier(0.16,1,0.3,1);
    }

    .contribution-grid {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      gap: 3px;
    }
    .contribution-cell {
      aspect-ratio: 1;
      border-radius: 3px;
      background: rgba(255,255,255,0.03);
      transition: all 0.2s ease;
    }
    .contribution-cell:hover {
      transform: scale(1.4);
      outline: 1px solid rgba(99,102,241,0.5);
    }
    .contribution-cell.l1 { background: rgba(99,102,241,0.15); }
    .contribution-cell.l2 { background: rgba(99,102,241,0.3); }
    .contribution-cell.l3 { background: rgba(99,102,241,0.5); }
    .contribution-cell.l4 { background: rgba(99,102,241,0.8); }

    .markdown-code {
      background: #0A0A0C;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 20px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 12px;
      line-height: 1.7;
      color: #94a3b8;
      overflow-x: auto;
      white-space: pre;
      max-height: 500px;
      overflow-y: auto;
    }

    .tab-btn {
      padding: 8px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    .tab-btn.active {
      background: rgba(99,102,241,0.15);
      border-color: rgba(99,102,241,0.3);
      color: #a5b4fc;
    }
    .tab-btn:not(.active) {
      color: #64748b;
    }
    .tab-btn:not(.active):hover {
      color: #94a3b8;
      background: rgba(255,255,255,0.03);
    }

    .copy-toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(16,185,129,0.15);
      border: 1px solid rgba(16,185,129,0.3);
      color: #34d399;
      padding: 10px 24px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      backdrop-filter: blur(10px);
      z-index: 999;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      pointer-events: none;
    }
    .copy-toast.show {
      transform: translateX(-50%) translateY(0);
    }

    .hero-glow {
      position: absolute;
      width: 600px; height: 600px;
      background: radial-gradient(circle at center, rgba(99,102,241,0.12) 0%, rgba(0,0,0,0) 70%);
      top: -200px; left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    }
  </style>
</head>
<body class="min-h-screen text-white">

  <!-- Toast -->
  <div id="copyToast" class="copy-toast">
    <span class="iconify inline-block mr-1" data-icon="lucide:check-circle" data-width="14"></span>
    Markdown copied to clipboard!
  </div>

  <!-- Nav -->
  <nav class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6" style="background: rgba(3,3,4,0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="max-w-5xl mx-auto w-full flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="iconify text-white" data-icon="lucide:github" data-width="20"></span>
        <span class="text-sm font-medium text-white">README Preview</span>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="switchTab('preview')" class="tab-btn active" id="tabPreview">Preview</button>
        <button onclick="switchTab('code')" class="tab-btn" id="tabCode">Markdown</button>
        <button onclick="copyMarkdown()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:shadow-lg transition-all duration-300" style="box-shadow: 0 0 20px -5px rgba(255,255,255,0.3);">
          <span class="iconify" data-icon="lucide:copy" data-width="13"></span>
          Copy
        </button>
      </div>
    </div>
  </nav>

  <!-- Preview Section -->
  <div id="previewSection" class="pt-24 pb-16 px-4">
    <div class="max-w-4xl mx-auto relative">
      <div class="hero-glow"></div>

      <!-- Header -->
      <div class="reveal flex flex-col items-center text-center mb-12">
        <!-- Avatar -->
        <div class="relative mb-6">
          <img src="https://picsum.photos/seed/dev-avatar-2024/160/160.jpg" alt="Avatar" class="w-28 h-28 rounded-full object-cover" style="border: 2px solid rgba(99,102,241,0.4); box-shadow: 0 0 40px -10px rgba(99,102,241,0.4);">
          <div class="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#030304] flex items-center justify-center" style="border: 2px solid rgba(99,102,241,0.4);">
            <span class="iconify text-indigo-400" data-icon="lucide:code-2" data-width="14"></span>
          </div>
        </div>

        <!-- Name & Tags -->
        <h1 class="text-3xl md:text-4xl font-medium tracking-tight gradient-text mb-3">John Developer</h1>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span class="badge">Full-Stack Developer</span>
          <span class="badge badge-green">Open Source</span>
          <span class="badge badge-orange">UI/UX Enthusiast</span>
        </div>

        <!-- Typing -->
        <div class="flex items-center gap-2 text-slate-400 text-sm mb-6 h-6">
          <span class="iconify" data-icon="lucide:terminal" data-width="14"></span>
          <span id="typingText"></span><span class="typing-cursor"></span>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-3">
          <a href="#" class="social-btn"><span class="iconify" data-icon="lucide:github" data-width="18"></span></a>
          <a href="#" class="social-btn"><span class="iconify" data-icon="lucide:linkedin" data-width="18"></span></a>
          <a href="#" class="social-btn"><span class="iconify" data-icon="lucide:twitter" data-width="18"></span></a>
          <a href="#" class="social-btn"><span class="iconify" data-icon="lucide:mail" data-width="18"></span></a>
          <a href="#" class="social-btn"><span class="iconify" data-icon="lucide:globe" data-width="18"></span></a>
        </div>
      </div>

      <!-- Status Banner -->
      <div class="reveal glass rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
        <div class="flex items-center gap-2">
          <div class="pulse-dot"></div>
          <span class="text-emerald-400 font-medium">Available for hire</span>
        </div>
        <div class="w-px h-4 bg-white/10 hidden sm:block"></div>
        <div class="flex items-center gap-1.5 text-slate-400">
          <span class="iconify" data-icon="lucide:map-pin" data-width="12"></span>
          India
        </div>
        <div class="w-px h-4 bg-white/10 hidden sm:block"></div>
        <div class="flex items-center gap-1.5 text-slate-400">
          <span class="iconify" data-icon="lucide:clock" data-width="12"></span>
          <span id="localTime"></span>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="reveal grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div class="stat-card text-center">
          <div class="text-2xl font-semibold text-white mb-1" id="statRepos">0</div>
          <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Repositories</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-2xl font-semibold text-white mb-1" id="statStars">0</div>
          <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Stars</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-2xl font-semibold text-white mb-1" id="statForks">0</div>
          <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Forks</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-2xl font-semibold text-white mb-1" id="statContrib">0</div>
          <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Contributions</div>
        </div>
      </div>

      <!-- GitHub Stats Cards -->
      <div class="reveal grid md:grid-cols-2 gap-3 mb-8">
        <div class="stat-card p-0 overflow-hidden">
          <div class="p-3 pb-0">
            <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium mb-2 px-1">GitHub Stats</div>
          </div>
          <img src="https://github-readme-stats.vercel.app/api?username=johndeveloper&show_icons=true&theme=dark&hide_border=true&bg_color=030304&title_color=a5b4fc&icon_color=6366f1&text_color=94a3b8&border_radius=0" alt="GitHub Stats" class="w-full" style="filter: saturate(1.2);">
        </div>
        <div class="stat-card p-0 overflow-hidden">
          <div class="p-3 pb-0">
            <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium mb-2 px-1">Top Languages</div>
          </div>
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=johndeveloper&layout=compact&theme=dark&hide_border=true&bg_color=030304&title_color=a5b4fc&text_color=94a3b8&border_radius=0" alt="Top Languages" class="w-full">
        </div>
      </div>

      <!-- Streak -->
      <div class="reveal stat-card p-0 overflow-hidden mb-8">
        <div class="p-4 pb-0">
          <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium mb-2 px-1">Streak Stats</div>
        </div>
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=johndeveloper&theme=dark&hide_border=true&background=030304&stroke=rgba(255,255,255,0.06)&ring=6366f1&fire=6366f1&currStreakLabel=a5b4fc&sideLabels=94a3b8&dates=475569&border_radius=0" alt="Streak" class="w-full">
      </div>

      <!-- Contribution Graph -->
      <div class="reveal glass rounded-2xl p-5 mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Contribution Activity</div>
          <div class="flex items-center gap-1.5 text-[10px] text-slate-600">
            Less
            <div class="flex gap-0.5">
              <div class="w-2.5 h-2.5 rounded-sm" style="background: rgba(255,255,255,0.03);"></div>
              <div class="w-2.5 h-2.5 rounded-sm" style="background: rgba(99,102,241,0.15);"></div>
              <div class="w-2.5 h-2.5 rounded-sm" style="background: rgba(99,102,241,0.3);"></div>
              <div class="w-2.5 h-2.5 rounded-sm" style="background: rgba(99,102,241,0.5);"></div>
              <div class="w-2.5 h-2.5 rounded-sm" style="background: rgba(99,102,241,0.8);"></div>
            </div>
            More
          </div>
        </div>
        <div class="contribution-grid" id="contributionGrid"></div>
      </div>

      <div class="divider mb-8"></div>

      <!-- About Me -->
      <div class="reveal mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="iconify text-indigo-400" data-icon="lucide:user" data-width="16"></span>
          <h2 class="text-lg font-medium text-white">About Me</h2>
        </div>
        <div class="glass rounded-2xl p-6 text-sm text-slate-400 leading-relaxed space-y-3">
          <p>👋 Hey there! I'm <span class="text-white font-medium">John</span>, a passionate full-stack developer with <span class="text-indigo-400 font-medium">5+ years</span> of experience building modern web applications.</p>
          <p>💻 I specialize in crafting <span class="text-white">clean, scalable</span> and <span class="text-white">performant</span> solutions using cutting-edge technologies. I love turning complex problems into simple, beautiful designs.</p>
          <p>🌱 Currently exploring <span class="text-emerald-400">AI/ML integration</span> in web apps and contributing to open-source projects.</p>
          <p>⚡ Fun fact: I debug best at 2 AM with lo-fi music and infinite coffee.</p>
        </div>
      </div>

      <div class="divider mb-8"></div>

      <!-- Tech Stack -->
      <div class="reveal mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="iconify text-indigo-400" data-icon="lucide:layers" data-width="16"></span>
          <h2 class="text-lg font-medium text-white">Tech Stack</h2>
        </div>

        <!-- Languages -->
        <div class="mb-5">
          <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Languages</div>
          <div class="flex flex-wrap gap-3">
            <div class="tech-icon" style="background: rgba(237,224,200,0.1); border: 1px solid rgba(237,224,200,0.15);" title="JavaScript">
              <span class="iconify" data-icon="logos:javascript" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(97,218,251,0.1); border: 1px solid rgba(97,218,251,0.15);" title="TypeScript">
              <span class="iconify" data-icon="logos:typescript-icon" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(97,218,251,0.1); border: 1px solid rgba(97,218,251,0.15);" title="Python">
              <span class="iconify" data-icon="logos:python" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(0,122,204,0.1); border: 1px solid rgba(0,122,204,0.15);" title="Go">
              <span class="iconify" data-icon="logos:go" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(183,135,24,0.1); border: 1px solid rgba(183,135,24,0.15);" title="Rust">
              <span class="iconify" data-icon="logos:rust" data-width="26"></span>
            </div>
          </div>
        </div>

        <!-- Frontend -->
        <div class="mb-5">
          <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Frontend</div>
          <div class="flex flex-wrap gap-3">
            <div class="tech-icon" style="background: rgba(97,218,251,0.1); border: 1px solid rgba(97,218,251,0.15);" title="React">
              <span class="iconify" data-icon="logos:react" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(65,184,131,0.1); border: 1px solid rgba(65,184,131,0.15);" title="Vue.js">
              <span class="iconify" data-icon="logos:vue" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(255,62,0,0.1); border: 1px solid rgba(255,62,0,0.15);" title="Angular">
              <span class="iconify" data-icon="logos:angular-icon" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.15);" title="Tailwind CSS">
              <span class="iconify" data-icon="logos:tailwindcss-icon" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);" title="Next.js">
              <span class="iconify" data-icon="logos:nextjs-icon" data-width="26"></span>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="mb-5">
          <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Backend & Database</div>
          <div class="flex flex-wrap gap-3">
            <div class="tech-icon" style="background: rgba(104,160,99,0.1); border: 1px solid rgba(104,160,99,0.15);" title="Node.js">
              <span class="iconify" data-icon="logos:nodejs-icon" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(234,182,120,0.1); border: 1px solid rgba(234,182,120,0.15);" title="PostgreSQL">
              <span class="iconify" data-icon="logos:postgresql" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(77,179,61,0.1); border: 1px solid rgba(77,179,61,0.15);" title="MongoDB">
              <span class="iconify" data-icon="logos:mongodb-icon" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(220,50,47,0.1); border: 1px solid rgba(220,50,47,0.15);" title="Redis">
              <span class="iconify" data-icon="logos:redis" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(0,123,183,0.1); border: 1px solid rgba(0,123,183,0.15);" title="Docker">
              <span class="iconify" data-icon="logos:docker-icon" data-width="26"></span>
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div>
          <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Tools & Platforms</div>
          <div class="flex flex-wrap gap-3">
            <div class="tech-icon" style="background: rgba(240,80,51,0.1); border: 1px solid rgba(240,80,51,0.15);" title="Git">
              <span class="iconify" data-icon="logos:git-icon" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);" title="VS Code">
              <span class="iconify" data-icon="logos:visual-studio-code" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);" title="Linux">
              <span class="iconify" data-icon="logos:linux-tux" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(240,196,58,0.1); border: 1px solid rgba(240,196,58,0.15);" title="AWS">
              <span class="iconify" data-icon="logos:aws" data-width="26"></span>
            </div>
            <div class="tech-icon" style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.15);" title="Vercel">
              <span class="iconify" data-icon="logos:vercel-icon" data-width="26"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="divider mb-8"></div>

      <!-- Featured Projects -->
      <div class="reveal mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="iconify text-indigo-400" data-icon="lucide:folder-open" data-width="16"></span>
          <h2 class="text-lg font-medium text-white">Featured Projects</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <!-- Project 1 -->
          <div class="project-card">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="iconify text-indigo-400" data-icon="lucide:folder" data-width="16"></span>
                <span class="text-sm font-medium text-white">ai-chat-platform</span>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:star" data-width="14"></span></a>
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:external-link" data-width="14"></span></a>
              </div>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed mb-4">A real-time AI chat platform built with Next.js, WebSockets, and OpenAI API. Features streaming responses, conversation memory, and multi-model support.</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="badge text-[10px]">Next.js</span>
              <span class="badge text-[10px]">TypeScript</span>
              <span class="badge badge-green text-[10px]">OpenAI</span>
              <span class="badge badge-orange text-[10px]">WebSocket</span>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="project-card">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="iconify text-indigo-400" data-icon="lucide:folder" data-width="16"></span>
                <span class="text-sm font-medium text-white">dev-dashboard</span>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:star" data-width="14"></span></a>
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:external-link" data-width="14"></span></a>
              </div>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed mb-4">A beautiful developer analytics dashboard with GitHub integration, real-time stats, contribution heatmaps, and customizable widgets.</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="badge text-[10px]">React</span>
              <span class="badge badge-pink text-[10px]">D3.js</span>
              <span class="badge badge-green text-[10px]">Node.js</span>
              <span class="badge badge-orange text-[10px]">GraphQL</span>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="project-card">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="iconify text-indigo-400" data-icon="lucide:folder" data-width="16"></span>
                <span class="text-sm font-medium text-white">rust-cli-tools</span>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:star" data-width="14"></span></a>
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:external-link" data-width="14"></span></a>
              </div>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed mb-4">A collection of blazing-fast CLI tools written in Rust for file processing, text manipulation, and system monitoring.</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="badge badge-orange text-[10px]">Rust</span>
              <span class="badge text-[10px]">CLI</span>
              <span class="badge badge-green text-[10px]">Systems</span>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="project-card">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="iconify text-indigo-400" data-icon="lucide:folder" data-width="16"></span>
                <span class="text-sm font-medium text-white">ecommerce-api</span>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:star" data-width="14"></span></a>
                <a href="#" class="text-slate-500 hover:text-white transition-colors"><span class="iconify" data-icon="lucide:external-link" data-width="14"></span></a>
              </div>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed mb-4">Production-ready e-commerce REST API with authentication, payment integration (Stripe), inventory management, and comprehensive docs.</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="badge text-[10px]">Node.js</span>
              <span class="badge badge-pink text-[10px]">Stripe</span>
              <span class="badge badge-green text-[10px]">PostgreSQL</span>
              <span class="badge badge-orange text-[10px]">Docker</span>
            </div>
          </div>
        </div>
      </div>

      <div class="divider mb-8"></div>

      <!-- Currently Learning -->
      <div class="reveal mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="iconify text-indigo-400" data-icon="lucide:book-open" data-width="16"></span>
          <h2 class="text-lg font-medium text-white">Currently Learning</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="stat-card flex flex-col items-center text-center py-5">
            <span class="iconify mb-2" data-icon="logos:tensorflow" data-width="32"></span>
            <span class="text-xs text-slate-400">TensorFlow</span>
          </div>
          <div class="stat-card flex flex-col items-center text-center py-5">
            <span class="iconify mb-2" data-icon="logos:kubernetes" data-width="32"></span>
            <span class="text-xs text-slate-400">Kubernetes</span>
          </div>
          <div class="stat-card flex flex-col items-center text-center py-5">
            <span class="iconify mb-2" data-icon="logos:webassembly" data-width="32"></span>
            <span class="text-xs text-slate-400">WebAssembly</span>
          </div>
          <div class="stat-card flex flex-col items-center text-center py-5">
            <span class="iconify mb-2" data-icon="logos:graphql" data-width="32"></span>
            <span class="text-xs text-slate-400">GraphQL</span>
          </div>
        </div>
      </div>

      <div class="divider mb-8"></div>

      <!-- Contact CTA -->
      <div class="reveal">
        <div class="glass rounded-2xl p-8 text-center relative overflow-hidden">
          <div class="absolute inset-0" style="background: radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 70%);"></div>
          <div class="relative z-10">
            <span class="iconify text-indigo-400 mb-3 mx-auto" data-icon="lucide:sparkles" data-width="28"></span>
            <h3 class="text-xl font-medium gradient-text mb-2">Let's Work Together</h3>
            <p class="text-sm text-slate-500 mb-5 max-w-md mx-auto">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:hello@johndeveloper.com" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:shadow-lg transition-all duration-300" style="box-shadow: 0 0 20px -5px rgba(255,255,255,0.3);">
                <span class="iconify" data-icon="lucide:mail" data-width="14"></span>
                Say Hello
              </a>
              <a href="#" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);">
                <span class="iconify" data-icon="lucide:file-text" data-width="14"></span>
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Quote -->
      <div class="reveal mt-10 text-center">
        <p class="text-xs text-slate-600 italic">"Code is like humor. When you have to explain it, it's bad."</p>
        <p class="text-[10px] text-slate-700 mt-1">— Cory House</p>
        <div class="divider mt-6 mb-4"></div>
        <p class="text-[10px] text-slate-700">Built with ❤️ and lots of ☕</p>
      </div>
    </div>
  </div>

  <!-- Code Section (Hidden by default) -->
  <div id="codeSection" class="pt-24 pb-16 px-4 hidden">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="iconify text-slate-500" data-icon="lucide:file-code" data-width="16"></span>
          <span class="text-sm text-slate-400">README.md</span>
        </div>
        <button onclick="copyMarkdown()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white transition-colors" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);">
          <span class="iconify" data-icon="lucide:copy" data-width="12"></span>
          Copy
        </button>
      </div>
      <div class="markdown-code" id="markdownCode"></div>
    </div>
  </div>

  <script>
    // ==================== MARKDOWN CONTENT ====================
    const markdownContent = `<!-- Banner -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=180&section=header&text=John%20Developer&fontSize=32&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Full-Stack%20Developer%20%7C%20Open%20Source%20Contributor" width="100%" alt="banner"/>
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Full_Stack_Developer-6366f1?style=for-the-badge&logoColor=white" alt="Badge"/>
  <img src="https://img.shields.io/badge/Open_Source-34d399?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="Badge"/>
  <img src="https://img.shields.io/badge/UI%2FUX_Enthusiast-fb923c?style=for-the-badge&logoColor=white" alt="Badge"/>
  <img src="https://img.shields.io/badge/Available_for_Hire-10b981?style=for-the-badge&logoColor=white" alt="Badge"/>
</p>

<!-- Social -->
<p align="center">
  <a href="https://github.com/johndeveloper"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"/></a>
  <a href="https://linkedin.com/in/johndeveloper"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://twitter.com/johndeveloper"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white" alt="Twitter"/></a>
  <a href="mailto:hello@johndeveloper.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"/></a>
  <a href="https://johndeveloper.dev"><img src="https://img.shields.io/badge/Website-6366f1?style=flat-square&logo=vercel&logoColor=white" alt="Website"/></a>
</p>

<br/>

<!-- Typing SVG -->
<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=500&size=22&pause=1000&color=a5b4fc&center=true&vCenter=true&width=600&lines=Building+modern+web+experiences;Clean+code+%2B+Beautiful+UI+%3D+%E2%9D%A4%EF%B8%8F;5%2B+years+of+shipping+products;Always+learning%2C+always+building&random=false" alt="Typing SVG"/>
  </a>
</p>

<br/>

<!-- Stats -->
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=johndeveloper&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=a5b4fc&icon_color=6366f1&text_color=94a3b8" height="170" alt="Stats"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=johndeveloper&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=a5b4fc&text_color=94a3b8" height="170" alt="Languages"/>
</p>

<!-- Streak -->
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=johndeveloper&theme=dark&hide_border=true&background=00000000&stroke=ffffff10&ring=6366f1&fire=6366f1&currStreakLabel=a5b4fc&sideLabels=94a3b8&dates=475569" alt="Streak"/>
</p>

<br/>

<!-- About -->
## 👨‍💻 About Me

\`\`\`
👋 Hey there! I'm John, a passionate full-stack developer with 5+ years of experience.
💻 I specialize in crafting clean, scalable, and performant web applications.
🌱 Currently exploring AI/ML integration and contributing to open-source.
⚡ Fun fact: I debug best at 2 AM with lo-fi music and infinite coffee.
\`\`\`

<br/>

<!-- Tech Stack -->
## 🛠️ Tech Stack

<p align="center">
  <!-- Languages -->
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="36" alt="JS"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="36" alt="TS"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="36" alt="Python"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" width="36" alt="Go"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" width="36" alt="Rust"/></code>
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="30"/>
  <!-- Frontend -->
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="36" alt="React"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" width="36" alt="Vue"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="36" alt="Next.js"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="36" alt="Tailwind"/></code>
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="30"/>
  <!-- Backend -->
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="36" alt="Node.js"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="36" alt="PostgreSQL"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="36" alt="MongoDB"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="36" alt="Redis"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="36" alt="Docker"/></code>
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="30"/>
  <!-- Tools -->
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="36" alt="Git"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="36" alt="VS Code"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="36" alt="Linux"/></code>
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" width="36" alt="AWS"/></code>
</p>

<br/>

<!-- Projects -->
## 🚀 Featured Projects

| Project | Description | Tech |
|---------|-------------|------|
| [ai-chat-platform](https://github.com/johndeveloper/ai-chat-platform) | Real-time AI chat with streaming responses & multi-model support | Next.js, TypeScript, OpenAI, WebSocket |
| [dev-dashboard](https://github.com/johndeveloper/dev-dashboard) | Developer analytics dashboard with GitHub integration | React, D3.js, Node.js, GraphQL |
| [rust-cli-tools](https://github.com/johndeveloper/rust-cli-tools) | Blazing-fast CLI tools for file processing & system monitoring | Rust, CLI |
| [ecommerce-api](https://github.com/johndeveloper/ecommerce-api) | Production-ready e-commerce REST API with Stripe payments | Node.js, PostgreSQL, Docker, Stripe |

<br/>

<!-- Learning -->
## 📚 Currently Learning

<p align="center">
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" width="40" title="TensorFlow"/></code>&nbsp;&nbsp;
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" width="40" title="Kubernetes"/></code>&nbsp;&nbsp;
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webassembly/webassembly-original.svg" width="40" title="WebAssembly"/></code>&nbsp;&nbsp;
  <code><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" width="40" title="GraphQL"/></code>
</p>

<br/>

<!-- Contact -->
## ✉️ Let's Connect

<p align="center">
  <a href="mailto:hello@johndeveloper.com">
    <img src="https://img.shields.io/badge/Say_Hello-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
  <a href="https://johndeveloper.dev/resume.pdf">
    <img src="https://img.shields.io/badge/Resume-6366f1?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white" alt="Resume"/>
  </a>
</p>

<br/>

<!-- Snake -->
<p align="center">
  <img src="https://raw.githubusercontent.com/johndeveloper/johndeveloper/output/github-snake-dark.svg" alt="Snake"/>
</p>

<br/>

<!-- Footer -->
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=johndeveloper&color=6366f1&style=flat-square&label=Profile+Views" alt="Views"/>
</p>

<p align="center">
  <i>"Code is like humor. When you have to explain it, it's bad."</i><br>
  <b>— Cory House</b>
</p>

<p align="center">
  Built with ❤️ and lots of ☕<br>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=80&section=footer" width="100%"/>
</p>`;

    // ==================== TYPEWRITER ====================
    const phrases = [
      "Building modern web experiences...",
      "Clean code + Beautiful UI = ❤️",
      "5+ years of shipping products...",
      "Always learning, always building..."
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    const typingEl = document.getElementById('typingText');

    function typeWriter() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      let delay = isDeleting ? 30 : 60;

      if (!isDeleting && charIdx === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 500;
      }
      setTimeout(typeWriter, delay);
    }
    typeWriter();

    // ==================== COUNTER ANIMATION ====================
    function animateCounter(el, target, suffix = '') {
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 20);
    }

    // ==================== CONTRIBUTION GRID ====================
    function buildGrid() {
      const grid = document.getElementById('contributionGrid');
      const levels = ['', 'l1', 'l2', 'l3', 'l4'];
      for (let i = 0; i < 140; i++) {
        const cell = document.createElement('div');
        cell.className = 'contribution-cell';
        const rand = Math.random();
        if (rand > 0.6) cell.classList.add(levels[Math.ceil(Math.random() * 4)]);
        grid.appendChild(cell);
      }
    }
    buildGrid();

    // ==================== LOCAL TIME ====================
    function updateTime() {
      const now = new Date();
      document.getElementById('localTime').textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
      }) + ' IST';
    }
    updateTime();
    setInterval(updateTime, 1000);

    // ==================== SCROLL REVEAL ====================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, idx * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Trigger counter animation when stats visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(document.getElementById('statRepos'), 48);
          animateCounter(document.getElementById('statStars'), 1247);
          animateCounter(document.getElementById('statForks'), 389);
          animateCounter(document.getElementById('statContrib'), 2156);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(document.getElementById('statRepos').parentElement.parentElement);

    // ==================== TAB SWITCH ====================
    function switchTab(tab) {
      const preview = document.getElementById('previewSection');
      const code = document.getElementById('codeSection');
      const tabPreview = document.getElementById('tabPreview');
      const tabCode = document.getElementById('tabCode');

      if (tab === 'preview') {
        preview.classList.remove('hidden');
        code.classList.add('hidden');
        tabPreview.classList.add('active');
        tabCode.classList.remove('active');
      } else {
        preview.classList.add('hidden');
        code.classList.remove('hidden');
        tabPreview.classList.remove('active');
        tabCode.classList.add('active');
        document.getElementById('markdownCode').textContent = markdownContent;
      }
    }

    // ==================== COPY ====================
    function copyMarkdown() {
      navigator.clipboard.writeText(markdownContent).then(() => {
        const toast = document.getElementById('copyToast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      });
    }
  </script>
</body>
</html>
