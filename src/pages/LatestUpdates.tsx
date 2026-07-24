import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getEventImages, type EventImage } from '../lib/eventImagesStore';
import UpdateModal from '../components/UpdateModal';

export default function LatestUpdates() {
  const [items, setItems] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<EventImage | null>(null);

  useEffect(() => {
    getEventImages().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

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
            <Calendar className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
            Latest <span className="text-saffron">Updates</span>
          </h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-2xl mx-auto">
            Stay updated with the recent activities and events at SBRS
          </p>
        </div>
      </section>

      {/* Updates Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-4 border-saffron border-t-transparent rounded-full" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-poppins text-sm text-gray-400">No updates available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 text-left w-full"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    {item.date && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <Calendar size={13} className="text-saffron" />
                        <span className="font-poppins text-xs font-semibold text-saffron uppercase tracking-wide">
                          {item.date}
                        </span>
                      </div>
                    )}
                    <h3 className="font-playfair text-lg font-bold text-slate mb-2">
                      {item.title}
                    </h3>
                    <p className="font-poppins text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
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

      {selectedItem && (
        <UpdateModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
