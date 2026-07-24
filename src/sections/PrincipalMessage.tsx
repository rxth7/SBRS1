import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { getFaculty, type FacultyMember } from '../lib/facultyStore';

gsap.registerPlugin(ScrollTrigger);

export default function PrincipalMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [principal, setPrincipal] = useState<FacultyMember | null>(null);

  useEffect(() => {
    getFaculty()
      .then((data) => {
        setPrincipal(data.find((t) => t.designation === 'Principal') || null);
      })
      .catch(() => setPrincipal(null));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );

        // Inner parallax
        const img = imageRef.current.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: 30 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }

      // Content entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
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

  const principalPhoto = principal?.image || '/images/principal-portrait.webp';
  const principalName = principal?.name;

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-cream overflow-hidden"
    >
      <span className="sr-only">principal message, best boarding school in Karkala, academic excellence, student development, disciplined education, top school in Karnataka, Sri Bhuvanendra Residential School</span>
      <div className="content-max-width page-padding">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left - Portrait */}
          <div ref={imageRef} className="relative">
            <div className="relative mx-auto lg:mx-0 lg:ml-8 w-[280px] h-[380px] lg:w-[480px] lg:h-[500px] overflow-hidden" style={{ borderRadius: '50% 50% 8px 8px' }}>
              <img
                src={principalPhoto}
                alt="Principal of SBRS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-saffron/30 rounded-lg -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-saffron/10 rounded-full -z-10" />
          </div>

          {/* Right - Quote */}
          <div ref={contentRef}>
            <span className="inline-block font-inter text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
              Principal's Message
            </span>

            <Quote className="w-10 h-10 text-saffron/40 mb-4" />

            <blockquote className="font-playfair text-xl lg:text-2xl text-forest leading-relaxed mb-6">
              "Education is not merely about academic excellence; it is about shaping character,
              nurturing curiosity, and inspiring young minds to serve humanity. At SBRS, we believe
              every child is a unique flame waiting to be ignited."
            </blockquote>

            <div className="mb-8">
              <p className="font-inter text-sm text-forest font-medium">
                {principalName ? `— ${principalName}` : '— Principal, SBRS Karkala'}
              </p>
              <p className="font-inter text-xs text-forest-light">
                Sri Bhuvanendra Residential School
              </p>
            </div>

            <p className="font-inter text-sm text-forest-light leading-relaxed mb-6">
              Under the guidance of our dedicated faculty and the blessings of His Holiness
              Srimath Bhuvanendra Thirtha Swamiji, we continue our mission of providing holistic
              education that prepares students for the challenges of tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
