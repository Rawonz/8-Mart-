import { useEffect, useMemo, useRef, useState } from "react";


type SceneStage = "heart" | "opening" | "letter" | "closing" | "result";
type ThemeKey = "rose" | "blue" | "dark" | "green";


interface ThemeConfig {
  id: ThemeKey;
  label: string;
  emoji: string;
  tagline: string;
  defaultRelation: string;
  defaultMessage: string;
  paperBg: string;
  paperBorder: string;
  paperText: string;
  paperSubtext: string;
  paperInputBg: string;
  paperInputBorder: string;
  paperInputText: string;
  envelopeBack: string;
  envelopeFront: string;
  envelopeFlap: string;
  envelopeSeal: string;
  sealGlyph: string;
  heartCore: string;
  heartRingColor: string;
  heartGlow: string;
  petals: string[];
  petalColor: string;
  readBg: string;
  readCardBg: string;
  readAccent: string;
  readText: string;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  rose: {
    id: "rose",
    label: "Qızılgül",
    emoji: "🌸",
    tagline: "romantik • zərif • sevgi dolu",
    defaultRelation: "Sevgilim",
    defaultMessage:
      "Canım, 8 Martın mübarək. Sənin səsin, gülüşün və qəlbin həyatımın ən zərif hissəsidir. Hər günümə işıq, hər anıma sevgi qatdığın üçün sənə minnətdaram. Sən olmasan bu dünya solğun olardı — sevgin hər yerdə çiçək kimi açır.",
    paperBg: "linear-gradient(160deg,#fff0f6 0%,#fff8f2 50%,#fef0f5 100%)",
    paperBorder: "rgba(230,150,180,0.45)",
    paperText: "#5a1e3e",
    paperSubtext: "#7c4060",
    paperInputBg: "rgba(255,255,255,0.85)",
    paperInputBorder: "#e8b8cc",
    paperInputText: "#5a1e3e",
    envelopeBack: "linear-gradient(180deg,#ffe4ef,#f5b8d0)",
    envelopeFront: "linear-gradient(180deg,#f0b0c8,#d4708e)",
    envelopeFlap: "linear-gradient(160deg,#ffd6e8,#e896b8)",
    envelopeSeal: "linear-gradient(135deg,#9f315f,#d46b98,#ffb0c8)",
    sealGlyph: "♥",
    heartCore:
      "radial-gradient(circle at 35% 35%,rgba(255,238,245,0.97),rgba(255,183,214,0.97) 42%,rgba(210,70,130,0.99) 80%)",
    heartRingColor: "rgba(255,180,210,0.28)",
    heartGlow: "rgba(210,65,128,0.5)",
    petals: ["🌸", "🌺", "💗", "✿", "❀", "🌷", "💕", "🌸"],
    petalColor: "rgba(230,130,160,0.7)",
    readBg: "#fff6fb",
    readCardBg: "linear-gradient(160deg,#fffafd,#ffe8f5)",
    readAccent: "#e06090",
    readText: "#5a2443",
  },
  blue: {
    id: "blue",
    label: "Göy Üfüq",
    emoji: "💙",
    tagline: "sakit • dərin • sonsuz",
    defaultRelation: "Anam",
    defaultMessage:
      "Əziz anam, 8 Martın mübarək. Sənin sevgin, qayğın və gücün mənim üçün hər zaman ən böyük dayaq olub. Sən göy üzü kimi geniş, dəniz kimi dərinsin. Həyatımda olduğun üçün sonsuz təşəkkür edirəm.",
    paperBg: "linear-gradient(160deg,#f0f6ff 0%,#f5f0ff 50%,#edf6ff 100%)",
    paperBorder: "rgba(120,160,230,0.45)",
    paperText: "#1a3060",
    paperSubtext: "#3a5090",
    paperInputBg: "rgba(255,255,255,0.88)",
    paperInputBorder: "#a0c0e8",
    paperInputText: "#1a3060",
    envelopeBack: "linear-gradient(180deg,#d8eaff,#a8c8f0)",
    envelopeFront: "linear-gradient(180deg,#a0c0f0,#6090d0)",
    envelopeFlap: "linear-gradient(160deg,#c8e0ff,#90b8e8)",
    envelopeSeal: "linear-gradient(135deg,#2a5090,#5090d0,#90c8ff)",
    sealGlyph: "✦",
    heartCore:
      "radial-gradient(circle at 35% 35%,rgba(230,245,255,0.97),rgba(160,200,250,0.97) 42%,rgba(60,120,220,0.99) 80%)",
    heartRingColor: "rgba(100,160,240,0.28)",
    heartGlow: "rgba(60,120,220,0.5)",
    petals: ["💙", "❄️", "✦", "💫", "🌊", "💠", "⭐", "🫧"],
    petalColor: "rgba(80,140,220,0.7)",
    readBg: "#f0f6ff",
    readCardBg: "linear-gradient(160deg,#f8fbff,#e0eeff)",
    readAccent: "#4080d0",
    readText: "#1a3060",
  },
  dark: {
    id: "dark",
    label: "Qara Qızıl",
    emoji: "🖤",
    tagline: "güclü • premium • əbədi",
    defaultRelation: "Dəyər verdiyim insan",
    defaultMessage:
      "8 Martın mübarək. Sənin varlığın bu dünyanı daha gözəl, daha mənalı edir. Gecənin dərinliyi kimi sən də hər şeyi özündə gizlədən bir gücə sahibsən. Dəyərin hər zaman hiss olunsun, sevgin daim səni əhatə etsin.",
    paperBg: "linear-gradient(160deg,#1a1020 0%,#120c1a 50%,#1e1228 100%)",
    paperBorder: "rgba(200,160,80,0.35)",
    paperText: "#f0d890",
    paperSubtext: "#c8a860",
    paperInputBg: "rgba(255,255,255,0.06)",
    paperInputBorder: "rgba(200,160,80,0.4)",
    paperInputText: "#f0d890",
    envelopeBack: "linear-gradient(180deg,#2a1e38,#1a1028)",
    envelopeFront: "linear-gradient(180deg,#3a2848,#201430)",
    envelopeFlap: "linear-gradient(160deg,#382248,#281838)",
    envelopeSeal: "linear-gradient(135deg,#b8900a,#e8c050,#f0d890)",
    sealGlyph: "★",
    heartCore:
      "radial-gradient(circle at 35% 35%,rgba(255,248,210,0.97),rgba(220,180,80,0.97) 42%,rgba(140,90,20,0.99) 80%)",
    heartRingColor: "rgba(210,170,70,0.28)",
    heartGlow: "rgba(180,130,30,0.55)",
    petals: ["✦", "⭐", "🌟", "💛", "✨", "🌙", "💫", "🖤"],
    petalColor: "rgba(200,160,60,0.7)",
    readBg: "#130e1c",
    readCardBg: "linear-gradient(160deg,#1e1630,#140f22)",
    readAccent: "#d4a830",
    readText: "#f0d890",
  },
  green: {
    id: "green",
    label: "Bahar Çiçəyi",
    emoji: "🌿",
    tagline: "təzə • həyat dolu • saf",
    defaultRelation: "Bacım",
    defaultMessage:
      "Bacım, 8 Martın mübarək. Sən bahar kimi gəlir, hər yeri canlandırırsan. Sənin gülüşün çiçək açdırır, sevgin isə meşəni yaşıl saxlayır. Həyatımda olduğun üçün hər günüm daha mənalıdır.",
    paperBg: "linear-gradient(160deg,#f0faf2 0%,#f5fff0 50%,#edfaf5 100%)",
    paperBorder: "rgba(100,180,120,0.45)",
    paperText: "#1a4030",
    paperSubtext: "#3a6050",
    paperInputBg: "rgba(255,255,255,0.88)",
    paperInputBorder: "#90d0a8",
    paperInputText: "#1a4030",
    envelopeBack: "linear-gradient(180deg,#c8f0d8,#98d8b0)",
    envelopeFront: "linear-gradient(180deg,#90d0a8,#60a878)",
    envelopeFlap: "linear-gradient(160deg,#b8e8c8,#80c898)",
    envelopeSeal: "linear-gradient(135deg,#2a7050,#50a870,#90d8a0)",
    sealGlyph: "❀",
    heartCore:
      "radial-gradient(circle at 35% 35%,rgba(220,255,235,0.97),rgba(140,220,170,0.97) 42%,rgba(50,140,90,0.99) 80%)",
    heartRingColor: "rgba(80,180,120,0.28)",
    heartGlow: "rgba(50,140,90,0.5)",
    petals: ["🌿", "🍃", "🌱", "❀", "✿", "🌺", "💚", "🌸"],
    petalColor: "rgba(60,160,100,0.7)",
    readBg: "#f0faf2",
    readCardBg: "linear-gradient(160deg,#f8fff5,#e0f8e8)",
    readAccent: "#3a9060",
    readText: "#1a4030",
  },
};

const normalizeAzPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("994")) return digits.slice(0, 12);
  if (digits.startsWith("0")) return `994${digits.slice(1)}`.slice(0, 12);
  return `994${digits}`.slice(0, 12);
};

const formatVisibleAzPhone = (value: string) => {
  if (!value || value.length < 12) return "+994 xx xxx xx xx";
  const local = value.slice(3);
  return `+994 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7, 9)}`;
};

type LetterPayload = {
  recipientName: string;
  relationship: string;
  senderName: string;
  message: string;
  theme: ThemeKey;
  keyId?: number;
  nonceData?: string;
};

type CompactPayload = { k?:number; n?: string; r: string; rel: string; s: string; m: string; t: ThemeKey };

const encodeLetterParam = (payload: LetterPayload): string | null => {
  try {
    const c: CompactPayload = {
      ...(payload.keyId !== undefined && { k: payload.keyId }),
      ...(payload.nonceData !== undefined && { n: payload.nonceData }),
      r: payload.recipientName,
      rel: payload.relationship,
      s: payload.senderName,
      m: payload.message,
      t: payload.theme
    };
    return window.btoa(encodeURIComponent(JSON.stringify(c)));
  }
  catch { return null; }
};

const VALID_THEMES: ThemeKey[] = ["rose", "blue", "dark", "green"];

const decodeLetterParam = (value: string): LetterPayload | null => {
  try {
    const raw = JSON.parse(decodeURIComponent(window.atob(value)));
    let payload: LetterPayload;
    if (raw.m !== undefined) {
      const c = raw as CompactPayload;
      payload = { recipientName: c.r, relationship: c.rel, senderName: c.s, message: c.m, theme: c.t };
    } else {
      payload = raw as LetterPayload;
    }
    // Strict validation
    if (!VALID_THEMES.includes(payload.theme)) return null;
    if (typeof payload.message !== "string" || payload.message.length > 2400) return null;
    if (typeof payload.recipientName !== "string" || payload.recipientName.length > 120) return null;
    if (typeof payload.senderName !== "string" || payload.senderName.length > 120) return null;
    if (typeof payload.relationship !== "string" || payload.relationship.length > 120) return null;
    return payload;
  }
  catch { return null; }
};

// Şübhəli məzmun filtri – AZE üçün genişləndirilmiş
const SUSPICIOUS_PATTERNS = [
  /https?:\/\//i,
  /bit\.ly|tinyurl|t\.me|telegram|discord\.gg/i,
  /şifrə|sifre|password|pin\b|kart\s*no|kart\s*nömrəsi|card\s*num/i,
  /banka|bank|hesab(ın|in)?\s*blok|hesab(ın|in)?\s*don|hesab(ın|in)?\s*bağlan/i,
  /pul\s*köçür|pul\s*göndər|ödəmə\s*et|ödəniş\s*et/i,
  /linkə\s*tıkla|linkə\s*kliklə|linkə\s*bas|aşağıdakı\s*link/i,
];

const isSuspiciousPayload = (payload: LetterPayload): boolean => {
  const text = [payload.keyId, payload.nonceData, payload.message, payload.recipientName, payload.senderName, payload.relationship].join(" ");
  return SUSPICIOUS_PATTERNS.some(re => re.test(text));
};

// ── Field limits ──────────────────────────────────────────────────────────
const LIMITS = { name: 60, relationship: 60, message: 1200 };

// ── Country codes ──────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "994", flag: "🇦🇿", label: "AZ" },
  { code: "90",  flag: "🇹🇷", label: "TR" },
  { code: "7",   flag: "🇷🇺", label: "RU" },
  { code: "380", flag: "🇺🇦", label: "UA" },
  { code: "995", flag: "🇬🇪", label: "GE" },
  { code: "998", flag: "🇺🇿", label: "UZ" },
  { code: "44",  flag: "🇬🇧", label: "GB" },
  { code: "49",  flag: "🇩🇪", label: "DE" },
  { code: "1",   flag: "🇺🇸", label: "US" },
];

// ── Phone sanitize ─────────────────────────────────────────────────────────
const sanitizePhoneInput = (v: string) => v.replace(/[^0-9]/g, "").slice(0, 15);

// ── Captcha math challenge ─────────────────────────────────────────────────
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

// ── Floating Petals ────────────────────────────────────────────────────────
function FloatingPetals({ theme }: { theme: ThemeConfig }) {
  const items = [
    { style: { top: "5%", left: "3%"  }, delay: "0s",    size: "1.6rem" },
    { style: { top: "7%", right: "4%" }, delay: "1.1s",  size: "1.3rem" },
    { style: { top: "25%", left: "2%" }, delay: "0.5s",  size: "1.1rem" },
    { style: { top: "38%", right:"2%"}, delay: "1.8s",  size: "1.4rem" },
    { style: { bottom:"24%",left:"2%"}, delay: "0.9s",  size: "1.2rem" },
    { style: { bottom:"10%",right:"3%"}, delay:"1.5s", size: "1.5rem" },
    { style: { bottom:"18%",left:"8%"}, delay: "0.3s",  size: "1.0rem" },
    { style: { top: "60%", right:"2%"}, delay: "2.1s",  size: "1.3rem" },
  ];
  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className="floating-petal pointer-events-none absolute select-none"
          style={{ ...item.style, fontSize: item.size, animationDelay: item.delay, color: theme.petalColor }}
        >
          {theme.petals[i % theme.petals.length]}
        </span>
      ))}
    </>
  );
}

// ── Theme Pill Buttons ─────────────────────────────────────────────────────
function ThemePills({
  selected,
  onSelect,
  variant = "dark",
}: {
  selected: ThemeKey;
  onSelect: (k: ThemeKey) => void;
  variant?: "dark" | "light";
}) {
  const theme = THEMES[selected];
  const isDark = selected === "dark";
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
        const t = THEMES[key];
        const active = selected === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className="rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300"
            style={
              active
                ? {
                    background: theme.envelopeSeal,
                    borderColor: "transparent",
                    color: isDark ? "#1a1020" : "white",
                    boxShadow: `0 8px 24px ${theme.heartGlow}`,
                    transform: "scale(1.08)",
                  }
                : variant === "dark"
                ? {
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.65)",
                  }
                : {
                    background: "transparent",
                    borderColor: theme.paperBorder,
                    color: theme.paperSubtext,
                  }
            }
          >
            {t.emoji} {t.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Heart Button ───────────────────────────────────────────────────────────
function HeartButton({ theme, stage, onClick }: { theme: ThemeConfig; stage: SceneStage; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Ürəyə toxun"
      className={`heart-scene mx-auto block${stage === "opening" ? " heart-scene--opening" : ""}`}
    >
      <span className="heart-ring" style={{ borderColor: theme.heartRingColor }} />
      <span className="heart-ring heart-ring--two" style={{ borderColor: theme.heartRingColor }} />
      <span
        className="heart-core"
        style={{
          background: `${theme.heartCore}, linear-gradient(135deg,rgba(255,255,255,0.4),transparent 60%)`,
          boxShadow: `0 28px 80px ${theme.heartGlow}, inset 0 1px 0 rgba(255,255,255,0.45)`,
        }}
      >
        <span className="heart-core__content">
          <span className="heart-mark">♡</span>
          <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.44em] text-white/90">
            {stage === "opening" ? "açılır..." : "toxun"}
          </span>
        </span>
      </span>
    </button>
  );
}

// ── Closing Envelope ───────────────────────────────────────────────────────
function ClosingEnvelope({ theme, excerpt }: { theme: ThemeConfig; excerpt: string }) {
  const isDark = theme.id === "dark";
  return (
    <div className="closing-envelope">
      <div className="closing-envelope__back" style={{ background: theme.envelopeBack }} />
      <div
        className="closing-envelope__paper"
        style={{
          background: isDark
            ? "linear-gradient(180deg,#22182e,#1a1028)"
            : "linear-gradient(180deg,#fffdfa,#fff4f8)",
          color: isDark ? "#f0d890" : "#643251",
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.36em] opacity-60">8 Mart məktubu</p>
        <p className="mt-3 text-xs leading-6 opacity-80">{excerpt}</p>
      </div>
      <div className="closing-envelope__front" style={{ background: theme.envelopeFront }} />
      <div className="closing-envelope__flap" style={{ background: theme.envelopeFlap }} />
      <div
        className="closing-envelope__seal"
        style={{
          background: theme.envelopeSeal,
          color: isDark ? "#1a1020" : "white",
        }}
      >
        {theme.sealGlyph}
      </div>
    </div>
  );
}

// ── Read Letter Screen ─────────────────────────────────────────────────────
function ReadLetterScreen({ payload, onCreateNew }: { payload: LetterPayload; onCreateNew: () => void }) {
  const [reportSent, setReportSent] = useState(false);
  const theme = THEMES[payload.theme] ?? THEMES.rose;
  const isDark = theme.id === "dark";

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: theme.readBg, color: theme.readText }}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl opacity-50" style={{ background: theme.heartGlow }} />
        <div className="absolute -right-16 top-1/4 h-72 w-72 rounded-full blur-3xl opacity-35" style={{ background: theme.heartGlow }} />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full blur-3xl opacity-25" style={{ background: theme.heartGlow }} />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="mb-6 text-center">
            <span className="text-5xl">{THEMES[payload.theme]?.emoji ?? "🌸"}</span>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.45em] opacity-55">
              sənin üçün xüsusi bir məktub
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-[2.6rem] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.18)] sm:p-10"
            style={{ background: theme.readCardBg, border: `1.5px solid ${theme.paperBorder}` }}
          >
            <FloatingPetals theme={theme} />
            <div
              className="pointer-events-none absolute inset-4 rounded-[2rem]"
              style={{ border: `1.5px dashed ${theme.paperBorder}`, opacity: 0.5 }}
            />

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: theme.readAccent }}>
                8 Mart Məktubu — {theme.label} {theme.emoji}
              </p>
              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl" style={{ color: theme.paperText }}>
                Sevgili{" "}
                <span style={{ color: theme.readAccent }}>{payload.recipientName || "Dəyərli insan"}</span>,
              </h1>
              <p className="mt-2 text-sm opacity-65" style={{ color: theme.paperSubtext }}>
                {payload.relationship} • {theme.tagline}
              </p>

              <div
                className="mt-6 rounded-[1.8rem] p-6 text-[15px] leading-9"
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
                  border: `1px solid ${theme.paperBorder}`,
                  color: theme.paperText,
                  whiteSpace: "pre-line",
                }}
              >
                {payload.message || "Burada məktub mətni görünəcək."}
              </div>

              <div className="mt-6 text-right">
                <p className="text-sm opacity-55" style={{ color: theme.paperSubtext }}>Sevgi ilə,</p>
                <p className="mt-1 text-2xl font-black italic" style={{ color: theme.readAccent }}>
                  {payload.senderName || "Səni sevən biri"}
                </p>
              </div>

              <div
                className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                style={{ borderColor: theme.paperBorder }}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-xs opacity-55" style={{ color: theme.paperSubtext }}>
                    Bu məktubu sənə xüsusi biri göndərdi 🌸
                  </p>
                  <p className="text-[10px] opacity-60" style={{ color: theme.paperSubtext }}>
                    Qeyd: Bu işarə linkin texniki olaraq düzgün qurulduğunu göstərir; məktubun məzmunu moderasiya edilmir.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onCreateNew}
                  className="rounded-full px-5 py-2.5 text-sm font-black shadow-lg transition hover:scale-105"
                  style={{
                    background: theme.envelopeSeal,
                    color: isDark ? "#1a1020" : "white",
                  }}
                >
                  Öz məktubunu yarat {theme.emoji}
                </button>

                {/* Verified badge */}
                <div className="flex items-center justify-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5 text-[11px] font-semibold text-green-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Bu məktub doğrulandı
                </div>

                {/* Report button */}
                {!reportSent ? (
                  <button
                    type="button"
                    onClick={() => setReportSent(true)}
                    className="text-[11px] transition hover:text-red-400"
                    style={{ color: "rgba(0,0,0,0.4)" }}
                  >
                    Uyğunsuz məzmun / Şikayət et
                  </button>
                ) : (
                  <p className="text-[11px] text-green-500/80">✓ Şikayət qeydə alındı, təşəkkür edirik</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div
        className="pointer-events-none fixed bottom-4 right-4 z-50 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.36em] backdrop-blur-xl"
        style={{
          background: isDark ? "rgba(30,20,40,0.8)" : "rgba(255,255,255,0.75)",
          border: `1px solid ${theme.paperBorder}`,
          color: theme.readAccent,
        }}
      >
        made by rawonzexe
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export function App() {
  const [mode, setMode] = useState<"compose" | "read">("compose");
  const [readPayload, setReadPayload] = useState<LetterPayload | null>(null);
  const [suspiciousRead, setSuspiciousRead] = useState(false);
  const [sceneStage, setSceneStage] = useState<SceneStage>("heart");
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("rose");
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [senderName, setSenderName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(THEMES.rose.defaultMessage);
  const [shareUrl, setShareUrl] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const [phoneError, setPhoneError] = useState(false);
  const [countryCode, setCountryCode] = useState("994");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [rateLimitHit, setRateLimitHit] = useState(false);
  const [sendCount, setSendCount] = useState(0);
  const [lastSendTime, setLastSendTime] = useState(0);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const openTimerRef = useRef<number | null>(null);
  const stageTimerRef = useRef<number | null>(null);

  const theme = THEMES[selectedTheme];
  const isDark = selectedTheme === "dark";

    // HMAC signature oluştur
  async function generateSignature(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const secret = 'your-secret-key';
    const keyBuffer = encoder.encode(secret);
    
    const key = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', key, dataBuffer);
    
    // Hex string'e çevir
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Signature doğrula
  async function verifySignature(data: string, signature: string): Promise<boolean> {
    const generated = await generateSignature(data);
    return generated === signature;
  }

  useEffect(() => () => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    if (stageTimerRef.current) window.clearTimeout(stageTimerRef.current);
  }, []);

  // Detect read mode from URL
  // Detect read mode from URL
  // Detect read mode from URL
  // Detect read mode from URL
  useEffect(() => {
    // ── ESKİ FORMAT (searchParams) ──────────────────
    const params = new URLSearchParams(window.location.search);
    const oldLetter = params.get('l');
    
    if (oldLetter) {
      try {
        const decoded = decodeLetterParam(oldLetter);
        if (!decoded) {
          setSuspiciousRead(true);
          setMode("read");
          return;
        }
        
        if (isSuspiciousPayload(decoded)) {
          setSuspiciousRead(true);
          setMode("read");
          return;
        }
        
        setReadPayload(decoded);
        setMode("read");
      } catch (err) {
        console.error('Eski format hata:', err);
        setSuspiciousRead(true);
        setMode("read");
      }
      return; // ← ÖNEMLİ!
    }

    // ── YENİ FORMAT (hash-based) ──────────────────────────
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith('/letter/')) return;

    const parts = hash.split('/');
    if (!parts[2] || !parts[3] || !parts[4] || !parts[5]) return;

    const keyId = parts[2];
    const nonceData = parts[3];
    const encoded = parts[4];
    const signature = parts[5];

    (async () => {
      try {
        const { data, error } = await supabase
          .from('Databasem')
          .select('signature, message, theme')
          .eq('key_id', keyId)
          .eq('nonce', nonceData)
          .single();

        if (error || !data) {
          setSuspiciousRead(true);
          setMode("read");
          return;
        }

        const signatureData = `${keyId}:${nonceData}:${encoded}`;
        const isValid = await verifySignature(signatureData, signature);
        
        if (!isValid || data.signature !== signature) {
          setSuspiciousRead(true);
          setMode("read");
          return;
        }

        const decoded = decodeLetterParam(encoded);
        if (!decoded) return;

        if (isSuspiciousPayload(decoded)) {
          setSuspiciousRead(true);
          setMode("read");
          return;
        }

        setReadPayload(decoded);
        setMode("read");
      } catch (err) {
        console.error('URL doğrulama hatası:', err);
        setSuspiciousRead(true);
        setMode("read");
      }
    })();
  }, []);

  const normalizedPhone = useMemo(() => { const digits = phone.replace(/[^0-9]/g, ''); return countryCode + digits; }, [phone, countryCode]);
  const isPhoneValid = normalizedPhone.length >= (countryCode.length + 6) && normalizedPhone.length <= (countryCode.length + 12);

  // Phone is optional — but if filled in, must be valid
  const phoneOk = !phone || isPhoneValid;

  const canSend =
    Boolean(message.trim()) &&
    Boolean((recipientName.trim() || "x")) &&
    Boolean((senderName.trim() || "x")) &&
    phoneOk;

  const liveExcerpt = useMemo(() => {
    const t = message.trim();
    if (!t) return "Məktubun mətni burada görünəcək.";
    return t.length > 160 ? `${t.slice(0, 160)}…` : t;
  }, [message]);
  
  function rastgeleSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function generateNonce() {
    const arr = new Uint8Array(12);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  const generateShareUrl = async (): Promise<string> => {
    const keyId = rastgeleSayi(1000000000, 9999999999);
    const nonceData = generateNonce();

    const payload: LetterPayload = {
      recipientName: recipientName.trim() || "Mənim ən dəyərli insanım",
      relationship: relationship.trim() || theme.defaultRelation,
      senderName: senderName.trim() || "Səni sevən biri",
      message: message.trim(),
      theme: selectedTheme,
      keyId: parseInt(keyId),
      nonceData: nonceData
    };

    const encoded = encodeLetterParam(payload);
    if (!encoded) return window.location.origin + window.location.pathname;
    
    const signatureData = `${keyId}:${nonceData}:${encoded}`;
    const signature = await generateSignature(signatureData);
    
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#/letter/${keyId}/${nonceData}/${encoded}/${signature}`;
  };

  const getWhatsappHref = (url: string): string => {
    const text = `8 Mart mübarək!\n\nSənin üçün xüsusi bir məktub var, açıb baxa bilərsən:\n${url}`;
    return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`;
  };

  const applyTheme = (key: ThemeKey) => {
    setSelectedTheme(key);
    setMessage(THEMES[key].defaultMessage);
    setRelationship("");
  };

  const openLetter = () => {
    if (sceneStage !== "heart") return;
    setSceneStage("opening");
    openTimerRef.current = window.setTimeout(() => setSceneStage("letter"), 820);
  };

  const handleSend = () => {
    if (!canSend) return;
    if (phone && !isPhoneValid) {
      setPhoneError(true);
      window.setTimeout(() => setPhoneError(false), 4000);
      return;
    }
    setPhoneError(false);
    // Rate limit: max 5 per minute
    const now = Date.now();
    if (now - lastSendTime < 60000 && sendCount >= 5) {
      setRateLimitHit(true);
      window.setTimeout(() => setRateLimitHit(false), 10000);
      return;
    }
    // Show captcha on first send or every 5 sends
    if (sendCount % 5 === 0) {
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setCaptchaError(false);
      setShowCaptcha(true);
      return;
    }
    _doSend();
  };

  const _doSend = async () => {
    setShowCaptcha(false);
    setSendCount(c => c + 1);
    setLastSendTime(Date.now());
    
    const keyId = rastgeleSayi(1000000000, 9999999999).toString();
    const nonceData = generateNonce();

    const payload: LetterPayload = {
      recipientName: recipientName.trim() || "Mənim ən dəyərli insanım",
      relationship: relationship.trim() || theme.defaultRelation,
      senderName: senderName.trim() || "Səni sevən biri",
      message: message.trim(),
      theme: selectedTheme,
    };

    const encoded = encodeLetterParam(payload);
    if (!encoded) return;
    
    const signatureData = `${keyId}:${nonceData}:${encoded}`;
    const signature = await generateSignature(signatureData);

    // ✅ Supabase'e kaydet
    try {
      const { error } = await supabase
        .from('Databasem')
        .insert([
          { 
            key_id: keyId,
            nonce: nonceData,
            receiver: recipientName.trim() || "Dəyərli insan", 
            relationship: relationship.trim() || theme.defaultRelation,
            sender: senderName.trim() || "Səni sevən biri",
            message: message.trim(),
            theme: selectedTheme,
            signature: signature,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Veritabanına kaydedilirken hata:', error.message);
        return;
      }
    } catch (err) {
      console.error('Beklenmedik hata:', err);
      return;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}#/letter/${keyId}/${nonceData}/${encoded}/${signature}`;
    setShareUrl(shareUrl);

    setCopyState("idle");
    setSceneStage("closing");
    stageTimerRef.current = window.setTimeout(() => setSceneStage("result"), 1900);
  };

  const handleCaptchaSubmit = () => {
    if (captchaInput.trim() !== captcha.answer) {
      setCaptchaError(true);
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    _doSend();
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2400);
    } catch {
      setCopyState("error");
    }
  };

  const handleOpenWhatsApp = () => {
    if (!canSend || !shareUrl || !isPhoneValid) return;
    window.open(getWhatsappHref(shareUrl), "_blank");
  };

  const handleStartOver = () => {
    setMode("compose");
    setSceneStage("heart");
    setSuspiciousRead(false);
    setReadPayload(null);
    window.location.hash = '';
    const url = new URL(window.location.href);
    url.searchParams.delete("letter");
    url.searchParams.delete("l");
    window.history.replaceState({}, "", url.toString());
  };

  // ── Captcha modal (rendered at top level, not inside card) ───────────────
  const captchaModal = showCaptcha && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-[2rem] border border-white/15 bg-[#0e0817] p-8 shadow-2xl text-white">
        <h3 className="text-lg font-black text-center">Doğrulama</h3>
        <p className="mt-2 text-sm text-center text-white/60">
          Zəhmət olmasa aşağıdakı sualı cavablandır:
        </p>
        <p className="mt-5 text-center text-2xl font-black" style={{ color: theme.readAccent }}>
          {captcha.question}
        </p>
        <input
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value.replace(/[^0-9]/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && handleCaptchaSubmit()}
          placeholder="Cavabı yaz"
          className="mt-4 w-full rounded-[1.2rem] border bg-white/5 px-4 py-3 text-center text-sm outline-none transition"
          style={{ borderColor: captchaError ? "#f87171" : "rgba(255,255,255,0.15)", color: "#fff" }}
        />
        {captchaError && (
          <p className="mt-2 text-center text-xs text-red-400">Yanlış cavab. Yenidən cəhd et.</p>
        )}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => setShowCaptcha(false)}
            className="flex-1 rounded-full border border-white/15 py-2.5 text-sm text-white/60 transition hover:bg-white/5"
          >
            Ləğv et
          </button>
          <button
            type="button"
            onClick={handleCaptchaSubmit}
            className="flex-1 rounded-full py-2.5 text-sm font-black transition hover:scale-105"
            style={{ background: theme.envelopeSeal, color: isDark ? "#1a1020" : "white" }}
          >
            Təsdiqlə
          </button>
        </div>
      </div>
    </div>
  );

  // ── Read mode ──────────────────────────────────────────────────────────
  if (mode === "read" && suspiciousRead) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08040c] px-6">
        <div className="w-full max-w-sm rounded-[2rem] border border-red-500/30 bg-red-950/40 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
            ⚠️
          </div>
          <h2 className="text-xl font-black text-red-300">Şübhəli məktub</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Bu linklə açılan məktubda şübhəli məzmun aşkar olundu və təhlükəsizlik üçün göstərilmədi. Əgər bu linki tanımadığın bir şəxsdən və ya qəribə bir hesabdan almısansa, bu məktuba etibar etmə və linki heç yerdə paylaşma.
          </p>
          <p className="mt-3 text-xs leading-5 text-white/45">
            Bu sayt bank, ödəniş və ya rəsmi təsdiq üçün istifadə edilməməlidir. Kimsə səndən bu məktub vasitəsilə pul, kart məlumatı, şifrə və ya hər hansı gizli məlumat istəyərsə, bu, çox güman ki, fırıldaqçılıq cəhdidir.
          </p>
          <button
            onClick={handleStartOver}
            className="mt-6 rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/15"
          >
            Ana səhifəyə qayıt
          </button>
        </div>
      </div>
    );
  }

  if (mode === "read" && readPayload) {
    return <ReadLetterScreen payload={readPayload} onCreateNew={handleStartOver} />;
  }

  // ── Compose mode ───────────────────────────────────────────────────────
  const showLetter = sceneStage === "letter" || sceneStage === "closing" || sceneStage === "result";
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08040c] text-white">
      {captchaModal}
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-32 -top-16 h-[32rem] w-[32rem] rounded-full blur-[120px] opacity-25 transition-all duration-1000"
          style={{ background: theme.heartGlow }}
        />
        <div
          className="absolute -right-16 top-1/4 h-96 w-96 rounded-full blur-[90px] opacity-18 transition-all duration-1000"
          style={{ background: theme.heartGlow }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full blur-[100px] opacity-15 transition-all duration-1000"
          style={{ background: theme.heartGlow }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl">

          {/* ── HEART STAGE ──────────────────────────────────── */}
          {!showLetter && (
            <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 text-center shadow-[0_48px_160px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-12">
              <FloatingPetals theme={theme} />

              <div className="relative z-10 mx-auto max-w-lg">
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  <ThemePills selected={selectedTheme} onSelect={applyTheme} variant="dark" />
                </div>

                <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Qəlbindən keçənləri{" "}
                  <span style={{ color: theme.readAccent }}>
                    məktuba çevir.
                  </span>
                </h1>
                <p className="mt-4 text-base leading-8 text-white/60">
                  Ürəyə toxun, məktubunu yaz, sevdiyinə göndər.
                </p>
              </div>

              <HeartButton theme={theme} stage={sceneStage} onClick={openLetter} />

              <p className="relative z-10 mx-auto mt-8 max-w-sm text-sm leading-7 text-white/35">
                Tema seç → ürəyə toxun → məktubunu yaz → nömrəni daxil et → göndər 🌸
              </p>

              {/* Yalnız yazan üçün şəxsi qeyd */}
              <p className="relative z-10 mx-auto mt-4 max-w-sm text-[11px] leading-6 text-white/45">
                🥲 Unutma — sevdiklərinin sənin onları sevdiyini göstər, sonra göstərə bilməyən də ola bilərsən.
              </p>
            </div>
          )}

          {/* ── LETTER STAGE ─────────────────────────────────── */}
          {showLetter && (
            <div
              className="relative overflow-hidden rounded-[2.8rem] shadow-[0_48px_160px_rgba(0,0,0,0.55)] letter-appear"
              style={{ background: theme.paperBg, border: `1.5px solid ${theme.paperBorder}` }}
            >
              {/* Decorative layer */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.8rem]">
                <FloatingPetals theme={theme} />
                <div
                  className="absolute inset-5 rounded-[2.2rem]"
                  style={{ border: `1.5px dashed ${theme.paperBorder}`, opacity: 0.4 }}
                />
                {/* Lined paper effect */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(transparent calc(100% - 1px), ${theme.paperBorder} 1px)`,
                    backgroundSize: "100% 2.6rem",
                  }}
                />
              </div>

              <div className="relative z-10 p-6 sm:p-10">
                {/* Header */}
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.42em] opacity-60"
                      style={{ color: theme.paperSubtext }}
                    >
                      8 Mart Məktubu
                    </p>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl" style={{ color: theme.paperText }}>
                      {theme.emoji} {theme.label}
                    </h2>
                  </div>
                  {/* Compact theme switcher */}
                  <div className="flex gap-2">
                    {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyTheme(key)}
                        title={THEMES[key].label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border text-base transition-all duration-300"
                        style={
                          selectedTheme === key
                            ? {
                                background: theme.envelopeSeal,
                                borderColor: "transparent",
                                boxShadow: `0 6px 16px ${theme.heartGlow}`,
                                transform: "scale(1.15)",
                              }
                            : {
                                background: "transparent",
                                borderColor: theme.paperBorder,
                              }
                        }
                      >
                        {THEMES[key].emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kimə + Yaxınlıq */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold" style={{ color: theme.paperSubtext }}>
                      Kimə 💌
                    </span>
                    <input
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value.slice(0, LIMITS.name))}
                      placeholder="Məsələn: mənim mələyim"
                      maxLength={LIMITS.name}
                      className="w-full rounded-[1.2rem] px-4 py-3 text-sm outline-none transition"
                      style={{
                        background: theme.paperInputBg,
                        border: `1.5px solid ${theme.paperInputBorder}`,
                        color: theme.paperInputText,
                      }}
                    />
                    <p className="text-right text-[10px]" style={{ color: theme.paperSubtext + "88" }}>{recipientName.length}/{LIMITS.name}</p>
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold" style={{ color: theme.paperSubtext }}>
                      Yaxınlıq 🤍
                    </span>
                    <input
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value.slice(0, LIMITS.relationship))}
                      placeholder={theme.defaultRelation}
                      maxLength={LIMITS.relationship}
                      className="w-full rounded-[1.2rem] px-4 py-3 text-sm outline-none transition"
                      style={{
                        background: theme.paperInputBg,
                        border: `1.5px solid ${theme.paperInputBorder}`,
                        color: theme.paperInputText,
                      }}
                    />
                    <p className="text-right text-[10px]" style={{ color: theme.paperSubtext + "88" }}>{relationship.length}/{LIMITS.relationship}</p>
                  </label>
                </div>

                {/* Message */}
                <label className="mt-4 block space-y-1.5">
                  <span className="text-sm font-semibold" style={{ color: theme.paperSubtext }}>
                    Məktubun mətni ✍️
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, LIMITS.message))}
                    rows={9}
                    maxLength={LIMITS.message}
                    placeholder="Qəlbindən keçən sözləri buraya yaz..."
                    className="w-full resize-none rounded-[1.6rem] px-4 py-4 text-sm leading-8 outline-none transition"
                    style={{
                      background: theme.paperInputBg,
                      border: `1.5px solid ${message.length > LIMITS.message - 100 ? "#f87171" : theme.paperInputBorder}`,
                      color: theme.paperInputText,
                    }}
                  />
                  <p className="text-right text-[10px]" style={{ color: message.length > LIMITS.message - 100 ? "#f87171" : theme.paperSubtext + "88" }}>{message.length}/{LIMITS.message}</p>
                </label>

                {/* Sender + Phone */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold" style={{ color: theme.paperSubtext }}>
                      Göndərən adı ✒️
                    </span>
                    <input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value.slice(0, LIMITS.name))}
                      placeholder="Adını yaz"
                      maxLength={LIMITS.name}
                      className="w-full rounded-[1.2rem] px-4 py-3 text-sm outline-none transition"
                      style={{
                        background: theme.paperInputBg,
                        border: `1.5px solid ${theme.paperInputBorder}`,
                        color: theme.paperInputText,
                      }}
                    />
                  </label>
                  <div className="block space-y-1.5">
                    <span className="text-sm font-semibold" style={{ color: theme.paperSubtext }}>
                      Nömrə 📱
                    </span>
                    <div className="flex gap-2">
                      {/* Country picker */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryPicker(v => !v)}
                          className="flex h-full items-center gap-1.5 rounded-[1.2rem] px-3 py-3 text-sm font-semibold transition"
                          style={{ background: theme.paperInputBg, border: `1.5px solid ${theme.paperInputBorder}`, color: theme.paperInputText }}
                        >
                          <span>{COUNTRY_CODES.find(c => c.code === countryCode)?.flag}</span>
                          <span>+{countryCode}</span>
                        </button>
                        {showCountryPicker && (
                          <div
                            className="absolute z-20 mt-2 w-40 rounded-2xl border bg-white/95 p-1 text-sm shadow-xl backdrop-blur-md"
                            style={{ borderColor: theme.paperBorder, color: "#111827" }}
                          >
                            {COUNTRY_CODES.map(c => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setCountryCode(c.code);
                                  setShowCountryPicker(false);
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-left hover:bg-gray-100"
                              >
                                <span>{c.flag} {c.label}</span>
                                <span className="text-xs text-gray-500">+{c.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          value={phone}
                          onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                          placeholder="XX XXX XX XX"
                          className="w-full rounded-[1.2rem] px-4 py-3 text-sm outline-none transition"
                          style={{
                            background: theme.paperInputBg,
                            border: `1.5px solid ${!phone ? theme.paperInputBorder : isPhoneValid ? "#4ade80" : "#f87171"}`,
                            color: theme.paperInputText,
                            boxShadow: phone && !isPhoneValid ? "0 0 0 3px rgba(248,113,113,0.18)" : phone && isPhoneValid ? "0 0 0 3px rgba(74,222,128,0.15)" : "none",
                          }}
                        />
                        <p className="mt-1 text-[10px] font-medium" style={{ color: !phone ? theme.paperSubtext + "88" : isPhoneValid ? "#4ade80" : "#f87171" }}>
                          {!phone
                            ? "Nömrəni daxil et"
                            : isPhoneValid
                            ? "✓ " + formatVisibleAzPhone(normalizedPhone)
                            : "✗ Yanlış nömrə formatı — " + formatVisibleAzPhone(normalizedPhone)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone error banner — show if typing invalid OR tried to submit */}
                {((phone && !isPhoneValid) || phoneError) && (
                  <div
                    className="mt-3 flex items-start gap-3 rounded-2xl px-4 py-3.5 text-sm"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg,rgba(251,191,36,0.12),rgba(245,158,11,0.07))"
                        : "linear-gradient(135deg,rgba(251,191,36,0.18),rgba(245,158,11,0.1))",
                      border: "1.5px solid rgba(251,191,36,0.35)",
                      color: isDark ? "#fde68a" : "#92400e",
                    }}
                  >
                    <span className="mt-0.5 text-lg leading-none">⚠️</span>
                    <div>
                      <p className="font-semibold">Nömrə formatı yanlışdır</p>
                      <p className="mt-0.5 text-xs opacity-80">
                        Düzgün format: <span className="font-mono font-bold">050 123 45 67</span> və ya <span className="font-mono font-bold">+994 50 123 45 67</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Info note about privacy (footer inside card) */}
                <div className="mt-6 rounded-2xl bg-white/40 p-4 text-[11px] leading-5 text-gray-700">
                  <p className="font-semibold mb-1">Bu sayt haqqında</p>
                  <p>
                    Bu sayt 8 Mart üçün şəxsi, emosional məktublar yaratmaq üçündür. Məktubun məzmunu heç bir serverdə saxlanılmır — bütün məlumatlar yalnız sənin brauzerində və yaratdığın linkin içində olur. Linki alan hər kəs məktubu oxuya bilər, ona görə də parol, kart nömrəsi kimi həssas məlumatlar yazmağını tövsiyə etmirik.
                  </p>
                  <p className="mt-2">
                    Bu platforma heç bir bank, ödəniş xidməti və ya rəsmi qurumla əlaqəli deyil. Buradakı məktublar sadəcə sevgi, minnətdarlıq və xoş sözlər üçündür.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2 text-left text-xs text-white/50">
                    <p>
                      Məktubunu hazırladıqdan sonra aşağıdakı düymə ilə zarf bağlanacaq və sənə paylaşmaq üçün xüsusi link veriləcək.
                    </p>
                    {rateLimitHit && (
                      <p className="text-red-300">
                        Çox tez-tez məktub göndərməyə çalışırsan. Bir az sonra yenidən cəhd et.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!canSend}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black shadow-xl transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: theme.envelopeSeal, color: isDark ? "#1a1020" : "white" }}
                  >
                    Məktubu hazırla
                  </button>
                </div>
              </div>

              {/* Closing / Result overlay — fixed so it covers entire screen */}
              {sceneStage === "closing" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <ClosingEnvelope theme={theme} excerpt={liveExcerpt} />
                </div>
              )}

              {sceneStage === "result" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-sm px-4 py-8">
                  <div className="w-full max-w-xl rounded-[2rem] bg-[#050309]/98 p-6 text-sm text-white shadow-2xl sm:p-8">
                    <h3 className="text-lg font-black">
                      Məktubun hazırdır ✨
                    </h3>
                    <p className="mt-2 text-xs text-white/65">
                      Seç: məktubu link kimi paylaş və ya birbaşa WhatsApp ilə göndər.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="flex flex-col items-start rounded-2xl border border-white/15 bg-white/5 p-4 text-left transition hover:bg-white/10"
                      >
                        <span className="text-xs font-semibold text-white/70">Link kimi paylaş</span>
                        <span className="mt-1 line-clamp-2 break-all text-[11px] text-white/60">
                          {shareUrl || "Link burada görünəcək"}
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px]">
                          {copyState === "copied"
                            ? "Kopyalandı ✓"
                            : copyState === "error"
                            ? "Kopyalama alınmadı"
                            : "Linki kopyala"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenWhatsApp}
                        disabled={!shareUrl || !isPhoneValid}
                        className="flex flex-col items-start rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-left transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <span className="text-xs font-semibold text-emerald-300">WhatsApp ilə göndər</span>
                        <span className="mt-1 text-[11px] text-emerald-100/80">
                          {isPhoneValid
                            ? 'Mesajında qısa "8 Mart mübarək!" notu və məktubun linki hazır olacaq.'
                            : "⚠️ Zəhmət olmasa əvvəlcə düzgün nömrə daxil et."}
                        </span>
                      </button>
                    </div>

                    {/* BuyMeACoffee box (AZE mətni ilə) */}
                    <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs text-amber-50">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                            DƏSTƏK ET
                          </p>
                          <p className="mt-1 text-[13px] font-semibold">
                            Bu layihəni bəyəndinsə, mənə bir qəhvə ısmarla ☕
                          </p>
                          <p className="mt-1 text-[11px] text-amber-100/80">
                            Hər dəstəyin daha gözəl, daha yaradıcı layihələr üçün motivasiyadır.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => window.open("https://buymeacoffee.com/rawonzexe", "_blank")}
                          className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-bold text-[#1a1207] shadow-lg transition hover:scale-105"
                        >
                          Buy me a coffee
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSceneStage("letter");
                        setShareUrl("");
                        setCopyState("idle");
                      }}
                      className="mt-4 text-[11px] text-white/50 underline-offset-4 hover:underline"
                    >
                      Məktubun üzərində yenə düzəliş etmək istəyirəm
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;


//////DATABASE SUPA/////
import { supabase } from "./supabaseClient";  
