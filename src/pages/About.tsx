import { BadgeCheck } from "lucide-react";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { profile } from "@/lib/portfolio-data";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About — Annum Fawad";
  }, []);

  return (
    <SiteShell>
      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">About</p>
          <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            A focused video editor with {profile.experience} of experience and {profile.videosMade}{" "}
            completed videos. The work blends fast social pacing with cinematic detail, clean captions,
            polished visuals, and creator-friendly delivery.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card/70 p-8 shadow-soft md:p-10">
          <h2 className="font-display text-3xl font-black md:text-5xl">Software & skills</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {profile.softwares.map((software) => (
              <div
                key={software}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background/55 p-4"
              >
                <BadgeCheck className="h-5 w-5 text-accent" />
                <span className="font-semibold">{software}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default About;
