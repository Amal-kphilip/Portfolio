"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { mediaUrl } from "@/lib/links";
import { SectionShell, SectionEyebrow } from "./section-shell";

const config = {
  imageCount: 12,
  imagePath: (i: number) => mediaUrl(`/images/flock/img${i}.jpg`),
  gridSizeDesktop: 0.075,
  gridSizeMobile: 0.05,
  gridSpacing: 0.05,
  mobileBreakpoint: 1000,
  cursorReach: 0.35,
  maxImageScale: 3.5,
  driftSpeed: 75,
  followSpeed: 5,
  revealDuration: 0.5,
};

function wrapAround(value: number, min: number, max: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function cursorInfluence(distanceFromCursor: number, maxDistance: number) {
  if (distanceFromCursor >= maxDistance) return 0;
  const normalized = distanceFromCursor / maxDistance;
  const falloff = 1 - normalized * normalized;
  return falloff * falloff;
}

export default function ImageFlock({ index = "04" }: { index?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const clusterCanvas = canvasRef.current;
    if (!container || !clusterCanvas) return;

    const ctx = clusterCanvas.getContext("2d");
    if (!ctx) return;

    let viewW = container.clientWidth || window.innerWidth;
    let viewH = container.clientHeight || window.innerHeight;
    let imageBaseSize = 0;
    let spacing = 0;
    let gridStep = 0;
    let gridColumns = 0;
    let gridRows = 0;
    let cursorReach = 0;

    function calculateGridLayout() {
      if (!container) return;
      viewW = container.clientWidth || window.innerWidth;
      viewH = container.clientHeight || window.innerHeight;
      imageBaseSize =
        window.innerWidth >= config.mobileBreakpoint
          ? viewH * config.gridSizeDesktop
          : viewH * config.gridSizeMobile;
      spacing = viewH * config.gridSpacing;
      gridStep = imageBaseSize + spacing;
      gridColumns = Math.ceil(viewW / gridStep) + 2;
      gridRows = Math.ceil(viewH / gridStep) + 2;
      cursorReach = Math.min(viewW, viewH) * config.cursorReach;
    }

    function resizeClusterCanvas() {
      if (!container || !clusterCanvas || !ctx) return;
      viewW = container.clientWidth || window.innerWidth;
      viewH = container.clientHeight || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      clusterCanvas.width = viewW * dpr;
      clusterCanvas.height = viewH * dpr;
      clusterCanvas.style.width = `${viewW}px`;
      clusterCanvas.style.height = `${viewH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      calculateGridLayout();
    }

    resizeClusterCanvas();
    window.addEventListener("resize", resizeClusterCanvas);

    const loadedImages: HTMLImageElement[] = [];
    let cancelled = false;

    for (let i = 1; i <= config.imageCount; i++) {
      const img = new Image();
      img.src = config.imagePath(i);
      img.onload = () => {
        if (!cancelled) {
          loadedImages.push(img);
        }
      };
    }

    function imageAtGridPosition(col: number, row: number) {
      if (!loadedImages.length) return null;
      const idx = Math.abs((col * 11 + row * 7) % loadedImages.length);
      return loadedImages[idx];
    }

    const mousePosition = { x: viewW / 2, y: viewH / 2 };
    const focalPoint = { x: mousePosition.x, y: mousePosition.y };
    const rawMouse = { clientX: 0, clientY: 0, hasMoved: false };

    const handleMouseMove = (e: MouseEvent) => {
      rawMouse.clientX = e.clientX;
      rawMouse.clientY = e.clientY;
      rawMouse.hasMoved = true;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const clusterReveal = { intensity: 0 };

    const drawCluster = (elapsed: number, deltaMs: number) => {
      if (!container || !ctx) return;

      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      if (
        rawMouse.hasMoved &&
        rawMouse.clientX >= rect.left &&
        rawMouse.clientX <= rect.right &&
        rawMouse.clientY >= rect.top &&
        rawMouse.clientY <= rect.bottom
      ) {
        mousePosition.x = rawMouse.clientX - rect.left;
        mousePosition.y = rawMouse.clientY - rect.top;
      }

      const dt = deltaMs / 1000;
      const step = Math.min(1, dt * config.followSpeed);

      focalPoint.x += (mousePosition.x - focalPoint.x) * step;
      focalPoint.y += (mousePosition.y - focalPoint.y) * step;

      ctx.clearRect(0, 0, viewW, viewH);

      if (!loadedImages.length || gridStep <= 0) return;

      const driftX = elapsed * config.driftSpeed;
      const driftY = elapsed * -config.driftSpeed;

      const wrapMinX = -gridStep;
      const wrapMaxX = viewW + gridStep;
      const wrapMinY = -gridStep;
      const wrapMaxY = viewH + gridStep;

      for (let row = -1; row < gridRows; row++) {
        for (let col = -1; col < gridColumns; col++) {
          const cellX = wrapAround(col * gridStep + driftX, wrapMinX, wrapMaxX);
          const cellY = wrapAround(row * gridStep + driftY, wrapMinY, wrapMaxY);

          const image = imageAtGridPosition(col, row);
          if (!image) continue;

          const aspectRatio = image.naturalWidth / image.naturalHeight;
          const imageWidth =
            aspectRatio >= 1 ? imageBaseSize : imageBaseSize * aspectRatio;
          const imageHeight =
            aspectRatio >= 1 ? imageBaseSize / aspectRatio : imageBaseSize;

          const cellCenterX = cellX + imageBaseSize / 2;
          const cellCenterY = cellY + imageBaseSize / 2;
          const distanceX = cellCenterX - focalPoint.x;
          const distanceY = cellCenterY - focalPoint.y;
          const distanceFromCursor = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY,
          );

          if (distanceFromCursor > cursorReach) continue;

          const imageScale =
            cursorInfluence(distanceFromCursor, cursorReach) *
            config.maxImageScale *
            clusterReveal.intensity;

          if (imageScale < 0.02) continue;

          const scaledWidth = imageWidth * imageScale;
          const scaledHeight = imageHeight * imageScale;

          ctx.drawImage(
            image,
            cellX + (imageBaseSize - scaledWidth) / 2,
            cellY + (imageBaseSize - scaledHeight) / 2,
            scaledWidth,
            scaledHeight,
          );
        }
      }
    };

    gsap.ticker.add(drawCluster);
    const revealTween = gsap.to(clusterReveal, {
      intensity: 1,
      duration: config.revealDuration,
      ease: "power2.inOut",
    });

    return () => {
      cancelled = true;
      revealTween.kill();
      gsap.ticker.remove(drawCluster);
      window.removeEventListener("resize", resizeClusterCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <SectionShell id="spotlight">
      <SectionEyebrow
        index={index}
        label="Spotlight"
        annotation="Cursor-driven showcase"
      />
      <div
        ref={containerRef}
        className="spotlight relative flex h-[100svh] w-full items-center justify-center overflow-hidden p-8"
      >
        <canvas
          ref={canvasRef}
          className="cluster-canvas pointer-events-none absolute top-0 left-0 h-full w-full"
        />
        <h2
          data-reveal
          className="pointer-events-none relative z-10 w-full text-center font-display text-[clamp(3rem,4vw,5rem)] font-medium leading-[1.25] tracking-[-0.035em] text-ink-strong lg:w-[40%]"
        >
          Be among the first to try{" "}
          <span className="font-serif italic font-normal">spotlight</span>
        </h2>
      </div>
    </SectionShell>
  );
}
