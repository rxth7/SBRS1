import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Baby, School, BookOpen, Palette, Trophy, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Baby,
    title: 'Nursery & Primary',
    subtitle: 'Grades 1-5',
    description: 'Foundational learning through play-based and experiential methods, fostering curiosity and creativity in young minds.',
  },
  {
    icon: School,
    title: 'Middle School',
    subtitle: 'Grades 6-8',
    description: 'Comprehensive CBSE curriculum with emphasis on critical thinking, scientific inquiry, and analytical skills.',
  },
  {
    icon: BookOpen,
    title: 'Secondary School',
    subtitle: 'Grades 9-10',
    description: 'Rigorous academic preparation for board examinations with specialized coaching and mentorship programs.',
  },
  {
    icon: Palette,
    title: 'Co-curricular Activities',
    subtitle: 'Arts & Culture',
    description: 'Music, dance, drama, and fine arts programs that nurture creativity and cultural appreciation.',
  },
  {
    icon: Trophy,
    title: 'Sports & Physical Ed',
    subtitle: 'Athletics',
    description: 'State-of-the-art sports facilities including cricket, football, basketball, athletics, and indoor games.',
  },
  {
    icon: Heart,
    title: 'Life Skills & Values',
    subtitle: 'Character Building',
    description: 'Moral education, leadership training, and community service programs to build responsible citizens.',
  },
];

export default function Academics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.program-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: {
              amount: 0.3,
              from: 'center',
            },
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="academics"
      ref={sectionRef}
      className="section-padding bg-cream"
    >
      <span className="sr-only">academic excellence school in karkala, top CBSE school, quality education in Karnataka, best school near Mangalore Udupi, student development school, disciplined boarding school</span>
      <div className="content-max-width page-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-inter text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
            Our Programs
          </span>
          <h2 className="section-title mb-4">
            Academic Excellence
          </h2>
          <p className="font-inter text-base text-forest-light max-w-2xl mx-auto">
            Nurturing minds from Nursery to Grade 10 with the CBSE curriculum, 
            designed to bring out the best in every student.
          </p>
        </div>

        {/* Programs Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1500px' }}
        >
          {programs.map((program) => (
            <div
              key={program.title}
              className="program-card card-bg p-8 lg:p-10 group hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-saffron/20 transition-colors">
                <program.icon className="w-6 h-6 text-saffron" />
              </div>
              <span className="block font-inter text-[10px] uppercase tracking-[0.15em] text-terracotta mb-1">
                {program.subtitle}
              </span>
              <h3 className="font-playfair text-xl lg:text-2xl text-forest mb-3">
                {program.title}
              </h3>
              <p className="font-inter text-sm text-forest-light leading-relaxed mb-4">
                {program.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
