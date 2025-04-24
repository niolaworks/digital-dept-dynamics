
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductionFormCard = ({ 
  title, 
  description, 
  lastUpdated, 
  path,
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  lastUpdated: string; 
  path: string;
  icon: React.ElementType;
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Icon className="h-5 w-5 text-manufacturing-500" />
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </CardHeader>
      <CardContent className="px-6">
        <div className="text-xs text-gray-500">
          Last updated: {lastUpdated}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-2">
        <Button 
          className="w-full" 
          onClick={() => navigate(path)}
        >
          Open Form
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductionPage = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-md bg-manufacturing-100">
          <Package className="h-8 w-8 text-manufacturing-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Production Department</h1>
          <p className="text-gray-500">
            Handle downtime tracking, quality checks and production schedules
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Forms</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductionFormCard 
          title="Downtime Tracking" 
          description="Track and analyze production downtime incidents and causes" 
          lastUpdated="Today"
          path="/production/downtime"
          icon={Clock}
        />
        <ProductionFormCard 
          title="Quality Check" 
          description="Perform and document quality inspections for production batches" 
          lastUpdated="1 week ago"
          path="/production/quality-check"
          icon={FileText}
        />
        <Card className="border-dashed border-2 hover:border-manufacturing-300 transition-all flex items-center justify-center h-[200px]">
          <div className="text-center p-6">
            <FileText className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Add New Form</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductionPage;
