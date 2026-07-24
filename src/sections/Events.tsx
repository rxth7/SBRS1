import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from 'lucide-react';
import { getEventImages, type EventImage } from '../lib/eventImagesStore';
import UpdateModal from '../components/UpdateModal';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [eventImages, setEventImages] = useState<EventImage[]>([]);
  const [selectedItem, setSelectedItem] = useState<EventImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventImages().then((data) => {
      setEventImages(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.event-img');
        gsap.fromTo(
          items,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
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
  }, [eventImages]);

  const visible = eventImages.slice(0, 3);
  const hasMore = eventImages.length > 3;

  return (
    <section
      id="events"
      ref={sectionRef}
      className="pt-20 pb-8 lg:pt-28 lg:pb-10 bg-ivory"
    >
      <span className="sr-only">school events Karkala, latest updates Sri Bhuvanendra Residential School, SBRS activities, campus news, boarding school events, best school in Karkala Karnataka</span>
      <div className="content-max-width page-padding">
        <div className="text-center mb-12">
          <span className="inline-block font-poppins text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
            What's Happening
          </span>
          <h2 className="section-title">
            Latest Updates
          </h2>
        </div>
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white animate-pulse">
                  <div className="aspect-video bg-forest/10" />
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-saffron/20" />
                      <div className="h-3 w-24 rounded bg-forest/10" />
                    </div>
                    <div className="h-4 w-3/4 rounded bg-forest/10" />
                    <div className="h-3 w-1/2 rounded bg-forest/10" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            visible.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedItem(img)}
              className="event-img rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 text-left w-full"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 bg-white">
                {img.date && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar size={13} className="text-saffron" />
                    <span className="font-poppins text-xs font-semibold text-saffron uppercase tracking-wide">{img.date}</span>
                  </div>
                )}
                <h3 className="font-poppins text-sm font-semibold text-forest">{img.title}</h3>
              </div>
            </button>
          )))}
        </div>

        {!loading && hasMore && (
          <div className="text-center mt-10">
            <Link
              to="/latest-updates"
              className="inline-flex items-center px-6 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300"
            >
              More Updates
            </Link>
          </div>
        )}
      </div>

      {selectedItem && (
        <UpdateModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
