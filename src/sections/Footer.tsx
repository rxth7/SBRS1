import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mandatory Disclosure', href: '/mandatory-public-disclosure' },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  if (href === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (window.location.pathname === '/') {
    const sectionId = '#' + href.replace('/', '');
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }
  window.location.href = href;
};

export default function Footer() {
  return (
    <footer className="bg-forest pt-16 lg:pt-20 pb-8">
      <span className="sr-only">school in karkala, best school in karkala, boarding school in karkala, residential school in karkala, Sri Bhuvanendra Residential School SBRS, CBSE school in Udupi, Karnataka residential school, hostel school, top school in Karnataka, school admission, education in karkala</span>
      <div className="content-max-width page-padding">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mb-12">
          {/* About Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-saffron rounded-lg flex items-center justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <span className="block font-playfair text-sm text-ivory font-medium leading-tight">
                  Sri Bhuvanendra
                </span>
                <span className="block font-inter text-[10px] text-forest-light uppercase tracking-wider">
                  Residential School
                </span>
              </div>
            </div>
            <p className="font-inter text-sm text-forest-light leading-relaxed mb-5">
              Founded in 2001 under the blessings of His Holiness Srimath Bhuvanendra Thirtha 
              Swamiji, providing quality education from Nursery to Grade 10.
            </p>
            {/* Emblem placeholder */}
            <div className="w-20 h-20 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center">
              <span className="font-playfair text-2xl text-saffron">ॐ</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-inter text-xs uppercase tracking-[0.15em] text-saffron mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="font-inter text-sm text-forest-light hover:text-saffron hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-inter text-xs uppercase tracking-[0.15em] text-saffron mb-5">
              Connect
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-1" />
                <span className="font-inter text-sm text-forest-light">
                  Madhav Nagar, Near Industrial Area, Karkala, Udupi District, Karnataka, India — 574104
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                <a href="tel:+918197421795" className="font-inter text-sm text-forest-light hover:text-saffron transition-colors">
                  +91 81974 21795
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                <a href="tel:+919844548735" className="font-inter text-sm text-forest-light hover:text-saffron transition-colors">
                  +91 98445 48735
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-saffron flex-shrink-0" />
                <a href="mailto:sbrs2002@gmail.com" className="font-inter text-sm text-forest-light hover:text-saffron transition-colors">
                  sbrs2002@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/groups/526866964341592/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-forest-light/10 rounded-lg flex items-center justify-center hover:bg-saffron/20 transition-colors group"
              >
                <Facebook className="w-4 h-4 text-forest-light group-hover:text-saffron transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/sbrskarkala/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-forest-light/10 rounded-lg flex items-center justify-center hover:bg-saffron/20 transition-colors group"
              >
                <Instagram className="w-4 h-4 text-forest-light group-hover:text-saffron transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCBP0uKudmg7alGvq_wZv40Q"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-forest-light/10 rounded-lg flex items-center justify-center hover:bg-saffron/20 transition-colors group"
              >
                <Youtube className="w-4 h-4 text-forest-light group-hover:text-saffron transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-saffron/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-forest-light text-center sm:text-left">
            &copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All Rights Reserved.
          </p>
          <p className="font-inter text-xs text-forest-light/60 text-center sm:text-right">
            Maintained by Dept of Computer Science • Designed with care at SBRS
          </p>
        </div>
      </div>
    </footer>
  );
}
