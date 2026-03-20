import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, IndianRupee } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function EOISection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    van: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("EOI submitted! We'll contact you within 24 hours.");
  };

  return (
    <section id="invest" className="py-20 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-terra text-xs font-bold tracking-widest uppercase">
              Start Your Journey
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
              Ready to Invest?
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Become a co-owner of a RelaaxHut campervan. Secure your spot with
              just <span className="text-terra font-bold">₹50,000</span> EOI.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "Initial EOI",
                  value: "₹50,000",
                  note: "10% of total investment",
                },
                {
                  label: "Total Investment",
                  value: "₹5,00,000",
                  note: "Paid over 4 months",
                },
                {
                  label: "Expected Annual Return",
                  value: "~₹2,00,000",
                  note: "Upwards of ₹20K/month",
                },
                {
                  label: "Ownership Period",
                  value: "4 Years",
                  note: "Then exit & earn from sale",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-white/10 rounded-xl px-5 py-4 border border-white/15"
                >
                  <div>
                    <div className="text-white/60 text-xs">{item.label}</div>
                    <div className="text-white font-bold text-lg">
                      {item.value}
                    </div>
                  </div>
                  <div className="text-white/50 text-xs text-right max-w-[120px]">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: EOI Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-heavy">
              {submitted ? (
                <div className="text-center py-8" data-ocid="eoi.success_state">
                  <CheckCircle2 className="w-16 h-16 text-forest mx-auto mb-4" />
                  <h3 className="font-display font-bold text-2xl text-forest mb-2">
                    EOI Submitted!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest. Our investment team will reach
                    out within 24 hours to guide you through the next steps.
                  </p>
                  <div className="mt-4 p-4 bg-cream rounded-xl">
                    <IndianRupee className="w-6 h-6 text-terra mx-auto mb-1" />
                    <p className="text-sm text-forest font-semibold">
                      Secure your spot with ₹50,000 EOI
                    </p>
                  </div>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-6 border-forest text-forest"
                    data-ocid="eoi.new_submission.button"
                  >
                    Submit Another EOI
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-xl text-forest mb-6">
                    Express Your Interest
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="eoi.form"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                          className="mt-1"
                          data-ocid="eoi.name.input"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="+91 XXXXX XXXXX"
                          required
                          className="mt-1"
                          data-ocid="eoi.phone.input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@email.com"
                        required
                        className="mt-1"
                        data-ocid="eoi.email.input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input
                          value={form.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          placeholder="Your city"
                          className="mt-1"
                          data-ocid="eoi.city.input"
                        />
                      </div>
                      <div>
                        <Label>Interested Van</Label>
                        <Select onValueChange={(v) => handleChange("van", v)}>
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="eoi.van.select"
                          >
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tata-yodha">
                              Tata Yodha
                            </SelectItem>
                            <SelectItem value="tempo-traveller">
                              Tempo Traveller XL
                            </SelectItem>
                            <SelectItem value="himalayan-cruiser">
                              Himalayan Cruiser
                            </SelectItem>
                            <SelectItem value="open">Open to Any</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Message</Label>
                      <Textarea
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Any questions or specific requirements..."
                        rows={3}
                        className="mt-1"
                        data-ocid="eoi.message.textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-terra hover:bg-terra/90 text-white font-semibold py-5 text-base"
                      data-ocid="eoi.submit.button"
                    >
                      Submit EOI — Secure Your Spot
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      No payment required now. Our team will contact you to
                      proceed.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
