import { useEffect, useState } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { getDisclosureLinks, upsertDisclosureLink } from '../lib/disclosureLinksStore';

const linkItems = [
  { section: 'application_form', label: 'SBRS Application Form', items: [
    { sl: 1, doc: 'Online Application Form URL' },
  ]},
  { section: 'documents', label: 'B. Documents and Information', items: [
    { sl: 1, doc: 'Copies of Affiliation / Up Gradation Letter and recent extension of affiliation, if any' },
    { sl: 2, doc: 'Copies of Societies / Trust / Company Registrations / Renewal Certificate, as applicable' },
    { sl: 3, doc: 'Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt. / UT' },
    { sl: 4, doc: 'Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt. / UT' },
    { sl: 5, doc: 'Copy of Valid Building Safety Certificate as per the National Building Code' },
    { sl: 6, doc: 'Copy of Valid Fire Safety Certificate issued by the Competent Authority' },
    { sl: 7, doc: 'Copy of the Certificate submitted by the school for Affiliation Self Certification by School' },
    { sl: 8, doc: 'Copies of Valid, Health and Sanitation Certificates' },
  ]},
  { section: 'result_academics', label: 'C. Result and Academics', items: [
    { sl: 1, doc: 'Fee Structure of the School' },
    { sl: 2, doc: 'Annual Academic Calendar' },
    { sl: 3, doc: 'List of School Management Committee (SMC)' },
    { sl: 4, doc: 'List of Parents Teachers Association (PTA) Members' },
    { sl: 5, doc: 'Last Three – Years Result of the Board Examination as per Applicability' },
  ]},
  { section: 'staff', label: 'D. Staff (Teaching)', items: [
    { sl: 3, doc: 'Teachers Detail' },
  ]},
  { section: 'infrastructure', label: 'E. School Infrastructure', items: [
    { sl: 10, doc: 'Link of YouTube Video of the Inspection of School Covering the Infrastructures of the School' },
  ]},
  { section: 'student_details', label: 'F. Student Details', items: [
    { sl: 1, doc: 'Class-wise enrollment' },
    { sl: 2, doc: 'Number of SC/ST/OBC students' },
  ]},
];

export default function DisclosureLinksAdmin() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getDisclosureLinks().then((data) => {
      const map: Record<string, string> = {};
      data.forEach((l) => {
        map[`${l.section}_${l.sl_no}`] = l.link_url;
      });
      setLinks(map);
    });
  }, []);

  const handleSave = async (section: string, sl_no: number) => {
    const key = `${section}_${sl_no}`;
    setSaving(key);
    setSuccess('');
    setError('');
    try {
      await upsertDisclosureLink(section, sl_no, links[key] || '');
      setSuccess(`${section} #${sl_no} saved!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to save link.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
        <FileText size={20} className="text-saffron" /> Disclosure Links
      </h3>
      <p className="font-poppins text-sm text-forest/60">Paste any public URL (Google Drive, Google Docs, PDF links, YouTube, etc.) for each item below.</p>

      {success && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{success}</p>}
      {error && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{error}</p>}

      {linkItems.map((group) => (
        <div key={group.section} className="bg-white rounded-xl border border-forest/10 overflow-hidden">
          <div className="bg-slate px-5 py-3">
            <h4 className="font-poppins text-sm font-bold text-ivory">{group.label}</h4>
          </div>
          <div className="divide-y divide-forest/5">
            {group.items.map((item) => {
              const key = `${group.section}_${item.sl}`;
              return (
                <div key={key} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins text-xs text-forest/50 mb-1">#{item.sl}</p>
                    <p className="font-poppins text-sm text-forest">{item.doc}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
                    <input
                      type="text"
                      value={links[key] || ''}
                      onChange={(e) => setLinks({ ...links, [key]: e.target.value })}
                      placeholder="Paste URL here..."
                      className="flex-1 md:w-72 px-3 py-2 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                    />
                    {links[key] && (
                      <a href={links[key]} target="_blank" rel="noopener noreferrer" className="p-2 text-saffron hover:text-saffron-deep transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      onClick={() => handleSave(group.section, item.sl)}
                      disabled={saving === key}
                      className="px-4 py-2 bg-saffron text-forest font-poppins text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all disabled:opacity-50 whitespace-nowrap"
                    >
                      {saving === key ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
