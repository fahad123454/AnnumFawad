import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import annumImg from "@/assets/annum.jpeg";
const heroPortrait = annumImg;

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simple pop-in on mount
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-hero-gradient pt-16 flex items-center">
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(38 92% 60% / 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(150 48% 55% / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 py-16 lg:py-0">

          {/* ── Left: text content ── */}
          <div
            className="flex flex-col"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1)",
            }}
          >
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground backdrop-blur-xl mb-7">
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
              Video Editor &amp; Visual Storyteller
            </div>

            {/* Headline */}
            <h1 className="hero-font text-5xl font-black leading-[0.92] md:text-7xl lg:text-[82px]">
              {profile.name}
              <br />
              <span className="text-gradient">edits stories</span>
            </h1>

            {/* Sub */}
            <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg leading-relaxed">
              200+ videos crafted with Premiere Pro, CapCut PC, Photoshop, Canva,
              and AI-powered visuals. Clean hooks. Cinematic flow. Every frame on purpose.
            </p>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_hsl(38_92%_60%/0.5)]"
              >
                See my work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-bold text-foreground backdrop-blur-xl transition-colors hover:border-primary hover:bg-card/90"
              >
                <Play className="h-3.5 w-3.5 text-primary" />
                View pricing
              </Link>
            </div>

            {/* Micro stats */}
            <div className="mt-12 flex gap-10">
              {[
                { value: "200+", label: "Videos edited" },
                { value: "2 yrs", label: "Experience" },
                { value: "5★", label: "Client rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="hero-font text-3xl font-black text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: portrait card ── */}
          <div
            className="flex justify-center lg:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
              transition: "opacity 0.75s 0.12s cubic-bezier(.22,1,.36,1), transform 0.75s 0.12s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-4 rounded-[2.5rem] opacity-40"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(38 92% 60%), hsl(150 48% 55%), hsl(38 92% 60%))",
                  filter: "blur(18px)",
                }}
              />

              {/* Portrait card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/60 shadow-soft backdrop-blur-xl"
                style={{ width: "clamp(280px, 38vw, 440px)", aspectRatio: "3/4" }}>
                <img
                  src={heroPortrait}
                  alt={profile.name}
                  className="h-full w-full object-cover object-top"
                  style={{ mixBlendMode: "normal" }}
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Name tag */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl">
                    <p className="hero-font text-lg font-black">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">Premiere · CapCut · Photoshop · AI</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -right-4 top-8 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-soft backdrop-blur-xl"
                style={{
                  animation: "float 3.5s ease-in-out infinite",
                }}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-primary font-bold">Available</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">for new projects</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .hero-font {
          font-family: 'Playfair Display', 'Syne', Georgia, serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </section>
  );
}
