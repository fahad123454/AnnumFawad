import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Film, Layers, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/portfolio/SiteShell";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { VideoStackCard } from "@/components/ui/video-stack-card";
import { profile, videoShowcase, workItems } from "@/lib/portfolio-data";

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <SiteShell>
      <ScrollMorphHero />

      {/* Stats */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            { icon: Film, label: "Experience", value: profile.experience },
            { icon: Layers, label: "Videos made", value: profile.videosMade },
            { icon: Sparkles, label: "Software stack", value: "Premiere, CapCut, AI" },
          ].map((stat) => (
            <article
              key={stat.label}
              className="glass animate-fade-in rounded-2xl p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <stat.icon className="mb-5 h-7 w-7 text-primary" />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <h2 className="mt-2 font-display text-3xl font-black">{stat.value}</h2>
            </article>
          ))}
        </div>
      </section>

      {/* Video showcase — PhotoStackCard adapted for playable videos */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">
                Video showcase
              </p>
              <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">
                Hover, tap, <span className="text-gradient">watch the work.</span>
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Each card is a stack of real video clips — click a clip to play it right inside the card.
              </p>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-transform duration-300 hover:translate-x-1"
            >
              Open full work page <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
            {videoShowcase.map((item, index) => (
              <VideoStackCard
                key={item.title}
                category={item.category}
                title={item.title}
                subtitle={item.subtitle}
                videos={item.videos}
                poster={item.poster}
                isActive={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured work cards (image grid) */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">
            More work
          </p>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            No empty gaps — just proof.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {workItems.slice(0, 3).map((item) => (
              <Link
                key={item.title}
                to="/work"
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <video
                  src={item.video}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default Index;
