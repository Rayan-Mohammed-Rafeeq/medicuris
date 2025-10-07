import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertCircle, Scale, Copyright, Ban, Gavel } from "lucide-react";
import { useEffect } from "react";

export default function TermsOfService() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: "By accessing and using MediCuris, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and continued use constitutes acceptance of any changes."
    },
    {
      icon: AlertCircle,
      title: "User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account credentials, ensuring accurate information is provided, complying with all applicable laws and regulations, and using the service only for lawful pharmacy management purposes. You must notify us immediately of any unauthorized access."
    },
    {
      icon: Ban,
      title: "Acceptable Use",
      content: "You agree not to misuse our services, attempt to gain unauthorized access to our systems, interfere with other users' access, use the service for any illegal purposes, or violate any healthcare regulations. We reserve the right to suspend or terminate accounts that violate these terms."
    },
    {
      icon: Copyright,
      title: "Intellectual Property",
      content: "All content, features, and functionality of MediCuris are owned by us and protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission."
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: "MediCuris is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you paid for the service in the past 12 months."
    },
    {
      icon: Gavel,
      title: "Termination",
      content: "We reserve the right to terminate or suspend your account at any time for violations of these terms, illegal activity, or at our discretion. Upon termination, your right to use the service will immediately cease, and we may delete your data in accordance with our retention policies."
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
              Terms of Service
            </h1>
            <p className="text-xl text-[#d1d5db]">
              Please read these terms carefully before using MediCuris
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
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:legal@medicuris.com" className="text-[#5865F2] hover:text-[#4752c4] font-medium">
                legal@medicuris.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
