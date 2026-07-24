import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 50 },
          {
            y: -50,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-8 pb-12 lg:pt-12 lg:pb-16 bg-ivory overflow-hidden"
    >
      <span className="sr-only">Sri Bhuvanendra Residential School Karkala, best boarding school in Karnataka, residential school near Udupi Mangalore, school with hostel in Karkala, affordable boarding school, holistic education, schools in Udupi district</span>
      <div className="content-max-width page-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Video */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
              <video
                src="/videos/Video Project.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate/30 to-transparent" />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block font-poppins text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
              About Our School
            </span>
            <h2 className="section-title mb-6">
              Welcome to<br />
              <span className="text-saffron">Sri Bhuvanendra Residential School</span>
            </h2>
            <p className="font-poppins text-sm leading-relaxed text-forest-light mb-4">
              A distinguished institution dedicated to shaping young minds through academic excellence,
              disciplined living, and value-based education. We believe that education is not merely
              the pursuit of knowledge but the development of character, confidence, compassion,
              and leadership.
            </p>
            <p className="font-poppins text-sm leading-relaxed text-forest-light mb-4">
              Our school provides an inspiring environment where every student is encouraged to dream
              boldly, think critically, and achieve beyond expectations. With a perfect blend of modern
              educational practices, experienced faculty, advanced learning resources, and a strong
              foundation in ethics and culture, we prepare students to excel in an ever-changing global world.
            </p>
            <p className="font-poppins text-sm leading-relaxed text-forest-light mb-4">
              At Sri Bhuvanendra Residential School, learning extends beyond the classroom. Through
              sports, arts, cultural activities, life skills, technology-enabled education, and community
              engagement, students develop resilience, responsibility, and the confidence to face
              future challenges with integrity and determination.
            </p>
            <p className="font-poppins text-sm leading-relaxed text-forest-light mb-6">
              We warmly invite you to become a part of the Sri Bhuvanendra Residential School family
              and discover an educational journey that transforms aspirations into accomplishments
              and dreams into reality.
            </p>
            <p className="font-poppins text-sm font-semibold text-saffron italic">
              Learn with Purpose. Live with Discipline. Lead with Excellence.
            </p>
            <Link
              to="/about-school"
              className="inline-flex items-center gap-2 text-saffron font-poppins text-sm uppercase tracking-[0.08em] font-medium hover:gap-4 transition-all duration-300 group mt-6"
            >
              View More
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
