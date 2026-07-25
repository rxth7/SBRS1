import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import ImageLightbox from '../components/ImageLightbox';
import { getCampusImages, type CampusImage } from '../lib/campusImagesStore';

const galleryImages = [
  { src: '/images/Bio-lab.webp', alt: 'Biology Lab', name: 'Biology Lab' },
  { src: '/images/Hostel Mess.webp', alt: 'Hostel Mess', name: 'Hostel Mess' },
  { src: '/images/Harmony of Mind, Body, and Soul.webp', alt: 'Harmony of Mind, Body, and Soul', name: 'Harmony of Mind, Body, and Soul' },
  { src: '/images/Transportation Facility.webp', alt: 'School Transport', name: 'Transportation Facility' },
  { src: '/images/Chemistry-lab.webp', alt: 'Chemistry Lab', name: 'Chemistry Lab' },
  { src: '/images/classroom.webp', alt: 'Classroom', name: 'Classroom' },
  { src: '/images/computer-lab.webp', alt: 'Computer Lab', name: 'Computer Lab' },
  { src: '/images/library.webp', alt: 'Library', name: 'Library' },
  { src: '/images/Colour concept Day.webp', alt: 'Colour Concept Day', name: 'Colour Concept Day' },
  { src: '/images/Science Exhibition for Primary Students.webp', alt: 'Science Exhibition for Primary Students', name: 'Science Exhibition for Primary Students' },
  { src: '/images/Sports Day.webp', alt: 'Annual Sports Meet', name: 'Annual Sports Meet' },
  { src: '/images/Tiny Hands, Big Creations.webp', alt: 'Tiny Hands, Big Creations', name: 'Tiny Hands, Big Creations' },
  { src: '/images/Tiny Hands, Busy Minds, Happy Hearts.webp', alt: 'Tiny Hands, Busy Minds, Happy Hearts', name: 'Tiny Hands, Busy Minds, Happy Hearts' },
  { src: '/images/Clubs Pack 2025-26.webp', alt: 'Clubs Pack 2025-26', name: 'Clubs Pack 2025-26' },
  { src: '/images/Enjoying Nature\'s Classroom.webp', alt: 'Enjoying Nature\'s Classroom', name: 'Enjoying Nature\'s Classroom' },
  { src: '/images/Discovering the Wonders of Science.webp', alt: 'Discovering the Wonders of Science', name: 'Discovering the Wonders of Science' },
  { src: '/images/Primary School Assembly.webp', alt: 'Primary School Assembly', name: 'Primary School Assembly' },
  { src: '/images/Felicitation to SSE Toppers.webp', alt: 'Felicitation to SSE Toppers', name: 'Felicitation to SSE Toppers' },
  { src: '/images/Marathon.webp', alt: 'Marathon', name: 'Marathon' },
  { src: '/images/classroom1.jpeg', alt: 'Classroom', name: '' },
  { src: '/images/classroom2.jpeg', alt: 'Classroom', name: '' },
  { src: '/images/classroom3.jpeg', alt: 'Classroom', name: '' },
  { src: '/images/classroom4.jpeg', alt: 'Classroom', name: '' },
  { src: '/images/classroom5.jpeg', alt: 'Classroom', name: '' },
  { src: '/images/transport1.jpeg', alt: 'Transport', name: '' },
  { src: '/images/transpost2.jpeg', alt: 'Transport', name: '' },
];

const altLocations = ['Karkala', 'Udupi', 'Mangalore', 'Karnataka'];
const altSubjects = [
  'School campus', 'School building', 'School facilities',
  'Residential school', 'Boarding school', 'School playground',
  'School library', 'School laboratory', 'School classroom',
  'School auditorium', 'School sports area', 'School hostel',
  'School canteen', 'School transport', 'School garden',
  'School assembly area', 'Computer lab', 'Science lab',
  'School art room', 'School music room', 'School entrance',
  'School corridor',
];

function getCampusAlt(index: number): string {
  const location = altLocations[index % altLocations.length];
  const subject = altSubjects[index % altSubjects.length];
  return `${subject} in ${location}`;
}

const campusSpecialNames: Record<number, string> = {
  16: 'Hindi Diwas Celebration',
  17: 'Field Visit- Rotary TMA Pai Hospital',
  19: 'Inter School Competition-Tarang',
  20: 'Independence Day Celebration',
  21: 'Silver Jubliee Inauguration',
  22: 'Silver Jubliee Performance',
  24: 'Independence Day Celebration',
  25: 'Sports Day Inauguration',
  26: 'Tarang 25 Inauguration',
  27: 'Science Exhibition',
  28: 'A Stage of Inspiration',
  29: 'Annual Day Inauguration',
  31: 'Felicitation to National Achievers',
  32: 'Felicitation of Former Principal',
  33: 'Felicitation of Former Principal',
  34: 'Felicitation of Former Principal',
  35: 'Felicitation of Former Principal',
  36: 'Felicitation of Former Principal',
  37: 'Felicitation of Former Principal',
  40: 'Scouts and Guides',
  42: 'Honouring Sunil Kumar',
  44: 'Field Trip',
};

const existingCampusNumbers = [16,17,19,20,21,22,24,25,26,27,28,29,31,32,33,34,35,36,37,40,42,44];

const campusImages = existingCampusNumbers.map((n) => ({
  src: `/images/campus${n}.webp`,
  alt: n === 22 ? 'Silver Jubliee Performance at SBRS' : getCampusAlt(n),
  name: campusSpecialNames[n] || `Campus ${n}`,
}));

interface ImageData {
  src: string;
  alt: string;
  name: string;
}

const staticImages: ImageData[] = [...galleryImages, ...campusImages];

export default function CampusGalleryPage() {
  const [lightbox, setLightbox] = useState<ImageData | null>(null);
  const [adminImages, setAdminImages] = useState<CampusImage[]>([]);
  const [showCount, setShowCount] = useState(20);

  useEffect(() => {
    getCampusImages().then((data) => {
      setAdminImages(data);
    });
  }, []);

  const allImages: ImageData[] = useMemo(() => [
    ...adminImages.map((img) => ({ src: img.src, alt: img.name, name: img.name })),
    ...staticImages,
  ], [adminImages]);

  const visibleImages = allImages.slice(0, showCount);
  const hasMore = showCount < allImages.length;

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
              <span className="font-poppins text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">
                Sri Bhuvanendra
              </span>
              <span className="block font-poppins text-[10px] uppercase tracking-[0.1em] text-ivory/70">
                Residential School
              </span>
            </div>
          </Link>
          <Link
            to="/#gallery"
            className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Gallery Content */}
      <section className="pt-28 pb-16">
        <div className="content-max-width page-padding">
          <div className="text-center mb-12">
            <span className="block font-poppins text-xs uppercase tracking-[0.15em] text-terracotta mb-2">Explore</span>
            <h1 className="font-poppins text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.02em] text-forest mb-3">
              Campus Gallery
            </h1>
            <p className="font-poppins text-sm text-forest/70 max-w-lg mx-auto">
              A glimpse into life at Sri Bhuvanendra Residential School — our campus, facilities, and everyday moments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleImages.map((img) => (
              <div
                key={img.src}
                className="rounded-xl overflow-hidden bg-forest/10 border border-forest/10 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                onClick={() => setLightbox(img)}
              >
                <div className={`${img.name ? 'aspect-[4/3]' : 'flex-1'} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {img.name && (
                  <p className="text-center text-forest/80 font-poppins text-xs sm:text-sm py-2 px-1 truncate">
                    {img.name}
                  </p>
                )}
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowCount((prev) => prev + 20)}
                className="px-8 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-colors"
              >
                Load More ({allImages.length - showCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>
      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} title={lightbox.name} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
