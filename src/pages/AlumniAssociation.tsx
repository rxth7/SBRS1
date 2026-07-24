import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Users } from 'lucide-react';
import { getAlumniMembers, type AlumniMember } from '../lib/alumniMembersStore';

const staticExecutive = [
  { name: 'Mr. Vikyath Shetty', image: '/images/Mr. Vikyath Shetty.jpeg' },
  { name: 'Mr. Prajwal Achar', image: '/images/Mr. Prajwal Achar.jpeg' },
  { name: 'Mr. Prakyath Varma', image: '/images/Mr. Prakyath Varma.jpeg' },
  { name: 'Mrs. Savitha Dange', image: '/images/Mrs. Savitha Dange.jpeg' },
];

const staticNonExecutive = [
  { name: 'Matti Venkatesh Prabhu', designation: 'Vice President', image: '/images/Matti Venkatesh Prabhu.jpeg' },
  { name: 'Mrs. Avni Kamath Bola', designation: 'Treasurer', image: '/images/Mrs. Avni Kamath Bola.jpeg' },
];

export default function AlumniAssociation() {
  const [members, setMembers] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseLoaded, setSupabaseLoaded] = useState(false);

  useEffect(() => {
    getAlumniMembers().then((data) => {
      setMembers(data);
      setSupabaseLoaded(true);
      setLoading(false);
    });
  }, []);

  const useStatic = supabaseLoaded && members.length === 0;

  const displayExecutive = useStatic
    ? staticExecutive
    : members.filter((m) => m.is_executive);

  const displayNonExecutive = useStatic
    ? staticNonExecutive
    : members.filter((m) => !m.is_executive);

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
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-4">Alumni Association</h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Stay connected with your alma mater. Our alumni association fosters lasting bonds and contributes to the continued growth of SBRS.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-[1000px] mx-auto space-y-12">

          {/* Non-Executive Members (with designations) */}
          <div className="flex flex-wrap justify-center gap-12">
            {displayNonExecutive.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-60 h-60 rounded-xl overflow-hidden shadow-lg border-4 border-saffron/20 mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-slate">{member.name}</h3>
                <p className="font-poppins text-sm text-saffron font-medium">{member.designation}</p>
              </div>
            ))}
          </div>

          {/* Executive Members */}
          {displayExecutive.length > 0 && (
            <div>
              <h2 className="font-playfair text-2xl font-bold text-slate text-center mb-8">Executive Members</h2>
              <div className="flex flex-wrap justify-center gap-10">
                {displayExecutive.map((member) => (
                  <div key={member.name} className="flex flex-col items-center w-48">
                    <div className="w-44 h-44 rounded-xl overflow-hidden shadow-md border-2 border-gray-100 mb-3">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <h4 className="font-poppins text-sm font-medium text-slate text-center">{member.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && displayNonExecutive.length === 0 && displayExecutive.length === 0 && (
            <p className="font-poppins text-sm text-forest/40 text-center">More members coming soon.</p>
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
