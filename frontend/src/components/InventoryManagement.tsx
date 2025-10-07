import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<any>(null);
  const [deletingMedicineId, setDeletingMedicineId] = useState<Id<"medicines"> | null>(null);
  
  const medicines = useQuery(api.medicines.search, { searchTerm });
  const createMedicine = useMutation(api.medicines.create);
  const updateMedicine = useMutation(api.medicines.update);
  const deleteMedicine = useMutation(api.medicines.remove);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    expiryDate: "",
    manufacturer: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      expiryDate: "",
      manufacturer: "",
    });
    setEditingMedicine(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMedicine) {
        await updateMedicine({ id: editingMedicine._id, ...formData });
        toast.success("Medicine updated successfully");
      } else {
        await createMedicine(formData);
        toast.success("Medicine added successfully");
      }
      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save medicine");
    }
  };

  const handleEdit = (medicine: any) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      quantity: medicine.quantity,
      price: medicine.price,
      expiryDate: medicine.expiryDate,
      manufacturer: medicine.manufacturer,
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id: Id<"medicines">) => {
    try {
      await deleteMedicine({ id });
      toast.success("Medicine deleted successfully");
      setDeletingMedicineId(null);
    } catch (error) {
      toast.error("Failed to delete medicine");
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", color: "bg-red-500" };
    if (quantity <= 10) return { label: "Low Stock", color: "bg-yellow-500" };
    return { label: "In Stock", color: "bg-green-500" };
  };

  return (
    <div className="p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Inventory Management</h1>
          <p className="text-[#b5bac1] mt-1">Manage your pharmacy stock</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Medicine
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b5bac1]" />
        <Input
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-[#1e1f22] border-white/10 text-white placeholder:text-[#b5bac1] focus:border-[#5865F2]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-[#2b2d31] rounded-lg border border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1e1f22]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#b5bac1] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {medicines === undefined ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#5865F2]" />
                  </td>
                </tr>
              ) : medicines.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#b5bac1]">
                    No medicines found
                  </td>
                </tr>
              ) : (
                medicines.map((medicine) => {
                  const status = getStockStatus(medicine.quantity);
                  return (
                    <motion.tr
                      key={medicine._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-[#313338] transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">{medicine.name}</td>
                      <td className="px-6 py-4 text-[#b5bac1]">{medicine.category}</td>
                      <td className="px-6 py-4 text-white">{medicine.quantity}</td>
                      <td className="px-6 py-4 text-white">₹{medicine.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Badge className={`${status.color} text-white border-0`}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-[#b5bac1]">{medicine.expiryDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(medicine)}
                            className="h-8 w-8 text-[#b5bac1] hover:text-[#5865F2] hover:bg-[#5865F2]/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingMedicineId(medicine._id)}
                            className="h-8 w-8 text-[#b5bac1] hover:text-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-[#2b2d31] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingMedicine ? "Edit Medicine" : "Add New Medicine"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#b5bac1]">Medicine Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#b5bac1]">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-[#b5bac1]">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="bg-[#1e1f22] border-white/10 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[#b5bac1]">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="bg-[#1e1f22] border-white/10 text-white"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-[#b5bac1]">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer" className="text-[#b5bac1]">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="text-[#b5bac1] hover:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#5865F2] hover:bg-[#4752c4] text-white">
                {editingMedicine ? "Update" : "Add"} Medicine
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deletingMedicineId !== null} onOpenChange={(open) => !open && setDeletingMedicineId(null)}>
        <AlertDialogContent className="bg-[#2b2d31] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Delete Medicine</AlertDialogTitle>
            <AlertDialogDescription className="text-[#b5bac1]">
              Are you sure you want to delete this medicine? This action cannot be undone and will permanently remove the medicine from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1e1f22] border-white/10 text-white hover:bg-[#313338] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingMedicineId && handleDelete(deletingMedicineId)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}