
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Package, Truck } from "lucide-react";

const DepartmentCard = ({ 
  title, 
  description, 
  icon: Icon, 
  formCount, 
  path 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  formCount: number; 
  path: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(path)}>
      <CardHeader className="p-6 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="p-2 rounded-full bg-manufacturing-50">
            <Icon className="h-6 w-6 text-manufacturing-600" />
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{formCount} forms</span>
          <Button variant="ghost" size="sm" onClick={() => navigate(path)}>
            View Forms
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Digital Department Dynamics</h1>
        <p className="text-gray-500">
          Digital form management for manufacturing departments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DepartmentCard 
          title="Logistics" 
          description="Manage picking lists, dispatch notes and shipment tracking" 
          icon={Truck}
          formCount={2}
          path="/logistics"
        />
        <DepartmentCard 
          title="Production" 
          description="Handle job cards, quality checks and production schedules" 
          icon={Package}
          formCount={2}
          path="/production"
        />
        <Card className="border-dashed border-2 hover:border-manufacturing-300 transition-all flex items-center justify-center h-[200px]">
          <div className="text-center p-6">
            <FileText className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Add New Department</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
