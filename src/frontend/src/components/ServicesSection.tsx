import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Car,
  CheckCircle2,
  Info,
  Mail,
  MapPin,
  Phone,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type NightEntry = {
  date: string;
  day: string;
  rate: number;
  isWeekend: boolean;
};

function RentalCard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  // Step 2
  const [driverPref, setDriverPref] = useState<"without" | "with">("without");

  // Step 3
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [hasDL, setHasDL] = useState(false);

  const locationLabel =
    location === "delhi"
      ? "Delhi"
      : location === "bangalore"
        ? "Bangalore"
        : "";

  const calculateNights = (): NightEntry[] => {
    if (!pickupDate || !dropoffDate || dropoffDate <= pickupDate) return [];
    const entries: NightEntry[] = [];
    let current = new Date(`${pickupDate}T00:00:00`);
    const end = new Date(`${dropoffDate}T00:00:00`);
    while (current < end) {
      const dow = current.getDay(); // 0=Sun, 6=Sat
      const isWeekend = dow === 0 || dow === 6;
      entries.push({
        date: current.toISOString().split("T")[0],
        day: current.toLocaleDateString("en-IN", { weekday: "short" }),
        rate: isWeekend ? 11000 : 9000,
        isWeekend,
      });
      current = new Date(current.getTime() + 86400000);
    }
    return entries;
  };

  const nights = calculateNights();
  const baseTotal = nights.reduce((sum, n) => sum + n.rate, 0);
  const driverCost = driverPref === "with" ? nights.length * 1500 : 0;
  const grandTotal = baseTotal + driverCost;

  const fmt = (amount: number) => `\u20b9${amount.toLocaleString("en-IN")}`;

  const weekdayNights = nights.filter((n) => !n.isWeekend);
  const weekendNights = nights.filter((n) => n.isWeekend);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !pickupDate || !dropoffDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (dropoffDate <= pickupDate) {
      toast.error("Return date must be after pickup date");
      return;
    }
    setStep(2);
  };

  const handleStep2 = () => {
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !pickupLocation || !dropLocation) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (driverPref === "without" && !hasDL) {
      toast.error(
        "A valid driving licence is required to rent without a driver",
      );
      return;
    }
    setStep(4);
  };

  const handleSendEmail = () => {
    let breakdownText = "";
    if (weekdayNights.length > 0) {
      breakdownText += `${weekdayNights.length} weeknight(s) x Rs.9,000 = Rs.${(weekdayNights.length * 9000).toLocaleString("en-IN")}`;
    }
    if (weekendNights.length > 0) {
      if (breakdownText) breakdownText += "\n";
      breakdownText += `${weekendNights.length} weekend night(s) x Rs.11,000 = Rs.${(weekendNights.length * 11000).toLocaleString("en-IN")}`;
    }

    const driverLine =
      driverPref === "with"
        ? `With Driver (+Rs.1,500/night = Rs.${driverCost.toLocaleString("en-IN")})`
        : "Without Driver";

    const subject = encodeURIComponent(
      `Campervan Booking - RelaaxHut BH Caravan - ${name} - ${pickupDate}`,
    );

    const body = encodeURIComponent(
      `CAMPERVAN BOOKING REQUEST\n=========================\n\nVehicle: RelaaxHut BH Caravan (Bangalore)\n\nBOOKING DETAILS\n---------------\nPickup Location: ${pickupLocation}\nDrop Location: ${dropLocation}\nPickup Date: ${pickupDate}\nReturn Date: ${dropoffDate}\nTotal Nights: ${nights.length}\n\nCOST BREAKDOWN\n--------------\n${breakdownText}\nBase Total: Rs.${baseTotal.toLocaleString("en-IN")}\nDriver: ${driverLine}\nGRAND TOTAL: Rs.${grandTotal.toLocaleString("en-IN")}\n\nCUSTOMER DETAILS\n----------------\nName: ${name}\nMobile: ${phone}\nEmail: ${email}\nDriving Licence: ${hasDL ? "Confirmed" : "Not confirmed"}\n`,
    );

    window.open(
      `mailto:relaaxhut@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
  };

  const resetForm = () => {
    setStep(1);
    setLocation("");
    setPickupDate("");
    setDropoffDate("");
    setDriverPref("without");
    setName("");
    setPhone("");
    setEmail("");
    setPickupLocation("");
    setDropLocation("");
    setHasDL(false);
  };

  const RecapBar = ({ showDriver = false }: { showDriver?: boolean }) => (
    <div className="bg-white/10 rounded-lg px-4 py-3 text-white/80 text-xs flex flex-wrap items-center gap-2 mb-4">
      <span className="font-semibold text-white">{locationLabel}</span>
      <span className="opacity-50">·</span>
      <span>
        {pickupDate} \u2192 {dropoffDate}
      </span>
      <span className="opacity-50">·</span>
      <span>
        {nights.length} night{nights.length !== 1 ? "s" : ""}
      </span>
      <span className="opacity-50">·</span>
      <span className="font-semibold text-terra">{fmt(baseTotal)}</span>
      {showDriver && (
        <>
          <span className="opacity-50">·</span>
          <span>
            {driverPref === "with" ? "With Driver" : "Without Driver"}
          </span>
        </>
      )}
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center gap-1.5 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            s === step
              ? "bg-terra w-6"
              : s < step
                ? "bg-terra/60 w-3"
                : "bg-white/20 w-3"
          }`}
        />
      ))}
      <span className="text-white/50 text-xs ml-1">Step {step} of 4</span>
    </div>
  );

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

      <AnimatePresence mode="wait">
        {/* ─── STEP 1: Date & Location ─── */}
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleStep1}
            className="space-y-4"
          >
            <StepIndicator />

            <div>
              <Label className="text-white/80 text-sm">Location *</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger
                  className="mt-1 bg-white/10 border-white/20 text-white"
                  data-ocid="rental.location.select"
                >
                  <SelectValue placeholder="Choose a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
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
                  min={new Date().toISOString().split("T")[0]}
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
                  min={pickupDate || new Date().toISOString().split("T")[0]}
                  className="mt-1 bg-white/10 border-white/20 text-white"
                  data-ocid="rental.dropoff_date.input"
                />
              </div>
            </div>

            {/* Night-by-night cost breakdown */}
            {nights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 rounded-xl overflow-hidden"
              >
                <div className="px-4 pt-3 pb-1">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                    Cost Breakdown
                  </p>
                </div>
                <div className="max-h-36 overflow-y-auto px-4">
                  {nights.map((n) => (
                    <div
                      key={n.date}
                      className="flex justify-between items-center py-1 border-b border-white/10 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium w-8 ${
                            n.isWeekend ? "text-amber-300" : "text-white/60"
                          }`}
                        >
                          {n.day}
                        </span>
                        <span className="text-white/70 text-xs">{n.date}</span>
                        {n.isWeekend && (
                          <span className="text-amber-300/70 text-xs">
                            (weekend)
                          </span>
                        )}
                      </div>
                      <span className="text-white text-xs font-semibold">
                        {fmt(n.rate)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white/10 mt-1">
                  <span className="text-white/80 text-sm font-semibold">
                    Base Total ({nights.length} night
                    {nights.length !== 1 ? "s" : ""})
                  </span>
                  <span className="text-terra text-lg font-bold">
                    {fmt(baseTotal)}
                  </span>
                </div>
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full bg-terra hover:bg-terra/90 text-white font-semibold py-5"
              data-ocid="rental.next.button"
            >
              Check Availability \u2192
            </Button>
          </motion.form>
        )}

        {/* ─── STEP 2: Driver Preference ─── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <StepIndicator />
            <RecapBar />

            <div>
              <Label className="text-white/80 text-sm mb-3 block">
                Driver Preference
              </Label>
              <RadioGroup
                value={driverPref}
                onValueChange={(v) => setDriverPref(v as "without" | "with")}
                className="space-y-2"
                data-ocid="rental.driver_pref.radio"
              >
                <label
                  htmlFor="driver-without"
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    driverPref === "without"
                      ? "bg-white/20 border-terra"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <RadioGroupItem
                    value="without"
                    id="driver-without"
                    className="border-white/40 text-terra"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Without Driver
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      Self-drive — valid DL required
                    </p>
                  </div>
                </label>

                <label
                  htmlFor="driver-with"
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    driverPref === "with"
                      ? "bg-white/20 border-terra"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <RadioGroupItem
                    value="with"
                    id="driver-with"
                    className="border-white/40 text-terra"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      With Driver
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      +\u20b91,500/night — we provide the driver
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Food allowance info box */}
            {driverPref === "with" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-3 bg-amber-500/15 border border-amber-400/30 rounded-xl p-3"
              >
                <Info className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <p className="text-amber-200 text-xs leading-relaxed">
                  <span className="font-semibold">Food Allowances:</span> Driver
                  food costs during the trip are the traveller&#39;s
                  responsibility. Please factor in meal expenses for the driver
                  during your journey.
                </p>
              </motion.div>
            )}

            {/* Updated total */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between text-white/70 text-sm">
                <span>Base Cost ({nights.length} nights)</span>
                <span>{fmt(baseTotal)}</span>
              </div>
              {driverPref === "with" && (
                <div className="flex justify-between text-white/70 text-sm mt-1">
                  <span>
                    Driver ({nights.length} nights \u00d7 \u20b91,500)
                  </span>
                  <span>{fmt(driverCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-base mt-2 pt-2 border-t border-white/20">
                <span>Grand Total</span>
                <span className="text-terra">{fmt(grandTotal)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white/15 hover:bg-white/25 text-white border border-white/20"
                data-ocid="rental.back.button"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                type="button"
                onClick={handleStep2}
                className="flex-1 bg-terra hover:bg-terra/90 text-white font-semibold"
                data-ocid="rental.driver_next.button"
              >
                Next \u2192
              </Button>
            </div>
          </motion.div>
        )}

        {/* ─── STEP 3: Customer Details ─── */}
        {step === 3 && (
          <motion.form
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleStep3}
            className="space-y-4"
          >
            <StepIndicator />
            <RecapBar showDriver />

            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label className="text-white/80 text-sm">Full Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  data-ocid="rental.name.input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">
                    Mobile Number *
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-ocid="rental.phone.input"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-ocid="rental.email.input"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white/80 text-sm">
                  Pickup Location *
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. HSR Layout, Bangalore"
                    required
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-ocid="rental.pickup_location.input"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white/80 text-sm">Drop Location *</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="e.g. Indiranagar, Bangalore"
                    required
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    data-ocid="rental.drop_location.input"
                  />
                </div>
              </div>
            </div>

            {/* DL Checkbox */}
            <label
              className="flex items-start gap-3 bg-white/10 rounded-xl p-3 cursor-pointer"
              htmlFor="dl-confirm"
              data-ocid="rental.dl.checkbox"
            >
              <Checkbox
                id="dl-confirm"
                checked={hasDL}
                onCheckedChange={(v) => setHasDL(!!v)}
                className="mt-0.5 border-white/40 data-[state=checked]:bg-terra data-[state=checked]:border-terra"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  I have a valid driving licence
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  {driverPref === "without"
                    ? "Required for self-drive rentals"
                    : "Optional — confirm if you hold a valid DL"}
                </p>
              </div>
            </label>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-white/15 hover:bg-white/25 text-white border border-white/20"
                data-ocid="rental.back_to_driver.button"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-terra hover:bg-terra/90 text-white font-semibold"
                data-ocid="rental.confirm.button"
              >
                Confirm Booking \u2192
              </Button>
            </div>
          </motion.form>
        )}

        {/* ─── STEP 4: Booking Confirmed ─── */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-4"
            data-ocid="rental.success_state"
          >
            {/* Success header */}
            <div className="flex flex-col items-center text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-14 h-14 text-terra mb-3" />
              </motion.div>
              <h3 className="text-white font-bold text-2xl font-display">
                Booking Confirmed!
              </h3>
              <p className="text-white/60 text-sm mt-1">
                Review the summary below and send it to us.
              </p>
            </div>

            {/* Booking summary card (light receipt style) */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              {/* Vehicle */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Car className="w-5 h-5 text-forest flex-shrink-0" />
                <div>
                  <p className="font-bold text-forest text-sm">
                    RelaaxHut BH Caravan
                  </p>
                  <p className="text-gray-500 text-xs">Bangalore</p>
                </div>
              </div>

              {/* Locations & Dates */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-terra flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="text-gray-500">
                      Pickup:{" "}
                      <span className="text-gray-800 font-medium">
                        {pickupLocation}
                      </span>
                    </p>
                    <p className="text-gray-500 mt-0.5">
                      Drop:{" "}
                      <span className="text-gray-800 font-medium">
                        {dropLocation}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-terra flex-shrink-0" />
                  <p className="text-xs text-gray-500">
                    {pickupDate} <span className="text-gray-400">\u2192</span>{" "}
                    {dropoffDate}
                    <span className="text-gray-400 ml-1">
                      ({nights.length} night{nights.length !== 1 ? "s" : ""})
                    </span>
                  </p>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4 text-xs space-y-1">
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-[10px] mb-2">
                  Cost Breakdown
                </p>
                {weekdayNights.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {weekdayNights.length} weeknight
                      {weekdayNights.length > 1 ? "s" : ""} \u00d7 \u20b99,000
                    </span>
                    <span className="font-medium text-gray-800">
                      {fmt(weekdayNights.length * 9000)}
                    </span>
                  </div>
                )}
                {weekendNights.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {weekendNights.length} weekend night
                      {weekendNights.length > 1 ? "s" : ""} \u00d7 \u20b911,000
                    </span>
                    <span className="font-medium text-gray-800">
                      {fmt(weekendNights.length * 11000)}
                    </span>
                  </div>
                )}
                {driverPref === "with" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Driver ({nights.length} nights \u00d7 \u20b91,500)
                    </span>
                    <span className="font-medium text-gray-800">
                      {fmt(driverCost)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 mt-1 border-t border-gray-200">
                  <span className="font-bold text-forest">Grand Total</span>
                  <span className="font-bold text-terra text-sm">
                    {fmt(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Driver info */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <Car className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-600">
                  Driver:{" "}
                  <span className="font-medium text-gray-800">
                    {driverPref === "with"
                      ? "With Driver (+\u20b91,500/night)"
                      : "Without Driver (Self-drive)"}
                  </span>
                </span>
              </div>

              {/* Customer details */}
              <div className="border-t border-gray-100 pt-3 space-y-1">
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-[10px] mb-2">
                  Customer
                </p>
                <p className="text-xs text-gray-700 font-medium">{name}</p>
                <p className="text-xs text-gray-500">{phone}</p>
                <p className="text-xs text-gray-500">{email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  DL:{" "}
                  {hasDL ? (
                    <span className="text-green-600 font-medium">
                      Confirmed
                    </span>
                  ) : (
                    <span className="text-gray-400">Not confirmed</span>
                  )}
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <Button
              onClick={handleSendEmail}
              className="w-full bg-terra hover:bg-terra/90 text-white font-semibold py-5"
              data-ocid="rental.send_email.button"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Booking to RelaaxHut
            </Button>

            <button
              type="button"
              onClick={resetForm}
              className="w-full text-white/60 hover:text-white/90 text-sm underline underline-offset-2 transition-colors"
              data-ocid="rental.new_booking.button"
            >
              Make Another Booking
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
            <p className="font-semibold">We&#39;ll be in touch soon!</p>
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
                  <SelectItem value="morning">
                    Morning (9AM \u2013 12PM)
                  </SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12PM \u2013 4PM)
                  </SelectItem>
                  <SelectItem value="evening">
                    Evening (4PM \u2013 7PM)
                  </SelectItem>
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
      value: "\u20b95L",
      sub: "All-white transactions",
    },
    {
      icon: Shield,
      label: "Annual Returns",
      value: "\u20b92L",
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
