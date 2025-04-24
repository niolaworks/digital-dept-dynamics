
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Clipboard, Plus, Save, Trash } from "lucide-react";
import { Link } from "react-router-dom";

type ShipmentItem = {
  id: number;
  description: string;
  quantity: number;
  weight: string;
  dimensions: string;
};

const LogisticsDispatchNote = () => {
  const { toast } = useToast();
  const [dispatchNumber, setDispatchNumber] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [transportMethod, setTransportMethod] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [items, setItems] = useState<ShipmentItem[]>([
    { id: 1, description: "", quantity: 1, weight: "", dimensions: "" }
  ]);

  const handleAddItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    setItems([...items, { id: newId, description: "", quantity: 1, weight: "", dimensions: "" }]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      toast({
        title: "Cannot remove item",
        description: "At least one item is required.",
        variant: "destructive"
      });
    }
  };

  const handleItemChange = (id: number, field: keyof ShipmentItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dispatch Note Created",
      description: `Dispatch #${dispatchNumber} has been saved.`
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/logistics" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Dispatch Note Form</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dispatch Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dispatchNumber">Dispatch Number *</Label>
                <Input 
                  id="dispatchNumber" 
                  placeholder="Enter dispatch number" 
                  value={dispatchNumber} 
                  onChange={e => setDispatchNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderReference">Order Reference *</Label>
                <Input 
                  id="orderReference" 
                  placeholder="Enter order reference" 
                  value={orderReference} 
                  onChange={e => setOrderReference(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dispatchDate">Dispatch Date *</Label>
                <Input 
                  id="dispatchDate" 
                  type="date" 
                  value={dispatchDate} 
                  onChange={e => setDispatchDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportMethod">Transport Method *</Label>
                <Select value={transportMethod} onValueChange={setTransportMethod} required>
                  <SelectTrigger id="transportMethod">
                    <SelectValue placeholder="Select transport method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">Road - Truck</SelectItem>
                    <SelectItem value="air">Air Freight</SelectItem>
                    <SelectItem value="sea">Sea Freight</SelectItem>
                    <SelectItem value="rail">Rail</SelectItem>
                    <SelectItem value="courier">Courier Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input 
                  id="customerName" 
                  placeholder="Enter customer name" 
                  value={customerName} 
                  onChange={e => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                <Textarea 
                  id="deliveryAddress" 
                  placeholder="Enter delivery address" 
                  value={deliveryAddress} 
                  onChange={e => setDeliveryAddress(e.target.value)}
                  required
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Shipment Items</CardTitle>
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
            {items.map((item, index) => (
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                    <Input 
                      id={`quantity-${item.id}`} 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={e => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`weight-${item.id}`}>Weight (kg)</Label>
                    <Input 
                      id={`weight-${item.id}`} 
                      placeholder="Item weight" 
                      value={item.weight} 
                      onChange={e => handleItemChange(item.id, 'weight', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-4">
                    <Label htmlFor={`dimensions-${item.id}`}>Dimensions (L × W × H cm)</Label>
                    <Input 
                      id={`dimensions-${item.id}`} 
                      placeholder="e.g. 30 × 20 × 15" 
                      value={item.dimensions} 
                      onChange={e => handleItemChange(item.id, 'dimensions', e.target.value)}
                    />
                  </div>
                </div>
                {index < items.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea 
                id="specialInstructions" 
                placeholder="Enter any special handling instructions or notes" 
                value={specialInstructions} 
                onChange={e => setSpecialInstructions(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link to="/logistics">Cancel</Link>
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Dispatch Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogisticsDispatchNote;
