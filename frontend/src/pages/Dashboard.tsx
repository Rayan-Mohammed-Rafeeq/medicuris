import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { NavigationRail } from "@/components/NavigationRail";
import { Dashboard as DashboardContent } from "@/components/Dashboard";
import { InventoryManagement } from "@/components/InventoryManagement";
import { UserManagement } from "@/components/UserManagement";
import { PointOfSale } from "@/components/PointOfSale";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { isLoading, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#313338] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#5865F2]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardContent />;
      case "inventory":
        return <InventoryManagement />;
      case "pos":
        return <PointOfSale />;
      case "users":
        return <UserManagement />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#313338] flex overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,0,128,0.1), rgba(0,128,255,0.1), rgba(0,255,128,0.1))",
              "linear-gradient(90deg, rgba(0,128,255,0.1), rgba(0,255,128,0.1), rgba(255,0,128,0.1))",
              "linear-gradient(135deg, rgba(0,255,128,0.1), rgba(255,0,128,0.1), rgba(0,128,255,0.1))",
              "linear-gradient(45deg, rgba(255,0,128,0.1), rgba(0,128,255,0.1), rgba(0,255,128,0.1))",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <NavigationRail activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      
      <div className="flex-1 overflow-y-auto relative">
        {renderContent()}
      </div>
    </div>
  );
}
