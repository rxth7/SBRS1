import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Phone, CreditCard, AlertCircle, Banknote } from 'lucide-react';
import { getFeeItems, getFeeNotes, type FeeItem, type FeeNote } from '../lib/feeStore';

const defaultTotals = { lkg: '₹ 33,000.00', i_to_v: '₹ 38,000.00', vi_to_x: '₹ 43,500.00' };

const defaultFeeItems = [
  { id: 'default-1', particular: 'Admission Fee', lkg: '₹ 100.00', i_to_v: '₹ 100.00', vi_to_x: '₹ 100.00', sort_order: 1 },
  { id: 'default-2', particular: 'Tuition Fee', lkg: '₹ 23,300.00', i_to_v: '₹ 26,300.00', vi_to_x: '₹ 31,300.00', sort_order: 2 },
  { id: 'default-3', particular: 'School Devt Fee', lkg: '₹ 9,600.00', i_to_v: '₹ 11,600.00', vi_to_x: '₹ 12,100.00', sort_order: 3 },
];

const defaultNotes = [
  { id: 'default-1', note: 'Uniform, Books, ID cards will be charged at actual cost', sort_order: 1 },
  { id: 'default-2', note: 'School calendar and Health card charges – ₹ 150.00', sort_order: 2 },
  { id: 'default-3', note: 'Excursion – optional', sort_order: 3 },
  { id: 'default-4', note: 'Nursery class fees Rs. 2000/- month', sort_order: 4 },
  { id: 'default-5', note: 'Fees once paid will not be refunded', sort_order: 5 },
  { id: 'default-6', note: "No School Devt Fees for staff members' children", sort_order: 6 },
];

export default function FeeStructure() {
  const [feeData, setFeeData] = useState<FeeItem[]>([]);
  const [notes, setNotes] = useState<FeeNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getFeeItems(),
      getFeeNotes(),
    ]).then(([dbFeeData, dbFeeNotes]) => {
      const useDefaultFee = dbFeeData.length === 0;
      const useDefaultNotes = dbFeeNotes.length === 0;
      console.log('FeeStructure: DB fee count:', dbFeeData.length, 'using defaults:', useDefaultFee);
      console.log('FeeStructure: DB note count:', dbFeeNotes.length, 'using defaults:', useDefaultNotes);
      setFeeData(useDefaultFee ? defaultFeeItems : dbFeeData);
      setNotes(useDefaultNotes ? defaultNotes : dbFeeNotes);
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
            <Banknote className="w-8 h-8 text-saffron" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
            Fee <span className="text-saffron">Structure</span>
          </h1>
          <p className="font-poppins text-ivory/70 text-base md:text-lg max-w-2xl mx-auto">
            Fee Structure for the Year 2026 – 27 (New Admission)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-ivory/60 text-sm">
              <Phone className="w-4 h-4 text-saffron" />
              <span className="font-poppins">Office: <span className="text-ivory font-medium">9844548735</span></span>
            </div>
            <div className="flex items-center gap-2 text-ivory/60 text-sm">
              <Phone className="w-4 h-4 text-saffron" />
              <span className="font-poppins">Principal: <span className="text-ivory font-medium">8197421795</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Table */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          {/* Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate text-ivory">
                    <th className="font-poppins text-sm font-semibold py-4 px-6 text-left w-16">Sl.No</th>
                    <th className="font-poppins text-sm font-semibold py-4 px-6 text-left">Particulars of the Fees</th>
                    <th className="font-poppins text-sm font-semibold py-4 px-6 text-center">LKG</th>
                    <th className="font-poppins text-sm font-semibold py-4 px-6 text-center">I to V</th>
                    <th className="font-poppins text-sm font-semibold py-4 px-6 text-center">VI to X</th>
                  </tr>
                </thead>
                <tbody>
                  {/* School Fee Header */}
                  <tr className="bg-saffron/10">
                    <td className="font-poppins text-sm font-bold py-3 px-6 text-slate">A</td>
                    <td className="font-poppins text-sm font-bold py-3 px-6 text-slate" colSpan={4}>
                      School Fee
                    </td>
                  </tr>

                  {/* Fee Rows */}
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-8"><div className="animate-spin h-6 w-6 border-2 border-saffron border-t-transparent rounded-full mx-auto" /></td></tr>
                  ) : (
                    feeData.map((row, i) => (
                      <tr key={row.id} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} hover:bg-saffron/5 transition-colors`}>
                        <td className="font-poppins text-sm py-4 px-6 text-gray-400"></td>
                        <td className="font-poppins text-sm font-medium py-4 px-6 text-slate">{row.particular}</td>
                        <td className="font-poppins text-sm py-4 px-6 text-center text-slate">{row.lkg}</td>
                        <td className="font-poppins text-sm py-4 px-6 text-center text-slate">{row.i_to_v}</td>
                        <td className="font-poppins text-sm py-4 px-6 text-center text-slate">{row.vi_to_x}</td>
                      </tr>
                    ))
                  )}

                  {/* Total Row */}
                  <tr className="border-t-2 border-saffron bg-saffron/10">
                    <td className="font-poppins text-sm py-4 px-6"></td>
                    <td className="font-poppins text-sm font-bold py-4 px-6 text-burgundy">Total</td>
                    <td className="font-poppins text-sm font-bold py-4 px-6 text-center text-burgundy">{defaultTotals.lkg}</td>
                    <td className="font-poppins text-sm font-bold py-4 px-6 text-center text-burgundy">{defaultTotals.i_to_v}</td>
                    <td className="font-poppins text-sm font-bold py-4 px-6 text-center text-burgundy">{defaultTotals.vi_to_x}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-terracotta" />
              </div>
              <h3 className="font-playfair text-xl text-slate">Note</h3>
            </div>
            <ol className="space-y-3">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-poppins text-sm font-semibold text-saffron mt-0.5 min-w-[20px]">{i + 1}</span>
                  <span className="font-poppins text-sm text-gray-600 leading-relaxed">{note.note}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Bank Details */}
          <div className="bg-gradient-to-br from-slate via-slate/95 to-slate rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-saffron/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-saffron" />
              </div>
              <h3 className="font-playfair text-xl text-ivory">Bank Details <span className="font-poppins text-sm text-ivory/60">(Canara Bank)</span></h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="font-poppins text-xs uppercase tracking-wider text-ivory/50 block mb-1">Account Name</span>
                  <p className="font-poppins text-sm text-ivory">Sri Bhuvanendra College Trust</p>
                </div>
                <div>
                  <span className="font-poppins text-xs uppercase tracking-wider text-ivory/50 block mb-1">Branch</span>
                  <p className="font-poppins text-sm text-ivory">S.B. College Campus Branch, Karkala</p>
                </div>
                <div>
                  <span className="font-poppins text-xs uppercase tracking-wider text-ivory/50 block mb-1">SB A/C Number</span>
                  <p className="font-poppins text-lg font-bold text-saffron">02652200006782</p>
                </div>
                <div>
                  <span className="font-poppins text-xs uppercase tracking-wider text-ivory/50 block mb-1">IFSC Code</span>
                  <p className="font-poppins text-lg font-bold text-saffron">CNRB0010265</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-md border border-ivory/10">
                  <img
                    src="/images/qr-code.webp"
                    alt="Canara Bank QR Code"
                    className="w-36 h-36 object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <p className="font-poppins text-xs text-ivory/50 text-center max-w-[220px] leading-relaxed">
                  (Please submit the payment details in the school office and collect the receipt)
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-ivory/10 flex items-center gap-2">
              <Phone className="w-4 h-4 text-saffron" />
              <span className="font-poppins text-sm text-ivory/70">
                For more details contact school office WhatsApp No <span className="text-saffron font-medium">9844548735</span>
              </span>
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
