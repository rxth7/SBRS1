import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefetchEventImages } from '../lib/eventImagesStore';

const heroImages = [
  '/images/top-view4.jpeg',
  '/images/top-view3.jpeg',
  '/images/sbrs.webp',
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    prefetchEventImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      gsap.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.5 }
      );

      gsap.fromTo(
        spinnerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.2 }
      );

      gsap.to(titleRef.current, {
        scale: 1.03,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(subtitleRef.current, {
        scale: 1.02,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-slate"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="SBRS Campus"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate/50 pointer-events-none" />
      </div>

      {/* Center Title Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div ref={titleRef} className="text-center opacity-0">
          <p className="font-poppins text-xs uppercase tracking-[0.15em] text-saffron mb-2">
            WELCOME TO
          </p>
          <h1 className="font-playfair font-bold text-[clamp(2.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.03em] text-ivory/80" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
            Sri Bhuvanendra
          </h1>
          <span className="sr-only">best school in karkala, boarding school in karkala, residential school in karkala, SBRS Karkala, top CBSE school in Udupi district, Karnataka residential school, hostel school in karkala, school admission in karkala</span>
        </div>
        <div ref={subtitleRef} className="text-center mt-4 opacity-0">
          <p className="font-playfair font-bold text-[clamp(1.2rem,3vw,2.5rem)] text-saffron" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
            Residential School
          </p>
          <p className="font-inter text-xs uppercase tracking-[0.2em] text-ivory mt-4 hidden md:block">
            Est. 2001 • Karkala, Karnataka
          </p>
          <p className="font-poppins text-xs md:text-sm text-saffron/90 font-bold mt-1 italic" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
              "Where Excellence Begins and Future Leaders Are Nurtured."
            </p>
            <p className="font-poppins text-xs md:text-sm text-ivory/70 mt-4 font-bold" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
               बुद्धिर्ज्ञानेन शुद्ध्यति  •  Wisdom is purified through knowledge
            </p>
            <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.2em] text-saffron/80 mt-2 font-semibold hidden md:block" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
              Affiliated to CBSE
            </p>
          </div>

          {/* Orbital Motto Spinner */}
          <div
            ref={spinnerRef}
            className="hidden sm:block mt-6 mx-auto w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] opacity-0"
          >
            <div className="relative w-full h-full animate-spin-slow">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <defs>
                  <path id="circlePath" d="M 90, 90 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                </defs>
                <text className="font-poppins" fontSize="13" fill="white" fontWeight="500" letterSpacing="1">
                  <textPath href="#circlePath" startOffset="0%">
                    बुद्धिर्ज्ञानेन शुद्ध्यति — Wisdom is purified through knowledge •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-ivory rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
      </div>

      {/* Bottom Bar */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 py-5 flex justify-between items-center opacity-0"
      >
        <span className="font-inter text-xs text-saffron font-semibold">
          Karkala, Karnataka | Est. 2001
        </span>
        <span className="font-inter text-xs text-saffron font-semibold">
          Affiliated to CBSE
        </span>
      </div>

    </section>
  );
}
