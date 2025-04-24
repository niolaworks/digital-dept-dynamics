
import { Link } from "react-router-dom";
import { ChevronLeft, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ViewPickingLists = () => {
  // Get all picking lists from localStorage
  const getAllPickingLists = () => {
    const lists = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('picking-list-')) {
        const list = JSON.parse(localStorage.getItem(key) || '');
        lists.push(list);
      }
    }
    return lists;
  };

  const pickingLists = getAllPickingLists();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/logistics" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Saved Picking Lists</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Picking Lists
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pickingLists.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No picking lists found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Pick Date</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickingLists.map((list, index) => (
                  <TableRow key={index}>
                    <TableCell>{list.orderNumber}</TableCell>
                    <TableCell>{list.customerName}</TableCell>
                    <TableCell>{list.pickDate}</TableCell>
                    <TableCell>{list.warehouse}</TableCell>
                    <TableCell className="capitalize">{list.priority}</TableCell>
                    <TableCell>{list.items.length} items</TableCell>
                    <TableCell>
                      <Link 
                        to={`/logistics/picking-list/${list.orderNumber}`} 
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPickingLists;
