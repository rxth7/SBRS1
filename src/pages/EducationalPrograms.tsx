import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const programs = [
  { name: 'CBSE Curriculum', description: 'Affiliated to CBSE, New Delhi, following a structured and comprehensive curriculum.' },
  { name: 'Activity-Based Learning', description: 'Interactive sessions, projects, and presentations to make learning engaging and fun.' },
  { name: 'Value Education', description: 'Moral science classes, assemblies, and character-building activities for holistic growth.' },
  { name: 'Sports & Games', description: 'Regular physical training, inter-school competitions, and annual sports meet.' },
  { name: 'Co-curricular Activities', description: 'Art, music, dance, drama, and debate competitions to nurture creativity.' },
  { name: 'Remedial Classes', description: 'Special support for students who need extra academic guidance and attention.' },
];

export default function EducationalPrograms() {
  return (
    <div className="min-h-screen bg-ivory">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate/95 backdrop-blur-md shadow-lg py-3">
        <div className="content-max-width page-padding flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-poppins text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">Sri Bhuvanendra</span>
              <span className="block font-poppins text-[10px] uppercase tracking-[0.1em] text-ivory/70">Residential School</span>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="pt-28 pb-10 bg-gradient-to-b from-slate to-forest/90">
        <div className="content-max-width page-padding text-center">
          <h1 className="font-poppins text-[clamp(2rem,4vw,3rem)] text-ivory leading-tight">Educational Programs</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-max-width page-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.name} className="bg-cream rounded-xl p-6 border border-forest/10 hover:shadow-lg transition-all duration-300">
                <h3 className="font-poppins text-xl text-forest mb-2">{program.name}</h3>
                <p className="font-poppins text-sm text-forest/70 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate py-8">
        <div className="content-max-width page-padding text-center">
          <p className="text-ivory/50 text-sm">&copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
