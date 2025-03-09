"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
 
  const router = useRouter();

  // Initialize React Hook Form for new coupon creation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minOrderAmount: "",
      maxUses: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      isActive: true,
    },
  });

  // Initialize React Hook Form for coupon editing
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
    watch: watchEdit,
    setValue: setValueEdit,
  } = useForm();

  const discountType = watch("discountType"); // Watch discountType for create form
  const editDiscountType = watchEdit("discountType"); // Watch discountType for edit form

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/coupon-admin");

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch coupons");
      }

      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        code: data.code,
        discountType: data.discountType,
        discountValue: Number(data.discountValue),
        minOrderAmount: data.minOrderAmount ? Number(data.minOrderAmount) : null,
        maxUses: data.maxUses ? Number(data.maxUses) : null,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
        isActive: data.isActive,
      };

      const response = await fetch("/api/coupon-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create coupon");
      }
      toast.success(result.message || "Coupon created successfully");

      reset(); // Reset form to default values
      setIsCreateDialogOpen(false);
      fetchCoupons();
    } catch (error) {
      toast.error(error.message || "Coupon not created");
    }
  };

  const handleToggleActive = async (couponId, currentStatus) => {
    try {
      const response = await fetch(`/api/coupon-admin/${couponId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update coupon");
      }

      fetchCoupons();
      toast.success(`Coupon ${currentStatus ? "deactivated" : "activated"} successfully`);
    } catch (error) {
      toast.error(error.message || "Failed to update coupon");
    }
  };

  const handleEditClick = (coupon) => {
    setSelectedCoupon(coupon);
    
    // Format dates for the form
    const startDate = new Date(coupon.startDate).toISOString().split("T")[0];
    const endDate = coupon.endDate ? new Date(coupon.endDate).toISOString().split("T")[0] : "";
    
    // Set initial form values
    resetEdit({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount || "",
      maxUses: coupon.maxUses || "",
      startDate: startDate,
      endDate: endDate,
      isActive: coupon.isActive,
    });
    
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (data) => {
    if (!selectedCoupon) return;
    
    try {
      setIsEditSubmitting(true);
      
      const payload = {
        code: data.code,
        discountType: data.discountType,
        discountValue: Number(data.discountValue),
        minOrderAmount: data.minOrderAmount ? Number(data.minOrderAmount) : null,
        maxUses: data.maxUses ? Number(data.maxUses) : null,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
        isActive: data.isActive,
      };

      const response = await fetch(`/api/coupon-admin/${selectedCoupon.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update coupon");
      }

      toast.success("Coupon updated successfully");
      setIsEditDialogOpen(false);
      fetchCoupons();
    } catch (error) {
      toast.error(error.message || "Failed to update coupon");
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCoupon = async () => {
    if (!selectedCoupon) return;

    try {
      const response = await fetch(`/api/coupon-admin/${selectedCoupon.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete coupon");
      }

      const result = await response.json();
      toast.success(result.message || "Coupon deleted successfully");
      setIsDeleteDialogOpen(false);
      fetchCoupons();
    } catch (error) {
      toast.error(error.message || "Failed to delete coupon");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <style jsx global>{`
        /* Remove arrows from number inputs */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }
      `}</style>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Coupon</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-gray-900 text-white font-unbounded max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Coupon</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Coupon Code */}
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white">Coupon Code</Label>
                <Input
                  id="code"
                  {...register("code", {
                    required: "Coupon code is required",
                    minLength: { value: 3, message: "Code must be at least 3 characters" },
                  })}
                  placeholder="e.g. SUMMER2025"
                  className={`text-white bg-gray-800 border-gray-700 ${errors.code ? "border-red-500" : ""}`}
                />
                {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <Label htmlFor="discountType" className="text-white">Discount Type</Label>
                <Select
                  value={discountType}
                  onValueChange={(value) => setValue("discountType", value)}
                >
                  <SelectTrigger className="text-white bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount Value */}
              <div className="space-y-2">
                <Label htmlFor="discountValue" className="text-white">
                  {discountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount (₦)"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  {...register("discountValue", {
                    required: "Discount value is required",
                    min: { value: 1, message: "Value must be at least 1" },
                    max: discountType === "percentage" ? { value: 100, message: "Percentage cannot exceed 100" } : undefined,
                  })}
                  placeholder={discountType === "percentage" ? "e.g. 10" : "e.g. 1000"}
                  className={`text-white bg-gray-800 border-gray-700 ${errors.discountValue ? "border-red-500" : ""}`}
                />
                {errors.discountValue && <p className="text-red-500 text-sm">{errors.discountValue.message}</p>}
              </div>

              {/* Minimum Order Amount */}
              <div className="space-y-2">
                <Label htmlFor="minOrderAmount" className="text-white">Minimum Order Amount (₦, optional)</Label>
                <Input
                  id="minOrderAmount"
                  type="number"
                  {...register("minOrderAmount", {
                    min: { value: 0, message: "Amount cannot be negative" },
                  })}
                  placeholder="e.g. 5000"
                  className={`text-white bg-gray-800 border-gray-700 ${errors.minOrderAmount ? "border-red-500" : ""}`}
                />
                {errors.minOrderAmount && <p className="text-red-500 text-sm">{errors.minOrderAmount.message}</p>}
              </div>

              {/* Maximum Uses */}
              <div className="space-y-2">
                <Label htmlFor="maxUses" className="text-white">Maximum Uses (optional)</Label>
                <Input
                  id="maxUses"
                  type="number"
                  {...register("maxUses", {
                    min: { value: 0, message: "Uses cannot be negative" },
                  })}
                  placeholder="e.g. 100"
                  className={`text-white bg-gray-800 border-gray-700 ${errors.maxUses ? "border-red-500" : ""}`}
                />
                {errors.maxUses && <p className="text-red-500 text-sm">{errors.maxUses.message}</p>}
              </div>

              {/* Start and End Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-white">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                    className={`text-white bg-gray-800 border-gray-700 ${errors.startDate ? "border-red-500" : ""}`}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-white">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register("endDate", {
                      validate: (value) => {
                        if (!value) return true;
                        const start = new Date(watch("startDate"));
                        const end = new Date(value);
                        return end >= start || "End date must be after start date";
                      },
                    })}
                    className={`text-white bg-gray-800 border-gray-700 ${errors.endDate ? "border-red-500" : ""}`}
                  />
                  {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                </div>
              </div>

              {/* Is Active Switch */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={watch("isActive")}
                  onCheckedChange={(checked) => setValue("isActive", checked)}
                />
                <Label htmlFor="isActive" className="text-white">Active</Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Coupon"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Coupon Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md bg-gray-900 text-white font-unbounded max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Coupon</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit(handleEditSubmit)} className="space-y-4 mt-4">
            {/* Coupon Code */}
            <div className="space-y-2">
              <Label htmlFor="edit-code" className="text-white">Coupon Code</Label>
              <Input
                id="edit-code"
                {...registerEdit("code", {
                  required: "Coupon code is required",
                  minLength: { value: 3, message: "Code must be at least 3 characters" },
                })}
                className={`text-white bg-gray-800 border-gray-700 ${editErrors.code ? "border-red-500" : ""}`}
              />
              {editErrors.code && <p className="text-red-500 text-sm">{editErrors.code.message}</p>}
            </div>

            {/* Discount Type */}
            <div className="space-y-2">
              <Label htmlFor="edit-discountType" className="text-white">Discount Type</Label>
              <Select
                value={editDiscountType}
                onValueChange={(value) => setValueEdit("discountType", value)}
              >
                <SelectTrigger className="text-white bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discount Value */}
            <div className="space-y-2">
              <Label htmlFor="edit-discountValue" className="text-white">
                {editDiscountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount (₦)"}
              </Label>
              <Input
                id="edit-discountValue"
                type="number"
                {...registerEdit("discountValue", {
                  required: "Discount value is required",
                  min: { value: 1, message: "Value must be at least 1" },
                  max: editDiscountType === "percentage" ? { value: 100, message: "Percentage cannot exceed 100" } : undefined,
                })}
                className={`text-white bg-gray-800 border-gray-700 ${editErrors.discountValue ? "border-red-500" : ""}`}
              />
              {editErrors.discountValue && <p className="text-red-500 text-sm">{editErrors.discountValue.message}</p>}
            </div>

            {/* Minimum Order Amount */}
            <div className="space-y-2">
              <Label htmlFor="edit-minOrderAmount" className="text-white">Minimum Order Amount (₦, optional)</Label>
              <Input
                id="edit-minOrderAmount"
                type="number"
                {...registerEdit("minOrderAmount", {
                  min: { value: 0, message: "Amount cannot be negative" },
                })}
                className={`text-white bg-gray-800 border-gray-700 ${editErrors.minOrderAmount ? "border-red-500" : ""}`}
              />
              {editErrors.minOrderAmount && <p className="text-red-500 text-sm">{editErrors.minOrderAmount.message}</p>}
            </div>

            {/* Maximum Uses */}
            <div className="space-y-2">
              <Label htmlFor="edit-maxUses" className="text-white">Maximum Uses (optional)</Label>
              <Input
                id="edit-maxUses"
                type="number"
                {...registerEdit("maxUses", {
                  min: { value: 0, message: "Uses cannot be negative" },
                })}
                className={`text-white bg-gray-800 border-gray-700 ${editErrors.maxUses ? "border-red-500" : ""}`}
              />
              {editErrors.maxUses && <p className="text-red-500 text-sm">{editErrors.maxUses.message}</p>}
            </div>

            {/* Start and End Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate" className="text-white">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  {...registerEdit("startDate", {
                    required: "Start date is required",
                  })}
                  className={`text-white bg-gray-800 border-gray-700 ${editErrors.startDate ? "border-red-500" : ""}`}
                />
                {editErrors.startDate && <p className="text-red-500 text-sm">{editErrors.startDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate" className="text-white">End Date (optional)</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  {...registerEdit("endDate", {
                    validate: (value) => {
                      if (!value) return true;
                      const start = new Date(watchEdit("startDate"));
                      const end = new Date(value);
                      return end >= start || "End date must be after start date";
                    },
                  })}
                  className={`text-white bg-gray-800 border-gray-700 ${editErrors.endDate ? "border-red-500" : ""}`}
                />
                {editErrors.endDate && <p className="text-red-500 text-sm">{editErrors.endDate.message}</p>}
              </div>
            </div>

            {/* Is Active Switch */}
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={watchEdit("isActive")}
                onCheckedChange={(checked) => setValueEdit("isActive", checked)}
              />
              <Label htmlFor="edit-isActive" className="text-white">Active</Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isEditSubmitting}>
              {isEditSubmitting ? "Updating..." : "Update Coupon"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 text-white font-unbounded">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to delete the coupon <span className="font-bold">{selectedCoupon?.code}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCoupon} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No coupons found. Create your first coupon to get started.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : `₦${(coupon.discountValue / 100).toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {coupon.currentUses} {coupon.maxUses ? ` / ${coupon.maxUses}` : " uses"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(coupon.startDate).toLocaleDateString()}
                      {coupon.endDate ? ` - ${new Date(coupon.endDate).toLocaleDateString()}` : " (No end date)"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          coupon.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {coupon.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        onClick={() => handleEditClick(coupon)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-100"
                        onClick={() => handleToggleActive(coupon.id, coupon.isActive)}
                      >
                        {coupon.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(coupon)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}