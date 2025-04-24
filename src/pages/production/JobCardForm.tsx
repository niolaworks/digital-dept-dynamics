
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
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const ProductionJobCard = () => {
  const { toast } = useToast();
  const [jobNumber, setJobNumber] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");
  const [machineCode, setMachineCode] = useState("");
  const [materialRequirements, setMaterialRequirements] = useState("");
  const [setupInstructions, setSetupInstructions] = useState("");
  const [qualityNotes, setQualityNotes] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Card Created",
      description: `Job #${jobNumber} has been saved.`
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/production" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Production Job Card</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobNumber">Job Number *</Label>
                <Input 
                  id="jobNumber" 
                  placeholder="Enter job number" 
                  value={jobNumber} 
                  onChange={e => setJobNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productCode">Product Code *</Label>
                <Input 
                  id="productCode" 
                  placeholder="Enter product code" 
                  value={productCode} 
                  onChange={e => setProductCode(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input 
                  id="productName" 
                  placeholder="Enter product name" 
                  value={productName} 
                  onChange={e => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchSize">Batch Size *</Label>
                <Input 
                  id="batchSize" 
                  type="number" 
                  min="1" 
                  placeholder="Enter batch size" 
                  value={batchSize} 
                  onChange={e => setBatchSize(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input 
                  id="endDate" 
                  type="date" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineCode">Machine Code *</Label>
                <Select required value={machineCode} onValueChange={setMachineCode}>
                  <SelectTrigger id="machineCode">
                    <SelectValue placeholder="Select machine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MC001">MC001 - CNC Mill</SelectItem>
                    <SelectItem value="MC002">MC002 - Lathe</SelectItem>
                    <SelectItem value="MC003">MC003 - Assembly Line 1</SelectItem>
                    <SelectItem value="MC004">MC004 - Assembly Line 2</SelectItem>
                    <SelectItem value="MC005">MC005 - Injection Mold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Production Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="materialRequirements">Material Requirements *</Label>
                <Textarea 
                  id="materialRequirements" 
                  placeholder="List required materials and quantities" 
                  value={materialRequirements} 
                  onChange={e => setMaterialRequirements(e.target.value)}
                  required
                  rows={3}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="setupInstructions">Setup Instructions *</Label>
                <Textarea 
                  id="setupInstructions" 
                  placeholder="Enter machine setup instructions" 
                  value={setupInstructions} 
                  onChange={e => setSetupInstructions(e.target.value)}
                  required
                  rows={3}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="qualityNotes">Quality Requirements *</Label>
                <Textarea 
                  id="qualityNotes" 
                  placeholder="Enter quality control parameters and acceptance criteria" 
                  value={qualityNotes} 
                  onChange={e => setQualityNotes(e.target.value)}
                  required
                  rows={3}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea 
                  id="additionalNotes" 
                  placeholder="Enter any additional production notes or special instructions" 
                  value={additionalNotes} 
                  onChange={e => setAdditionalNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link to="/production">Cancel</Link>
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Job Card
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductionJobCard;
