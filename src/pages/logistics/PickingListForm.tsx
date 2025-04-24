import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Plus, Save, Trash } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePickingListStorage } from "@/hooks/usePickingListStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const LogisticsPickingList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'create';
  const { formData, setFormData, clearStoredData, getAllPickingLists } = usePickingListStorage();

  const handleAddItem = () => {
    const newId = formData.items.length > 0 
      ? Math.max(...formData.items.map(item => item.id)) + 1 
      : 1;
    setFormData({
      ...formData,
      items: [...formData.items, { 
        id: newId, 
        itemCode: "", 
        description: "", 
        unit: "CS", 
        orderQty: 0,
        pickQty: 0,
        backOrderQty: 0,
        pickMass: 0
      }]
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
    const savedData = clearStoredData();
    if (savedData) {
      toast({
        title: "Picking List Created",
        description: `Order #${savedData.orderNumber} has been saved.`
      });
      navigate('?tab=saved');
    }
  };

  const calculateTotalPickMass = () => {
    return formData.items.reduce((sum, item) => sum + item.pickMass, 0);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/logistics" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Picking List</h1>
      </div>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger 
            value="create"
            onClick={() => navigate('?tab=create')}
          >
            Create Picking List
          </TabsTrigger>
          <TabsTrigger 
            value="saved"
            onClick={() => navigate('?tab=saved')}
          >
            Saved Picking Lists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <form onSubmit={handleSubmit}>
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
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Order Qty</TableHead>
                        <TableHead>Pick Qty</TableHead>
                        <TableHead>Back Order Qty</TableHead>
                        <TableHead>Pick Mass</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input 
                              value={item.itemCode}
                              onChange={e => handleItemChange(item.id, 'itemCode', e.target.value)}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={item.description}
                              onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={item.unit}
                              onChange={e => handleItemChange(item.id, 'unit', e.target.value)}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              value={item.orderQty}
                              onChange={e => handleItemChange(item.id, 'orderQty', Number(e.target.value))}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              value={item.pickQty}
                              onChange={e => handleItemChange(item.id, 'pickQty', Number(e.target.value))}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              value={item.backOrderQty}
                              onChange={e => handleItemChange(item.id, 'backOrderQty', Number(e.target.value))}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              value={item.pickMass}
                              onChange={e => handleItemChange(item.id, 'pickMass', Number(e.target.value))}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={6} className="text-right font-medium">
                          Total Pick Mass:
                        </TableCell>
                        <TableCell colSpan={2}>
                          {calculateTotalPickMass().toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Transport Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="transporter">Transporter</Label>
                    <Input 
                      id="transporter"
                      value={formData.transportDetails.transporter}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, transporter: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleRegNumber">Vehicle Register Number</Label>
                    <Input 
                      id="vehicleRegNumber"
                      value={formData.transportDetails.vehicleRegNumber}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, vehicleRegNumber: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Input 
                      id="vehicleType"
                      value={formData.transportDetails.vehicleType}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, vehicleType: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleCapacity">Vehicle Capacity</Label>
                    <Input 
                      id="vehicleCapacity"
                      value={formData.transportDetails.vehicleCapacity}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, vehicleCapacity: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input 
                      id="driverName"
                      value={formData.transportDetails.driverName}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, driverName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickedBy">Picked By</Label>
                    <Input 
                      id="pickedBy"
                      value={formData.transportDetails.pickedBy}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, pickedBy: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkedBy">Checked By</Label>
                    <Input 
                      id="checkedBy"
                      value={formData.transportDetails.checkedBy}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, checkedBy: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="comments">Comments</Label>
                    <Textarea 
                      id="comments"
                      value={formData.transportDetails.comments}
                      onChange={e => setFormData({
                        ...formData,
                        transportDetails: { ...formData.transportDetails, comments: e.target.value }
                      })}
                    />
                  </div>
                </div>
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
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Picking Lists</CardTitle>
            </CardHeader>
            <CardContent>
              {getAllPickingLists().length === 0 ? (
                <p className="text-center text-gray-500 py-4">No picking lists found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>PLN</TableHead>
                        <TableHead>Order Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Warehouse</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAllPickingLists().map((list, index) => (
                        <TableRow key={index}>
                          <TableCell>{list.pln}</TableCell>
                          <TableCell>{list.orderNumber}</TableCell>
                          <TableCell>{list.customerName}</TableCell>
                          <TableCell>{list.deliveryDate}</TableCell>
                          <TableCell>{list.warehouse}</TableCell>
                          <TableCell>{list.items.length} items</TableCell>
                          <TableCell>
                            {list.printDate} {list.printTime}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogisticsPickingList;
