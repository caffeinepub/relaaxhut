import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Express Interest",
    description:
      "Pay ₹5,000 EOI (1% of total investment) to reserve your co-ownership slot. All transactions are fully documented.",
    detail: "₹5K EOI",
  },
  {
    number: "02",
    title: "Watch the Build",
    description:
      "Over the next 4 months, pay the remaining ₹4.95L via bank transfer as construction progresses. We maintain 100% transparency.",
    detail: "4 Months Build",
  },
  {
    number: "03",
    title: "Van Launches",
    description:
      "Build and testing complete by July. Your campervan hits the road, fully insured, permitted, and ready for bookings.",
    detail: "Ready by July",
  },
  {
    number: "04",
    title: "Earn Returns",
    description:
      "Revenue share begins from August. Track bookings, GPS location, and monthly payouts through the RelaaxHut App in real-time.",
    detail: "From August",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-terra text-xs font-bold tracking-widest uppercase">
            The Process
          </span>
          <h2 className="font-display text-4xl font-bold text-forest mt-2">
            How Co-Ownership Works
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A simple 4-step journey from investment to earning monthly returns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-terra/20 via-terra to-terra/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Circle */}
              <div className="w-20 h-20 rounded-full bg-forest flex flex-col items-center justify-center mb-5 shadow-card relative z-10">
                <span className="text-terra font-bold text-xs">STEP</span>
                <span className="text-white font-display font-bold text-2xl leading-none">
                  {step.number}
                </span>
              </div>
              <div className="inline-block bg-terra/10 text-terra text-xs font-bold px-3 py-1 rounded-full mb-3">
                {step.detail}
              </div>
              <h3 className="font-display font-bold text-lg text-forest mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
