
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PickingListData } from "../types";

interface OrderInformationFormProps {
  formData: PickingListData;
  setFormData: (data: PickingListData) => void;
}

export const OrderInformationForm = ({ formData, setFormData }: OrderInformationFormProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pln">PLN</Label>
            <Input 
              id="pln" 
              value={formData.pln} 
              onChange={e => setFormData({ ...formData, pln: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number *</Label>
            <Input 
              id="orderNumber" 
              value={formData.orderNumber} 
              onChange={e => setFormData({ ...formData, orderNumber: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerCode">Customer Code</Label>
            <Input 
              id="customerCode" 
              value={formData.customerCode} 
              onChange={e => setFormData({ ...formData, customerCode: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input 
              id="customerName" 
              value={formData.customerName} 
              onChange={e => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerAddress">Customer Address</Label>
            <Input 
              id="customerAddress" 
              value={formData.customerAddress} 
              onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orderDate">Order Date *</Label>
            <Input 
              id="orderDate" 
              type="date" 
              value={formData.orderDate} 
              onChange={e => setFormData({ ...formData, orderDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Delivery Date *</Label>
            <Input 
              id="deliveryDate" 
              type="date" 
              value={formData.deliveryDate} 
              onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryMode">Delivery Mode</Label>
            <Input 
              id="deliveryMode" 
              value={formData.deliveryMode} 
              onChange={e => setFormData({ ...formData, deliveryMode: e.target.value })}
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
                <SelectItem value="Agl-FG">Agl-FG</SelectItem>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="secondary">Secondary Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseOrderNo">Purchase Order No.</Label>
            <Input 
              id="purchaseOrderNo" 
              value={formData.purchaseOrderNo} 
              onChange={e => setFormData({ ...formData, purchaseOrderNo: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
