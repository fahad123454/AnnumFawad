import { useEffect, useRef, useState } from "react";
import { Play, X, ChevronDown } from "lucide-react";
import { SiteShell } from "@/components/portfolio/SiteShell";

import social1 from "@/assets/social-1.mp4";
import social2 from "@/assets/social-2.mp4";
import social3 from "@/assets/social-3.mp4";
import brand1 from "@/assets/brand-1.mp4";
import brand2 from "@/assets/brand-2.mp4";
import brand3 from "@/assets/brand-3.mp4";
import motion1 from "@/assets/motion-1.mp4";
import motion2 from "@/assets/motion2.mp4";
import motion3 from "@/assets/motio3.mp4";
import uptalks from "@/assets/uptalks.mp4";
import duckDonuts from "@/assets/duck donuts 15(1).mp4";
import fadeGrowth from "@/assets/fade growth media intro reel.mp4";

interface WorkItem {
  title: string;
  subtitle: string;
  video: string;
}

interface WorkCategory {
  id: string;
  label: string;
  description: string;
  emoji: string;
  items: WorkItem[];
}

const categories: WorkCategory[] = [
  {
    id: "creators",
    label: "Personal Brands & Influencers",
    description: "Fast hooks, clean captions, and pacing that keeps viewers watching.",
    emoji: "🎬",
    items: [
      { title: "Social Reel #1", subtitle: "Short-form hook edit", video: social1 },
      { title: "Social Reel #2", subtitle: "Story-driven content", video: social2 },
      { title: "Social Reel #3", subtitle: "Trending format edit", video: social3 },
    ],
  },
  {
    id: "brands",
    label: "Business & Ads",
    description: "Product-focused edits for launches, promos, and campaigns.",
    emoji: "📦",
    items: [
      { title: "Brand Ad #1", subtitle: "Product launch spot", video: brand1 },
      { title: "Brand Ad #2", subtitle: "Commercial promo", video: brand2 },
      { title: "Brand Ad #3", subtitle: "Campaign edit", video: brand3 },
    ],
  },
  {
    id: "food",
    label: "Restaurants & Food",
    description: "Mouth-watering visuals with motion and color that make food pop.",
    emoji: "🍽️",
    items: [
      { title: "Food Film #1", subtitle: "Cinematic food edit", video: motion1 },
      { title: "Food Film #2", subtitle: "Ambience & texture reel", video: motion2 },
      { title: "Food Film #3", subtitle: "Restaurant highlight", video: motion3 },
    ],
  },
  {
    id: "events",
    label: "Events",
    description: "High-energy recaps capturing the best moments of any occasion.",
    emoji: "🎤",
    items: [
      { title: "UpTalks Conference", subtitle: "Event highlight reel", video: uptalks },
      { title: "Duck Donuts Promo", subtitle: "Holiday ad edit", video: duckDonuts },
      { title: "Fade Growth Media", subtitle: "Intro & identity reel", video: fadeGrowth },
    ],
  },
];

function VideoCard({ item }: { item: WorkItem }) {
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = document.createElement("video");
    vid.src = item.video;
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "metadata";

    const capture = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = vid.videoWidth || 640;
        canvas.height = vid.videoHeight || 360;
        const ctx = canvas.getContext("2d");
        if (ctx && vid.videoWidth > 0) {
          ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
          setThumb(canvas.toDataURL("image/jpeg", 0.85));
        }
      } catch {}
    };

    vid.addEventListener("loadeddata", () => { vid.currentTime = 0.5; }, { once: true });
    vid.addEventListener("seeked", capture, { once: true });
    vid.load();

    return () => { vid.src = ""; };
  }, [item.video]);

  useEffect(() => {
    const v = playRef.current;
    if (!v) return;
    if (open) { v.currentTime = 0; v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card-glow"
        aria-label={`Play ${item.title}`}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {thumb ? (
            <img
              src={thumb}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <video
              ref={videoRef}
              src={item.video}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ pointerEvents: "none" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 shadow-glow transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 translate-x-[2px] text-primary-foreground" />
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="work-font text-lg font-bold leading-tight">{item.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur hover:bg-black/90"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-[0_0_80px_hsl(38_92%_60%/0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <video
                ref={playRef}
                src={item.video}
                controls
                playsInline
                poster={thumb ?? undefined}
                className="h-full w-full"
              />
            </div>
            <div className="border-t border-white/10 bg-black/80 px-5 py-3 backdrop-blur">
              <p className="work-font text-base font-bold text-white">{item.title}</p>
              <p className="text-xs text-white/50">{item.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CategorySection({ cat, defaultOpen }: { cat: WorkCategory; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-card/70"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl" aria-hidden>{cat.emoji}</span>
          <div>
            <p className="work-font text-xl font-black">{cat.label}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{cat.description}</p>
          </div>
        </div>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/50">
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </span>
      </button>

      {open && (
        <div className="grid gap-4 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
          {cat.items.map((item) => (
            <VideoCard key={item.video} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

const Work = () => {
  useEffect(() => {
    document.title = "Work — Annum Fawad Video Editor";
  }, []);

  return (
    <SiteShell>
      <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Portfolio</p>
          <h1 className="work-font mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Editing work with{" "}
            <span className="text-gradient">motion, rhythm, and polish.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Real projects. Real clients. Click a category to expand it, then tap a thumbnail to watch
            the video full-screen.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                {c.emoji} {c.label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {categories.map((cat, i) => (
              <CategorySection key={cat.id} cat={cat} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .work-font {
          font-family: 'Playfair Display', 'Syne', Georgia, serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </SiteShell>
  );
};

export default Work;
