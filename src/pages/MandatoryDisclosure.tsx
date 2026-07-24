import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, FileText } from 'lucide-react';
import { getDisclosureLinks } from '../lib/disclosureLinksStore';

const generalInfo = [
  { sl: 1, info: 'Name of the School', details: 'SRI BHUVANENDRA RESIDENTIAL SCHOOL' },
  { sl: 2, info: 'Affiliation No.', details: '830100' },
  { sl: 3, info: 'School Code', details: '45076' },
  { sl: 4, info: 'Complete Address with Pin Code', details: 'Madhav Nagar, Industrial Area, Karkala – 574 104' },
  { sl: 5, info: 'Principal Name and Qualification', details: 'Mrs. B Veena Shenoy, M.Sc. B.Ed.' },
  { sl: 6, info: 'School Email ID', details: 'sbrs2002@gmail.com' },
  { sl: 7, info: 'Contact Details (Land Line / Mobile)', details: '8197421795' },
];

const documents = [
  { sl: 1, doc: 'Copies of Affiliation / Up Gradation Letter and recent extension of affiliation, if any', upload: '/documents/affiliation-self-certification.pdf' },
  { sl: 2, doc: 'Copies of Societies / Trust / Company Registrations / Renewal Certificate, as applicable', upload: '/documents/trust-reg.jpg' },
  { sl: 3, doc: 'Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt. / UT', upload: '/documents/noc-state.jpg' },
  { sl: 4, doc: 'Copy of Valid Building Safety Certificate as per the National Building Code', upload: '/documents/building-safety.pdf' },
  { sl: 5, doc: 'Copy of Valid Fire Safety Certificate issued by the Competent Authority', upload: '/documents/fire-safety.pdf' },
  { sl: 6, doc: 'Copy of the Certificate submitted by the school for Affiliation Self Certification by School', upload: '/documents/affiliation-self-certification.pdf' },
  { sl: 7, doc: 'Copies of Valid, Health and Sanitation Certificates', upload: '' },
];

const resultAcademics = [
  { sl: 1, doc: 'Fee Structure of the School', upload: '/documents/fee-structure.pdf' },
  { sl: 2, doc: 'Annual Academic Calendar', upload: '/documents/academic-calendar.pdf' },
  { sl: 3, doc: 'List of School Management Committee (SMC)', upload: '/documents/smc-list.pdf' },
  { sl: 4, doc: 'List of Parents Teachers Association (PTA) Members', upload: '/documents/pta-members.pdf' },
  { sl: 5, doc: 'Last Three – Years Result of the Board Examination as per Applicability', upload: '/documents/Result of Class X CBSE Exams.docx' },
];

const staffInfo = [
  { sl: 1, info: 'Principal', details: '01' },
  { sl: 2, info: 'Total No of Teachers', details: '34', sub: [
    { label: 'PGT', value: '--' },
    { label: 'TGT', value: '19' },
    { label: 'PRT', value: '15' },
  ]},
  { sl: 3, info: "Teachers Detail", details: '/documents/staff-info.pdf' },
  { sl: 4, info: 'Teachers Section Ratio', details: '1 : 1.7' },
  { sl: 5, info: 'Details of Special Educator', details: '01' },
  { sl: 6, info: 'Details of Counselor and Wellness Teacher', details: '01' },
];

const infrastructure = [
  { sl: 1, info: 'Total Campus Area of the School (In Sq. Mtr)', details: '50990 Sq. Mtrs' },
  { sl: 2, info: 'Build-up Area in Sq. Mtr', details: '2598 Sq. Mtrs' },
  { sl: 3, info: 'Area of the Playground in Sq. Mtrs', details: '8082 Sq. Mtrs' },
  { sl: 4, info: 'Total Number of Class Rooms / No. and Size of the Class Rooms (In Sq. Ft Mtr)', details: '24 / 21.6 X 24.6 Sq/ Mtrs' },
  { sl: 5, info: 'Library Room and Size', details: '2 – 21.6 X 49.2 Sq Mtrs', sub: [
    { label: 'No. of Books', value: '6850' },
    { label: 'Periodicals', value: '08' },
    { label: 'Dailies', value: '07' },
  ]},
  { sl: 6, info: 'Labs', details: 'Yes', sub: [
    { label: 'Physics', value: '9.6 x 6.5 = 62.40 Sq Mtrs' },
    { label: 'Chemistry', value: '9.43 x 6.5 = 61.30 Sq Mtrs' },
    { label: 'Biology', value: '9.43 x 6.5 = 61.30 Sq Mtrs' },
    { label: 'Mathematics', value: '10.57 x 6.5 = 68.70 Sq Mtrs' },
    { label: 'Computer', value: '9.43 x 6.5 = 61.30 Sq Mtrs' },
  ]},
  { sl: 7, info: 'Internet Facility (Y/N)', details: 'Yes' },
  { sl: 8, info: 'No. of Girls Toilets / No. of Boys Toilets', details: '15 / 20' },
  { sl: 9, info: 'Drinking Water Facility', details: 'Yes' },
  { sl: 10, info: 'Link of YouTube Video of the Inspection of School Covering the Infrastructures of the School', details: '/documents/school-inspection.jpg' },
];

const studentDetails = [
  { sl: 1, info: 'Class-wise enrollment', upload: '/documents/1. CLASS-WISE ENROLLMENT (1).pdf' },
  { sl: 2, info: 'Number of SC/ST/OBC students', upload: '/documents/2. NUMBER OF SCST STUDENT LIST.pdf' },
];

const academicDetails = [
  { sl: 1, info: 'Academic session period', details: 'April – March' },
  { sl: 2, info: 'Vacation Period', details: 'April – May' },
  { sl: 3, info: 'Admission Period', details: 'January - March' },
];

export default function MandatoryDisclosure() {
  const [linkMap, setLinkMap] = useState<Record<string, string>>({});

  useEffect(() => {
    getDisclosureLinks().then((data) => {
      const map: Record<string, string> = {};
      data.forEach((l) => {
        map[`${l.section}_${l.sl_no}`] = l.link_url;
      });
      setLinkMap(map);
    });
  }, []);

  const getLink = (section: string, sl: number, fallback: string): string => {
    return linkMap[`${section}_${sl}`] || fallback;
  };
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
              <span className="font-poppins text-[11px] uppercase tracking-[0.15em] font-medium text-saffron">Sri Bhuvanendra</span>
              <span className="block font-poppins text-[10px] uppercase tracking-[0.1em] text-ivory/70">Residential School</span>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-ivory/80 hover:text-saffron transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-slate via-slate/95 to-slate">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-2">Mandatory Public Disclosure</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-10">

          {/* A: General Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">A. General Information</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Information</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {generalInfo.map((row) => (
                    <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                      <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                      <td className="font-poppins text-sm py-3 px-4 font-medium text-slate">{row.info}</td>
                      <td className="font-poppins text-sm py-3 px-4 text-gray-600">{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B: Documents and Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">B. Documents and Information</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Documents / Information</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-32 text-gray-500">Upload Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((row) => (
                    <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                      <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                      <td className="font-poppins text-sm py-3 px-4 text-gray-600">{row.doc}</td>
                      <td className="font-poppins text-sm py-3 px-4">
                        {(() => { const u = getLink('documents', row.sl, row.upload); return u ? <a href={u} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline font-medium">Link</a> : null; })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <p className="font-poppins text-xs text-gray-500 leading-relaxed">
                <strong>Note:</strong> The schools needs to upload the self attested copies of above listed documents by Chairman / Manager / Secretary and Principal. In case, it is noticed at later stage the uploaded documents are not genuine then school shall be liable for action as per norms.
              </p>
            </div>
          </div>

          {/* C: Result and Academics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">C. Result and Academics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Documents / Information</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-32 text-gray-500">Upload Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {resultAcademics.map((row) => (
                    <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                      <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                      <td className="font-poppins text-sm py-3 px-4 text-gray-600">{row.doc}</td>
                      <td className="font-poppins text-sm py-3 px-4">
                        {(() => { const u = getLink('result_academics', row.sl, row.upload); return u ? <a href={u} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline font-medium">Link</a> : null; })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* D: Staff (Teaching) */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">D. Staff (Teaching)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Information</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-32 text-gray-500">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {staffInfo.map((row) => (
                    <>
                      <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                        <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                        <td className="font-poppins text-sm py-3 px-4 font-medium text-slate">{row.info}</td>
                        <td className="font-poppins text-sm py-3 px-4 text-gray-600">
                          {row.details?.endsWith('.pdf') ? (
                            (() => { const u = getLink('staff', row.sl, row.details); return <a href={u} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline font-medium">Link</a>; })()
                          ) : row.details}
                        </td>
                      </tr>
                      {row.sub?.map((s, i) => (
                        <tr key={`${row.sl}-sub-${i}`} className="border-t border-gray-100 bg-gray-50/50">
                          <td className="font-poppins text-sm py-2 px-4"></td>
                          <td className="font-poppins text-sm py-2 px-4 text-gray-500 pl-8">{s.label}</td>
                          <td className="font-poppins text-sm py-2 px-4 text-gray-600 font-medium">{s.value}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* E: School Infrastructure */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">E. School Infrastructure</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Information</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {infrastructure.map((row) => (
                    <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                      <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                      <td className="font-poppins text-sm py-3 px-4 font-medium text-slate">{row.info}</td>
                      <td className="font-poppins text-sm py-3 px-4 text-gray-600">
                        {row.sl === 10 ? (() => { const u = getLink('infrastructure', 10, row.details); return u ? <a href={u} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline font-medium">Link</a> : row.details; })() : row.details}
                      </td>
                    </tr>
                  ))}
                  {infrastructure.filter(r => r.sub).map((row) =>
                    row.sub?.map((s, i) => (
                      <tr key={`${row.sl}-sub-${i}`} className="border-t border-gray-100 bg-gray-50/50">
                        <td className="font-poppins text-sm py-2 px-4"></td>
                        <td className="font-poppins text-sm py-2 px-4 text-gray-500 pl-8">{s.label}</td>
                        <td className="font-poppins text-sm py-2 px-4 text-gray-600">{s.value}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* F: Student Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">F. Student Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Particulars</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-32 text-gray-500">Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetails.map((row) => (
                    <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                      <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                      <td className="font-poppins text-sm py-3 px-4 text-gray-600">{row.info}</td>
                      <td className="font-poppins text-sm py-3 px-4">
                        {(() => { const u = getLink('student_details', row.sl, row.upload); return u ? <a href={u} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline font-medium">Link</a> : null; })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* G: Academic Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-slate px-6 py-3">
              <h2 className="font-poppins text-sm font-bold text-ivory uppercase tracking-wider">G. Academic Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left w-16 text-gray-500">Sl. No</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Particulars</th>
                    <th className="font-poppins text-xs font-semibold py-3 px-4 text-left text-gray-500">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {academicDetails.map((row) => (
                    <tr key={row.sl} className="border-t border-gray-100 hover:bg-saffron/5 transition-colors">
                      <td className="font-poppins text-sm py-3 px-4 text-gray-400">{row.sl}</td>
                      <td className="font-poppins text-sm py-3 px-4 font-medium text-slate">{row.info}</td>
                      <td className="font-poppins text-sm py-3 px-4 text-gray-600">
                        {row.details?.endsWith('.jpg') || row.details?.endsWith('.png') || row.details?.endsWith('.pdf') ? (
                          <a href={row.details} target="_blank" rel="noopener noreferrer" className="text-saffron hover:underline font-medium">Link</a>
                        ) : row.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[2vw] text-center">
          <p className="text-ivory/50 text-sm">&copy; {new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
