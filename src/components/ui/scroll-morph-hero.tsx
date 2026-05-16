import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { portfolioImages, profile } from "@/lib/portfolio-data";

export type AnimationPhase = "scatter" | "line" | "circle";

interface FlipCardProps {
  src: string;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

function FlipCard({ src, target }: FlipCardProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        marginLeft: -IMG_WIDTH / 2,
        marginTop: -IMG_HEIGHT / 2,
      }}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.8 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md border border-border bg-card shadow-card-glow">
        <img
          src={src}
          alt="Portfolio video editing still"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

export default function ScrollMorphHero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  const images = useMemo(
    () =>
      Array.from(
        { length: TOTAL_IMAGES },
        (_, index) => portfolioImages[index % portfolioImages.length],
      ),
    [],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (event: WheelEvent) => {
      const atEnd = scrollRef.current >= MAX_SCROLL && event.deltaY > 0;
      const atStart = scrollRef.current <= 0 && event.deltaY < 0;
      if (atEnd || atStart) return;
      event.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + event.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      const atEnd = scrollRef.current >= MAX_SCROLL && deltaY > 0;
      const atStart = scrollRef.current <= 0 && deltaY < 0;
      if (atEnd || atStart) return;
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const smoothMorph = useSpring(useTransform(virtualScroll, [0, 600], [0, 1]), {
    stiffness: 40,
    damping: 20,
  });
  const smoothScrollRotate = useSpring(useTransform(virtualScroll, [600, 3000], [0, 360]), {
    stiffness: 40,
    damping: 20,
  });
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(((event.clientX - rect.left) / rect.width) * 200 - 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scatterPositions = useMemo(
    () =>
      images.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    [images],
  );

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const introOpacity = useTransform(smoothMorph, [0, 0.3], [1, 0]);
  const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.75, 1], [20, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-hero-gradient pt-16">
      <div ref={containerRef} className="noise relative h-full w-full overflow-hidden">
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-primary" /> Video Editor Portfolio
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-black leading-[0.9] md:text-8xl lg:text-9xl">
            {profile.name} <span className="text-gradient">edits stories</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-xl">
            200+ videos shaped with Premiere Pro, CapCut PC, Photoshop, Canva, and AI-powered visuals.
          </p>
          <div className="mt-10 animate-glow-pulse text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Scroll to explore
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-x-0 top-[12%] z-10 flex flex-col items-center px-6 text-center md:top-[14%]"
        >
          <h2 className="font-display text-4xl font-black text-gradient md:text-7xl">
            A reel that keeps moving
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Clean hooks, cinematic flow, social edits, brand ads, and creator content without the page going empty after the animation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105"
            >
              See work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/pricing"
              className="rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-bold text-foreground backdrop-blur-xl transition-colors hover:border-primary"
            >
              View pricing
            </Link>
          </div>
        </motion.div>

        <div className="absolute inset-0">
          {images.map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };
            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              target = {
                x: i * lineSpacing - (TOTAL_IMAGES * lineSpacing) / 2,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
              };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const currentArcAngle =
                -90 -
                spreadAngle / 2 +
                i * (spreadAngle / (TOTAL_IMAGES - 1)) -
                Math.min(Math.max(rotateValue / 360, 0), 1) * spreadAngle * 0.8;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };
              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }
            return <FlipCard key={`${src}-${i}`} src={src} target={target} />;
          })}
        </div>
      </div>
    </section>
  );
}
