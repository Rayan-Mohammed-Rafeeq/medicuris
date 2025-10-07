import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

export function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "member">("user");
  const [isLoading, setIsLoading] = useState(false);
  
  const createUser = useMutation(api.userManagement.createUserByAdmin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await createUser({ email, name, role });
      toast.success(`User account created successfully for ${name}`);
      setEmail("");
      setName("");
      setRole("user");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-[#2b2d31] border-white/5">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-[#5865F2]" />
          Create New User
        </CardTitle>
        <CardDescription className="text-[#b5bac1]">
          Add a new staff member to the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#b5bac1]">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="bg-[#1e1f22] border-white/10 text-white placeholder:text-[#6B7280]"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#b5bac1]">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="bg-[#1e1f22] border-white/10 text-white placeholder:text-[#6B7280]"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-[#b5bac1]">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as "user" | "member")} disabled={isLoading}>
              <SelectTrigger className="bg-[#1e1f22] border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2b2d31] border-white/10">
                <SelectItem value="user" className="text-white hover:bg-[#313338]">User</SelectItem>
                <SelectItem value="member" className="text-white hover:bg-[#313338]">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Create User
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
