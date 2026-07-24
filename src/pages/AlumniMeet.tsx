import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Users } from 'lucide-react';
import ImageLightbox from '../components/ImageLightbox';
import { getAlumniMeetImages, type AlumniMeetImage } from '../lib/alumniMeetStore';

const fallbackImages = [
  '/images/alumni-meet1.jpeg',
  '/images/alumni-meet2.jpeg',
  '/images/alumni-meet3.jpeg',
];

export default function AlumniMeet() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [images, setImages] = useState<AlumniMeetImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlumniMeetImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const displayImages = images.length > 0 ? images.map((img) => img.src) : fallbackImages;

  return (
    <div className="min-h-screen bg-ivory">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate/95 backdrop-blur-md shadow-lg py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-poppins text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">Sri Bhuvanendra</span>
              <span className="block font-poppins text-[9px] uppercase tracking-[0.1em] text-ivory/70">Residential School</span>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="pt-24 pb-12 bg-gradient-to-br from-slate via-slate/95 to-slate">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-4">Alumni Meet</h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Moments from our alumni reunions — where old friends reconnect and memories are made.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img src={src} alt="Alumni Meet" className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <ImageLightbox src={lightbox} alt="" onClose={() => setLightbox(null)} />
      )}

      <footer className="bg-slate py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <p className="text-ivory/50 text-sm">&copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
