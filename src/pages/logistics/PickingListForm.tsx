
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePickingListStorage } from "@/hooks/usePickingListStorage";
import { OrderInformationForm } from "./components/OrderInformationForm";
import { ItemsTable } from "./components/ItemsTable";
import { TransportDetailsForm } from "./components/TransportDetailsForm";
import { SavedPickingListsTable } from "./components/SavedPickingListsTable";

const LogisticsPickingList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'create';
  const { formData, setFormData, clearStoredData, getAllPickingLists } = usePickingListStorage();

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
            <OrderInformationForm formData={formData} setFormData={setFormData} />
            <ItemsTable formData={formData} setFormData={setFormData} />
            <TransportDetailsForm formData={formData} setFormData={setFormData} />

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
          <SavedPickingListsTable pickingLists={getAllPickingLists()} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogisticsPickingList;
