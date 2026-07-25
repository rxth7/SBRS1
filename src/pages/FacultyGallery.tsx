import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { getFaculty, type FacultyMember } from '../lib/facultyStore';

const defaultPrimaryTeachers: FacultyMember[] = [
  { id: 'd-p-1', name: 'Ms. A. Ramya Shetty, BBM, D.P.P.T., D.EL.Ed.', designation: '', type: 'primary', sort_order: 1, image: '/images/lecturer1.webp' },
  { id: 'd-p-2', name: 'Mrs. Babitha M. Shriyan, B.Com., D.EL.Ed.', designation: '', type: 'primary', sort_order: 2, image: '/images/lecturer2.webp' },
  { id: 'd-p-3', name: 'Mrs. Mahalaxmi, B.A., NTT, D.EL.Ed.', designation: '', type: 'primary', sort_order: 3, image: '/images/lecturer3.webp' },
  { id: 'd-p-4', name: 'Mrs. Shwetha, B.Com., D.P.P.T., B.Ed.', designation: '', type: 'primary', sort_order: 4, image: '/images/lecturer4.webp' },
  { id: 'd-p-5', name: 'Mrs. Namitha N., B.A., D.P.P.T.', designation: '', type: 'primary', sort_order: 5, image: '/images/lecturer5.webp' },
  { id: 'd-p-6', name: 'Mrs. Smitha, M.A., B.Ed.', designation: '', type: 'primary', sort_order: 6, image: '/images/lecturer6.webp' },
  { id: 'd-p-7', name: 'Mrs. Pooja D., B.A., B.P.Ed., M.P.Ed.', designation: '', type: 'primary', sort_order: 7, image: '/images/lecturer7.webp' },
  { id: 'd-p-8', name: 'Mrs. Asmita Prashanth Shetty, P.U.C., D.P.P.T.', designation: '', type: 'primary', sort_order: 8, image: '/images/lecturer8.webp' },
  { id: 'd-p-9', name: 'Mrs. Kavitha, M.A., N.T.T.', designation: '', type: 'primary', sort_order: 9, image: '/images/lecturer9.webp' },
  { id: 'd-p-10', name: 'Mrs. Cicilia Mascarenhas, P.U.C., D.Ed.', designation: '', type: 'primary', sort_order: 10, image: '/images/lecturer10.webp' },
  { id: 'd-p-11', name: 'Mrs. Amritha H., B.Com., N.T.T.', designation: '', type: 'primary', sort_order: 11, image: '/images/lecturer11.webp' },
  { id: 'd-p-12', name: 'Mrs. Shobha Girish Shetty, B.A., PGDBM, G.D.C., N.T.T.', designation: '', type: 'primary', sort_order: 12, image: '/images/lecturer12.webp' },
];

const defaultSecondaryTeachers: FacultyMember[] = [
  { id: 'd-s-1', name: 'Mrs. B. Veena Shenoy, M.Sc., B.Ed.', designation: 'Principal', type: 'secondary', sort_order: 1, image: '/images/B Veena Shenoy.webp' },
  { id: 'd-s-2', name: 'Mr. Nishanth Anchan, B.A., B.P.Ed.', designation: '', type: 'secondary', sort_order: 2, image: '/images/lecturer13.webp' },
  { id: 'd-s-3', name: 'Mrs. Sukanya, B.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 3, image: '/images/lecturer14.webp' },
  { id: 'd-s-4', name: 'Mrs. Geetha Shettigar, M.A., B.Ed.', designation: '', type: 'secondary', sort_order: 4, image: '/images/lecturer15.webp' },
  { id: 'd-s-5', name: 'Mrs. Arathi Achar, M.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 5, image: '/images/lecturer16.webp' },
  { id: 'd-s-6', name: 'Mrs. Sowmya P, M.A., B.Ed.', designation: '', type: 'secondary', sort_order: 6, image: '/images/lecturer17.webp' },
  { id: 'd-s-7', name: 'Mrs. Latha M.M, B.A.', designation: '', type: 'secondary', sort_order: 7, image: '/images/lecturer18.webp' },
  { id: 'd-s-8', name: 'Mrs. Jyothi Hegde, M.Com., B.Ed.', designation: '', type: 'secondary', sort_order: 8, image: '/images/lecturer19.webp' },
  { id: 'd-s-9', name: 'Mrs. Mrudula Gokhale M., B.A., Diploma in Comp. Sci. & Engg.', designation: '', type: 'secondary', sort_order: 9, image: '/images/lecturer20.webp' },
  { id: 'd-s-10', name: 'Mrs. Leera Rodrigues, M.A., B.Ed.', designation: '', type: 'secondary', sort_order: 10, image: '/images/lecturer21.webp' },
  { id: 'd-s-11', name: 'Mrs. Archana, D.Ed.', designation: '', type: 'secondary', sort_order: 11, image: '/images/lecturer22.webp' },
  { id: 'd-s-12', name: 'Ms. Poornima P.B, D.Ed.', designation: '', type: 'secondary', sort_order: 12, image: '/images/lecturer23.webp' },
  { id: 'd-s-13', name: 'Mr. Rakesh, M.A., B.Ed.', designation: '', type: 'secondary', sort_order: 13, image: '/images/lecturer24.webp' },
  { id: 'd-s-14', name: 'Mrs. Prakrithi K, B.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 14, image: '/images/lecturer25.webp' },
  { id: 'd-s-15', name: 'Mrs. Shilpa Devadiga, M.A., B.Ed.', designation: '', type: 'secondary', sort_order: 15, image: '/images/lecturer26.webp' },
  { id: 'd-s-16', name: 'Mrs. Poojary Nidhi Jarappa, B.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 16, image: '/images/lecturer27.webp' },
  { id: 'd-s-17', name: 'Ms. A. Shruthi, M.A.', designation: '', type: 'secondary', sort_order: 17, image: '/images/lecturer28.webp' },
  { id: 'd-s-18', name: 'Mrs. Ranjitha, B.A., B.Ed.', designation: '', type: 'secondary', sort_order: 18, image: '/images/lecturer29.webp' },
  { id: 'd-s-19', name: 'Mrs. Shankramma Umesh Poojary, M.A., D.Ed.', designation: '', type: 'secondary', sort_order: 19, image: '/images/lecturer30.webp' },
  { id: 'd-s-20', name: 'Mrs. Shrithi Nayak, M.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 20, image: '/images/lecturer31.webp' },
  { id: 'd-s-21', name: 'Mrs. H. Thejaswini, M.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 21, image: '/images/lecturer32.webp' },
  { id: 'd-s-22', name: 'Ms. Sahana J., M.Sc., B.Ed.', designation: '', type: 'secondary', sort_order: 22, image: '/images/lecturer33.webp' },
];

const teacherImage: Record<string, string> = {
  'Mrs. B. Veena Shenoy, M.Sc., B.Ed.': '/images/B Veena Shenoy.webp',
  'Mrs. Archana, D.Ed.': '/images/Archana.webp',
};

function getTeacherImage(teacher: FacultyMember): string {
  if (teacher.image) return teacher.image;
  if (teacherImage[teacher.name]) return teacherImage[teacher.name];
  return '/images/faculty-placeholder.svg';
}

export default function FacultyGallery() {
  const [primaryTeachers, setPrimaryTeachers] = useState<FacultyMember[]>([]);
  const [secondaryTeachers, setSecondaryTeachers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaculty()
      .then((data) => {
        // Successful load (even if empty) — respect what's in the database
        setPrimaryTeachers(data.filter((t) => t.type === 'primary'));
        setSecondaryTeachers(data.filter((t) => t.type === 'secondary'));
      })
      .catch(() => {
        // Load failed (e.g. Supabase down) — fall back to hardcoded defaults
        setPrimaryTeachers(defaultPrimaryTeachers);
        setSecondaryTeachers(defaultSecondaryTeachers);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const principal = [...primaryTeachers, ...secondaryTeachers].find((t) => t.designation === 'Principal');
  const secondaryList = secondaryTeachers.filter((t) => t.designation !== 'Principal');

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
            to="/"
            className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Principal Section */}
      {!loading && (
      <section className="pt-28 pb-12 bg-gradient-to-b from-slate to-forest/90">
        <div className="content-max-width page-padding flex flex-col items-center text-center">
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-saffron/60 shadow-lg mb-5">
            <img
              src={principal?.image || '/images/principal-portrait.webp'}
              alt="Principal"
              className="w-full h-full object-cover object-top scale-125"
            />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,3rem)] text-ivory leading-tight mb-2">
            Principal
          </h2>
          <p className="text-saffron font-poppins text-xl font-semibold">
            {principal?.name || 'Mrs. B. Veena Shenoy, M.Sc., B.Ed.'}
          </p>
        </div>
      </section>
      )}

      {/* Primary Teachers */}
      <section className="section-padding">
        <div className="content-max-width page-padding">
          <h2 className="section-title text-center mb-10">Primary Teachers</h2>
          {loading ? (
            <div className="text-center py-8"><div className="animate-spin h-6 w-6 border-2 border-saffron border-t-transparent rounded-full mx-auto" /></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {primaryTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-xl overflow-hidden border border-forest/10 shadow-sm hover:shadow-md hover:border-saffron/40 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-slate">
                    <img
                      src={getTeacherImage(teacher)}
                      alt={teacher.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-poppins text-[13px] sm:text-sm text-forest leading-snug">
                      {teacher.name}
                    </p>
                    {teacher.designation && (
                      <span className="mt-1 inline-block bg-saffron/20 text-saffron-deep text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {teacher.designation}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Secondary Teachers */}
      <section className="section-padding bg-cream/50">
        <div className="content-max-width page-padding">
          <h2 className="section-title text-center mb-10">Secondary Teachers</h2>
          {loading ? (
            <div className="text-center py-8"><div className="animate-spin h-6 w-6 border-2 border-saffron border-t-transparent rounded-full mx-auto" /></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {secondaryList.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-xl overflow-hidden border border-forest/10 shadow-sm hover:shadow-md hover:border-saffron/40 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-slate">
                    <img
                      src={getTeacherImage(teacher)}
                      alt={teacher.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-poppins text-[13px] sm:text-sm text-forest leading-snug">
                      {teacher.name}
                    </p>
                    {teacher.designation && (
                      <span className="mt-1 inline-block bg-saffron/20 text-saffron-deep text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {teacher.designation}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate py-8">
        <div className="content-max-width page-padding text-center">
          <p className="text-ivory/50 text-sm">
            &copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
