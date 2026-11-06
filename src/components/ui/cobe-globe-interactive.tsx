"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import createGlobe from "cobe";

export interface InteractiveMarker {
  id: string;
  location: [number, number];
  name: string;
  users?: number;
}

export interface GlobeInteractiveProps {
  markers?: InteractiveMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: InteractiveMarker[] = [
  { id: "hq", location: [37.78, -122.44], name: "HQ", users: 1420 },
  { id: "eu", location: [52.52, 13.41], name: "EU", users: 892 },
  { id: "asia", location: [35.68, 139.65], name: "Asia", users: 2103 },
  { id: "latam", location: [-23.55, -46.63], name: "LATAM", users: 567 },
  { id: "mena", location: [25.2, 55.27], name: "MENA", users: 734 },
  { id: "oceania", location: [-33.87, 151.21], name: "APAC", users: 445 },
];

export function GlobeInteractive({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobeInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;
    let resizeObserver: ResizeObserver | null = null;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0) return;
      if (globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 4.5,
        baseColor: [0.12, 0.12, 0.12],
        markerColor: [0.89, 0.094, 0.216],
        glowColor: [0.12, 0.05, 0.06],
        markerElevation: 0,
        markers: markers.map((m) => ({
          location: m.location,
          size: 0.028,
          id: m.id,
        })),
        arcs: [],
        arcColor: [0.89, 0.094, 0.216],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver?.disconnect();
          init();
        }
      });
      resizeObserver.observe(canvas);
    }

    return () => {
      resizeObserver?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, speed]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        userSelect: "none",
        width: "100%",
      }}
    >
      <style>{`
        @keyframes fade-slide-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          onClick={() => setExpanded(expanded === m.id ? null : m.id)}
          style={
            {
              position: "absolute",
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: expanded === m.id ? "0.25rem" : 0,
              padding: expanded === m.id ? "0.45rem 0.65rem" : "0.3rem 0.5rem",
              background: "rgba(10, 10, 10, 0.94)",
              color: "#fff",
              border: "1px solid rgba(227, 24, 55, 0.45)",
              borderRadius: 2,
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition:
                "opacity 0.4s, filter 0.4s, transform 0.2s, padding 0.2s",
              zoom: expanded === m.id ? 1.05 : 1,
            } as CSSProperties
          }
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e31837"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {m.name}
          </span>
          {expanded === m.id && m.users != null && (
            <span
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "0.55rem",
                opacity: 0.8,
                animation: "fade-slide-in 0.2s ease-out",
              }}
            >
              {m.users.toLocaleString()} users
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
