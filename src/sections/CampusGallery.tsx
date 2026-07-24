import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import ImageLightbox from '../components/ImageLightbox';

interface ImageData {
  src: string;
  alt: string;
}

const displayImages: ImageData[] = [
  { src: '/images/classroom.webp', alt: 'Classroom' },
  { src: '/images/campus19.webp', alt: 'Tarang 25 Celebration' },
  { src: '/images/campus20.webp', alt: 'Independence Day Celebration' },
  { src: '/images/campus33.webp', alt: 'A Moment of Honor and Celebration' },
  { src: '/images/campus31.webp', alt: 'Alumini Day Celebration' },
];

export default function CampusGallery() {
  const [loaded, setLoaded] = useState(false);
  const [blobs, setBlobs] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<ImageData | null>(null);
  const blobUrls = useRef<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      displayImages.map(async (img) => {
        const resp = await fetch(img.src);
        const blob = await resp.blob();
        return URL.createObjectURL(blob);
      })
    ).then((urls) => {
      if (cancelled) {
        urls.forEach((u) => URL.revokeObjectURL(u));
        return;
      }
      blobUrls.current = urls;
      setBlobs(urls);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
      blobUrls.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);
  return (
    <section id="gallery" className="relative bg-slate overflow-hidden py-12">
      <span className="sr-only">school campus in karkala, best boarding school facilities, residential school infrastructure, hostel facilities for students in Karkala, SBRS campus gallery, education in karkala, quality boarding education in Karnataka</span>
      {/* Header */}
      <div className="content-max-width page-padding mb-8">
        <span className="block font-poppins text-xs uppercase tracking-[0.15em] text-terracotta mb-2">
          Explore
        </span>
        <h2 className="font-poppins text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.02em] text-ivory mb-2">
          Campus Life
        </h2>
        <p className="font-poppins text-sm text-forest-light max-w-md">
          Experience the beauty of 14 acres of learning, where every corner tells a story of growth and discovery.
        </p>
      </div>

      {/* Static Grid */}
      <div className="content-max-width page-padding">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayImages.map((img, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-forest/20 aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setLightbox({ src: loaded && blobs[i] ? blobs[i] : img.src, alt: img.alt })}
            >
              <img
                src={loaded && blobs[i] ? blobs[i] : img.src}
                alt={img.alt}
                width="400"
                height="300"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-forest font-poppins text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-colors duration-300"
          >
            View More
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
