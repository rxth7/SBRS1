import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Shield, HandHeart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: BookOpen,
    title: 'Knowledge',
    description: 'Academic rigor through CBSE curriculum with innovative teaching methodologies and digital learning resources.',
  },
  {
    icon: Shield,
    title: 'Character',
    description: 'Building integrity and moral strength through value-based education, discipline, and ethical leadership.',
  },
  {
    icon: HandHeart,
    title: 'Service',
    description: 'Instilling a spirit of selfless contribution to society through community outreach and social responsibility.',
  },
];

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll('.pillar-card');
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-ivory relative overflow-hidden"
    >
      <span className="sr-only">about Sri Bhuvanendra Residential School Karkala, best school in Karnataka, residential school vision mission, holistic education, student development, disciplined boarding school, quality education in Karnataka</span>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cream/50 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="content-max-width page-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Vision Text */}
          <div>
            <span className="inline-block font-inter text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
              Our Vision
            </span>
            <h2 className="section-title mb-6">
              Wisdom is purified<br />
              <span className="text-saffron">through knowledge</span>
            </h2>
            <p className="font-inter text-lg leading-relaxed text-forest-light mb-6">
              Guided by the motto <span className="font-playfair italic text-saffron">'बुद्धिर्ज्ञानेन शुद्ध्यति'</span> (Wisdom is purified through knowledge),
              we illuminate young minds with knowledge, wisdom, and values. Our mission is to create
              responsible global citizens who carry the torch of enlightenment to every corner of society.
            </p>
            <p className="font-inter text-base leading-relaxed text-forest-light">
              Inspired by the blessings of His Holiness Srimath Bhuvanendra Thirtha Swamiji and the
              visionary leadership of Padmashree Dr. T.M.A. Pai, we continue our journey of transforming
              lives through quality education.
            </p>

            {/* Sanskrit motto display */}
            <div className="mt-8 p-6 bg-slate rounded-lg">
              <p className="font-playfair text-2xl text-saffron text-center leading-relaxed">
                बुद्धिर्ज्ञानेन शुद्ध्यति
              </p>
              <p className="font-inter text-sm text-ivory/70 text-center mt-2">
                Wisdom is purified through knowledge
              </p>
            </div>
          </div>

          {/* Right - Value Pillars */}
          <div ref={pillarsRef} className="space-y-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="pillar-card card-bg p-6 lg:p-8 border-l-4 border-l-saffron hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-saffron/20 transition-colors">
                    <pillar.icon className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl text-forest mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-inter text-sm text-forest-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
