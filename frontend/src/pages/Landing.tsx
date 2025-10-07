import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Shield, TrendingUp, Zap, MessageCircle, Send, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isNovaOpen, setIsNovaOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Nova, your MediCuris AI assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll spy effect to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'features', 'why-medicuris'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Clear active section if at top
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = inputValue.toLowerCase();
    let response = "";

    if (lowerInput.includes("help") || lowerInput.includes("features")) {
      response = "MediCuris offers:\n• Inventory Management - Track and manage pharmacy stock with real-time updates\n• Role-Based Access - Secure access control for admins and pharmacists\n• Analytics Dashboard - Monitor key metrics and make data-driven decisions\n• Fast & Efficient - Lightning-fast performance with modern technology";
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      response = "Hello! I'm here to help you learn about MediCuris. Type 'features' to see what we offer!";
    } else {
      response = "I'm still learning, but I can tell you about MediCuris features if you type 'features'.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 500);

    setInputValue("");
  };

  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track and manage your pharmacy stock with real-time updates",
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure access control for admins and pharmacists",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Monitor key metrics and make data-driven decisions",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Lightning-fast performance with modern technology",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\" fill=\"none\"><circle cx=\"14\" cy=\"14\" r=\"12\" stroke=\"%2322d3ee\" stroke-width=\"2\" opacity=\"0.4\"/><circle cx=\"14\" cy=\"14\" r=\"8\" stroke=\"%2322d3ee\" stroke-width=\"2\" opacity=\"0.6\"/><circle cx=\"14\" cy=\"14\" r=\"4\" fill=\"%2322d3ee\" opacity=\"0.8\"/><circle cx=\"14\" cy=\"14\" r=\"2\" fill=\"%23ffffff\"/></svg>') 14 14, auto" }}>
      <style>{`
        * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="12" stroke="%2322d3ee" stroke-width="2" opacity="0.4"/><circle cx="14" cy="14" r="8" stroke="%2322d3ee" stroke-width="2" opacity="0.6"/><circle cx="14" cy="14" r="4" fill="%2322d3ee" opacity="0.8"/><circle cx="14" cy="14" r="2" fill="%23ffffff"/></svg>') 14 14, auto !important;
        }
        *:active {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="%2322d3ee" opacity="0.5"/><circle cx="12" cy="12" r="7" fill="%2322d3ee" opacity="0.8"/><circle cx="12" cy="12" r="4" fill="%2322d3ee"/><circle cx="12" cy="12" r="2" fill="%23ffffff"/></svg>') 12 12, auto !important;
        }
      `}</style>
      {/* Space-like Background with Bokeh Effect */}
      <div className="fixed inset-0 -z-10 bg-[#0a1520]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[#0a1520] to-[#051018]" />
        
        {/* Animated bokeh particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  Math.random() > 0.5 
                    ? 'rgba(6, 182, 212, 0.3)' 
                    : 'rgba(34, 211, 238, 0.2)'
                } 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Small white particles */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
      {/* Animated Glowing Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "blur(1px)" }}
        >
          <defs>
            <filter id="glow1">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow2">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Floating Glowing Pills */}
          <g className="pill-shape" style={{ animation: "float1 28s ease-in-out infinite" }}>
            <rect x="10%" y="15%" width="80" height="30" rx="15" fill="rgba(88, 101, 242, 0.4)" filter="url(#glow1)" />
            <line x1="10%" y1="15%" x2="calc(10% + 80px)" y2="calc(15% + 30px)" stroke="rgba(88, 101, 242, 0.6)" strokeWidth="2" />
          </g>

          <g className="pill-shape" style={{ animation: "float2 32s ease-in-out infinite" }}>
            <rect x="75%" y="25%" width="70" height="28" rx="14" fill="rgba(64, 224, 208, 0.45)" filter="url(#glow1)" />
            <line x1="75%" y1="25%" x2="calc(75% + 70px)" y2="calc(25% + 28px)" stroke="rgba(64, 224, 208, 0.7)" strokeWidth="2" />
          </g>

          <g className="capsule-shape" style={{ animation: "float3 35s ease-in-out infinite" }}>
            <ellipse cx="20%" cy="70%" rx="35" ry="18" fill="rgba(139, 92, 246, 0.4)" filter="url(#glow2)" />
            <line x1="calc(20% - 35px)" y1="70%" x2="calc(20% + 35px)" y2="70%" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="2" />
          </g>

          <g className="pill-shape" style={{ animation: "float4 30s ease-in-out infinite" }}>
            <rect x="85%" y="60%" width="75" height="32" rx="16" fill="rgba(236, 72, 153, 0.4)" filter="url(#glow1)" />
            <line x1="85%" y1="60%" x2="calc(85% + 75px)" y2="calc(60% + 32px)" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" />
          </g>

          <g className="capsule-shape" style={{ animation: "float5 38s ease-in-out infinite" }}>
            <ellipse cx="50%" cy="10%" rx="40" ry="20" fill="rgba(34, 211, 238, 0.45)" filter="url(#glow2)" />
            <line x1="calc(50% - 40px)" y1="10%" x2="calc(50% + 40px)" y2="10%" stroke="rgba(34, 211, 238, 0.7)" strokeWidth="2" />
          </g>

          <g className="pill-shape" style={{ animation: "float6 33s ease-in-out infinite" }}>
            <rect x="15%" y="85%" width="65" height="26" rx="13" fill="rgba(251, 191, 36, 0.4)" filter="url(#glow1)" />
            <line x1="15%" y1="85%" x2="calc(15% + 65px)" y2="calc(85% + 26px)" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="2" />
          </g>

          <g className="capsule-shape" style={{ animation: "float1 29s ease-in-out infinite" }}>
            <ellipse cx="90%" cy="40%" rx="32" ry="16" fill="rgba(16, 185, 129, 0.4)" filter="url(#glow2)" />
            <line x1="calc(90% - 32px)" y1="40%" x2="calc(90% + 32px)" y2="40%" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" />
          </g>

          {/* Medicine Bottle Shapes */}
          <g className="bottle-shape" style={{ animation: "floatBottle1 40s ease-in-out infinite" }}>
            <rect x="30%" y="50%" width="20" height="40" rx="3" fill="rgba(236, 72, 153, 0.35)" filter="url(#glow1)" />
            <rect x="30%" y="48%" width="20" height="8" rx="2" fill="rgba(251, 191, 36, 0.4)" filter="url(#glow2)" />
            <line x1="calc(30% + 10px)" y1="50%" x2="calc(30% + 10px)" y2="calc(50% + 40px)" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="1" />
          </g>

          <g className="bottle-shape" style={{ animation: "floatBottle2 45s ease-in-out infinite" }}>
            <rect x="65%" y="75%" width="18" height="36" rx="3" fill="rgba(34, 211, 238, 0.35)" filter="url(#glow1)" />
            <rect x="65%" y="73%" width="18" height="7" rx="2" fill="rgba(251, 191, 36, 0.4)" filter="url(#glow2)" />
            <line x1="calc(65% + 9px)" y1="75%" x2="calc(65% + 9px)" y2="calc(75% + 36px)" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1" />
          </g>

          <g className="bottle-shape" style={{ animation: "floatBottle3 42s ease-in-out infinite" }}>
            <rect x="80%" y="15%" width="22" height="44" rx="3" fill="rgba(139, 92, 246, 0.35)" filter="url(#glow1)" />
            <rect x="80%" y="13%" width="22" height="8" rx="2" fill="rgba(251, 191, 36, 0.4)" filter="url(#glow2)" />
            <line x1="calc(80% + 11px)" y1="15%" x2="calc(80% + 11px)" y2="calc(15% + 44px)" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="1" />
          </g>

          {/* Medicine Safe/Storage Shapes - Modern Green Design */}
          <g className="safe-shape" style={{ animation: "floatSafe1 38s ease-in-out infinite" }}>
            {/* Main safe body with rounded corners */}
            <rect x="45%" y="30%" width="40" height="45" rx="8" fill="rgba(200, 210, 220, 0.25)" filter="url(#glow1)" stroke="rgba(34, 139, 34, 0.6)" strokeWidth="2.5" />
            {/* Inner frame */}
            <rect x="calc(45% + 3px)" y="calc(30% + 3px)" width="34" height="39" rx="6" fill="rgba(240, 245, 250, 0.15)" stroke="rgba(34, 139, 34, 0.5)" strokeWidth="2" />
            {/* Handle/Dial - green circle with darker center */}
            <circle cx="calc(45% + 20px)" cy="calc(30% + 22.5px)" r="8" fill="rgba(50, 205, 50, 0.5)" filter="url(#glow2)" stroke="rgba(34, 139, 34, 0.7)" strokeWidth="2" />
            {/* Handle bar extending from circle */}
            <rect x="calc(45% + 20px)" y="calc(30% + 19.5px)" width="12" height="6" rx="3" fill="rgba(100, 116, 139, 0.4)" stroke="rgba(34, 139, 34, 0.5)" strokeWidth="1.5" />
            {/* Bottom feet */}
            <rect x="calc(45% + 2px)" y="calc(30% + 45px)" width="8" height="4" rx="1" fill="rgba(100, 116, 139, 0.4)" />
            <rect x="calc(45% + 30px)" y="calc(30% + 45px)" width="8" height="4" rx="1" fill="rgba(100, 116, 139, 0.4)" />
            {/* Side handles */}
            <rect x="calc(45% + 40px)" y="calc(30% + 12px)" width="3" height="8" rx="1.5" fill="rgba(34, 139, 34, 0.4)" />
            <rect x="calc(45% + 40px)" y="calc(30% + 25px)" width="3" height="8" rx="1.5" fill="rgba(34, 139, 34, 0.4)" />
          </g>

          <g className="safe-shape" style={{ animation: "floatSafe2 44s ease-in-out infinite" }}>
            <rect x="10%" y="60%" width="36" height="42" rx="7" fill="rgba(200, 210, 220, 0.25)" filter="url(#glow1)" stroke="rgba(34, 139, 34, 0.6)" strokeWidth="2.5" />
            <rect x="calc(10% + 3px)" y="calc(60% + 3px)" width="30" height="36" rx="5" fill="rgba(240, 245, 250, 0.15)" stroke="rgba(34, 139, 34, 0.5)" strokeWidth="2" />
            <circle cx="calc(10% + 18px)" cy="calc(60% + 21px)" r="7" fill="rgba(50, 205, 50, 0.5)" filter="url(#glow2)" stroke="rgba(34, 139, 34, 0.7)" strokeWidth="2" />
            <rect x="calc(10% + 18px)" y="calc(60% + 18.5px)" width="11" height="5" rx="2.5" fill="rgba(100, 116, 139, 0.4)" stroke="rgba(34, 139, 34, 0.5)" strokeWidth="1.5" />
            <rect x="calc(10% + 2px)" y="calc(60% + 42px)" width="7" height="3.5" rx="1" fill="rgba(100, 116, 139, 0.4)" />
            <rect x="calc(10% + 27px)" y="calc(60% + 42px)" width="7" height="3.5" rx="1" fill="rgba(100, 116, 139, 0.4)" />
            <rect x="calc(10% + 36px)" y="calc(60% + 11px)" width="3" height="7" rx="1.5" fill="rgba(34, 139, 34, 0.4)" />
            <rect x="calc(10% + 36px)" y="calc(60% + 23px)" width="3" height="7" rx="1.5" fill="rgba(34, 139, 34, 0.4)" />
          </g>

          <g className="safe-shape" style={{ animation: "floatSafe3 41s ease-in-out infinite" }}>
            <rect x="70%" y="55%" width="34" height="40" rx="7" fill="rgba(200, 210, 220, 0.25)" filter="url(#glow1)" stroke="rgba(34, 139, 34, 0.6)" strokeWidth="2.5" />
            <rect x="calc(70% + 3px)" y="calc(55% + 3px)" width="28" height="34" rx="5" fill="rgba(240, 245, 250, 0.15)" stroke="rgba(34, 139, 34, 0.5)" strokeWidth="2" />
            <circle cx="calc(70% + 17px)" cy="calc(55% + 20px)" r="6.5" fill="rgba(50, 205, 50, 0.5)" filter="url(#glow2)" stroke="rgba(34, 139, 34, 0.7)" strokeWidth="2" />
            <rect x="calc(70% + 17px)" y="calc(55% + 17.5px)" width="10" height="5" rx="2.5" fill="rgba(100, 116, 139, 0.4)" stroke="rgba(34, 139, 34, 0.5)" strokeWidth="1.5" />
            <rect x="calc(70% + 2px)" y="calc(55% + 40px)" width="6.5" height="3" rx="1" fill="rgba(100, 116, 139, 0.4)" />
            <rect x="calc(70% + 25.5px)" y="calc(55% + 40px)" width="6.5" height="3" rx="1" fill="rgba(100, 116, 139, 0.4)" />
            <rect x="calc(70% + 34px)" y="calc(55% + 10px)" width="2.5" height="6" rx="1.25" fill="rgba(34, 139, 34, 0.4)" />
            <rect x="calc(70% + 34px)" y="calc(55% + 22px)" width="2.5" height="6" rx="1.25" fill="rgba(34, 139, 34, 0.4)" />
          </g>
        </svg>

        <style>{`
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
            25% { transform: translate(30px, -40px) rotate(5deg); opacity: 0.8; }
            50% { transform: translate(-20px, -80px) rotate(-3deg); opacity: 0.7; }
            75% { transform: translate(40px, -50px) rotate(4deg); opacity: 0.9; }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
            33% { transform: translate(-40px, 50px) rotate(-6deg); opacity: 0.8; }
            66% { transform: translate(30px, 90px) rotate(4deg); opacity: 0.7; }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
            30% { transform: translate(50px, -30px) rotate(7deg); opacity: 0.9; }
            60% { transform: translate(-30px, -60px) rotate(-5deg); opacity: 0.7; }
          }
          @keyframes float4 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
            40% { transform: translate(-50px, -40px) rotate(-8deg); opacity: 0.8; }
            80% { transform: translate(20px, -70px) rotate(6deg); opacity: 0.9; }
          }
          @keyframes float5 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
            35% { transform: translate(40px, 60px) rotate(5deg); opacity: 0.8; }
            70% { transform: translate(-50px, 100px) rotate(-7deg); opacity: 0.7; }
          }
          @keyframes float6 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
            45% { transform: translate(-35px, -55px) rotate(-6deg); opacity: 0.9; }
            90% { transform: translate(45px, -85px) rotate(8deg); opacity: 0.7; }
          }
          @keyframes floatBottle1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
            25% { transform: translate(-45px, 35px) rotate(-4deg); opacity: 0.8; }
            50% { transform: translate(25px, 70px) rotate(3deg); opacity: 0.7; }
            75% { transform: translate(-30px, 50px) rotate(-2deg); opacity: 0.85; }
          }
          @keyframes floatBottle2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.55; }
            30% { transform: translate(40px, -45px) rotate(5deg); opacity: 0.8; }
            60% { transform: translate(-35px, -75px) rotate(-4deg); opacity: 0.75; }
            90% { transform: translate(30px, -60px) rotate(3deg); opacity: 0.9; }
          }
          @keyframes floatBottle3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
            35% { transform: translate(-50px, 40px) rotate(-5deg); opacity: 0.85; }
            70% { transform: translate(35px, 80px) rotate(6deg); opacity: 0.7; }
          }
          @keyframes floatSafe1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.55; }
            30% { transform: translate(-40px, 45px) rotate(-3deg); opacity: 0.8; }
            65% { transform: translate(35px, 75px) rotate(4deg); opacity: 0.7; }
          }
          @keyframes floatSafe2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
            40% { transform: translate(45px, -50px) rotate(5deg); opacity: 0.85; }
            80% { transform: translate(-30px, -80px) rotate(-4deg); opacity: 0.75; }
          }
          @keyframes floatSafe3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.58; }
            35% { transform: translate(-38px, 55px) rotate(-6deg); opacity: 0.82; }
            70% { transform: translate(42px, 90px) rotate(5deg); opacity: 0.72; }
          }
        `}</style>
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1628]/50 border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and Brand Name */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de" 
              alt="MediCuris Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold">
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

          {/* Navigation Links - Right Side */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <motion.button 
              className="text-white/90 hover:text-[#22d3ee] transition-all text-sm font-medium relative"
              onClick={() => {
                setActiveSection('about');
                const aboutSection = document.getElementById('about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              style={{ 
                textShadow: "0 0 0px rgba(34, 211, 238, 0)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = "0 0 15px rgba(34, 211, 238, 0.8), 0 0 25px rgba(34, 211, 238, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 0px rgba(34, 211, 238, 0)";
              }}
            >
              About Us
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: activeSection === 'about' ? 1 : 0, opacity: activeSection === 'about' ? 1 : 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  transformOrigin: "left",
                  boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)"
                }}
              />
            </motion.button>
            <motion.button 
              className="text-white/90 hover:text-[#22d3ee] transition-all text-sm font-medium relative"
              onClick={() => {
                setActiveSection('features');
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              style={{ 
                textShadow: "0 0 0px rgba(34, 211, 238, 0)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = "0 0 15px rgba(34, 211, 238, 0.8), 0 0 25px rgba(34, 211, 238, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 0px rgba(34, 211, 238, 0)";
              }}
            >
              Features
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: activeSection === 'features' ? 1 : 0, opacity: activeSection === 'features' ? 1 : 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  transformOrigin: "left",
                  boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)"
                }}
              />
            </motion.button>
            <motion.button 
              className="text-white/90 hover:text-[#22d3ee] transition-all text-sm font-medium relative"
              onClick={() => {
                setActiveSection('why-medicuris');
                const whySection = document.getElementById('why-medicuris');
                whySection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              style={{ 
                textShadow: "0 0 0px rgba(34, 211, 238, 0)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = "0 0 15px rgba(34, 211, 238, 0.8), 0 0 25px rgba(34, 211, 238, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 0px rgba(34, 211, 238, 0)";
              }}
            >
              Why MediCuris
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: activeSection === 'why-medicuris' ? 1 : 0, opacity: activeSection === 'why-medicuris' ? 1 : 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  transformOrigin: "left",
                  boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)"
                }}
              />
            </motion.button>
          </motion.div>

          {/* Action Buttons */}

          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            {!isAuthenticated && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate("/auth")}
                variant="outline"
                className="border border-white/20 font-medium transition-all bg-transparent hover:bg-white/5 px-5 py-2 text-white/90 hover:text-white hover:border-white/40 relative overflow-hidden group"
                style={{
                  boxShadow: "0 0 0px rgba(88, 101, 242, 0)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(88, 101, 242, 0.8), 0 0 35px rgba(88, 101, 242, 0.5)";
                  e.currentTarget.style.borderColor = "rgba(88, 101, 242, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0px rgba(88, 101, 242, 0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Login</span>
              </Button>
            </motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 30px rgba(88, 101, 242, 0.7)",
                  "0 0 20px rgba(139, 92, 246, 0.5)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="rounded-lg"
            >
              <Button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                className="bg-gradient-to-r from-[#8B5CF6] via-[#5865F2] to-[#22d3ee] hover:from-[#7c3aed] hover:via-[#4752c4] hover:to-[#06b6d4] text-white font-medium transition-all px-5 py-2 relative overflow-hidden group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(1.3) saturate(1.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(1) saturate(1)";
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">{isAuthenticated ? "Dashboard" : "Get Started"}</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="inline-block">
            <motion.img
              src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de" 
              alt="MediCuris Logo" 
              className="w-48 h-48 mx-auto object-contain"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ cursor: "pointer" }}
            />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-white" style={{ textShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}>Welcome to </span>
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
                textShadow: "0 0 30px rgba(34, 211, 238, 0.8)",
                filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.6))"
              }}
            >
              Curis
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#d1d5db] max-w-3xl mx-auto" style={{ textShadow: "0 0 10px rgba(209, 213, 219, 0.2)" }}>
            Modern pharmacy management system with high-tech design. Manage inventory, track stock, and streamline operations.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              className="bg-gradient-to-r from-[#8B5CF6] via-[#5865F2] to-[#22d3ee] hover:from-[#7c3aed] hover:via-[#4752c4] hover:to-[#06b6d4] text-white font-medium transition-all px-8 py-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center">
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const glowColors = [
              "rgba(88, 101, 242, 0.3)",
              "rgba(34, 211, 238, 0.3)",
              "rgba(168, 85, 247, 0.3)",
              "rgba(251, 191, 36, 0.3)"
            ];
            const borderColors = [
              "rgba(88, 101, 242, 0.5)",
              "rgba(34, 211, 238, 0.5)",
              "rgba(168, 85, 247, 0.5)",
              "rgba(251, 191, 36, 0.5)"
            ];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={{ 
                  background: "rgba(25, 28, 39, 0.6)",
                  border: `1px solid ${borderColors[index]}`,
                  boxShadow: `0 0 20px ${glowColors[index]}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${glowColors[index]}, 0 0 60px ${glowColors[index]}`;
                  e.currentTarget.style.borderColor = borderColors[index].replace("0.5", "0.8");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${glowColors[index]}`;
                  e.currentTarget.style.borderColor = borderColors[index];
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${borderColors[index]}, ${glowColors[index]})`,
                    boxShadow: `0 0 15px ${glowColors[index]}`
                  }}
                >
                  <Icon className="h-6 w-6 text-white" style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))" }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>{feature.title}</h3>
                <p className="text-[#d1d5db]">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* About Us Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-5xl font-bold text-white tracking-tight" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
            About <span className="text-[#22d3ee]" style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}>MediCuris</span>
          </h2>
          <p className="text-xl text-[#d1d5db] max-w-3xl mx-auto leading-relaxed">
            MediCuris is revolutionizing pharmacy management with cutting-edge technology and intuitive design. 
            Our mission is to empower pharmacies with tools that streamline operations, enhance accuracy, and improve patient care. 
            We believe in innovation that makes a difference.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { value: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
              { value: "500+", label: "Pharmacies Trust Us", icon: "🏥" },
              { value: "24/7", label: "Support Available", icon: "💬" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(25, 28, 39, 0.6)",
                  border: "1px solid rgba(88, 101, 242, 0.3)",
                  boxShadow: "0 0 20px rgba(88, 101, 242, 0.2)"
                }}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#5865F2] mb-2" style={{ textShadow: "0 0 20px rgba(88, 101, 242, 0.6)" }}>
                  {stat.value}
                </div>
                <div className="text-[#d1d5db]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-white tracking-tight" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
              Key <span className="text-[#22d3ee]" style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}>Features</span>
            </h2>
            <p className="text-xl text-[#d1d5db] max-w-2xl mx-auto">
              Everything you need to manage your pharmacy efficiently and securely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Package, title: "Inventory Management", description: "Real-time tracking of medicine stock with automated alerts for low inventory levels" },
              { icon: Shield, title: "Role-Based Access", description: "Secure multi-level access control ensuring data privacy and operational security" },
              { icon: TrendingUp, title: "Analytics Dashboard", description: "Comprehensive insights with visual reports to drive informed business decisions" },
              { icon: Zap, title: "Fast & Efficient", description: "Lightning-fast performance built on modern cloud infrastructure" },
              { icon: Package, title: "Expiry Tracking", description: "Automated monitoring of medicine expiration dates to prevent waste and ensure safety" },
              { icon: TrendingUp, title: "Sales Reports", description: "Detailed sales analytics with customizable date ranges and export options" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              const glowColors = [
                "rgba(88, 101, 242, 0.3)",
                "rgba(34, 211, 238, 0.3)",
                "rgba(168, 85, 247, 0.3)",
                "rgba(251, 191, 36, 0.3)",
                "rgba(236, 72, 153, 0.3)",
                "rgba(16, 185, 129, 0.3)"
              ];
              const borderColors = [
                "rgba(88, 101, 242, 0.5)",
                "rgba(34, 211, 238, 0.5)",
                "rgba(168, 85, 247, 0.5)",
                "rgba(251, 191, 36, 0.5)",
                "rgba(236, 72, 153, 0.5)",
                "rgba(16, 185, 129, 0.5)"
              ];
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="rounded-2xl p-8 transition-all cursor-pointer"
                  style={{ 
                    background: "rgba(25, 28, 39, 0.6)",
                    border: `1px solid ${borderColors[index]}`,
                    boxShadow: `0 0 20px ${glowColors[index]}`
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ 
                      background: `linear-gradient(135deg, ${borderColors[index]}, ${glowColors[index]})`,
                      boxShadow: `0 0 20px ${glowColors[index]}`
                    }}
                  >
                    <Icon className="h-8 w-8 text-white" style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#d1d5db] leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Why MediCuris Section */}
      <section id="why-medicuris" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-white tracking-tight" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
              The <span className="text-[#22d3ee]" style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}>MediCuris</span> Advantage
            </h2>
            <p className="text-xl text-[#d1d5db] max-w-2xl mx-auto">
              Why thousands of pharmacies choose MediCuris for their management needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "🎯",
                title: "Intuitive Interface",
                description: "Designed with user experience in mind. Our clean, modern interface requires minimal training and maximizes productivity from day one."
              },
              {
                icon: "🛡️",
                title: "Secure Data",
                description: "Enterprise-grade security with end-to-end encryption. Your data is protected with industry-leading security protocols and regular backups."
              },
              {
                icon: "💬",
                title: "24/7 Support",
                description: "Our dedicated support team is always available to help. Get instant assistance via chat, email, or phone whenever you need it."
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-6 rounded-2xl p-8"
                style={{
                  background: "rgba(25, 28, 39, 0.6)",
                  border: "1px solid rgba(88, 101, 242, 0.3)",
                  boxShadow: "0 0 20px rgba(88, 101, 242, 0.2)"
                }}
              >
                <div className="text-6xl mb-4">{advantage.icon}</div>
                <h3 className="text-2xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
                  {advantage.title}
                </h3>
                <p className="text-[#d1d5db] leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              className="bg-gradient-to-r from-[#8B5CF6] via-[#5865F2] to-[#22d3ee] hover:from-[#7c3aed] hover:via-[#4752c4] hover:to-[#06b6d4] text-white font-medium transition-all px-12 py-6 text-lg relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center">
                {isAuthenticated ? "Go to Dashboard" : "Start Your Free Trial"}
                <ArrowRight className="ml-3 h-6 w-6" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-32 bg-[#0f1419]/80 backdrop-blur-sm border-t border-[#5865F2]/30"
        style={{ boxShadow: "0 -4px 30px rgba(88, 101, 242, 0.1)" }}
      >

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de" 
                  alt="MediCuris Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold">
                  <span className="text-black" style={{ 
                    textShadow: "0 0 20px rgba(192, 192, 192, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)",
                    filter: "drop-shadow(0 0 10px rgba(192, 192, 192, 0.6)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))"
                  }}>Medi</span>
                  <span className="text-[#22d3ee]" style={{ 
                    textShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
                    filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.4))"
                  }}>Curis</span>
                </span>
              </motion.div>
              <p className="text-[#b5bac1] text-sm">
                Modern pharmacy management system with cutting-edge technology
              </p>
              <p className="text-[#6B7280] text-xs">
                © 2024 MediCuris. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Dashboard", action: () => navigate("/dashboard") },
                  { label: "Login", action: () => navigate("/auth") },
                  { label: "AI Assistant", action: () => setIsNovaOpen(true) },
                ].map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <button 
                      onClick={link.action}
                      className="text-[#d1d5db] hover:text-[#22d3ee] transition-colors text-sm relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.span
                        className="absolute inset-0 bg-[#22d3ee]/10 rounded -z-0"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
                Legal
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Support", href: "/support" },
                ].map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <button 
                      onClick={() => navigate(link.href)}
                      className="text-[#d1d5db] hover:text-[#22d3ee] transition-colors text-sm relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.span
                        className="absolute inset-0 bg-[#22d3ee]/10 rounded -z-0"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
                Follow Us
              </h3>
              <div className="space-y-2 text-sm text-[#d1d5db]">
                <p>Email: support@medicuris.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
              <div className="flex gap-4 pt-2">
                {[
                  { 
                    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                    color: "#5865F2"
                  },
                  { 
                    icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                    color: "#22d3ee"
                  },
                  { 
                    icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                    color: "#a855f7"
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#1e1f22] border flex items-center justify-center transition-all"
                    style={{ 
                      borderColor: `${social.color}30`,
                      color: social.color,
                      boxShadow: `0 0 15px ${social.color}20`
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 25px ${social.color}50`,
                      backgroundColor: social.color,
                      color: "#ffffff"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Nova AI Assistant */}
      <AnimatePresence>
        {isNovaOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(25, 28, 39, 0.95)",
              border: "1px solid rgba(88, 101, 242, 0.5)",
              boxShadow: "0 0 40px rgba(88, 101, 242, 0.4)"
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5865F2] to-[#7289da] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg overflow-hidden"
                  style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
                  <img 
                    src="https://harmless-tapir-303.convex.cloud/api/storage/54f6304a-d8e0-4504-baa4-b01a0be57a7b" 
                    alt="Nova AI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold">Nova</h3>
                  <p className="text-xs text-white/80">AI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNovaOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-[360px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-[#5865F2] text-white"
                        : "bg-[#2b2d31] text-[#d1d5db]"
                    }`}
                    style={msg.role === "assistant" ? {
                      border: "1px solid rgba(88, 101, 242, 0.3)",
                      boxShadow: "0 0 15px rgba(88, 101, 242, 0.2)"
                    } : {}}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1e1f22] border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="bg-[#2b2d31] border-white/10 text-white placeholder:text-[#b5bac1] focus:border-[#5865F2]"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nova Icon */}
      <motion.button
        onClick={() => setIsNovaOpen(!isNovaOpen)}
        className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#5865F2] to-[#7289da] flex items-center justify-center text-white z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(251, 191, 36, 0.6), 0 0 50px rgba(251, 191, 36, 0.4)",
            "0 0 50px rgba(251, 191, 36, 0.8), 0 0 70px rgba(251, 191, 36, 0.6)",
            "0 0 30px rgba(251, 191, 36, 0.6), 0 0 50px rgba(251, 191, 36, 0.4)"
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
      {isNovaOpen ? (
        <X className="h-7 w-7" />
      ) : (
        <img 
          src="https://harmless-tapir-303.convex.cloud/api/storage/54f6304a-d8e0-4504-baa4-b01a0be57a7b" 
          alt="Nova AI" 
          className="w-full h-full object-cover rounded-full"
        />
      )}
      </motion.button>
    </div>
  );
}