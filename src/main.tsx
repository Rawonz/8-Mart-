import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

// ── Sağ klik qadağası ─────────────────────────────────────────────────────
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showDevToolsWarning();
});

// ── DevTools klaviatura qısayolları ──────────────────────────────────────
document.addEventListener("keydown", (e) => {
  // F12
  if (e.key === "F12") {
    e.preventDefault();
    showDevToolsWarning();
  }
  // Ctrl+Shift+I / Cmd+Option+I
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
    e.preventDefault();
    showDevToolsWarning();
  }
  // Ctrl+Shift+J
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
    e.preventDefault();
    showDevToolsWarning();
  }
  // Ctrl+U (mənbə kodu)
  if ((e.ctrlKey || e.metaKey) && e.key === "u") {
    e.preventDefault();
    showDevToolsWarning();
  }
});

// ── Xəbərdarlıq funksiyası ────────────────────────────────────────────────
function showDevToolsWarning() {
  // Artıq var ise yenidən yaratma
  if (document.getElementById("devtools-warning")) return;

  const overlay = document.createElement("div");
  overlay.id = "devtools-warning";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(8,4,12,0.92);
    backdrop-filter: blur(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
  `;
  overlay.innerHTML = `
    <div style="
      max-width: 380px;
      width: 90%;
      background: rgba(255,255,255,0.04);
      border: 1.5px solid rgba(255,255,255,0.12);
      border-radius: 2rem;
      padding: 2.5rem;
      text-align: center;
      color: white;
    ">
      <div style="font-size: 2.8rem; margin-bottom: 1rem;">🔒</div>
      <h2 style="font-size: 1.2rem; font-weight: 900; margin-bottom: 0.75rem;">
        Saytın mühafizəsi
      </h2>
      <p style="font-size: 0.8rem; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 1.5rem;">
        Bu saytın kod strukturuna müdaxilə edilməsi qadağandır. Bundan sonrasına müəllif qarışmır — saytı olduğu kimi istifadə et. 🌸
      </p>
      <button
        onclick="document.getElementById('devtools-warning').remove()"
        style="
          background: linear-gradient(135deg,#9f315f,#d46b98,#ffb0c8);
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 0.65rem 1.8rem;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
        "
      >
        Bağla
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
