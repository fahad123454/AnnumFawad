import heroPortrait from "@/assets/click.webp";

// mp4 assets
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

export const profile = {
  name: "Annum Fawad",
  role: "Video Editor & Visual Storyteller",
  experience: "2 years",
  videosMade: "200+",
  email: "annumfawad22005@gmail.com",
  whatsapp: "+923495892425",
  instagram: "Ctrl_plus._y",
  linkedin: "www.linkedin.com/in/annum-fawad-video-editor",
  fiverr: "https://www.fiverr.com/sellers/annumfawad812/edit",
  softwares: ["Adobe Premiere Pro", "CapCut PC", "Adobe Photoshop", "Canva", "AI generatives"],
};

export const portfolioImages = [
  ,
];

/**
 * Public sample videos that are known to exist (Google Cloud Storage demo bucket).
 * Each VideoItem contains 3 short clip URLs that play in the PhotoStackCard hover stack.
 */
export interface VideoStackItem {
  category: string;
  title: string;
  subtitle: string;
  poster: string;
  videos: string[];
  detail: string;
}

export const videoShowcase: VideoStackItem[] = [
  {
    category: "PERSONAL BRANDS / INFLUENCERS",
    title: "Creator content",
    subtitle: "Reels · hooks · storytelling",
    poster: heroPortrait,
    videos: [social1, social2, social3],
    detail: "Fast hooks, clean captions, and pacing that keeps viewers watching.",
  },
  {
    category: "BUSINESS / ADS",
    title: "Brand & commercial",
    subtitle: "Launches · promos · product",
    poster: heroPortrait,
    videos: [brand1, brand2, brand3],
    detail: "Product-focused edits for launches, promos, and client campaigns.",
  },
  {
    category: "RESTAURANTS & FOOD",
    title: "Food content",
    subtitle: "Ambience · texture · appetite",
    poster: heroPortrait,
    videos: [motion1, motion2, motion3],
    detail: "Mouth-watering visuals with motion and color that make food pop.",
  },
  {
    category: "EVENTS",
    title: "Event highlights",
    subtitle: "Energy · moments · memories",
    poster: heroPortrait,
    videos: [uptalks, duckDonuts, fadeGrowth],
    detail: "High-energy event recaps capturing the best moments of any occasion.",
  },
];

export const workItems = [
  { title: "Short-form edits", category: "Social reels", video: social1, detail: "Fast hooks, clean captions, pacing that keeps viewers watching." },
  { title: "Cinematic videos", category: "Story edits", video: motion1, detail: "Color, music, movement, and emotion shaped into polished films." },
  { title: "Brand ads", category: "Commercial", video: brand1, detail: "Product-focused edits for launches, promos, and client campaigns." },
  { title: "Creator packages", category: "Content systems", video: uptalks, detail: "Repeatable editing style for creators posting every week." },
  { title: "Duck Donuts promo", category: "Client work", video: duckDonuts, detail: "Tasty short-form ad edit for Duck Donuts." },
  { title: "Fade Growth reel", category: "Intro reel", video: fadeGrowth, detail: "Intro reel showcasing editing style and motion work." },
];

export const pricingPlans = [
  {
    planName: "Basic",
    description: "Clean, simple edits for everyday content.",
    price: "10",
    features: [
      "Simple Captions",
      "Music mixing",
      "Up to 60 seconds",
      "Basic cuts and adding clips",
      "Color grading",
    ],
    buttonText: "Get Basic",
    buttonVariant: "secondary" as const,
  },
  {
    planName: "Standard",
    description: "Polished edits with style and energy.",
    price: "20",
    features: [
      "Animated Captions",
      "Music mixing",
      "SFX",
      "Up to 60 seconds",
      "Transitions and animations",
      "Colour grading",
      "Motion graphics",
    ],
    buttonText: "Get Standard",
    isPopular: true,
    buttonVariant: "primary" as const,
  },
  {
    planName: "Premium",
    description: "High-end production for brands and serious creators.",
    price: "35",
    features: [
      "Trending style animated captions",
      "Music mixing",
      "SFX",
      "Up to 100 seconds",
      "Advanced transitions and animations",
      "Color grading & color correction",
      "Complex motion graphics",
    ],
    buttonText: "Get Premium",
    buttonVariant: "primary" as const,
  },
];
