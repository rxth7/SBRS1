import { Link } from 'react-router';
import { ArrowLeft, Target, Compass, History, BookOpen } from 'lucide-react';

export default function AboutSchool() {
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
            <BookOpen className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
            About <span className="text-saffron">Our School</span>
          </h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-2xl mx-auto">
            Discover the story, vision, and legacy of Sri Bhuvanendra Residential School
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-10">

          {/* About Us */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-saffron" />
                </div>
                <h2 className="font-playfair text-2xl text-slate">About Us</h2>
              </div>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                Sri Bhuvanendra Residential School (SBRS), located amidst revered religious centres
                and enveloped by the serene beauty of nature, is a premier co-educational institution
                affiliated with the Central Board of Secondary Education (CBSE). Managed by the Sri
                Bhuvanendra College Trust and sponsored by the Academy of General Education, Manipal,
                the school is dedicated to nurturing strong values, discipline, academic excellence,
                and essential life skills in every learner.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                With a proud legacy of over two decades and a consistent record of 100 percent success
                in the CBSE Class X Board Examinations, SBRS stands as a shining example of academic
                excellence and holistic development. The institution remains committed to empowering
                students with a strong academic foundation and preparing them for a bright, purposeful,
                and successful future.
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-saffron" />
                  </div>
                  <h2 className="font-playfair text-2xl text-slate">Vision</h2>
                </div>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  To empower students to explore their full potential and grow into responsible
                  and productive citizens of the nation.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                    <Compass className="w-5 h-5 text-saffron" />
                  </div>
                  <h2 className="font-playfair text-2xl text-slate">Mission</h2>
                </div>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  To identify, cultivate, and transform the hidden potentials of every learner
                  into meaningful achievements.
                </p>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                  <History className="w-5 h-5 text-saffron" />
                </div>
                <h2 className="font-playfair text-2xl text-slate">History</h2>
              </div>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                Nestled amidst the breathtaking natural beauty of the Western Ghats, Sri Bhuvanendra
                Residential School (SBRS) has emerged as one of the most prestigious educational
                institutions in coastal Karnataka. Surrounded by a serene, healthy, and inspiring
                environment, the school has been committed to delivering quality education to students
                from both rural and urban backgrounds.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                Established on 1st June 2001 with the noble vision of providing equal educational
                opportunities to all, SBRS proudly celebrates 25 years of dedicated service in shaping
                young minds and building future leaders.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                The institution owes its remarkable growth to the blessings of His Holiness Sri
                Bhuvanendra Tirtha Swamiji and Sri Dr. T.M.A. Pai. Guided by the visionary leadership
                of the Academy of General Education and the Sri Bhuvanendra College Trust, supported
                by continuous investment in quality education and the unwavering trust of parents,
                SBRS has steadily built a strong reputation for academic excellence.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                Spread across 12 acres of lush greenery, the SBRS campus offers an ideal atmosphere
                for learning and personal growth. The tranquil surroundings, complemented by the
                scenic backdrop of Ramasamudra Lake, verdant hills, and the majestic statue of
                Bhagavan Bahubali, create a perfect setting that truly reflects the school's
                philosophy of "Healthy Body – Healthy Mind."
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                The peaceful environment nurtures not only academic excellence but also the physical,
                mental, emotional, and spiritual well-being of every student.
              </p>
            </div>
          </div>

          {/* A Journey Illuminated by Knowledge */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-saffron" />
                </div>
                <h2 className="font-playfair text-2xl text-slate">A Journey Illuminated by Knowledge</h2>
              </div>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                True to the saying, "Great achievements begin with humble beginnings," SBRS commenced
                its educational journey in 2001, offering the CBSE curriculum with classes starting
                from Grade VI.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                In its early days, the school functioned from a hostel building belonging to Sri
                Bhuvanendra College. What began with just 11 students and a single teacher has today
                transformed into a vibrant residential institution providing quality education to over
                600 students.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                Driven by determination, unwavering commitment, visionary leadership, and dedicated
                administration, SBRS has reached remarkable milestones within just twenty-five years.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                Initially established to serve children from rural communities, the school has now
                grown into a highly respected residential institution attracting students not only
                from different parts of Karnataka but also from other states and even abroad.
              </p>
            </div>
          </div>

          {/* A Legacy of Academic Excellence */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-saffron to-burgundy" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-saffron" />
                </div>
                <h2 className="font-playfair text-2xl text-slate">A Legacy of Academic Excellence</h2>
              </div>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                The year 2005 marked a significant milestone when the first batch of SSE (Class X)
                students achieved a 100% pass rate. Since then, SBRS has consistently maintained
                this remarkable tradition of achieving 100% results, reflecting the school's
                unwavering commitment to academic excellence.
              </p>
              <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                This outstanding achievement is the result of the students' dedication, disciplined
                learning practices, and the tireless guidance and commitment of its highly qualified
                teachers. Together, these three pillars form the foundation of SBRS's continued success.
              </p>
            </div>
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
