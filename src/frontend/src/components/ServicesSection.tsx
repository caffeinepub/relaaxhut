import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CheckCircle2,
  Phone,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function RentalCard() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [_guests, setGuests] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !pickupDate || !dropoffDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Search submitted! Our team will contact you shortly.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-forest rounded-2xl p-8 flex-1 min-w-0"
    >
      <div className="mb-6">
        <span className="text-terra text-xs font-bold tracking-widest uppercase">
          Explore India
        </span>
        <h2 className="text-white font-display text-3xl font-bold mt-1">
          Campervan Rental
        </h2>
        <p className="text-white/70 text-sm mt-2">
          Book your adventure for a day, weekend, or longer.
        </p>
      </div>

      {submitted ? (
        <div
          className="flex flex-col items-center justify-center py-8 text-center"
          data-ocid="rental.success_state"
        >
          <CheckCircle2 className="w-12 h-12 text-terra mb-3" />
          <h3 className="text-white font-semibold text-lg">
            Request Submitted!
          </h3>
          <p className="text-white/70 text-sm mt-1">
            Our team will reach out to confirm your booking.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            className="mt-4 bg-terra hover:bg-terra/90 text-white"
            data-ocid="rental.new_search.button"
          >
            New Search
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <Label className="text-white/80 text-sm">Location *</Label>
            <Select onValueChange={setLocation}>
              <SelectTrigger
                className="mt-1 bg-white/10 border-white/20 text-white"
                data-ocid="rental.location.select"
              >
                <SelectValue placeholder="Choose a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="goa">Goa</SelectItem>
                <SelectItem value="manali">Manali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-white/80 text-sm">Pickup Date *</Label>
              <Input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white"
                data-ocid="rental.pickup_date.input"
              />
            </div>
            <div>
              <Label className="text-white/80 text-sm">Return Date *</Label>
              <Input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white"
                data-ocid="rental.dropoff_date.input"
              />
            </div>
          </div>

          <div>
            <Label className="text-white/80 text-sm">Guests</Label>
            <Select onValueChange={setGuests}>
              <SelectTrigger
                className="mt-1 bg-white/10 border-white/20 text-white"
                data-ocid="rental.guests.select"
              >
                <SelectValue placeholder="Number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests (max for small van)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-terra hover:bg-terra/90 text-white font-semibold py-5"
            data-ocid="rental.search.button"
          >
            Search Available Vans
          </Button>
        </form>
      )}
    </motion.div>
  );
}

function ScheduleCallModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [_time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Call scheduled! We'll reach you at the preferred time.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30"
          data-ocid="invest.schedule_call.open_modal_button"
        >
          <Phone className="w-4 h-4 mr-2" />
          Schedule Call
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="invest.schedule_call.dialog">
        <DialogHeader>
          <DialogTitle>Schedule a Call</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div
            className="text-center py-6"
            data-ocid="invest.schedule_call.success_state"
          >
            <CheckCircle2 className="w-10 h-10 text-forest mx-auto mb-2" />
            <p className="font-semibold">We'll be in touch soon!</p>
            <p className="text-muted-foreground text-sm mt-1">
              Expect a call within 24 hours.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setOpen(false);
              }}
              className="mt-4 bg-forest text-white"
              data-ocid="invest.schedule_call.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="mt-1"
                data-ocid="invest.schedule_call.name.input"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
                className="mt-1"
                data-ocid="invest.schedule_call.phone.input"
              />
            </div>
            <div>
              <Label>Preferred Time</Label>
              <Select onValueChange={setTime}>
                <SelectTrigger
                  className="mt-1"
                  data-ocid="invest.schedule_call.time.select"
                >
                  <SelectValue placeholder="Select a slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9AM – 12PM)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12PM – 4PM)
                  </SelectItem>
                  <SelectItem value="evening">Evening (4PM – 7PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
                data-ocid="invest.schedule_call.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-forest text-white"
                data-ocid="invest.schedule_call.submit_button"
              >
                Confirm
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CoOwnershipCard() {
  const stats = [
    {
      icon: Users,
      label: "Co-owners / Van",
      value: "6",
      sub: "Small campervans",
    },
    {
      icon: Calendar,
      label: "Ownership Period",
      value: "4 Yrs",
      sub: "Then exit & earn",
    },
    {
      icon: TrendingUp,
      label: "Total Investment",
      value: "₹5L",
      sub: "All-white transactions",
    },
    {
      icon: Shield,
      label: "Annual Returns",
      value: "₹2L",
      sub: "Avg per co-owner",
    },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="bg-terra rounded-2xl p-8 flex-1 min-w-0"
    >
      <div className="mb-6">
        <span className="text-white/70 text-xs font-bold tracking-widest uppercase">
          Investment
        </span>
        <h2 className="text-white font-display text-3xl font-bold mt-1">
          Co-Ownership Program
        </h2>
        <p className="text-white/70 text-sm mt-2">
          Own a share, earn monthly returns, live the adventure.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/15 rounded-xl p-4 border border-white/20"
          >
            <stat.icon className="w-5 h-5 text-white/80 mb-2" />
            <div className="text-2xl font-bold text-white font-display">
              {stat.value}
            </div>
            <div className="text-white/90 text-xs font-semibold mt-0.5">
              {stat.label}
            </div>
            <div className="text-white/60 text-xs">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => scrollTo("#faq")}
          className="flex-1 bg-white text-terra hover:bg-white/90 font-semibold"
          data-ocid="invest.learn_more.button"
        >
          Learn More
        </Button>
        <ScheduleCallModal />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-terra text-xs font-bold tracking-widest uppercase">
            What We Offer
          </span>
          <h2 className="font-display text-4xl font-bold text-forest mt-2">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Whether you want to explore India in a campervan or invest and earn
            from one, we have you covered.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <RentalCard />
          <CoOwnershipCard />
        </div>
      </div>
    </section>
  );
}
