import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';
import { getSuccessStories, type SuccessStory } from '../lib/successStoriesStore';

export default function SuccessStoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuccessStories().then((data) => {
      setStory(data.find((s) => s.id === id) || null);
      setLoading(false);
    });
  }, [id]);

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
          <Link to="/success-stories" className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
            <ArrowLeft size={18} />
            Back to Stories
          </Link>
        </div>
      </nav>

      <section className="pt-24 pb-12 bg-gradient-to-br from-slate via-slate/95 to-slate">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-4">Success Stories</h1>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-[800px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-4 border-saffron border-t-transparent rounded-full" />
            </div>
          ) : !story ? (
            <p className="font-poppins text-lg text-forest/70 text-center">Story not found.</p>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-saffron/10 border-2 border-saffron/30">
                    {story.image_url ? (
                      <img src={story.image_url} alt={story.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Star className="w-8 h-8 text-saffron" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-playfair text-2xl md:text-3xl text-slate">{story.name}</h2>
                    {story.batch && <p className="font-poppins text-sm text-saffron font-medium">{story.batch}</p>}
                  </div>
                </div>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.story }} />
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-slate py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <p className="text-ivory/50 text-sm">&copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
