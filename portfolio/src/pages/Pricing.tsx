import { useEffect } from "react";
import { ModernPricingPage } from "@/components/ui/animated-glassy-pricing";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { pricingPlans } from "@/lib/portfolio-data";

const Pricing = () => {
  useEffect(() => {
    document.title = "Pricing — Annum Fawad Video Editing";
  }, []);

  return (
    <SiteShell>
      <ModernPricingPage
        title={
          <>
            Find the <span className="text-gradient">perfect edit plan</span> for your content
          </>
        }
        subtitle="Flexible packages for reels, creator videos, brand campaigns, and polished social content."
        plans={pricingPlans}
        showAnimatedBackground
      />
    </SiteShell>
  );
};

export default Pricing;
