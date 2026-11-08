"use client";

import { Barlow_Condensed, Syne } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/styles/hero-scene.module.css";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: "900", variable: "--font-standy" });
const syne = Syne({ subsets: ["latin"], weight: "800", variable: "--font-fregie" });

type Rect = { x: number; y: number; w: number; h: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: mix(a.x, b.x, t),
  y: mix(a.y, b.y, t),
  w: mix(a.w, b.w, t),
  h: mix(a.h, b.h, t),
});

// per card: how far it drifts (parallax depth), its tilt while scattered,
// and the skyline it cuts into the monolith (top/bottom as a share of height)
const DEPTH = [0.35, 1, 0.6, 0.85, 0.45];
const TILT = [-4, 3, -2.5, 5, -3];
const SKY_TOP = [0.12, 0, 0.2, 0.06, 0.16];
const SKY_BOT = [0.94, 1, 0.84, 0.97, 0.9];
const NOTCH = [
  [0.1, 0, 0.04, 0.12],
  [0, 0.14, 0.1, 0],
  [0.06, 0.16, 0, 0.08],
  [0.14, 0.02, 0.12, 0.04],
  [0.04, 0.12, 0.08, 0],
];
// narrow screens: scattered positions, then a 3-over-2 grid
const NARROW_SCATTER = [
  [0.04, 0.05],
  [0.53, 0.1],
  [0.04, 0.36],
  [0.53, 0.41],
  [0.285, 0.67],
];
const WIDE_Y = [0.18, 0.32, 0.1, 0.28, 0.2];
const WORD_FROM = [
  [-0.4, -0.3],
  [0.35, 0.25],
  [-0.25, 0.4],
  [0.45, -0.2],
];

function layout(i: number, n: number, W: number, H: number) {
  const narrow = W < 760;
  const k = i % 5;
  const mw = narrow ? W * 0.88 : Math.min(W * 0.66, H * 1.15);
  const mh = H * (narrow ? 0.48 : 0.6);
  const mx = (W - mw) / 2;
  const my = (H - mh) / 2;
  const monolith: Rect = {
    x: mx + (i * mw) / n,
    y: my + SKY_TOP[k] * mh,
    w: mw / n + 1,
    h: (SKY_BOT[k] - SKY_TOP[k]) * mh,
  };

  let scattered: Rect;
  let full: Rect;
  if (narrow) {
    const [sx, sy] = NARROW_SCATTER[k];
    scattered = { x: W * sx, y: H * sy, w: W * 0.43, h: H * 0.25 };
    const top = Math.ceil(n / 2);
    const row = i < top ? 0 : 1;
    const cols = row === 0 ? top : n - top;
    const col = row === 0 ? i : i - top;
    full = { x: (col * W) / cols, y: row * (H / 2), w: W / cols + 1, h: H / 2 + 1 };
  } else {
    const w = W * 0.17;
    scattered = {
      x: W * 0.05 + (i * (W * 0.9 - w)) / Math.max(1, n - 1),
      y: H * WIDE_Y[k],
      w,
      h: H * 0.5,
    };
    full = { x: (i * W) / n, y: 0, w: W / n + 1, h: H };
  }
  return { monolith, scattered, full };
}

export function HeroScene({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  const items = hero.portfolio.items;
  const words = hero.closing.split(" ");

  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineARef = useRef<HTMLDivElement>(null);
  const lineBRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;
    const cards = hero.portfolio.items;
    const closingWords = hero.closing.split(" ");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) scene.dataset.static = "true";

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    let phase = -1;
    let raf = 0;
    let running = false;

    const frame = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const box = scene.getBoundingClientRect();
      const travel = Math.max(1, box.height - H);
      const p = reduced ? 1 : clamp(-box.top / travel);

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      const mx = pointer.x;
      const my = pointer.y;

      const apart = ease(range(p, 0.02, 0.28));
      const split = ease(range(p, 0.06, 0.4));
      const merge = ease(range(p, 0.52, 0.82));
      const drift = 0.5 - range(p, 0.12, 0.66);
      const loose = split * (1 - merge);

      cards.forEach((_, i) => {
        const card = cardRefs.current[i];
        const media = mediaRefs.current[i];
        const cap = capRefs.current[i];
        if (!card || !media || !cap) return;
        const k = i % 5;
        const L = layout(i, cards.length, W, H);
        const r = mixRect(mixRect(L.monolith, L.scattered, split), L.full, merge);
        const dy = DEPTH[k] * H * 0.4 * drift * loose;
        const px = mx * DEPTH[k] * 22 * (1 - merge);
        const py = my * DEPTH[k] * 14 * (1 - merge);
        const rot = TILT[k] * loose;
        card.style.width = `${r.w}px`;
        card.style.height = `${r.h}px`;
        card.style.transform = `translate3d(${r.x + px}px, ${r.y + dy + py}px, 0) rotate(${rot}deg)`;

        const n = (1 - split) * 100;
        const [a, b, c, d] = NOTCH[k].map((v) => v * n);
        card.style.clipPath = `polygon(0 ${a}%, 50% ${a}%, 50% ${b}%, 100% ${b}%, 100% ${100 - c}%, 50% ${100 - c}%, 50% ${100 - d}%, 0 ${100 - d}%)`;

        media.style.transform = `translate3d(${-mx * 10}px, ${(p - 0.5) * -14}%, 0) scale(${1.28 - merge * 0.08})`;
        media.style.filter = `grayscale(${1 - split}) contrast(${1 + (1 - split) * 0.15}) brightness(${1 - merge})`;
        card.style.setProperty("--shade", String(merge));
        card.style.opacity = String(1 - merge);

        const showCap = range(split, 0.55, 1) * (1 - range(merge, 0.35, 0.85));
        cap.style.opacity = String(showCap);
        const narrow = W < 760;
        const grow = narrow ? 0 : 0.25;
        const lift = narrow && i < Math.ceil(cards.length / 2) ? r.h - cap.offsetHeight - 32 : 52;
        cap.style.transform = `translate3d(0, ${(1 - split) * 24 - merge * lift}px, 0) scale(${1 + merge * grow})`;
      });

      if (lineARef.current) {
        lineARef.current.style.transform = `translate3d(${-apart * W * 0.55 - mx * 18}px, ${-apart * H * 0.1 - my * 10}px, 0)`;
        lineARef.current.style.opacity = String(1 - apart);
      }
      if (lineBRef.current) {
        lineBRef.current.style.transform = `translate3d(${apart * W * 0.55 + mx * 18}px, ${apart * H * 0.1 + my * 10}px, 0)`;
        lineBRef.current.style.opacity = String(1 - apart);
      }
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${(0.2 - p) * W * 0.5 + mx * -30}px, ${(0.5 - p) * H * 0.5}px, 0)`;
        ghostRef.current.style.opacity = String(0.9 * (1 - merge));
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mx * 60}px, ${my * 60 - p * H * 0.6}px, 0)`;
        glowRef.current.style.opacity = String(1 - merge);
      }

      closingWords.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const [fx, fy] = WORD_FROM[i % WORD_FROM.length];
        const k = 1 - ease(range(p, 0.64 + i * 0.03, 0.88 + i * 0.03));
        el.style.transform = `translate3d(${fx * W * k}px, ${fy * H * k}px, 0)`;
        el.style.opacity = String(1 - k);
        el.style.filter = `blur(${k * 14}px)`;
      });

      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (hintRef.current) hintRef.current.style.opacity = String(1 - range(p, 0.02, 0.12));

      const nextPhase = merge > 0.5 ? 2 : split > 0.5 ? 1 : 0;
      if (nextPhase !== phase && phaseRef.current) {
        phase = nextPhase;
        phaseRef.current.textContent = `0${phase + 1} — ${hero.phases[phase]}`;
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let io: IntersectionObserver | null = null;
    if (reduced) {
      frame();
      window.addEventListener("resize", frame);
    } else {
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
      io.observe(scene);
    }

    return () => {
      stop();
      io?.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", frame);
    };
  }, [hero]);

  return (
    <section
      ref={sceneRef}
      className={`${styles.scene} ${barlow.variable} ${syne.variable}`}
      aria-labelledby="brand"
    >
      <h1 id="brand" className={styles.srOnly}>
        {hero.tagline}
      </h1>

      <div ref={stageRef} className={styles.stage}>
        <div ref={glowRef} className={styles.glow} aria-hidden="true" />
        <div ref={ghostRef} className={styles.ghost} aria-hidden="true">
          {hero.ghost}
        </div>

        <ul className={styles.cards} aria-label={hero.portfolio.aria}>
          {items.map((item, i) => (
            <li key={item.title}>
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={styles.card}
              >
                <div
                  ref={(el) => {
                    mediaRefs.current[i] = el;
                  }}
                  className={styles.media}
                >
                  <Image src={item.image} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" priority={i < 2} />
                </div>
                <div
                  ref={(el) => {
                    capRefs.current[i] = el;
                  }}
                  className={styles.caption}
                >
                  <span className={styles.index}>0{i + 1}</span>
                  <span className={styles.tag}>{item.tag}</span>
                  <a className={styles.name} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.mark ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className={styles.mark} src={item.mark} alt={item.title} />
                    ) : (
                      <span className={item.markFont === "syne" ? styles.syne : styles.barlow}>{item.title}</span>
                    )}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div ref={lineARef} className={`${styles.line} ${styles.lineA}`} aria-hidden="true">
          {hero.lineA}
        </div>
        <div ref={lineBRef} className={`${styles.line} ${styles.lineB}`} aria-hidden="true">
          {hero.lineB}
        </div>

        <p className={styles.closing} aria-hidden="true">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
            >
              {word}
            </span>
          ))}
        </p>

        <div className={styles.hud} aria-hidden="true">
          <span ref={phaseRef} className={styles.phase}>
            01 — {hero.phases[0]}
          </span>
          <span className={styles.track}>
            <span ref={barRef} className={styles.bar} />
          </span>
          <div ref={hintRef} className={styles.hint}>
            {hero.scroll}
            <span className={styles.hintLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
