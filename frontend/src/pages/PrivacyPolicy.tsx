import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Clock } from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information that you provide directly to us, including your name, email address, pharmacy details, and usage data. This information is essential for providing our pharmacy management services and ensuring the security of your operations."
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: "Your information is used to provide, maintain, and improve our services, process transactions, send administrative information, respond to your requests, and ensure compliance with healthcare regulations. We never sell your personal information to third parties."
    },
    {
      icon: Shield,
      title: "Data Security",
      content: "We implement industry-leading security measures including end-to-end encryption, secure data centers, regular security audits, and compliance with healthcare data protection standards. Your data is protected with enterprise-grade security protocols."
    },
    {
      icon: Eye,
      title: "Data Sharing",
      content: "We do not share your personal information except with your consent, to comply with legal obligations, or with trusted service providers who assist in operating our platform under strict confidentiality agreements."
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. You can also request data portability, object to processing, and withdraw consent where applicable. Contact our support team to exercise these rights."
    },
    {
      icon: Clock,
      title: "Data Retention",
      content: "We retain your information for as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, it is securely deleted or anonymized in accordance with our retention policies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] via-[#0a1520] to-[#051018]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/50 border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de" 
              alt="MediCuris Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold">
              <span className="text-black" style={{ textShadow: "0 0 20px rgba(192, 192, 192, 0.8)" }}>Medi</span>
              <span className="text-[#22d3ee]" style={{ textShadow: "0 0 20px rgba(34, 211, 238, 0.6)" }}>Curis</span>
            </span>
          </motion.div>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border border-white/20 bg-transparent hover:bg-white/5 text-white/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-4" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
              Privacy Policy
            </h1>
            <p className="text-xl text-[#d1d5db]">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-[#b5bac1] mt-4">
              Last updated: December 2024
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl p-8 bg-[#1e1f22]/60 border border-white/10"
                  style={{ boxShadow: "0 0 20px rgba(88, 101, 242, 0.1)" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#5865F2]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3">{section.title}</h2>
                      <p className="text-[#d1d5db] leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/30"
          >
            <p className="text-[#d1d5db] text-center">
              If you have any questions about our Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@medicuris.com" className="text-[#5865F2] hover:text-[#4752c4] font-medium">
                privacy@medicuris.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
