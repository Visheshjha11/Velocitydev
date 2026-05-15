import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!isSignup) {
      // Login flow
      setTimeout(() => {
        setIsLoading(false);
        setError("USER NOT FOUND. PLEASE SIGN UP TO ACCESS THE ARENA.");
        
        // Auto-redirect to signup after showing error
        setTimeout(() => {
          setError(null);
          setIsSignup(true);
        }, 2500);
      }, 1200);
    } else {
      // Signup flow - keep existing backend load error
      setTimeout(() => {
        setIsLoading(false);
        setError("HIGH TRAFFIC DETECTED. BACKEND INITIALIZATION FAILED. PLEASE RETRY LATER.");
        
        setTimeout(() => setError(null), 5000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      {/* Header-like branding */}
      <Link to="/" className="absolute top-10 left-10 hidden md:flex items-center gap-2 group z-20">
        <div className="w-2 h-2 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] group-hover:scale-125 transition-transform" />
        <span className="text-sm tracking-[0.3em]">VELOCITY.DEV</span>
      </Link>

      <div className="w-full max-w-[420px] relative z-10 px-4 sm:px-0">
        <div className="bg-[var(--surface-1)] border hairline p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow on top */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignup ? "signup" : "login"}
              initial={{ opacity: 0, x: isSignup ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignup ? -20 : 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-10 text-center">
                <h1 className="text-xl sm:text-2xl tracking-[0.2em] mb-2 uppercase">
                  {isSignup ? "CREATE ACCOUNT" : "AUTHENTICATE"}
                </h1>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase max-w-[280px] mx-auto leading-relaxed">
                  {isSignup 
                    ? "Establish your identity in the arena and start competing worldwide." 
                    : "Enter your credentials to launch your developer session."}
                </p>
              </div>

              <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                {isSignup && (
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] block uppercase pl-1">
                      Username
                    </label>
                    <input 
                      type="text" 
                      required
                      disabled={isLoading}
                      className="w-full bg-[var(--surface-2)] border hairline px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all disabled:opacity-50"
                      placeholder="zero_cool"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] block uppercase pl-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    required
                    disabled={isLoading}
                    className="w-full bg-[var(--surface-2)] border hairline px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all disabled:opacity-50"
                    placeholder="developer@velocity.dev"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] block uppercase">
                      Password
                    </label>
                    {!isSignup && (
                      <a href="#" className="text-[9px] tracking-[0.2em] text-[var(--primary)] hover:underline opacity-80 uppercase">Reset</a>
                    )}
                  </div>
                  <input 
                    type="password" 
                    required
                    disabled={isLoading}
                    className="w-full bg-[var(--surface-2)] border hairline px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all disabled:opacity-50"
                    placeholder="********"
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 text-[var(--accent-red)] text-[10px] tracking-[0.1em] font-bold"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--accent-red)] animate-pulse" />
                      {error}
                    </div>
                  </motion.div>
                )}

                <button 
                  disabled={isLoading}
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3.5 sm:py-3 text-[11px] tracking-[0.3em] font-bold hover:opacity-90 transition-all animate-pulse-glow mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      INITIALIZING...
                    </>
                  ) : (
                    isSignup ? "ESTABLISH IDENTITY" : "LAUNCH SESSION"
                  )}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t hairline space-y-4">
            <div className="text-center">
              <span className="text-[9px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
                Direct Authentication
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button disabled={isLoading} className="flex items-center justify-center gap-2 border hairline bg-[var(--surface-2)] py-2.5 text-[9px] sm:text-[10px] tracking-[0.25em] hover:bg-[var(--surface-3)] transition-all uppercase disabled:opacity-50">
                GitHub
              </button>
              <button disabled={isLoading} className="flex items-center justify-center gap-2 border hairline bg-[var(--surface-2)] py-2.5 text-[9px] sm:text-[10px] tracking-[0.25em] hover:bg-[var(--surface-3)] transition-all uppercase disabled:opacity-50">
                Google
              </button>
            </div>
          </div>
        </div>

        {/* Manual Toggle & Footer-like navigation */}
        <div className="mt-8 text-center flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSignup(!isSignup)}
                className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors uppercase group"
              >
                {isSignup ? "Already registered?" : "New to the arena?"}{" "}
                <span className="text-[var(--primary)] group-hover:underline">
                  {isSignup ? "Sign In" : "Create Account"}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          <Link to="/" className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors uppercase opacity-50 hover:opacity-100">
            ← Exit terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
