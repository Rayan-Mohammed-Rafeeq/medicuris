import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Package, AlertTriangle, XCircle, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateUserForm } from "./CreateUserForm";
import { useAuth } from "@/hooks/use-auth";

export function Dashboard() {
  const stats = useQuery(api.medicines.getStats);
  const { user } = useAuth();

  const metrics = [
    {
      title: "Total Medicines",
      value: stats?.totalMedicines ?? 0,
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Low Stock",
      value: stats?.lowStock ?? 0,
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Out of Stock",
      value: stats?.outOfStock ?? 0,
      icon: XCircle,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Total Value",
      value: `₹${stats?.totalValue.toFixed(2) ?? "0.00"}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-[#b5bac1]">Welcome to MediCuris Pharmacy Management System</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#2b2d31] border-white/5 hover:border-white/10 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-[#b5bac1]">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Admin-only Create User Form */}
      {user?.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CreateUserForm />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-[#2b2d31] border-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#5865F2]" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 flex items-center justify-center text-[#b5bac1]">
              <p>Chart visualization placeholder - Connect your analytics data here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}