import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Madhav Nagar, Karkala, Udupi District, Karnataka — 574104',
    href: 'https://maps.google.com/?q=Sri+Bhuvanendra+Residential+School+Karkala',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98445 48735',
    href: 'tel:+919844548735',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 81974 21795',
    href: 'tel:+918197421795',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sbrs2002@gmail.com',
    href: 'mailto:sbrs2002@gmail.com',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Monday – Saturday\n9:00 AM – 4:00 PM',
    href: null,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameWords = formData.name.trim().split(/\s+/).filter(Boolean);
    if (nameWords.length === 0) {
      newErrors.name = 'Name is required';
    } else if (nameWords.length > 5) {
      newErrors.name = 'Name must be 5 words or less';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (formData.phone && digitsOnly.length > 12) {
      newErrors.phone = 'Phone must be max 12 digits';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > 500) {
      newErrors.message = 'Message must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
      setFormData({ ...formData, phone: digitsOnly });
      return;
    }

    if (name === 'name') {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 5) return;
    }

    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      });

      await fetch(
        'https://script.google.com/macros/s/AKfycbzlM3GsmAqrP2bA4OcikNQwi4VLXUOPbYq6m-mTsZsXALAbXNB8_EeJjr5xZpDsr4xx/exec',
        { method: 'POST', body: params }
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-slate"
    >
      <span className="sr-only">contact Sri Bhuvanendra Residential School Karkala, school near Mangalore Udupi, best school in Karkala Karnataka, boarding school admission inquiry, residential school contact, SBRS Karkala address phone email</span>
      <div className="py-20 lg:py-28">
        <div className="content-max-width page-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <div className="order-2 lg:order-1">
            <span className="inline-block font-inter text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
              Connect With Us
            </span>
            <h2 className="font-playfair text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.02em] text-ivory mb-6">
              Get in Touch
            </h2>
            <p className="font-inter text-base text-forest-light mb-10">
              We would love to hear from you. Reach out to us for any inquiries about
              admissions, academics, or general information.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <span className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-1">
                      {info.label}
                    </span>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-inter text-sm text-ivory hover:text-saffron transition-colors whitespace-pre-line"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="font-inter text-sm text-ivory whitespace-pre-line">
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <span className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-4">
                Follow Us
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/groups/526866964341592/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-forest-light/10 rounded-lg flex items-center justify-center hover:bg-saffron/20 transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-forest-light group-hover:text-saffron transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/sbrskarkala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-forest-light/10 rounded-lg flex items-center justify-center hover:bg-saffron/20 transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-forest-light group-hover:text-saffron transition-colors" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCBP0uKudmg7alGvq_wZv40Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-forest-light/10 rounded-lg flex items-center justify-center hover:bg-saffron/20 transition-colors group"
                >
                  <Youtube className="w-5 h-5 text-forest-light group-hover:text-saffron transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div ref={formRef} className="order-1 lg:order-2">
            {/* Contact Form */}
            <div className="bg-ivory/5 border border-saffron/20 rounded-xl p-8">
              <h3 className="font-playfair text-xl text-ivory mb-6">
                Send us a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-saffron" />
                  </div>
                  <h4 className="font-playfair text-xl text-ivory mb-2">Message Sent!</h4>
                  <p className="font-inter text-sm text-forest-light">
                    We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-2">
                        Name <span className="text-forest-light/50">(max 5 words)</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-saffron/30 focus:border-saffron pb-2 text-ivory font-inter text-sm outline-none transition-colors placeholder:text-forest-light/50"
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1 font-inter">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-saffron/30 focus:border-saffron pb-2 text-ivory font-inter text-sm outline-none transition-colors placeholder:text-forest-light/50"
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1 font-inter">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-2">
                        Phone <span className="text-forest-light/50">(max 12 digits)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-saffron/30 focus:border-saffron pb-2 text-ivory font-inter text-sm outline-none transition-colors placeholder:text-forest-light/50"
                        placeholder="919844548735"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1 font-inter">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-saffron/30 focus:border-saffron pb-2 text-ivory font-inter text-sm outline-none transition-colors"
                      >
                        <option value="General Inquiry" className="bg-slate">General Inquiry</option>
                        <option value="Admission" className="bg-slate">Admission</option>
                        <option value="Academics" className="bg-slate">Academics</option>
                        <option value="Fee Structure" className="bg-slate">Fee Structure</option>
                        <option value="Other" className="bg-slate">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-inter text-xs uppercase tracking-[0.1em] text-forest-light mb-2">
                      Message <span className="text-forest-light/50">({formData.message.length}/500)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      maxLength={500}
                      className="w-full bg-transparent border-b border-saffron/30 focus:border-saffron pb-2 text-ivory font-inter text-sm outline-none transition-colors resize-none placeholder:text-forest-light/50"
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1 font-inter">{errors.message}</p>}
                  </div>

                  {errors.submit && <p className="text-red-400 text-sm font-inter">{errors.submit}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full h-[300px] lg:h-[400px] px-4 pb-4 lg:px-6 lg:pb-6">
        <iframe
          src="https://maps.google.com/maps?q=6288+JMR+Sri+Bhuvanendra+Residential+School,+Karkala,+Karnataka+574104,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '12px', filter: 'grayscale(0.3) brightness(0.8)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SBRS Location"
        />
      </div>
    </section>
  );
}
