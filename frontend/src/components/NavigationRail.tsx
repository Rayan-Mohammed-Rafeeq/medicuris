import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Package, Users, LogOut, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NavigationRailProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function NavigationRail({ activePage, onNavigate, onLogout }: NavigationRailProps) {
  const { user } = useAuth();
  
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "inventory", icon: Package, label: "Inventory" },
    { id: "pos", icon: ShoppingCart, label: "Point of Sale" },
    ...(user?.role === "admin" ? [{ id: "users", icon: Users, label: "User Management" }] : []),
  ];

  return (
    <div className="w-20 bg-[#1e1f22] flex flex-col items-center py-4 border-r border-white/5">
      {/* Logo */}
      <motion.img
        src="https://harmless-tapir-303.convex.cloud/api/storage/e4b3b00f-660f-49a0-99f3-4747da04d2de" 
        alt="MediCuris Logo" 
        className="w-16 h-16 mb-6 object-contain cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => onNavigate("dashboard")}
      />

      <div className="w-full h-[2px] bg-white/5 mb-4" />

      {/* Navigation Icons */}
      <div className="flex-1 flex flex-col gap-3 w-full items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate(item.id)}
                className={`w-12 h-12 rounded-2xl transition-all ${
                  isActive
                    ? "bg-[#5865F2] text-white hover:bg-[#4752c4]"
                    : "bg-[#2b2d31] text-[#b5bac1] hover:bg-[#5865F2] hover:text-white hover:rounded-xl"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="mt-auto w-full px-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full h-12 rounded-2xl bg-[#2b2d31] text-[#b5bac1] hover:bg-red-500/20 hover:text-red-400 transition-all"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#2b2d31] border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription className="text-[#b5bac1]">
                Are you sure you want to log out? You will need to sign in again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-[#1e1f22] text-white border-white/10 hover:bg-[#313338]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onLogout}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}