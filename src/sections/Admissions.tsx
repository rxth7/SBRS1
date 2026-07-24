import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const documents = [
  'Birth Certificate (Date of Birth proof)',
  'Marks Statement of the Previous Academic Year',
  'Recent Passport Size Photographs – 5 copies',
  'Aadhaar Card Copies of the Student and Parents',
  'Income Certificate and Caste Certificate (if applicable)',
  'Blood Group Report',
];

export default function Admissions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('.admission-step');
        gsap.fromTo(
          steps,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="admissions"
      ref={sectionRef}
      className="pt-8 pb-20 lg:pt-10 lg:pb-28 bg-ivory"
    >
      <span className="sr-only">school admission in karkala, boarding school admission, residential school admissions, hostel admission in karkala, apply for school admission, enroll in boarding school, admission open in karkala, admissions 2026</span>
      <div className="content-max-width page-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-poppins text-xs uppercase tracking-[0.15em] text-terracotta mb-4">
            Join Us
          </span>
          <h2 className="section-title mb-4">
            Admission Process
          </h2>
          <p className="font-poppins text-base text-forest-light max-w-3xl mx-auto leading-relaxed">
            Admissions are open from Nursery to Grade IX. An entrance examination will be conducted
            for Grades VI to IX, after which all applicants must attend an interaction session at
            the school.
          </p>
        </div>

        {/* Admission Process Content */}
        <div
          ref={stepsRef}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Left - Process */}
          <div className="space-y-6">
            <div className="admission-step card-bg p-8">
              <h3 className="font-playfair text-xl text-forest mb-4">
                Application Process
              </h3>
              <p className="font-poppins text-sm text-forest-light leading-relaxed mb-4">
                Application forms will be issued to shortlisted candidates and can be obtained from
                the school office. Duly filled application forms must be submitted to the school
                office within the stipulated time.
              </p>
              <p className="font-poppins text-sm text-forest-light leading-relaxed">
                The final decision regarding admission rests solely with the school management.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4">
              <a
                href="/contact"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const target = document.querySelector('#contact');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary w-full justify-center text-center py-5"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Admissions Office
              </a>

            </div>
          </div>

          {/* Right - Documents */}
          <div className="card-bg p-8">
            <h3 className="font-playfair text-xl text-forest mb-6">
              Documents to be Submitted Along with the Application
            </h3>
            <p className="font-poppins text-sm text-forest-light mb-5">
              Applicants must submit attested copies of the following documents:
            </p>
            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                  <span className="font-poppins text-sm text-forest-light">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
