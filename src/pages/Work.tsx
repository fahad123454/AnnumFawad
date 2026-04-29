import { useEffect } from "react";
import { SiteShell } from "@/components/portfolio/SiteShell";
import TestimonialCard, { Testimonial } from "@/components/ui/multi-media-testimonial";

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

const workTestimonials: Testimonial[] = [
  {
    name: "Sarah K.",
    profile: "https://i.pravatar.cc/150?img=47",
    title: "Personal Brands & Influencers",
    designation: "Lifestyle Creator · 120K Followers",
    content:
      "Annum completely transformed my content. The hooks are sharp, the pacing keeps people watching till the end, and my engagement has gone through the roof.",
    mediaUrl: social1,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499067447590780948/image.png?ex=69f372da&is=69f2215a&hm=5df0f6055d0d6a14a13878ee821de85e1743f49e1ca26ef2420b54727e597b2b&=&format=webp&quality=lossless&width=396&height=350",
  },
  {
    name: "Omar T.",
    profile: "https://i.pravatar.cc/150?img=12",
    title: "Personal Brands & Influencers",
    designation: "Travel Influencer · 85K Followers",
    content:
      "Every reel she edited for me went viral. Her storytelling instinct is something else — she just knows what the audience wants to see next.",
    mediaUrl: motion1,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499068377296015531/image.png?ex=69f373b8&is=69f22238&hm=a213bc96cac80fec47dc2d174501e5ee588c94b352fb83743f1632279a0b29ec&=&format=webp&quality=lossless&width=852&height=752",
  },
  {
    name: "Zara M.",
    profile: "https://i.pravatar.cc/150?img=29",
    title: "Personal Brands & Influencers",
    designation: "Beauty Creator · 200K Followers",
    content:
      "Smooth transitions, clean captions, great colour grading — she delivers every time, well before deadline.",
    mediaUrl: social3,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499068280097210538/image.png?ex=69f373a1&is=69f22221&hm=5233e1cc61fbbb65d64a4365692f87c38386cbc38afdbbc6676bb2b07ac72386&=&format=webp&quality=lossless",
  },
  {
    name: "Lena R.",
    profile: "https://i.pravatar.cc/150?img=5",
    title: "Business & Ads",
    designation: "E-Commerce Brand Owner",
    content:
      "Our product launch video got 3× our usual views. Annum has a sharp commercial eye — she knew exactly how to make the product look irresistible.",
    mediaUrl: brand1,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499068577091813477/image.png?ex=69f373e8&is=69f22268&hm=e4380c32db304bce4afea368b43fc666f7275d104a4ffa344c4a82a59daccf10&=&format=webp&quality=lossless",
  },
  {
    name: "James H.",
    profile: "https://i.pravatar.cc/150?img=33",
    title: "Business & Ads",
    designation: "Marketing Director",
    content:
      "We hired her for a product promo and were blown away. The edit felt like an agency production but came in way under budget.",
    mediaUrl: brand2,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499067609138725044/image.png?ex=69f37301&is=69f22181&hm=ce7838f5026ec9c1050fbb64c91c06f0229200c2e5becae6080390fb1ad9a175&=&format=webp&quality=lossless",
  },
  {
    name: "Priya S.",
    profile: "https://i.pravatar.cc/150?img=44",
    title: "Business & Ads",
    designation: "SaaS Startup Founder",
    content:
      "Our explainer ad went from bland to compelling in one revision. She understood the brief immediately and nailed the tone.",
    mediaUrl: brand3,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499067961712054344/image.png?ex=69f37355&is=69f221d5&hm=b24cf8cfc17b586bb604fa4910b96a36f39c9254723a0809b88ca082e05c7f68&=&format=webp&quality=lossless",
  },
  {
    name: "Chef Marco V.",
    profile: "https://i.pravatar.cc/150?img=67",
    title: "Restaurants & Food",
    designation: "Head Chef · Bistro Vivo",
    content:
      "She made our food look absolutely delicious on screen. The colour grading and texture shots had people calling in reservations the same day the reel dropped.",
    mediaUrl: social2,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499067961116463184/image.png?ex=69f37355&is=69f221d5&hm=0ad5d5ef9b82810130f1095949098d420492b7faee5ce60f8bf6e20bff16435d&=&format=webp&quality=lossless",
  },
  {
    name: "Aisha B.",
    profile: "https://i.pravatar.cc/150?img=23",
    title: "Restaurants & Food",
    designation: "Food & Beverage Manager",
    content:
      "Our Instagram presence has never looked this polished. She captured the ambience and energy of our restaurant perfectly.",
    mediaUrl: motion2,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499068712496664627/image.png?ex=69f37408&is=69f22288&hm=544aedcdb77d3e70ec5dc492352b13d07495c4e46e6599fa7c595a26bad688bd&=&format=webp&quality=lossless",
  },
  {
    name: "Dan F.",
    profile: "https://i.pravatar.cc/150?img=51",
    title: "Restaurants & Food",
    designation: "Owner · Duck Donuts",
    content:
      "The short ad she made for our holiday promo was playful, on-brand, and performed brilliantly — best ROAS we've had on a content piece.",
    mediaUrl: motion3,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499067741980856421/image.png?ex=69f37321&is=69f221a1&hm=ace7c565870d7281b94fa0a7ca564e712ef1d106c64279af98cfc24a3c3e9cc1&=&format=webp&quality=lossless",
  },
  {
    name: "Nina P.",
    profile: "https://i.pravatar.cc/150?img=9",
    title: "Events",
    designation: "Event Director · UpTalks",
    content:
      "She captured the energy of our conference in a way photos never could. Attendees kept sharing the recap video — it became part of the brand.",
    mediaUrl: uptalks,
    thumbnail: "https://cdn.discordapp.com/attachments/1451951160687595671/1499068182919381063/image.png?ex=69f3738a&is=69f2220a&hm=68e5d48bc2df47dab6d66b57ae82f40c2aee1ca9f599a9c9531d3c859afc71c7",
  },
  {
    name: "Carlos M.",
    profile: "https://i.pravatar.cc/150?img=15",
    title: "Events",
    designation: "Brand Partnerships Lead",
    content:
      "Tight turnaround, immaculate edit. She delivered a same-day highlight reel that our sponsors loved. Will absolutely book again.",
    mediaUrl: duckDonuts,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499068479918051328/image.png?ex=69f373d0&is=69f22250&hm=953b2dc06ba030689dddb73e7a72db513af1a54ec1b136688bdcd63d9064f6f0&=&format=webp&quality=lossless",
  },
  {
    name: "Rachel T.",
    profile: "https://i.pravatar.cc/150?img=38",
    title: "Events",
    designation: "Creative Director · Fade Growth Media",
    content:
      "Our intro reel is now the first thing we show at pitches. It's polished, fast-paced, and makes the room sit up straight every time.",
    mediaUrl: fadeGrowth,
    thumbnail: "https://media.discordapp.net/attachments/1451951160687595671/1499068893652848691/image.png?ex=69f37433&is=69f222b3&hm=9f940c3d257a376d51c14ff66e4396756474221616c9705c7fdca12c90bf166b&=&format=webp&quality=lossless",
  },
];

const Work = () => {
  useEffect(() => {
    document.title = "Work — Annum Fawad Video Editor";
  }, []);

  return (
    <SiteShell>
      <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Portfolio</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-tight md:text-7xl">
            Editing work with <span className="text-gradient">motion, rhythm, and polish.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Real projects. Real clients. Every card shows the work — tap the thumbnail to watch the video, then hear what the client had to say.
          </p>

          {Array.isArray(workTestimonials) && workTestimonials.length > 0 ? (
            <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
              {workTestimonials.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-14">No work items yet.</p>
          )}
        </div>
      </section>
    </SiteShell>
  );
};

export default Work;
