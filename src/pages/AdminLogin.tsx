import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        onLogin();
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email first');
      return;
    }
    setError('');
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin`,
      });
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate via-forest/90 to-slate flex items-center justify-center px-4 overflow-y-auto">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-saffron/30 shadow-lg">
            <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-playfair text-3xl text-ivory font-bold">Sri Bhuvanendra</h1>
          <p className="font-poppins text-sm text-ivory/60 uppercase tracking-[0.15em] mt-1">Residential School</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8">
          <div className="text-center mb-6">
            <h2 className="font-poppins text-xl font-semibold text-ivory">Admin Login</h2>
            <p className="font-poppins text-sm text-ivory/50 mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-poppins text-xs font-medium text-ivory/70 uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-ivory/20 text-ivory font-poppins text-sm placeholder-ivory/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                placeholder="Enter admin email"
                required
              />
            </div>

            <div>
              <label className="font-poppins text-xs font-medium text-ivory/70 uppercase tracking-wider block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/5 border border-ivory/20 text-ivory font-poppins text-sm placeholder-ivory/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                  placeholder="Enter password"
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

            {resetSent ? (
              <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
                <Mail size={24} className="mx-auto mb-2 text-green-400" />
                <p className="font-poppins text-sm text-green-400 font-medium">
                  Reset link sent!
                </p>
                <p className="font-poppins text-xs text-ivory/60 mt-1">
                  Check your email inbox and click the link to reset your password.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    className="font-poppins text-xs text-saffron hover:text-saffron-deep underline underline-offset-2 transition-colors disabled:opacity-50"
                  >
                    {resetLoading ? 'Sending...' : 'Forgot Password?'}
                  </button>
                </div>

                {error && (
                  <p className="font-poppins text-sm text-red-400 text-center bg-red-400/10 rounded-lg py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ivory/50 hover:text-saffron transition-colors font-poppins text-sm"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-ivory/30 text-xs mt-4 font-poppins">
          &copy; {new Date().getFullYear()} SBRS Admin Panel
        </p>
      </div>
    </div>
  );
}
