import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  ChefHat,
  MapPin,
  Navigation,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

type Amenity = "bed" | "kitchen" | "gps" | "wifi";

interface Van {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
  sleeps: number;
  coOwners: number | string;
  investment: string | null;
  pricePerNight: string;
  originalPrice: string | null;
  discountPercent: number | null;
  status: string;
  amenities: Amenity[];
  rentalAvailable: boolean;
  coOwnAvailable: boolean;
}

const availableVehicles: Van[] = [
  {
    id: 5,
    name: "RelaaxHut BH Caravan",
    type: "Luxury Caravan",
    image: "/assets/img_7852-019d3fde-fdd3-761d-a67b-ba265d419431.jpg",
    location: "Bangalore",
    sleeps: 4,
    coOwners: 0,
    investment: null,
    pricePerNight: "₹9,000",
    originalPrice: null,
    discountPercent: null,
    status: "Available",
    amenities: ["bed", "kitchen", "gps"],
    rentalAvailable: true,
    coOwnAvailable: false,
  },
  {
    id: 7,
    name: "RelaaxHut BH Caravan",
    type: "Luxury Caravan",
    image: "/assets/uploads/8744559d-6462-460e-96fe-391cc5effaa7-1.jpeg",
    location: "Delhi NCR",
    sleeps: 4,
    coOwners: 0,
    investment: null,
    pricePerNight: "₹9,000",
    originalPrice: null,
    discountPercent: null,
    status: "Available",
    amenities: ["bed", "kitchen", "gps"],
    rentalAvailable: true,
    coOwnAvailable: false,
  },
];

const underDevelopmentVehicles: Van[] = [
  {
    id: 1,
    name: "Tata Yodha",
    type: "Small Campervan",
    image: "/assets/uploads/8744559d-6462-460e-96fe-391cc5effaa7-1.jpeg",
    location: "NCR (Delhi)",
    sleeps: 4,
    coOwners: 6,
    investment: "₹5 Lakh",
    pricePerNight: "TBA",
    originalPrice: null,
    discountPercent: null,
    status: "Coming Soon",
    amenities: ["bed", "kitchen", "gps"],
    rentalAvailable: false,
    coOwnAvailable: true,
  },
  {
    id: 6,
    name: "Tata Yodha",
    type: "Small Campervan",
    image: "/assets/uploads/8744559d-6462-460e-96fe-391cc5effaa7-1.jpeg",
    location: "Bangalore",
    sleeps: 4,
    coOwners: 6,
    investment: "₹5 Lakh",
    pricePerNight: "TBA",
    originalPrice: null,
    discountPercent: null,
    status: "Coming Soon",
    amenities: ["bed", "kitchen", "gps"],
    rentalAvailable: false,
    coOwnAvailable: true,
  },
  {
    id: 2,
    name: "Tempo Traveller XL",
    type: "Large Campervan",
    image: "/assets/uploads/2-1-4.jpeg",
    location: "Bangalore",
    sleeps: 8,
    coOwners: "10–11",
    investment: "₹5 Lakh",
    pricePerNight: "TBA",
    originalPrice: null,
    discountPercent: null,
    status: "Coming Soon",
    amenities: ["bed", "kitchen", "wifi"],
    rentalAvailable: false,
    coOwnAvailable: true,
  },
];

const amenityIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  bed: BedDouble,
  kitchen: ChefHat,
  gps: Navigation,
  wifi: Wifi,
};

function FleetCard({ van, index }: { van: Van; index: number }) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-heavy transition-shadow duration-300 flex flex-col"
      data-ocid={`fleet.item.${index + 1}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={van.image}
          alt={van.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <Badge
          className={`absolute top-3 right-3 text-xs font-semibold ${
            van.status === "Available"
              ? "bg-green-500 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {van.status}
        </Badge>
        {van.discountPercent && (
          <Badge className="absolute top-3 left-3 text-xs font-semibold bg-red-500 text-white">
            {van.discountPercent}% OFF
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
          <MapPin className="w-3 h-3" />
          {van.location}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-terra text-xs font-bold uppercase tracking-wide">
            {van.type}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-forest mb-3">
          {van.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" /> Sleeps {van.sleeps}
          </span>
          {van.coOwnAvailable && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {van.coOwners} Co-owners
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div>
            <div className="text-xs text-muted-foreground">Rental from</div>
            {van.originalPrice ? (
              <div className="flex items-baseline gap-2">
                <div className="font-bold text-forest text-lg">
                  {van.pricePerNight}
                  <span className="text-xs font-normal text-muted-foreground">
                    /night
                  </span>
                </div>
                <div className="text-sm text-muted-foreground line-through">
                  {van.originalPrice}
                </div>
              </div>
            ) : (
              <div className="font-bold text-forest text-lg">
                {van.pricePerNight}
                <span className="text-xs font-normal text-muted-foreground">
                  {van.pricePerNight !== "TBA" ? "/night" : ""}
                </span>
              </div>
            )}
          </div>
          {van.coOwnAvailable && van.investment ? (
            <div>
              <div className="text-xs text-muted-foreground">Co-ownership</div>
              <div className="font-bold text-terra">{van.investment}</div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground italic">
              No co-ownership
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mb-5">
          {van.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <div
                key={amenity}
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center"
              >
                <Icon className="w-4 h-4 text-forest" />
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex gap-2">
          <Button
            onClick={() => scrollTo("#services")}
            disabled={!van.rentalAvailable}
            className="flex-1 bg-forest hover:bg-forest/90 text-white text-sm"
            data-ocid={`fleet.rent.button.${index + 1}`}
          >
            {van.rentalAvailable ? "Rent Now" : "Coming Soon"}
          </Button>
          {van.coOwnAvailable && (
            <Button
              onClick={() => scrollTo("#invest")}
              variant="outline"
              className="flex-1 border-terra text-terra hover:bg-terra hover:text-white text-sm"
              data-ocid={`fleet.co_own.button.${index + 1}`}
            >
              Co-Own
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FleetSection() {
  return (
    <section id="fleet" className="py-20 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-terra text-xs font-bold tracking-widest uppercase">
            Our Vehicles
          </span>
          <h2 className="font-display text-4xl font-bold text-white mt-2 uppercase tracking-wide">
            Meet the Fleet
          </h2>
          <p className="text-white/60 mt-3">
            Vehicles available for rental and upcoming additions.
          </p>
        </div>

        {/* Available Vehicles */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/20" />
            <span className="text-green-400 text-sm font-bold uppercase tracking-widest px-3">
              Vehicles Available
            </span>
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {availableVehicles.map((van, i) => (
              <div key={van.id} className="w-full max-w-sm">
                <FleetCard van={van} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Under Development */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/20" />
            <span className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-widest px-3">
              <Wrench className="w-4 h-4" />
              Under Development
            </span>
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {underDevelopmentVehicles.map((van, i) => (
              <FleetCard key={van.id} van={van} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
