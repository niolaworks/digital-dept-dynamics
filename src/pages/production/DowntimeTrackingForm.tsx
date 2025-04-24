
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Clock, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDowntimeStorage } from "@/hooks/useDowntimeStorage";
import { FormEvent, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DowntimeTrackingForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'create';
  const { formData, setFormData, clearStoredData, getAllDowntimeRecords } = useDowntimeStorage();

  // Calculate duration when start and end times change
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      try {
        const start = new Date(`1970-01-01T${formData.startTime}`);
        const end = new Date(`1970-01-01T${formData.endTime}`);
        
        if (end >= start) {
          const durationMs = end.getTime() - start.getTime();
          const hours = Math.floor(durationMs / 3600000);
          const minutes = Math.floor((durationMs % 3600000) / 60000);
          
          setFormData({
            ...formData,
            totalDuration: `${hours}h ${minutes}m`
          });
        }
      } catch (e) {
        console.error("Error calculating duration:", e);
      }
    }
  }, [formData.startTime, formData.endTime]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.date || !formData.productionLine || !formData.equipmentName || 
        !formData.startTime || !formData.endTime || !formData.rootCause || 
        !formData.actionTaken || !formData.reportedBy) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const savedData = clearStoredData();
    if (savedData) {
      toast({
        title: "Downtime Record Saved",
        description: `Downtime record for ${savedData.equipmentName} has been saved.`
      });
      navigate('?tab=history');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/production" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-manufacturing-600" />
          <h1 className="text-2xl font-bold">Production Downtime Tracking</h1>
        </div>
      </div>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger 
            value="create"
            onClick={() => navigate('?tab=create')}
          >
            Record Downtime
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            onClick={() => navigate('?tab=history')}
          >
            Downtime History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="productionLine" className="block text-sm font-medium mb-1">
                  Production Line / Section
                </label>
                <Input
                  id="productionLine"
                  placeholder="Enter production line or section"
                  value={formData.productionLine}
                  onChange={(e) => setFormData({ ...formData, productionLine: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="downtimeCategory" className="block text-sm font-medium mb-1">
                  Downtime Category
                </label>
                <Select 
                  value={formData.downtimeCategory} 
                  onValueChange={(value) => setFormData({ ...formData, downtimeCategory: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Machine Downtime">Machine Downtime</SelectItem>
                    <SelectItem value="Material Downtime">Material Downtime</SelectItem>
                    <SelectItem value="Quality Issue">Quality Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="equipmentName" className="block text-sm font-medium mb-1">
                  Equipment / Machine Name
                </label>
                <Input
                  id="equipmentName"
                  placeholder="Enter equipment name"
                  value={formData.equipmentName}
                  onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="totalDuration" className="block text-sm font-medium mb-1">
                  Total Downtime Duration
                </label>
                <Input
                  id="totalDuration"
                  readOnly
                  placeholder="Calculated automatically"
                  value={formData.totalDuration}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="rootCause" className="block text-sm font-medium mb-1">
                  Root Cause Description
                </label>
                <Textarea
                  id="rootCause"
                  placeholder="Describe the root cause of the downtime"
                  value={formData.rootCause}
                  onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div>
                <label htmlFor="actionTaken" className="block text-sm font-medium mb-1">
                  Action Taken
                </label>
                <Textarea
                  id="actionTaken"
                  placeholder="Describe the actions taken to resolve the issue"
                  value={formData.actionTaken}
                  onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reportedBy" className="block text-sm font-medium mb-1">
                  Reported By
                </label>
                <Input
                  id="reportedBy"
                  placeholder="Name of person reporting"
                  value={formData.reportedBy}
                  onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="approvedBy" className="block text-sm font-medium mb-1">
                  Approved By (Supervisor)
                </label>
                <Input
                  id="approvedBy"
                  placeholder="Name of supervisor approving"
                  value={formData.approvedBy}
                  onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link to="/production">Cancel</Link>
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Record
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Downtime History Records</h2>
            
            {getAllDowntimeRecords().length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No downtime records found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAllDowntimeRecords().map((record) => (
                  <Card key={record.id} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{record.equipmentName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{record.date} · {record.totalDuration}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Category:</span>
                          <span className="text-sm ml-2">{record.downtimeCategory}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Production Line:</span>
                          <span className="text-sm ml-2">{record.productionLine}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Time:</span>
                          <span className="text-sm ml-2">{record.startTime} - {record.endTime}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Root Cause:</span>
                          <p className="text-sm">{record.rootCause}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Action Taken:</span>
                          <p className="text-sm">{record.actionTaken}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Reported By:</span>
                          <span className="text-sm ml-2">{record.reportedBy}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DowntimeTrackingForm;
