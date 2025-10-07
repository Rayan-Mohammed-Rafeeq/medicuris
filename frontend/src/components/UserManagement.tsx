import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Users, Loader2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export function UserManagement() {
  const users = useQuery(api.userManagement.listUsers);
  const updateUserRole = useMutation(api.userManagement.updateUserRole);

  const handleRoleChange = async (userId: Id<"users">, newRole: "admin" | "user" | "member") => {
    try {
      await updateUserRole({ userId, role: newRole });
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "user":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
          <Shield className="h-10 w-10 text-[#5865F2]" />
          User Management
        </h1>
        <p className="text-[#b5bac1]">Manage user roles and permissions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-[#2b2d31] border-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-[#5865F2]" />
              All Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users === undefined ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#5865F2]" />
              </div>
            ) : users.length === 0 ? (
              <p className="text-center text-[#b5bac1] py-8">No users found</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#1e1f22] rounded-lg p-4 flex items-center justify-between hover:bg-[#313338] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user.name || user.email?.split("@")[0] || "Anonymous User"}
                        </p>
                        <p className="text-sm text-[#b5bac1]">{user.email || "No email"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getRoleBadgeColor(user.role)} text-white border-0`}>
                        {user.role?.toUpperCase() || "MEMBER"}
                      </Badge>
                      <Select
                        value={user.role || "member"}
                        onValueChange={(value) => handleRoleChange(user._id, value as "admin" | "user" | "member")}
                      >
                        <SelectTrigger className="w-32 bg-[#2b2d31] border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2b2d31] border-white/10">
                          <SelectItem value="admin" className="text-white hover:bg-[#313338]">Admin</SelectItem>
                          <SelectItem value="user" className="text-white hover:bg-[#313338]">User</SelectItem>
                          <SelectItem value="member" className="text-white hover:bg-[#313338]">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
