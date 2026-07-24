import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzlM3GsmAqrP2bA4OcikNQwi4VLXUOPbYq6m-mTsZsXALAbXNB8_EeJjr5xZpDsr4xx/exec';

export default function Feedback() {
  const [formData, setFormData] = useState({
    role: '',
    feedback: '',
    suggestions: '',
    name: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const params = new URLSearchParams();
    params.append('type', 'feedback');
    params.append('timestamp', new Date().toISOString());
    Object.entries(formData).forEach(([key, value]) => params.append(key, value));

    try {
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const result = await res.json();
      setLoading(false);
      if (result.status === 'success') {
        setSubmitted(true);
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch {
      setLoading(false);
      setError('Network error. Please try again.');
    }
  };

  const handleClear = () => {
    setFormData({ role: '', feedback: '', suggestions: '', name: '', phone: '', email: '' });
    setSubmitted(false);
    setError('');
    setLoading(false);
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

      {/* Form Section */}
      <section className="pt-28 pb-16">
        <div className="max-w-[600px] mx-auto px-4">
          {/* Google Form-style Header */}
          <div className="bg-[#1B4332] rounded-t-xl p-6">
            <h1 className="font-poppins text-2xl text-white font-medium mb-2">
              We Value Your Opinions.....!!!
            </h1>
            <p className="font-poppins text-sm text-white/80 leading-relaxed">
              We would love to hear your thoughts or feedback on how we can improve your experience!
            </p>
          </div>

          {/* Form Body */}
          {submitted ? (
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-200 p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-poppins text-xl font-semibold text-gray-800 mb-2">Thank You!</h2>
              <p className="font-poppins text-sm text-gray-500 mb-6">Your feedback has been submitted successfully.</p>
              <Link to="/" className="font-poppins text-sm font-medium text-white bg-[#1B4332] hover:bg-forest-deep px-6 py-3 rounded-lg transition-colors inline-block">Back to Home</Link>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg border border-gray-200">
            <div className="p-6 space-y-8">

              {/* Role Selection */}
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-800 mb-1">
                  I Am <span className="text-red-600">*</span>
                </label>
                <p className="font-poppins text-xs text-gray-500 mb-3">Your response is recorded.</p>
                <div className="space-y-2">
                  {['General Public', 'Parent', 'Alumni', 'Student'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="role"
                        value={option}
                        checked={formData.role === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#1B4332] border-gray-300 focus:ring-[#1B4332]"
                      />
                      <span className="font-poppins text-sm text-gray-700 group-hover:text-[#1B4332] transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Feedback */}
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-800 mb-1">
                  Feedback <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your feedback here..."
                  className="w-full border border-gray-300 rounded-lg p-3 font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] resize-none"
                />
              </div>

              <hr className="border-gray-200" />

              {/* Suggestions */}
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-800 mb-1">
                  Suggestions for Improvement
                </label>
                <textarea
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your suggestions here..."
                  className="w-full border border-gray-300 rounded-lg p-3 font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] resize-none"
                />
              </div>

              <hr className="border-gray-200" />

              {/* Name */}
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-800 mb-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg p-3 font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <hr className="border-gray-200" />

              {/* Phone */}
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-800 mb-1">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full border border-gray-300 rounded-lg p-3 font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <hr className="border-gray-200" />

              {/* Email */}
              <div>
                <label className="block font-poppins text-sm font-medium text-gray-800 mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded-lg p-3 font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="px-6 pb-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="font-poppins text-sm font-medium text-[#1B4332] hover:bg-[#1B4332]/5 px-4 py-2 rounded-lg transition-colors disabled:opacity-40"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="font-poppins text-sm font-medium text-white bg-[#1B4332] hover:bg-forest-deep px-6 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          )}
          {error && (
            <p className="font-poppins text-sm text-red-600 text-center mt-4">{error}</p>
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
