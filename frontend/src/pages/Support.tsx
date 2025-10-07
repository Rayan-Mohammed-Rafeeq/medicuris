import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MessageCircle, Clock, HelpCircle, Book } from "lucide-react";
import { useEffect } from "react";

export default function Support() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      detail: "support@medicuris.com",
      action: "mailto:support@medicuris.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      detail: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      detail: "Available 24/7",
      action: "#"
    }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
    },
    {
      question: "How do I add new medicines to inventory?",
      answer: "Navigate to the Inventory Management section from your dashboard. Click the 'Add Medicine' button and fill in the required details including name, category, quantity, price, and expiry date."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export your inventory and sales data in CSV or PDF format from the respective management sections. Look for the 'Export' button in the toolbar."
    },
    {
      question: "How do I manage user roles?",
      answer: "Admins can manage user roles from the User Management section. You can create new pharmacist accounts, update roles, and manage permissions for your team members."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, secure data centers, and comply with healthcare data protection standards. Your data is backed up regularly and protected with multiple security layers."
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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-4" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
              Support Center
            </h1>
            <p className="text-xl text-[#d1d5db]">
              We're here to help you 24/7
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl p-8 bg-[#1e1f22]/60 border border-white/10 text-center cursor-pointer"
                  style={{ boxShadow: "0 0 20px rgba(88, 101, 242, 0.1)" }}
                >
                  <div className="w-16 h-16 rounded-xl bg-[#5865F2]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#5865F2]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-[#b5bac1] text-sm mb-3">{method.description}</p>
                  <p className="text-[#5865F2] font-medium">{method.detail}</p>
                </motion.a>
              );
            })}
          </div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-8 bg-[#1e1f22]/60 border border-white/10 mb-16 text-center"
          >
            <Clock className="h-12 w-12 text-[#5865F2] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Business Hours</h3>
            <p className="text-[#d1d5db]">
              Monday - Friday: 9:00 AM - 6:00 PM EST<br />
              Saturday - Sunday: 10:00 AM - 4:00 PM EST<br />
              <span className="text-[#5865F2] font-medium">Emergency Support: 24/7</span>
            </p>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="h-8 w-8 text-[#5865F2]" />
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="rounded-2xl p-6 bg-[#1e1f22]/60 border border-white/10"
                >
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-2">
                    <Book className="h-5 w-5 text-[#5865F2] flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-[#d1d5db] leading-relaxed pl-7">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
