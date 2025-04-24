
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PickingListData } from "../types";

interface SavedPickingListsTableProps {
  pickingLists: PickingListData[];
}

export const SavedPickingListsTable = ({ pickingLists }: SavedPickingListsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Picking Lists</CardTitle>
      </CardHeader>
      <CardContent>
        {pickingLists.length === 0 ? (
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
                {pickingLists.map((list, index) => (
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
  );
};
