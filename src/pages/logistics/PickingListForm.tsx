import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Plus, Save, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { usePickingListStorage } from "@/hooks/usePickingListStorage";

const LogisticsPickingList = () => {
  const { toast } = useToast();
  const { formData, setFormData, clearStoredData } = usePickingListStorage();

  const handleAddItem = () => {
    const newId = formData.items.length > 0 
      ? Math.max(...formData.items.map(item => item.id)) + 1 
      : 1;
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, sku: "", description: "", location: "", quantity: 1 }]
    });
  };

  const handleRemoveItem = (id: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter(item => item.id !== id)
      });
    } else {
      toast({
        title: "Cannot remove item",
        description: "At least one item is required.",
        variant: "destructive"
      });
    }
  };

  const handleItemChange = (id: number, field: string, value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Picking List Created",
      description: `Order #${formData.orderNumber} has been saved.`
    });
    clearStoredData();
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/logistics" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Picking List Form</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number *</Label>
                <Input 
                  id="orderNumber" 
                  placeholder="Enter order number" 
                  value={formData.orderNumber} 
                  onChange={e => setFormData({ ...formData, orderNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input 
                  id="customerName" 
                  placeholder="Enter customer name" 
                  value={formData.customerName} 
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickDate">Pick Date *</Label>
                <Input 
                  id="pickDate" 
                  type="date" 
                  value={formData.pickDate} 
                  onChange={e => setFormData({ ...formData, pickDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse">Warehouse *</Label>
                <Select 
                  value={formData.warehouse} 
                  onValueChange={value => setFormData({ ...formData, warehouse: value })}
                >
                  <SelectTrigger id="warehouse">
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                    <SelectItem value="overflow">Overflow Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={value => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Items to Pick</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddItem}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </CardHeader>
          <CardContent>
            {formData.items.map((item, index) => (
              <div key={item.id} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Item #{index + 1}</h3>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor={`sku-${item.id}`}>SKU</Label>
                    <Input 
                      id={`sku-${item.id}`} 
                      placeholder="Item SKU" 
                      value={item.sku} 
                      onChange={e => handleItemChange(item.id, 'sku', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description-${item.id}`}>Description</Label>
                    <Input 
                      id={`description-${item.id}`} 
                      placeholder="Item description" 
                      value={item.description} 
                      onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`location-${item.id}`}>Location</Label>
                    <Input 
                      id={`location-${item.id}`} 
                      placeholder="Item location" 
                      value={item.location} 
                      onChange={e => handleItemChange(item.id, 'location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                    <Input 
                      id={`quantity-${item.id}`} 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={e => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
                {index < formData.items.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link to="/logistics">Cancel</Link>
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Picking List
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogisticsPickingList;
