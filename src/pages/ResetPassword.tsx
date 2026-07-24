import { useState } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ResetPasswordProps {
  onComplete: () => void;
}

export default function ResetPassword({ onComplete }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        await new Promise((r) => setTimeout(r, 2000));
        await supabase.auth.signOut();
        onComplete();
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate via-forest/90 to-slate flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 max-w-md w-full text-center">
          <KeyRound size={40} className="mx-auto mb-4 text-green-400" />
          <h2 className="font-poppins text-xl font-semibold text-ivory mb-2">Password Updated</h2>
          <p className="font-poppins text-sm text-ivory/60">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate via-forest/90 to-slate flex items-center justify-center px-4 overflow-y-auto">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-saffron/30 shadow-lg">
            <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-playfair text-3xl text-ivory font-bold">Sri Bhuvanendra</h1>
          <p className="font-poppins text-sm text-ivory/60 uppercase tracking-[0.15em] mt-1">Residential School</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8">
          <div className="text-center mb-6">
            <KeyRound size={28} className="mx-auto mb-3 text-saffron" />
            <h2 className="font-poppins text-xl font-semibold text-ivory">Set New Password</h2>
            <p className="font-poppins text-sm text-ivory/50 mt-1">Enter your new admin password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-poppins text-xs font-medium text-ivory/70 uppercase tracking-wider block mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/5 border border-ivory/20 text-ivory font-poppins text-sm placeholder-ivory/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                  placeholder="Min. 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-saffron transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-poppins text-xs font-medium text-ivory/70 uppercase tracking-wider block mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-ivory/20 text-ivory font-poppins text-sm placeholder-ivory/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                placeholder="Re-enter new password"
                required
              />
            </div>

            {error && (
              <p className="font-poppins text-sm text-red-400 text-center bg-red-400/10 rounded-lg py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-ivory/30 text-xs mt-4 font-poppins">
          &copy; {new Date().getFullYear()} SBRS Admin Panel
        </p>
      </div>
    </div>
  );
}
