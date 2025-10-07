import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Loader2, Mail, UserX, ArrowLeft } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

interface AuthProps {
  redirectAfterAuth?: string;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const redirect = redirectAfterAuth || "/";
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirectAfterAuth]);
  
  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);

      console.log("signed in");

      const redirect = redirectAfterAuth || "/";
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);

      setError("The verification code you entered is incorrect.");
      setIsLoading(false);

      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Attempting anonymous sign in...");
      await signIn("anonymous");
      console.log("Anonymous sign in successful");
      const redirect = redirectAfterAuth || "/";
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      setError(`Failed to sign in as guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #1a1d23 0%, #282c34 100%)" }}>
      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0a1628]/50 border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          >
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de" 
              alt="MediCuris Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold leading-none">
              <span 
                className="text-black"
                style={{ 
                  textShadow: "0 0 20px rgba(192, 192, 192, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)",
                  filter: "drop-shadow(0 0 10px rgba(192, 192, 192, 0.6)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))"
                }}
              >
                Medi
              </span>
              <span 
                className="text-[#22d3ee]"
                style={{ 
                  textShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
                  filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.4))"
                }}
              >
                Curis
              </span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border border-white/20 font-medium transition-all bg-transparent hover:bg-white/5 px-5 py-2 text-white/90 hover:text-white hover:border-white/40"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card 
            className="border-[#5865F2]/30 shadow-2xl bg-[#363A40]"
            style={{ boxShadow: "0 0 40px rgba(88, 101, 242, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)" }}
          >
            {step === "signIn" ? (
              <>
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="flex justify-center mt-2">
                    <motion.img
                      src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de"
                      alt="MediCuris Logo"
                      className="w-32 h-32 object-contain cursor-pointer"
                      onClick={() => navigate("/")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  </div>
                  <div>
                    <CardTitle 
                      className="text-3xl font-bold tracking-tight"
                    >
                      <span 
                        className="text-black"
                        style={{ 
                          textShadow: "0 0 20px rgba(192, 192, 192, 0.8)",
                          filter: "drop-shadow(0 0 10px rgba(192, 192, 192, 0.6))"
                        }}
                      >
                        Medi
                      </span>
                      <span 
                        className="text-[#22d3ee]"
                        style={{ 
                          textShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
                          filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.4))"
                        }}
                      >
                        Curis
                      </span>
                    </CardTitle>
                    <CardDescription className="text-[#A0A4B3] mt-2 text-base">
                      Enter your email to log in or sign up
                    </CardDescription>
                  </div>
                </CardHeader>
                <form onSubmit={handleEmailSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#A0A4B3]">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 h-5 w-5 text-[#A0A4B3]" />
                        <Input
                          id="email"
                          name="email"
                          placeholder="name@example.com"
                          type="email"
                          className="pl-10 bg-[#2C3035] border-[#5865F2]/20 text-white placeholder:text-[#6B7280] focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/50 transition-all h-12 rounded-lg"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>
                    
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400"
                      >
                        {error}
                      </motion.p>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold h-12 rounded-lg transition-all"
                      style={{ 
                        boxShadow: "0 0 20px rgba(88, 101, 242, 0.4)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(88, 101, 242, 0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(88, 101, 242, 0.4)";
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending code...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#4B5563]" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#363A40] px-3 text-[#A0A4B3]">
                          Or
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-[#2C3035] border-[#5865F2]/20 text-white hover:bg-[#363A40] hover:border-[#5865F2]/40 h-12 rounded-lg transition-all font-medium flex items-center justify-center gap-3"
                      onClick={async () => {
                        setIsLoading(true);
                        setError(null);
                        try {
                          // Mocked Google Sign-In - simulate successful login
                          // In a real implementation, this would use Google OAuth
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          
                          // Note: In production, the backend would handle role assignment
                          // New users would default to 'user' role via Convex auth
                          const redirect = redirectAfterAuth || "/dashboard";
                          navigate(redirect);
                        } catch (error) {
                          console.error("Google sign-in error:", error);
                          setError("Failed to sign in with Google");
                          setIsLoading(false);
                        }
                      }}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign in with Google
                    </Button>
                  </CardContent>
                </form>
              </>
            ) : (
              <>
                <CardHeader className="text-center space-y-2 pt-8">
                  <CardTitle className="text-2xl font-bold text-white">
                    Check your email
                  </CardTitle>
                  <CardDescription className="text-[#A0A4B3]">
                    We've sent a verification code to <span className="text-[#5865F2] font-medium">{step.email}</span>
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleOtpSubmit}>
                  <CardContent className="space-y-6 pb-4">
                    <input type="hidden" name="email" value={step.email} />
                    <input type="hidden" name="code" value={otp} />

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#A0A4B3] block text-center">
                        Verification Code
                      </label>
                      <div className="flex justify-center">
                        <InputOTP
                          value={otp}
                          onChange={setOtp}
                          maxLength={6}
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && otp.length === 6 && !isLoading) {
                              const form = (e.target as HTMLElement).closest("form");
                              if (form) {
                                form.requestSubmit();
                              }
                            }
                          }}
                        >
                          <InputOTPGroup className="gap-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot 
                                key={index} 
                                index={index}
                                className="bg-[#2C3035] border-[#5865F2]/20 text-white w-12 h-14 text-xl rounded-lg focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/50"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>
                    
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400 text-center"
                      >
                        {error}
                      </motion.p>
                    )}
                    
                    <p className="text-sm text-[#A0A4B3] text-center">
                      Didn't receive a code?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-[#5865F2] hover:text-[#4752c4] font-medium"
                        onClick={() => setStep("signIn")}
                      >
                        Try again
                      </Button>
                    </p>
                  </CardContent>
                  <CardFooter className="flex-col gap-3 pb-6">
                    <Button
                      type="submit"
                      className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold h-12 rounded-lg transition-all"
                      style={{ 
                        boxShadow: "0 0 20px rgba(88, 101, 242, 0.4)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(88, 101, 242, 0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(88, 101, 242, 0.4)";
                      }}
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify code
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep("signIn")}
                      disabled={isLoading}
                      className="w-full text-[#A0A4B3] hover:text-white hover:bg-[#2C3035] h-11 rounded-lg"
                    >
                      Use different email
                    </Button>
                  </CardFooter>
                </form>
              </>
            )}

            <div className="py-4 px-6 text-xs text-center text-[#A0A4B3] bg-[#2C3035] border-t border-[#4B5563] rounded-b-xl">
              By logging in, you agree to the{" "}
              <span 
                className="text-[#5865F2] hover:text-[#4752c4] cursor-pointer hover:underline"
                onClick={() => navigate("/terms")}
              >
                MediCuris Terms of Service
              </span>{" "}
              and{" "}
              <span 
                className="text-[#5865F2] hover:text-[#4752c4] cursor-pointer hover:underline"
                onClick={() => navigate("/privacy")}
              >
                Privacy Policy
              </span>.
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}