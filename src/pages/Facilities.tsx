import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const facilities = [
  {
    name: 'Library',
    image: '/images/library.webp',
    description:
      'A good library is a necessity for a residential school. A well equipped library in the school will encourage and develop the habit of reading, update the knowledge and help in the all round development of the child. We have a spacious library which can accommodate about 60 students at a time. Our library has a good collection of more than 6000 volumes of books including various encyclopedias and reference books.',
  },
  {
    name: 'Smart Lab',
    image: '/images/Smart Lab.webp',
    description:
      'The Smart Lab is a technology-driven learning space with interactive whiteboards, projectors, and digital tools that make learning engaging and immersive for students across all grades.',
  },
  {
    name: 'Computer Lab',
    image: '/images/computer-lab.webp',
    description:
      'Our goal is to build a strong foundation for a sound development by providing soft skills to be successful in life. Focus will be on exposing students to the latest educational technology. Towards this we have set up a well-equipped computer lab. During the year we have upgraded the lab by adding more computers. We are grateful to Sri Bhuvanendra College for providing us 10 computers this year. We have computer classes for all our students from Class VI to X in their regular time table.',
  },
  {
    name: 'Chemistry Lab',
    image: '/images/Chemistry-lab.webp',
    description:
      'Our Chemistry Laboratory is well-equipped with modern apparatus and chemicals, providing students with hands-on experience to understand chemical reactions, experiments, and concepts in a safe and supervised environment.',
  },
  {
    name: 'Biology Lab',
    image: '/images/Bio-lab.webp',
    description:
      'The Biology Lab is equipped with specimens, models, and modern microscopes that help students explore the world of living organisms, fostering a deeper understanding of biological concepts through practical learning.',
  },
  {
    name: 'Transport',
    image: '/images/Transportation Facility.webp',
    description:
      'The school provides safe and reliable transport facilities with GPS-tracked buses and trained drivers, ensuring comfortable and secure commuting for students from various parts of the town.',
  },
  {
    name: 'Laboratories',
    image: '/images/Laboratories.webp',
    description:
      'Our Science Laboratories are upgraded with latest equipments to bring science alive and stimulate interest in students in the science subjects. Experiments in Physics, Chemistry, Biology and Mathematics are conducted to the students of Class 9th and 10th in group of three. We will extend this facility to lower classes in the coming years.',
  },
  {
    name: 'Playground',
    image: '/images/school-playground.JPG',
    description:
      'A spacious and well-maintained playground provides children with a safe and exciting space to run, play, and explore. It encourages physical activity, teamwork, and joyful moments that support the overall growth and well-being of every child.',
  },
  {
    name: 'Hostel Facilities',
    image: '/images/Hostel.webp',
    description:
      'Spacious rooms with separate facilities for boys and girls form an ideal living space which is conductive for study as well. New spaces for the same are also being constructed which are based on ergonomic. A new hostel building with modern facilities will be available to accommodate the children from next academic session.',
  },
  {
    name: 'Food Facilities',
    image: '/images/Hostel Mess.webp',
    description:
      'Food is prepared for students using highly hygienic techniques. Nutrition is an important aspect of the daily menu and no effort is spared in ensuring the best diet for the ward.',
  },
  {
    name: 'Individual Skills',
    image: '/images/indivisual_training.webp',
    description:
      'We focus on nurturing each child’s unique potential through structured individual skill development programmes. From communication and leadership to critical thinking and creativity, students are guided to discover and refine their personal strengths, building confidence that lasts a lifetime.',
  },
  {
    name: 'Physical Training',
    image: '/images/physical.webp',
    description:
      'Regular physical training is an integral part of student life at SBRS. Through structured drills, fitness sessions, and sports coaching, we promote discipline, endurance, and a healthy lifestyle—helping students develop both a strong body and a resilient mind.',
  },
];

export default function Facilities() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate/95 backdrop-blur-md shadow-lg py-3">
        <div className="content-max-width page-padding flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-inter text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">
                Sri Bhuvanendra
              </span>
              <span className="block font-inter text-[10px] uppercase tracking-[0.1em] text-ivory/70">
                Residential School
              </span>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-slate to-forest/90">
        <div className="content-max-width page-padding text-center">
          <h1 className="font-poppins text-[clamp(2rem,4vw,3rem)] text-ivory leading-tight">
            Facilities Offered
          </h1>
        </div>
      </section>

      {/* Facilities */}
      {facilities.map((facility, index) => (
        <section
          key={facility.name}
          id={facility.name.toLowerCase().replace(/\s+/g, '-')}
          className={`py-10 scroll-mt-24 ${index % 2 === 1 ? 'bg-cream' : ''}`}
        >
          <div className="content-max-width page-padding">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-6`}
            >
              {/* Image */}
              <div className="w-full md:w-2/5">
                <div className="rounded-lg overflow-hidden border border-forest/20 shadow-md">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full aspect-[16/9] object-cover"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="w-full md:w-3/5">
                <h2 className="font-playfair text-2xl text-forest mb-3">{facility.name}</h2>
                <p className="text-forest/70 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-slate py-8">
        <div className="content-max-width page-padding text-center">
          <p className="text-ivory/50 text-sm">
            &copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
