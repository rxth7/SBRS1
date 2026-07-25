import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { getDisclosureLinks } from '../lib/disclosureLinksStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', hasDropdown: true, dropdownItems: [{ label: 'Mandatory Public Disclosure', href: '/mandatory-public-disclosure' }] },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Academics', href: '/academics', hasDropdown: true, dropdownItems: [
    { label: 'Faculties', href: '/faculty' },
    { label: 'Curriculum', href: '/curriculum' },
  ]},
  { label: 'Gallery', href: '/gallery' },
  { label: 'Admissions', href: '/admissions', hasDropdown: true, dropdownItems: [{ label: 'View Fee Structure', href: '/fee-structure' }] },
  { label: 'Alumni', href: '/alumni', hasDropdown: true, dropdownItems: [{ label: 'Alumni Association', href: '/alumni-association' }, { label: 'Alumni Meet', href: '/alumni-meet' }, { label: 'Success Stories', href: '/success-stories' }] },
  { label: 'Events', href: '/events', hasDropdown: true, dropdownItems: [{ label: 'Upcoming Events', href: '/upcoming-events' }, { label: 'Latest News', href: '/latest-news' }] },
  { label: 'Contact', href: '/contact', hasDropdown: true, dropdownItems: [{ label: 'Feedback', href: '/feedback' }] },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [appFormUrl, setAppFormUrl] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    getDisclosureLinks().then((data) => {
      const entry = data.find((l) => l.section === 'application_form' && l.sl_no === 1);
      if (entry?.link_url) setAppFormUrl(entry.link_url);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (isHomePage) {
      const sectionId = '#' + href.replace('/', '');
      const target = document.querySelector(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // No matching homepage section (or not on homepage) → navigate to the route
    window.location.href = href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              setActiveLink('Home');
              setOpenDropdown(null);
              scrollToSection('/');
            }}
          >
            <span className="sr-only">Sri Bhuvanendra Residential School SBRS Karkala best boarding school in Karnataka residential school in Udupi</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-poppins text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">
                Sri Bhuvanendra
              </span>
              <span className="block font-poppins text-[9px] uppercase tracking-[0.1em] text-ivory/70">
                Residential School
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative nav-dropdown"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="flex items-center gap-1">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveLink(link.label);
                        scrollToSection(link.href);
                      }}
                      className={`nav-link relative group ${activeLink === link.label ? 'text-saffron' : ''}`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-saffron transition-all duration-300 ${
                          activeLink === link.label ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        style={{ transform: 'translateX(-50%)' }}
                      />
                    </a>
                    <button
                      type="button"
                      className="nav-link relative group p-0"
                      aria-label={`${link.label} menu`}
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 w-full">
                      <div className="bg-slate/95 backdrop-blur-md rounded-lg shadow-lg py-2 border border-ivory/10 min-w-[180px]">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-ivory/80 hover:text-saffron hover:bg-ivory/5 transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                        {link.label === 'Admissions' && (
                          <>
                            <a
                              href="https://docs.google.com/forms/d/e/1FAIpQLSc1MGjrQFwSNTQb19Vhj6qAo75GRiBiNcgjJfV_VN2BFZ30hA/viewform"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-ivory/80 hover:text-saffron hover:bg-ivory/5 transition-colors duration-200"
                            >
                              <ExternalLink size={12} />
                              Admission Enquiry Form
                            </a>
                            {appFormUrl ? (
                              <a
                                href={appFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-ivory/80 hover:text-saffron hover:bg-ivory/5 transition-colors duration-200"
                              >
                                <ExternalLink size={12} />
                                SBRS Application Form
                              </a>
                            ) : (
                              <span className="block px-4 py-2 text-sm text-ivory/40 cursor-default">
                                SBRS Application Form
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveLink(link.label);
                    scrollToSection(link.href);
                  }}
                  className={`nav-link relative group ${activeLink === link.label ? 'text-saffron' : ''}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-saffron transition-all duration-300 ${
                      activeLink === link.label ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ transform: 'translateX(-50%)' }}
                  />
                </a>
              )
            )}
          </div>

          {/* CTA Button */}
          <a
            href="/admissions"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('/admissions');
            }}
            className="hidden lg:inline-flex items-center px-4 py-2 bg-saffron text-forest text-[10px] font-semibold uppercase tracking-[0.1em] rounded-lg hover:bg-saffron-deep transition-colors duration-300"
          >
            Apply Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-ivory p-2 rounded-lg border border-ivory/30 hover:bg-ivory/10 transition-colors"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setOpenDropdown(null);
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-b from-slate via-slate/98 to-slate/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full gap-3 w-full max-w-[280px] mx-auto px-6">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="flex flex-col items-start gap-1.5">
                <button
                  onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.label ? null : link.label)}
                  className="font-poppins text-lg text-ivory hover:text-saffron transition-colors duration-300 flex items-center gap-2"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${mobileOpenDropdown === link.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileOpenDropdown === link.label && (
                  <div className="flex flex-col items-start gap-1.5 pl-4">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileOpenDropdown(null);
                        }}
                        className="font-poppins text-base text-ivory/70 hover:text-saffron transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {link.label === 'Admissions' && (
                      <>
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSc1MGjrQFwSNTQb19Vhj6qAo75GRiBiNcgjJfV_VN2BFZ30hA/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setMobileOpenDropdown(null);
                          }}
                          className="flex items-center gap-2 font-poppins text-base text-ivory/70 hover:text-saffron transition-colors duration-300"
                        >
                          <ExternalLink size={14} />
                          Admission Enquiry Form
                        </a>
                        {appFormUrl ? (
                          <a
                            href={appFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileOpenDropdown(null);
                            }}
                            className="flex items-center gap-2 font-poppins text-base text-ivory/70 hover:text-saffron transition-colors duration-300"
                          >
                            <ExternalLink size={14} />
                            SBRS Application Form
                          </a>
                        ) : (
                          <span className="font-poppins text-base text-ivory/40 cursor-default">SBRS Application Form</span>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  scrollToSection(link.href);
                }}
                className="font-poppins text-lg text-ivory hover:text-saffron transition-colors duration-300"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="/admissions"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              scrollToSection('/admissions');
            }}
            className="mt-2 btn-primary"
          >
            Apply Now
          </a>
        </div>
      </div>
    </>
  );
}
