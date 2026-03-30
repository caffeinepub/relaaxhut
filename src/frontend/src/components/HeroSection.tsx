import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/uploads/97c550ad-8d10-4d73-8c54-7d27ec1ed49a-4.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block bg-terra/90 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              India's Premier Campervan Company
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight uppercase mb-6">
              Escape Ordinary.
              <br />
              <span className="text-cream/90">Explore Wilderness.</span>
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed">
              India's premier campervan experiences & co-ownership investment
              opportunities. Own a van. Earn returns. Live the adventure.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("#services")}
                className="bg-terra hover:bg-terra/90 text-white text-base px-8 py-6 rounded-md font-semibold shadow-heavy"
                data-ocid="hero.book_journey.button"
              >
                Book Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#invest")}
                className="border-white/70 text-white hover:bg-white/10 text-base px-8 py-6 rounded-md font-semibold backdrop-blur-sm bg-white/10"
                data-ocid="hero.learn_invest.button"
              >
                Own your Campervan
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Location Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-12 left-6 sm:left-10"
      >
        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm px-4 py-2 rounded-full">
          <MapPin className="w-4 h-4 text-terra" />
          <span className="font-medium">Delhi • Bangalore • Pan India</span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollTo("#services")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-8 text-white/60 hover:text-white flex flex-col items-center gap-1 text-xs"
        aria-label="Scroll down"
      >
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
