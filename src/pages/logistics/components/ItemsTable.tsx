
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash } from "lucide-react";
import { PickingListData, Item } from "../types";
import { useToast } from "@/hooks/use-toast";

interface ItemsTableProps {
  formData: PickingListData;
  setFormData: (data: PickingListData) => void;
}

export const ItemsTable = ({ formData, setFormData }: ItemsTableProps) => {
  const { toast } = useToast();

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

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const calculateTotalPickMass = () => {
    return formData.items.reduce((sum, item) => sum + item.pickMass, 0);
  };

  return (
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
  );
};
