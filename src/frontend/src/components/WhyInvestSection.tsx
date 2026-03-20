import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, FileCheck, MapPin, Smartphone } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: FileCheck,
    title: "Fully Managed Operations",
    description:
      "We handle everything: construction, insurance, permits, rental marketing, and booking management.",
  },
  {
    icon: MapPin,
    title: "Live GPS Tracking via App",
    description:
      "Track your van's real-time GPS location and all bookings through the RelaaxHut App 24/7.",
  },
  {
    icon: CreditCard,
    title: "Transparent Monthly Payouts",
    description:
      "Receive your revenue share at every month-end. Upwards of ₹20,000/month per co-owner.",
  },
  {
    icon: Smartphone,
    title: "All-White Documented Transactions",
    description:
      "100% legitimate, fully documented transactions. No cash. Complete financial transparency.",
  },
];

const faqs = [
  {
    id: "ratio",
    q: "What is the co-ownership ratio?",
    a: "For our small campervan projects (like the Tata Yodha), there are 6 joint owners. For larger projects, such as our upcoming Tempo Traveller builds, we accommodate 10–11 co-owners.",
  },
  {
    id: "period",
    q: "How long is the ownership period?",
    a: "The revenue and ownership model is structured for 4 years. At the end of this term, the campervan is sold, and the sale proceeds are distributed among the co-owners.",
  },
  {
    id: "payment",
    q: "What are the payment terms?",
    a: "The total investment is ₹5 Lakhs. Booking/EOI Stage: 1% (₹5,000). Construction Phase: The remaining 99% is paid via account transfer over the next 4 months as the build progresses. We maintain 100% transparency with all-white documented transactions (no cash).",
  },
  {
    id: "earning",
    q: "When do I start earning?",
    a: "For the current project starting in April, the build and testing will be completed by July. You can expect to start receiving revenue share in August.",
  },
  {
    id: "returns",
    q: "What are the projected returns?",
    a: "Monthly projected returns are upwards of ₹20,000 per owner. Based on our existing fleet, a co-owner can expect an average of approximately ₹2 Lakhs per year if the owner's personal usage month is also put out for rent.",
  },
  {
    id: "tracking",
    q: "How is revenue tracked?",
    a: "It is a fully transparent 'managed' business. You can track all bookings and the live GPS location of the vehicle through the Relaaxhut App. Payouts are made at every month-end.",
  },
  {
    id: "personal-use",
    q: "Can I use the campervan myself?",
    a: "Yes. Each owner has the option to use the van for one month per year. If you choose not to use it, that month's rental income is added to your returns.",
  },
  {
    id: "locations",
    q: "Where will the campervans be located?",
    a: "We currently have a unit in Delhi, and the new build is coming up in Bangalore. Our goal is to have a presence in every state so owners can enjoy camping across India as the fleet grows.",
  },
  {
    id: "travelers",
    q: "Who can travel in it?",
    a: "The small camper is ideal for a family of 2 adults and 2 kids.",
  },
  {
    id: "license",
    q: "Do I need a special license to drive it?",
    a: "While a 'T-permit' is ideal for commercial compliance, we provide self-drive options (standard license) for certain categories, including expats.",
  },
  {
    id: "managed",
    q: "What does RelaaxHut manage?",
    a: "We handle everything: vehicle construction, insurance, permits, rental marketing, and booking management.",
  },
  {
    id: "control",
    q: "How do I stay in control?",
    a: "While we manage the operations, you stay in control of the business through the app, where you can monitor usage, location, and financial performance in real-time.",
  },
];

export default function WhyInvestSection() {
  return (
    <section id="faq" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Why Invest */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-terra text-xs font-bold tracking-widest uppercase">
              Investment Benefits
            </span>
            <h2 className="font-display text-4xl font-bold text-forest mt-2 mb-8 uppercase">
              Why Invest With Us?
            </h2>
            <div className="space-y-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-terra" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {b.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-terra text-xs font-bold tracking-widest uppercase">
              Questions Answered
            </span>
            <h2 className="font-display text-4xl font-bold text-forest mt-2 mb-8 uppercase">
              FAQs
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white rounded-xl border border-border px-4"
                  data-ocid={`faq.item.${i + 1}`}
                >
                  <AccordionTrigger className="text-sm font-semibold text-forest hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
