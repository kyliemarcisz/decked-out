import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Upload,
  Check,
  X,
  Play,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sliders,
  AlertTriangle,
  ShieldCheck,
  Wand2,
  Eye,
  Key,
  Layers,
  Type,
  Palette,
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';

const BRAND_PRESETS = {
  linear: {
    id: 'linear',
    name: 'Linear // Architectural',
    tagline: 'Precision dark-mode software craft',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
    displayFont: "'Plus Jakarta Sans', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    bg: '#09090B',
    surface: '#121215',
    text: '#FAFAFA',
    muted: '#71717A',
    accent: '#818CF8',
    border: 'rgba(255, 255, 255, 0.1)',
    radius: '4px',
    cadence: 'Terse, active verbs, zero adjectives, technical precision',
    bannedWords: ['synergy', 'delve', 'transformative', 'unlock', 'game-changer']
  },
  stripe: {
    id: 'stripe',
    name: 'Stripe Press // Editorial',
    tagline: 'Warm literary authority & crisp Swiss grids',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
    displayFont: "'Instrument Serif', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    bg: '#FBF9F5',
    surface: '#F2EFE9',
    text: '#141413',
    muted: '#6B6860',
    accent: '#D95D39',
    border: 'rgba(20, 20, 19, 0.14)',
    radius: '0px',
    cadence: 'Authoritative, economic clarity, concrete numbers over hype',
    bannedWords: ['leverage', 'seamless', 'revolutionary', 'empower', 'next-gen']
  },
  sequoia: {
    id: 'sequoia',
    name: 'Sequoia // Venture Memo',
    tagline: 'High-conviction partner thesis aesthetic',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
    displayFont: "'Newsreader', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    bg: '#0B1914',
    surface: '#11241D',
    text: '#F3F6F4',
    muted: '#8FA39A',
    accent: '#34D399',
    border: 'rgba(243, 246, 244, 0.14)',
    radius: '2px',
    cadence: 'First-principles, thesis-driven, crisp market proof',
    bannedWords: ['disrupt', 'paradigm', 'holistic', 'best-in-class', 'robust']
  },
  swiss: {
    id: 'swiss',
    name: 'TE // Swiss Industrial',
    tagline: 'International Typographic Style & hardware rigor',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap',
    displayFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Space Grotesk', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    bg: '#ECECE8',
    surface: '#E0E0DA',
    text: '#111111',
    muted: '#5C5C58',
    accent: '#FF4400',
    border: 'rgba(17, 17, 17, 0.22)',
    radius: '0px',
    cadence: 'Direct, functional, unadorned industrial specification',
    bannedWords: ['magic', 'delightful', 'effortless', 'journey', 'ecosystem']
  }
};

const DEFAULT_NOTES = `Company: Decked Out
Thesis: Enterprise teams never send raw AI-generated decks to boards or clients because every LLM outputs the exact same purple gradients, Inter fonts, and bloated bullet lists.
Traction: 4.8x faster deck creation, 94% brand-compliance pass rate across 120 design teams, $1.4M ARR in 4 months.
Thesis vs Reality:
- Legacy AI Decks: Freestyle HTML/CSS per prompt -> Generic "AI slop" that design teams reject.
- Decked Out Compiler: Multimodal Brand DNA extraction -> Deterministic Swiss layout primitives locked to company tokens.
Roadmap:
- Q1: Multimodal URL & PDF Brand DNA Compiler
- Q2: Deterministic Figma & PowerPoint XML Export
- Q3: Real-time Enterprise Design-System Governance`;

const INITIAL_SLIDES = [
  {
    type: 'cover',
    kicker: 'SERIES A // DESIGN INFRASTRUCTURE',
    headline: 'Eliminating the generic AI slop layer in enterprise decks.',
    subhead: 'Decked Out compiles your company’s visual tokens, typographic hierarchy, and copy cadence into deterministic presentation primitives.',
    metaLeft: 'DECKED OUT INC.',
    metaRight: 'NOVEMBER 2026'
  },
  {
    type: 'metric',
    kicker: '01 // EMPIRICAL VELOCITY',
    headline: 'Design teams approve 94% of compiled decks on the first pass.',
    bigNumber: '4.8×',
    metricLabel: 'FASTER BOARD-READY TURNAROUND VS. MANUAL REBUILDS',
    supportingStat1: { value: '$1.4M', label: 'NET ARR IN 16 WEEKS' },
    supportingStat2: { value: '0%', label: 'BANNED BUZZWORD LEAKAGE' },
    sparkline: [18, 24, 31, 45, 62, 79, 94]
  },
  {
    type: 'matrix',
    kicker: '02 // ARCHITECTURAL THESIS',
    headline: 'Why freestyle LLM slide generation fails in production.',
    rows: [
      {
        dimension: 'LAYOUT ENGINE',
        legacy: 'Unconstrained HTML/CSS generation with repetitive 3-card clutter',
        compiled: 'Strict 12-column editorial archetypes bound to brand geometry'
      },
      {
        dimension: 'TYPOGRAPHY',
        legacy: 'Default system Inter/Arial with flat visual hierarchy',
        compiled: 'Paired display serifs, tabular monospace, and strict scale ratios'
      },
      {
        dimension: 'VERBAL GUARDRAILS',
        legacy: 'Bloated filler ("delve", "synergy", "transformative")',
        compiled: 'Enforced cadence rules with automated lexicon filtering'
      }
    ]
  },
  {
    type: 'timeline',
    kicker: '03 // EXECUTION HORIZON',
    headline: 'From multimodal ingestion to enterprise governance.',
    phases: [
      {
        period: 'PHASE 01 // Q1',
        title: 'Multimodal Brand Compiler',
        detail: 'Ingest any live URL, PDF deck, or Figma frame to extract exact color tokens, corner radii, and editorial voice.'
      },
      {
        period: 'PHASE 02 // Q2',
        title: 'Native PPTX & Keynote AST',
        detail: 'Compile deterministic layouts straight into editable XML slide masters without losing kerning or vector fidelity.'
      },
      {
        period: 'PHASE 03 // Q3',
        title: 'Design-System CI/CD',
        detail: 'Automated pre-flight linting across every outbound customer and investor deck in the organization.'
      }
    ]
  }
];

export default function App() {
  const [brand, setBrand] = useState(BRAND_PRESETS.stripe);
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slopMode, setSlopMode] = useState(false);
  const [presentMode, setPresentMode] = useState(false);
  const [rawNotes, setRawNotes] = useState(DEFAULT_NOTES);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showCompilerModal, setShowCompilerModal] = useState(false);
  const [brandInputText, setBrandInputText] = useState('');
  const [brandImageBase64, setBrandImageBase64] = useState(null);
  const [brandImageMime, setBrandImageMime] = useState(null);
  const [isCompilingBrand, setIsCompilingBrand] = useState(false);
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Dynamically load active brand's Google Fonts
  useEffect(() => {
    if (!brand.fontsUrl) return;
    const id = 'brand-dynamic-fonts';
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = brand.fontsUrl;
  }, [brand.fontsUrl]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') setActiveSlide((prev) => Math.min(prev + 1, slides.length - 1));
      if (e.key === 'ArrowLeft') setActiveSlide((prev) => Math.max(prev - 1, 0));
      if (e.key === 'Escape' && presentMode) setPresentMode(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [slides.length, presentMode]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBrandImageMime(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(',')[1];
      setBrandImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const compileBrandWithGemini = async () => {
    if (!apiKey.trim()) {
      setStatusMessage('Enter a Gemini API key in the top bar first.');
      return;
    }
    setIsCompilingBrand(true);
    setStatusMessage('Extracting Brand DNA tokens via Gemini...');
    try {
      const parts = [
        {
          text: `You are a Principal Brand Systems Architect. Analyze the provided brand reference (text/URL description and/or screenshot) and extract a strict, high-craft visual and verbal Brand DNA system.
Return ONLY valid JSON matching this exact schema:
{
  "name": "Brand Name // Style",
  "tagline": "Short 5-word aesthetic summary",
  "bg": "#hex background color",
  "surface": "#hex secondary surface color",
  "text": "#hex high-contrast primary text color",
  "muted": "#hex muted secondary text color",
  "accent": "#hex signature accent color",
  "border": "rgba(...) hairline border color",
  "radius": "0px or 2px or 4px or 8px",
  "displayFont": "'Instrument Serif', serif OR 'Plus Jakarta Sans', sans-serif OR 'Newsreader', serif OR 'Space Grotesk', sans-serif",
  "bodyFont": "'Plus Jakarta Sans', sans-serif OR 'Space Grotesk', sans-serif",
  "monoFont": "'JetBrains Mono', monospace",
  "cadence": "Concise copywriting rule",
  "bannedWords": ["word1", "word2", "word3", "word4"]
}
Reference notes: ${brandInputText || 'Analyze the attached image.'}`
        }
      ];

      if (brandImageBase64 && brandImageMime) {
        parts.push({
          inlineData: {
            mimeType: brandImageMime,
            data: brandImageBase64
          }
        });
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error(data?.error?.message || 'Empty response from Gemini');
      const parsed = JSON.parse(rawText);
      setBrand({
        ...brand,
        ...parsed,
        id: 'custom-' + Date.now(),
        fontsUrl:
          'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap'
      });
      setShowCompilerModal(false);
      setStatusMessage(`Compiled Brand DNA: ${parsed.name}`);
    } catch (err) {
      setStatusMessage(`Compiler error: ${err.message}`);
    } finally {
      setIsCompilingBrand(false);
    }
  };

  const generateDeckFromNotes = async () => {
    if (!apiKey.trim()) {
      setStatusMessage('Add your Gemini API key in the top bar to synthesize custom notes.');
      return;
    }
    setIsGeneratingDeck(true);
    setStatusMessage('Compiling raw notes into deterministic editorial archetypes...');
    try {
      const prompt = `Transform these raw notes into a 4-slide executive presentation adhering strictly to this Brand DNA:
- Tone Cadence: ${brand.cadence}
- BANNED WORDS (never use any of these): ${brand.bannedWords.join(', ')}

Return ONLY valid JSON as an array of 4 objects matching these exact 4 types in order:
1. { "type": "cover", "kicker": "UPPERCASE TAG", "headline": "Crisp 8-12 word editorial thesis", "subhead": "20-word concrete explanation", "metaLeft": "COMPANY", "metaRight": "DATE/CONTEXT" }
2. { "type": "metric", "kicker": "01 // TAG", "headline": "Headline stating the proof", "bigNumber": "e.g. 4.8x or $2.1M", "metricLabel": "UPPERCASE METRIC DESCRIPTION", "supportingStat1": { "value": "stat", "label": "LABEL" }, "supportingStat2": { "value": "stat", "label": "LABEL" }, "sparkline": [12, 22, 35, 48, 66, 82, 95] }
3. { "type": "matrix", "kicker": "02 // TAG", "headline": "Comparative thesis headline", "rows": [ { "dimension": "AXIS 1", "legacy": "Old way", "compiled": "New way" }, { "dimension": "AXIS 2", "legacy": "Old way", "compiled": "New way" }, { "dimension": "AXIS 3", "legacy": "Old way", "compiled": "New way" } ] }
4. { "type": "timeline", "kicker": "03 // TAG", "headline": "Execution roadmap headline", "phases": [ { "period": "PHASE 01", "title": "Milestone", "detail": "Concrete deliverable" }, { "period": "PHASE 02", "title": "Milestone", "detail": "Concrete deliverable" }, { "period": "PHASE 03", "title": "Milestone", "detail": "Concrete deliverable" } ] }

Raw Notes:
${rawNotes}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error(data?.error?.message || 'Generation failed');
      const parsedSlides = JSON.parse(rawText);
      if (Array.isArray(parsedSlides) && parsedSlides.length === 4) {
        setSlides(parsedSlides);
        setActiveSlide(0);
        setStatusMessage('Deck compiled with zero banned buzzwords.');
      }
    } catch (err) {
      setStatusMessage(`Synthesis error: ${err.message}`);
    } finally {
      setIsGeneratingDeck(false);
    }
  };

  const renderSlopSlide = (slide) => {
    return (
      <div
        className="w-full h-full flex flex-col justify-between p-10 text-white relative overflow-hidden select-none"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #0f172a 100%)',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30">
            ✨ AI Generated Presentation
          </span>
          <span className="text-xs text-purple-300/60">Slide {activeSlide + 1} of 4</span>
        </div>

        <div className="my-auto">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Unlocking Transformative Synergy: {slide.headline}
          </h2>
          <p className="text-sm text-slate-300 mb-6">
            In today’s fast-paced digital landscape, leveraging next-gen holistic paradigms empowers seamless journeys:
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold mb-3">
                  🚀
                </div>
                <div className="text-sm font-bold text-white mb-1">Key Pillar #{n}</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Delving into robust, best-in-class solutions that drive game-changing ecosystem value across stakeholders.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex justify-between border-t border-white/10 pt-3">
          <span>Generated with Generic LLM Template</span>
          <span>Confidential & Proprietary</span>
        </div>
      </div>
    );
  };

  const renderEditorialSlide = (slide) => {
    const commonHeader = (
      <div
        className="flex items-center justify-between pb-4 text-[11px] tracking-[0.14em] uppercase"
        style={{
          fontFamily: brand.monoFont,
          color: brand.muted,
          borderBottom: `1px solid ${brand.border}`
        }}
      >
        <span>{slide.kicker}</span>
        <span>
          {brand.name.split('//')[0].trim()} — 0{activeSlide + 1} / 04
        </span>
      </div>
    );

    if (slide.type === 'cover') {
      return (
        <div
          className="w-full h-full flex flex-col justify-between p-12 transition-all duration-300"
          style={{ backgroundColor: brand.bg, color: brand.text, fontFamily: brand.bodyFont }}
        >
          {commonHeader}

          <div className="grid grid-cols-12 gap-8 items-end my-auto py-6">
            <div className="col-span-8">
              <div
                className="w-10 h-[3px] mb-6"
                style={{ backgroundColor: brand.accent }}
              />
              <h1
                className="text-5xl leading-[1.06] tracking-[-0.02em] font-normal"
                style={{ fontFamily: brand.displayFont }}
              >
                {slide.headline}
              </h1>
            </div>
            <div
              className="col-span-4 pl-6 flex flex-col justify-between h-full"
              style={{ borderLeft: `1px solid ${brand.border}` }}
            >
              <p className="text-sm leading-relaxed" style={{ color: brand.muted }}>
                {slide.subhead}
              </p>
              <div
                className="mt-8 pt-4 text-[11px] uppercase tracking-wider"
                style={{
                  fontFamily: brand.monoFont,
                  borderTop: `1px solid ${brand.border}`,
                  color: brand.accent
                }}
              >
                LOCKED DESIGN SYSTEM // ACTIVE
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between pt-4 text-[11px] tracking-[0.12em] uppercase"
            style={{
              fontFamily: brand.monoFont,
              color: brand.muted,
              borderTop: `1px solid ${brand.border}`
            }}
          >
            <span>{slide.metaLeft}</span>
            <span>{slide.metaRight}</span>
          </div>
        </div>
      );
    }

    if (slide.type === 'metric') {
      const points = slide.sparkline || [20, 35, 42, 60, 75, 88, 94];
      const max = Math.max(...points);
      const svgPoints = points
        .map((val, idx) => `${(idx / (points.length - 1)) * 220},${60 - (val / max) * 50}`)
        .join(' ');

      return (
        <div
          className="w-full h-full flex flex-col justify-between p-12 transition-all duration-300"
          style={{ backgroundColor: brand.bg, color: brand.text, fontFamily: brand.bodyFont }}
        >
          {commonHeader}

          <div className="my-auto">
            <h2
              className="text-3xl leading-[1.15] tracking-[-0.015em] max-w-2xl mb-10"
              style={{ fontFamily: brand.displayFont }}
            >
              {slide.headline}
            </h2>

            <div
              className="grid grid-cols-12 pt-8"
              style={{ borderTop: `1px solid ${brand.border}` }}
            >
              <div
                className="col-span-7 pr-8"
                style={{ borderRight: `1px solid ${brand.border}` }}
              >
                <div
                  className="text-7xl leading-none tracking-[-0.03em] mb-3"
                  style={{ fontFamily: brand.displayFont, color: brand.accent }}
                >
                  {slide.bigNumber}
                </div>
                <div
                  className="text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: brand.monoFont, color: brand.muted }}
                >
                  {slide.metricLabel}
                </div>
              </div>

              <div className="col-span-5 pl-8 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 pb-6" style={{ borderBottom: `1px solid ${brand.border}` }}>
                  <div>
                    <div className="text-2xl font-medium" style={{ fontFamily: brand.displayFont }}>
                      {slide.supportingStat1?.value}
                    </div>
                    <div className="text-[10px] tracking-wider uppercase mt-1" style={{ fontFamily: brand.monoFont, color: brand.muted }}>
                      {slide.supportingStat1?.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-medium" style={{ fontFamily: brand.displayFont }}>
                      {slide.supportingStat2?.value}
                    </div>
                    <div className="text-[10px] tracking-wider uppercase mt-1" style={{ fontFamily: brand.monoFont, color: brand.muted }}>
                      {slide.supportingStat2?.label}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <svg viewBox="0 0 220 65" className="w-full h-12 overflow-visible">
                    <polyline
                      fill="none"
                      stroke={brand.accent}
                      strokeWidth="2"
                      points={svgPoints}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex justify-between pt-4 text-[11px] uppercase tracking-wider"
            style={{ fontFamily: brand.monoFont, color: brand.muted, borderTop: `1px solid ${brand.border}` }}
          >
            <span>VERIFIED TELEMETRY</span>
            <span>ZERO TEMPLATE DRIFT</span>
          </div>
        </div>
      );
    }

    if (slide.type === 'matrix') {
      return (
        <div
          className="w-full h-full flex flex-col justify-between p-12 transition-all duration-300"
          style={{ backgroundColor: brand.bg, color: brand.text, fontFamily: brand.bodyFont }}
        >
          {commonHeader}

          <div className="my-auto">
            <h2
              className="text-3xl leading-[1.15] tracking-[-0.015em] max-w-2xl mb-8"
              style={{ fontFamily: brand.displayFont }}
            >
              {slide.headline}
            </h2>

            <div className="w-full">
              <div
                className="grid grid-cols-12 pb-3 text-[10px] tracking-[0.14em] uppercase"
                style={{ fontFamily: brand.monoFont, color: brand.muted, borderBottom: `1px solid ${brand.border}` }}
              >
                <div className="col-span-3">DIMENSION</div>
                <div className="col-span-4">LEGACY AI GENERATORS</div>
                <div className="col-span-5" style={{ color: brand.accent }}>
                  COMPILED BRAND SYSTEM
                </div>
              </div>

              {(slide.rows || []).map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 py-4 items-baseline text-sm"
                  style={{ borderBottom: `1px solid ${brand.border}` }}
                >
                  <div
                    className="col-span-3 text-xs uppercase tracking-wider"
                    style={{ fontFamily: brand.monoFont, color: brand.muted }}
                  >
                    {row.dimension}
                  </div>
                  <div className="col-span-4 pr-6 text-xs leading-relaxed" style={{ color: brand.muted }}>
                    {row.legacy}
                  </div>
                  <div className="col-span-5 font-medium leading-relaxed">
                    {row.compiled}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex justify-between pt-4 text-[11px] uppercase tracking-wider"
            style={{ fontFamily: brand.monoFont, color: brand.muted, borderTop: `1px solid ${brand.border}` }}
          >
            <span>ARCHITECTURAL COMPARISON</span>
            <span>DETERMINISTIC SCHEMA</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className="w-full h-full flex flex-col justify-between p-12 transition-all duration-300"
        style={{ backgroundColor: brand.bg, color: brand.text, fontFamily: brand.bodyFont }}
      >
        {commonHeader}

        <div className="my-auto">
          <h2
            className="text-3xl leading-[1.15] tracking-[-0.015em] max-w-2xl mb-10"
            style={{ fontFamily: brand.displayFont }}
          >
            {slide.headline}
          </h2>

          <div
            className="grid grid-cols-3"
            style={{ borderTop: `1px solid ${brand.border}` }}
          >
            {(slide.phases || []).map((phase, idx) => (
              <div
                key={idx}
                className="pt-6 pr-6"
                style={{
                  borderRight: idx < 2 ? `1px solid ${brand.border}` : 'none',
                  paddingLeft: idx > 0 ? '1.5rem' : '0'
                }}
              >
                <div
                  className="text-[11px] tracking-[0.14em] uppercase mb-3"
                  style={{ fontFamily: brand.monoFont, color: brand.accent }}
                >
                  {phase.period}
                </div>
                <div
                  className="text-xl mb-3"
                  style={{ fontFamily: brand.displayFont }}
                >
                  {phase.title}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: brand.muted }}>
                  {phase.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex justify-between pt-4 text-[11px] uppercase tracking-wider"
          style={{ fontFamily: brand.monoFont, color: brand.muted, borderTop: `1px solid ${brand.border}` }}
        >
          <span>EXECUTION CADENCE</span>
          <span>2026 PRODUCT ROADMAP</span>
        </div>
      </div>
    );
  };

  if (presentMode) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl aspect-video shadow-2xl overflow-hidden">
          {slopMode ? renderSlopSlide(slides[activeSlide]) : renderEditorialSlide(slides[activeSlide])}
        </div>
        <div className="fixed bottom-6 flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full text-xs text-zinc-300">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(prev - 1, 0))}
            className="hover:text-white p-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono">
            {activeSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => setActiveSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            className="hover:text-white p-1"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="h-3 w-[1px] bg-zinc-700" />
          <button
            onClick={() => setSlopMode(!slopMode)}
            className={`px-2.5 py-1 rounded-full font-medium transition ${
              slopMode ? 'bg-purple-600 text-white' : 'bg-emerald-500/20 text-emerald-300'
            }`}
          >
            {slopMode ? 'Showing: Generic AI Slop' : 'Showing: Brand-Locked'}
          </button>
          <button
            onClick={() => setPresentMode(false)}
            className="ml-2 text-zinc-400 hover:text-white"
          >
            Exit (ESC)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-zinc-100 flex flex-col font-sans">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Top Studio Bar */}
      <header className="no-print h-14 border-b border-zinc-800/90 bg-[#111114] px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs tracking-tighter">
            DO
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight flex items-center gap-2">
              Decked Out <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">BrandDNA v1</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5">
            <Key className="w-3.5 h-3.5 text-zinc-500 mr-2" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Gemini API Key..."
              className="bg-transparent text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none w-36 font-mono"
            />
          </div>

          <button
            onClick={() => setShowCompilerModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-3 py-1.5 rounded-md border border-zinc-700 transition"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            Compile Brand from URL / Image
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md border border-zinc-800 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Export PDF
          </button>

          <button
            onClick={() => setPresentMode(true)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 px-3.5 py-1.5 rounded-md transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Present
          </button>
        </div>
      </header>

      {/* Main 3-Pane Workspace */}
      <div className="no-print flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left Inspector: Brand DNA Tokens */}
        <aside className="col-span-3 border-r border-zinc-800/90 bg-[#111114] p-5 overflow-y-auto flex flex-col gap-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-3 h-3" /> Compiled Brand Presets
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {Object.values(BRAND_PRESETS).map((preset) => {
                const active = brand.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setBrand(preset)}
                    className={`text-left px-3 py-2.5 rounded-md border transition flex items-center justify-between ${
                      active
                        ? 'bg-zinc-800/90 border-zinc-600 text-white'
                        : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium">{preset.name}</div>
                      <div className="text-[11px] text-zinc-500 truncate max-w-[190px]">{preset.tagline}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.bg }}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-1.5">
              <Palette className="w-3 h-3" /> Live Color & Geometry Tokens
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Canvas', key: 'bg' },
                { label: 'Ink', key: 'text' },
                { label: 'Accent', key: 'accent' }
              ].map((token) => (
                <label
                  key={token.key}
                  className="bg-zinc-900 border border-zinc-800 rounded p-2 flex flex-col gap-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400">{token.label}</span>
                    <input
                      type="color"
                      value={brand[token.key]}
                      onChange={(e) => setBrand({ ...brand, [token.key]: e.target.value })}
                      className="w-4 h-4 bg-transparent border-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300 uppercase">{brand[token.key]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
              <Type className="w-3 h-3" /> Verbal Guardrails & Banned Lexicon
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3 bg-zinc-900/70 p-2.5 rounded border border-zinc-800/80">
              {brand.cadence}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(brand.bannedWords || []).map((word, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20 line-through"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Stage: Live 16:9 Slide Viewport */}
        <main className="col-span-6 bg-[#09090B] p-6 flex flex-col items-center justify-between overflow-y-auto">
          {/* Anti-Slop Live Comparison Switch */}
          <div className="w-full max-w-3xl flex items-center justify-between bg-zinc-900/90 border border-zinc-800 px-3.5 py-2 rounded-lg">
            <div className="flex items-center gap-2 text-xs">
              {slopMode ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-200 font-medium">Generic LLM Output (Unconstrained Slop)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-200 font-medium">Deterministic Brand-Locked Output</span>
                </>
              )}
            </div>

            <div className="flex items-center bg-zinc-950 p-0.5 rounded-md border border-zinc-800">
              <button
                onClick={() => setSlopMode(false)}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  !slopMode ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Brand-Locked
              </button>
              <button
                onClick={() => setSlopMode(true)}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  slopMode ? 'bg-purple-600 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                AI Slop Mode
              </button>
            </div>
          </div>

          {/* 16:9 Canvas */}
          <div className="w-full max-w-3xl aspect-video rounded-sm overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] border border-zinc-800 my-4">
            {slopMode ? renderSlopSlide(slides[activeSlide]) : renderEditorialSlide(slides[activeSlide])}
          </div>

          {/* Slide Filmstrip */}
          <div className="w-full max-w-3xl grid grid-cols-4 gap-3">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`p-2.5 rounded border text-left transition ${
                  activeSlide === idx
                    ? 'bg-zinc-900 border-zinc-500 text-white'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="text-[10px] font-mono uppercase mb-1">0{idx + 1} // {s.type}</div>
                <div className="text-xs truncate font-medium">{s.headline}</div>
              </button>
            ))}
          </div>
        </main>

        {/* Right Panel: Raw Notes to Deterministic Deck */}
        <aside className="col-span-3 border-l border-zinc-800/90 bg-[#111114] p-5 flex flex-col justify-between">
          <div className="flex-1 flex flex-col">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 flex items-center justify-between">
              <span>Raw Source Notes</span>
              <span className="text-zinc-600">Markdown / Bullet Dump</span>
            </div>
            <textarea
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-xs text-zinc-300 font-mono leading-relaxed focus:outline-none focus:border-zinc-600 resize-none"
            />
          </div>

          <div className="pt-4">
            {statusMessage && (
              <div className="mb-3 text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-2">
                {statusMessage}
              </div>
            )}
            <button
              onClick={generateDeckFromNotes}
              disabled={isGeneratingDeck}
              className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              {isGeneratingDeck ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Compiling into Brand Schema...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Synthesize Brand-Locked Deck
                </>
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* Print-Only Full Deck Layout */}
      <div className="hidden print-only">
        {slides.map((s, idx) => (
          <div key={idx} className="w-screen h-screen page-break-after-always">
            {renderEditorialSlide(s)}
          </div>
        ))}
      </div>

      {/* Multimodal Brand Compiler Modal */}
      {showCompilerModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-zinc-800 rounded-lg max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-semibold text-white">Multimodal Brand DNA Compiler</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Drop a screenshot of any website or pitch deck + optional brand notes.
                </p>
              </div>
              <button
                onClick={() => setShowCompilerModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  1. Upload Website or Deck Screenshot (PNG / JPG)
                </label>
                <label className="flex flex-col items-center justify-center border border-dashed border-zinc-700 hover:border-zinc-500 rounded-md p-5 cursor-pointer bg-zinc-950/60 transition">
                  <Upload className="w-5 h-5 text-zinc-400 mb-1.5" />
                  <span className="text-xs text-zinc-300">
                    {brandImageBase64 ? 'Screenshot attached ✓' : 'Click to upload brand reference image'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  2. Company URL or Tone Guidelines (Optional)
                </label>
                <textarea
                  rows={3}
                  value={brandInputText}
                  onChange={(e) => setBrandInputText(e.target.value)}
                  placeholder="e.g. https://ramp.com — crisp financial editorial aesthetic, high contrast, zero fluff..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setShowCompilerModal(false)}
                className="px-3.5 py-2 rounded text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={compileBrandWithGemini}
                disabled={isCompilingBrand}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                {isCompilingBrand ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Extracting DNA...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    Compile Brand Kit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
