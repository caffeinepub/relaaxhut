import { Truck } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-forest text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-terra flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                RelaaxHut
              </span>
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Explore India. Own a Piece of It.
            </p>
            <p className="text-xs text-white/40">RelaaxHut Private Limited</p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "" },
                { label: "Our Fleet", href: "#fleet" },
                { label: "Invest", href: "#invest" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (link.href) scrollTo(link.href);
                    }}
                    className="text-sm text-white/60 hover:text-terra transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Campervan Rental", href: "#services" },
                { label: "Co-Ownership", href: "#invest" },
                { label: "RelaaxHut App", href: "" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (link.href) scrollTo(link.href);
                    }}
                    className="text-sm text-white/60 hover:text-terra transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/60 mb-5">
              <li>📞 +91 91760 15517</li>
              <li>✉️ relaaxhut@gmail.com</li>
              <li>📍 Delhi & Bangalore, India</li>
            </ul>
            <div className="flex items-center gap-3">
              {[
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiFacebook, label: "Facebook" },
                { Icon: SiYoutube, label: "YouTube" },
                { Icon: SiLinkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-terra flex items-center justify-center transition-colors"
                  data-ocid={`footer.${label.toLowerCase()}.link`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {currentYear} RelaaxHut Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terra transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
