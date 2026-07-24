import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getEvents, type UpcomingEvent } from '../lib/eventsStore';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((data) => {
      const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEvents(sorted);
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
            Upcoming <span className="text-saffron">Events</span>
          </h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-2xl mx-auto">
            We are delighted to announce the following upcoming events at our school.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-4 border-saffron border-t-transparent rounded-full" />
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span className="font-poppins text-sm font-semibold text-saffron uppercase tracking-wide">
                      {event.date}
                    </span>
                  </div>

                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-slate mb-4 leading-snug">
                    {event.title}
                  </h2>

                  <p className="font-poppins text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))
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
    </div>
  );
}
