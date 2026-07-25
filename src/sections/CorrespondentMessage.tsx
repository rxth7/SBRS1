import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CorrespondentMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image from right
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
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

      // Content from left
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-slate overflow-hidden"
    >
      <div className="content-max-width page-padding">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left - Quote */}
          <div ref={contentRef}>
            <span className="inline-block font-poppins text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
              Correspondent's Message
            </span>

            <Quote className="w-10 h-10 text-saffron/40 mb-4" />

            <blockquote className="font-playfair text-xl lg:text-2xl text-ivory leading-relaxed mb-6">
              "Welcome to Sri Bhuvanendra Residential School. We are committed to providing
              quality education that nurtures academic excellence, strong values, and disciplined
              character. With the dedicated support of our teachers, parents, and management, we
              strive to prepare students for a bright and responsible future. I wish every student
              success and thank all our well-wishers for their continued trust and support."
            </blockquote>

            <div className="mb-8">
              <p className="font-poppins text-sm text-ivory font-medium">
                — Sri. K. Venkatesh Prabhu
              </p>
              <p className="font-poppins text-xs text-ivory/60">
                Correspondent, Sri Bhuvanendra Residential School
              </p>
            </div>
          </div>

          {/* Right - Portrait */}
          <div ref={imageRef} className="relative">
            <div className="relative mx-auto lg:ml-auto lg:mr-8 w-[280px] h-[380px] lg:w-[480px] lg:h-[500px] overflow-hidden rounded-2xl">
              <img
                src="/images/correspondent.jpeg"
                alt="Correspondent of SBRS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-saffron/30 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-saffron/10 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
