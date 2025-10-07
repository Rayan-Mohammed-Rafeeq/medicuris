import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Search, Plus, Minus, Trash2, ShoppingCart, IndianRupee, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

interface CartItem {
  medicineId: Id<"medicines">;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  availableStock: number;
}

export function PointOfSale() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<Id<"customers"> | undefined>();
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Customer search and add states
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const medicines = useQuery(api.medicines.search, { searchTerm });
  const searchedCustomers = useQuery(api.customers.searchCustomers, { searchTerm: customerSearchTerm });
  const recordSale = useMutation(api.sales.recordSale);
  const createCustomer = useMutation(api.customers.createCustomer);

  const addToCart = (medicine: any) => {
    const existingItem = cart.find((item) => item.medicineId === medicine._id);
    
    if (existingItem) {
      if (existingItem.quantity >= medicine.quantity) {
        toast.error("Cannot add more than available stock");
        return;
      }
      setCart(
        cart.map((item) =>
          item.medicineId === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          medicineId: medicine._id,
          medicineName: medicine.name,
          quantity: 1,
          unitPrice: medicine.price,
          discount: 0,
          availableStock: medicine.quantity,
        },
      ]);
    }
    toast.success(`${medicine.name} added to cart`);
  };

  const updateQuantity = (medicineId: Id<"medicines">, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.medicineId === medicineId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return item;
          if (newQuantity > item.availableStock) {
            toast.error("Cannot exceed available stock");
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const updateDiscount = (medicineId: Id<"medicines">, discount: number) => {
    setCart(
      cart.map((item) =>
        item.medicineId === medicineId ? { ...item, discount: Math.max(0, Math.min(100, discount)) } : item
      )
    );
  };

  const removeFromCart = (medicineId: Id<"medicines">) => {
    setCart(cart.filter((item) => item.medicineId !== medicineId));
    toast.info("Item removed from cart");
  };

  const calculateSubtotal = (item: CartItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = (subtotal * item.discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + calculateSubtotal(item), 0);
  };

  const handleSelectCustomer = (customerId: Id<"customers">, customerName: string) => {
    setSelectedCustomerId(customerId);
    setSelectedCustomerName(customerName);
    setShowCustomerDialog(false);
    toast.success(`Customer ${customerName} selected`);
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.contactNumber) {
      toast.error("Name and contact number are required");
      return;
    }

    try {
      const customerId = await createCustomer({
        name: newCustomer.name,
        contactNumber: newCustomer.contactNumber,
        email: newCustomer.email || undefined,
        address: newCustomer.address || undefined,
      });
      
      setSelectedCustomerId(customerId);
      setSelectedCustomerName(newCustomer.name);
      setNewCustomer({ name: "", contactNumber: "", email: "", address: "" });
      setShowAddCustomerDialog(false);
      setShowCustomerDialog(false);
      toast.success("Customer added successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to add customer");
    }
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!selectedCustomerId) {
      toast.error("Please select a customer");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    try {
      const items = cart.map((item) => ({
        medicineId: item.medicineId,
        medicineName: item.medicineName,
        quantitySold: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        subtotal: calculateSubtotal(item),
      }));

      await recordSale({
        customerId: selectedCustomerId,
        paymentMethod,
        items,
        totalAmount: calculateTotal(),
      });

      toast.success("Sale completed successfully!");
      setCart([]);
      setSelectedCustomerId(undefined);
      setSelectedCustomerName("");
      setPaymentMethod("cash");
      setShowConfirmDialog(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to complete sale");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold text-white tracking-tight">Point of Sale</h1>
        <p className="text-[#b5bac1]">Process sales transactions and manage cart</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medicine Search Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#2b2d31] border-white/5">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5 text-[#5865F2]" />
                Search Medicines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Search by name, category, or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1e1f22] border-white/10 text-white"
              />

              <div className="max-h-96 overflow-y-auto space-y-2">
                {medicines?.map((medicine) => (
                  <motion.div
                    key={medicine._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-3 bg-[#1e1f22] rounded-lg border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{medicine.name}</h3>
                      <p className="text-sm text-[#b5bac1]">
                        {medicine.category} • Stock: {medicine.quantity} • ₹{medicine.price}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addToCart(medicine)}
                      disabled={medicine.quantity === 0}
                      className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card className="bg-[#2b2d31] border-white/5">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-[#5865F2]" />
                Cart ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-[#b5bac1] text-center py-8">Cart is empty</p>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.medicineId}
                        className="p-3 bg-[#1e1f22] rounded-lg border border-white/5 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">{item.medicineName}</h4>
                            <p className="text-xs text-[#b5bac1]">₹{item.unitPrice} each</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.medicineId)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.medicineId, -1)}
                            disabled={item.quantity <= 1}
                            className="h-7 w-7 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.medicineId, 1)}
                            disabled={item.quantity >= item.availableStock}
                            className="h-7 w-7 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Discount %"
                            value={item.discount || ""}
                            onChange={(e) => updateDiscount(item.medicineId, Number(e.target.value))}
                            className="h-7 text-xs bg-[#313338] border-white/10"
                            min="0"
                            max="100"
                          />
                        </div>

                        <div className="text-right">
                          <span className="text-white font-medium">₹{calculateSubtotal(item).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    {/* Customer Selection */}
                    <div className="space-y-2">
                      <Label className="text-[#b5bac1] text-xs">Customer *</Label>
                      {selectedCustomerId ? (
                        <div className="flex items-center justify-between p-3 bg-[#1e1f22] rounded-lg border border-white/10">
                          <div>
                            <p className="text-white font-medium">{selectedCustomerName}</p>
                            <p className="text-xs text-[#b5bac1]">Selected</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedCustomerId(undefined);
                              setSelectedCustomerName("");
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setShowCustomerDialog(true)}
                          className="w-full bg-[#1e1f22] hover:bg-[#313338] text-white border border-white/10"
                          variant="outline"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Search or Add Customer
                        </Button>
                      )}
                    </div>

                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="bg-[#1e1f22] border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2b2d31] border-white/10">
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-[#b5bac1]">Total:</span>
                      <span className="text-white">₹{calculateTotal().toFixed(2)}</span>
                    </div>

                    <Button
                      onClick={() => setShowConfirmDialog(true)}
                      disabled={cart.length === 0 || isProcessing}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <IndianRupee className="h-4 w-4 mr-2" />
                      Complete Sale
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer Search Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="bg-[#2b2d31] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Select Customer</DialogTitle>
            <DialogDescription className="text-[#b5bac1]">
              Search for an existing customer or add a new one
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by name, contact, or email..."
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="bg-[#1e1f22] border-white/10 text-white flex-1"
              />
              <Button
                onClick={() => setShowAddCustomerDialog(true)}
                className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchedCustomers && searchedCustomers.length > 0 ? (
                searchedCustomers.map((customer) => (
                  <motion.div
                    key={customer._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-3 bg-[#1e1f22] rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                    onClick={() => handleSelectCustomer(customer._id, customer.name)}
                  >
                    <div>
                      <h3 className="text-white font-medium">{customer.name}</h3>
                      <p className="text-sm text-[#b5bac1]">
                        {customer.contactNumber}
                        {customer.email && ` • ${customer.email}`}
                      </p>
                    </div>
                    <Button size="sm" className="bg-[#5865F2] hover:bg-[#4752c4]">
                      Select
                    </Button>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-[#b5bac1] py-8">
                  {customerSearchTerm ? "No customers found" : "Start typing to search"}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={showAddCustomerDialog} onOpenChange={setShowAddCustomerDialog}>
        <DialogContent className="bg-[#2b2d31] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Customer</DialogTitle>
            <DialogDescription className="text-[#b5bac1]">
              Enter customer details to create a new record
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#b5bac1]">Name *</Label>
              <Input
                id="name"
                placeholder="Customer name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-[#b5bac1]">Contact Number *</Label>
              <Input
                id="contact"
                placeholder="Phone number"
                value={newCustomer.contactNumber}
                onChange={(e) => setNewCustomer({ ...newCustomer, contactNumber: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#b5bac1]">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-[#b5bac1]">Address (Optional)</Label>
              <Input
                id="address"
                placeholder="Customer address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                className="bg-[#1e1f22] border-white/10 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddCustomerDialog(false);
                setNewCustomer({ name: "", contactNumber: "", email: "", address: "" });
              }}
              className="bg-[#1e1f22] text-white border-white/10 hover:bg-[#313338]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCustomer}
              className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
            >
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Sale Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-[#2b2d31] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Sale</AlertDialogTitle>
            <AlertDialogDescription className="text-[#b5bac1]">
              Complete this sale for ₹{calculateTotal().toFixed(2)}? This action cannot be undone and will update inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1e1f22] text-white border-white/10 hover:bg-[#313338]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCompleteSale}
              disabled={isProcessing}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {isProcessing ? "Processing..." : "Confirm Sale"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}