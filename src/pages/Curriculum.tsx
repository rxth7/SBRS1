import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, BookOpen } from 'lucide-react';

export default function Curriculum() {
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

      {/* Content */}
      <section className="pt-28 pb-16">
        <div className="content-max-width page-padding">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={24} className="text-saffron" />
              <span className="font-poppins text-xs uppercase tracking-[0.15em] text-terracotta font-semibold">Academics</span>
            </div>
            <h1 className="font-playfair text-[clamp(2rem,4vw,3.5rem)] text-forest leading-tight mb-6">
              Curriculum
            </h1>

            <div className="bg-white rounded-2xl border border-forest/10 shadow-sm p-6 sm:p-8 space-y-6 text-forest/80 font-poppins text-sm sm:text-base leading-relaxed">
              <p>
                The school is affiliated with the Central Board of Secondary Education (CBSE) and follows the CBSE curriculum using NCERT textbooks. The curriculum is designed to provide a balanced education that focuses on academics, skills, values, sports, and overall personality development. It follows the goals of the Central Board of Secondary Education and aligns with the National Education Policy 2020.
              </p>
              <p>
                The curriculum is generally structured as follows:
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-poppins text-base font-bold text-forest mb-2">Pre-Primary (Nursery–UKG)</h3>
                  <p className="text-forest/70">Language development, early mathematics, art, music, play-based learning, and physical activities.</p>
                </div>

                <div>
                  <h3 className="font-poppins text-base font-bold text-forest mb-2">Primary (Classes I–V)</h3>
                  <p className="text-forest/70">English, Mathematics, Environmental Studies (EVS), Hindi/other languages, Art, Physical Education, and Computer awareness.</p>
                </div>

                <div>
                  <h3 className="font-poppins text-base font-bold text-forest mb-2">Middle School (Classes VI–VIII)</h3>
                  <p className="text-forest/70">English, Kannada, Mathematics, Science, Social Science, and third language Hindi/Sanskrit, Computer/Skill Education, Art Education, and Physical Education.</p>
                </div>

                <div>
                  <h3 className="font-poppins text-base font-bold text-forest mb-2">Secondary (Classes IX–X)</h3>
                  <p className="text-forest/70">English, Mathematics, Science, Social Science, Hindi/Kannada languages, optional subjects such as Computer Applications, Artificial Intelligence, along with internal assessment in Art, Health & Physical Education, and Work Experience.</p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://cbseacademic.nic.in/curriculum_2027.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-deep text-forest font-poppins text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  <ExternalLink size={16} />
                  CBSE Curriculum for Secondary Classes
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate py-8">
        <div className="content-max-width page-padding text-center">
          <p className="text-ivory/50 text-sm">&copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
