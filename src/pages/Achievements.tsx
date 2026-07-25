import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Trophy, FlaskConical, Lightbulb, Palette, Medal, GraduationCap } from 'lucide-react';
import { getAchievements, type Achievement } from '../lib/achievementsStore';

const fallbackAchievements = [
  {
    icon: FlaskConical,
    title: 'National-Level Excellence in Science Competitions',
    description:
      'Our students have secured first and second places in prestigious national-level science competitions, demonstrating exceptional innovation, creativity, and scientific aptitude.',
    image: '/images/science-model.jpeg',
  },
  {
    icon: Lightbulb,
    title: 'Outstanding Performance in INSPIRE Awards (State & National Levels)',
    description:
      'We proudly celebrate our students\' remarkable achievements in the INSPIRE Awards, where they have earned recognition at both the state and national levels. These accomplishments reflect their spirit of innovation, scientific inquiry, and research excellence.',
    image: '/images/Inspire Awards.jpeg',
  },
  {
    icon: Palette,
    title: 'Recognition in Veer Gatha 4.0 for Cultural Excellence',
    description:
      'In the field of culture and creativity, our students have earned recognition in Veer Gatha 4.0, showcasing their artistic talent, patriotism, and value-based learning.',
    image: '/images/veergatha4.0.jpeg',
  },
  {
    icon: Medal,
    title: 'State and National Achievements in Sports',
    description:
      'Our athletes have distinguished themselves as state and national-level champions across various sports, exemplifying discipline, resilience, teamwork, and a strong competitive spirit.',
    image: '/images/achivement-2.jpeg',
  },
  {
    icon: GraduationCap,
    title: 'Outstanding Academic Performance',
    description:
      'Every year, numerous students secure top ranks in the SSE examinations, reinforcing SBRS\'s proud tradition of academic excellence and consistently outstanding results.',
    image: '/images/Felicitation to SSE Toppers.webp',
  },
];

const iconPool = [FlaskConical, Lightbulb, Palette, Medal, GraduationCap, Trophy];

export default function Achievements() {
  const [dbAchievements, setDbAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    getAchievements().then((data) => setDbAchievements(data)).catch(() => {});
  }, []);

  const hasDbAchievements = dbAchievements.length > 0;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate/95 backdrop-blur-md shadow-lg py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-poppins text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">
                Sri Bhuvanendra
              </span>
              <span className="block font-poppins text-[10px] uppercase tracking-[0.1em] text-ivory/70">
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

      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate via-slate/95 to-slate">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
            Our <span className="text-saffron">Achievements</span>
          </h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            The accomplishments of SBRS students extend far beyond academics. Through their talent,
            determination, and perseverance, they have excelled in a wide range of fields, bringing
            pride and recognition to the institution.
          </p>
        </div>
      </section>

      {/* Achievements List */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-6">
          {hasDbAchievements && dbAchievements.map((item, i) => {
            const Icon = iconPool[i % iconPool.length];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
                <div className={`p-6 md:p-8 flex items-start gap-5 ${item.image_url ? 'flex-col md:flex-row' : ''}`}>
                  {item.image_url && (
                    <div className="w-full md:w-80 flex-shrink-0 rounded-lg overflow-hidden bg-saffron/5 aspect-video flex items-center justify-center relative group">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Trophy className="w-10 h-10 text-saffron/30" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-xl md:text-2xl text-slate mb-3">{item.title}</h2>
                      <p className="font-poppins text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {!hasDbAchievements && fallbackAchievements.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
              <div className={`p-6 md:p-8 flex items-start gap-5 ${item.image ? 'flex-col md:flex-row' : ''}`}>
                {item.image && (
                  <div className="w-full md:w-80 flex-shrink-0 rounded-lg overflow-hidden bg-saffron/5 aspect-video flex items-center justify-center relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <item.icon className="w-10 h-10 text-saffron/30" />
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl md:text-2xl text-slate mb-3">{item.title}</h2>
                    <p className="font-poppins text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Closing Statement */}
          <div className="bg-gradient-to-br from-slate via-slate/95 to-slate rounded-2xl shadow-lg p-6 md:p-8 mt-8">
            <p className="font-poppins text-sm text-ivory/80 leading-relaxed text-center">
              Together, these achievements reflect SBRS's unwavering commitment to holistic education.
              By nurturing academic excellence, scientific innovation, cultural creativity, and sporting
              talent, the institution continues to empower its students to excel and shine at the
              highest levels.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <p className="text-ivory/50 text-sm">
            &copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
