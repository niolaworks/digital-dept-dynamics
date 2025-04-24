
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

type QualityCheckItem = {
  id: number;
  parameter: string;
  specification: string;
  actual: string;
  result: "pass" | "fail" | "";
};

const ProductionQualityCheck = () => {
  const { toast } = useToast();
  const [inspectionNumber, setInspectionNumber] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [productCode, setProductCode] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectorName, setInspectorName] = useState("");
  const [sampleSize, setSampleSize] = useState("");
  const [overallResult, setOverallResult] = useState<"pass" | "fail" | "">("");
  const [comments, setComments] = useState("");
  
  const [checkItems, setCheckItems] = useState<QualityCheckItem[]>([
    { id: 1, parameter: "Dimensions", specification: "", actual: "", result: "" },
    { id: 2, parameter: "Weight", specification: "", actual: "", result: "" },
    { id: 3, parameter: "Visual Inspection", specification: "", actual: "", result: "" },
    { id: 4, parameter: "Functionality Test", specification: "", actual: "", result: "" },
  ]);

  const handleCheckItemChange = (id: number, field: keyof QualityCheckItem, value: string) => {
    setCheckItems(checkItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quality Check Saved",
      description: `Inspection #${inspectionNumber} has been recorded.`
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/production" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Quality Check Form</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inspection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inspectionNumber">Inspection Number *</Label>
                <Input 
                  id="inspectionNumber" 
                  placeholder="Enter inspection number" 
                  value={inspectionNumber} 
                  onChange={e => setInspectionNumber(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input 
                  id="batchNumber" 
                  placeholder="Enter batch number" 
                  value={batchNumber} 
                  onChange={e => setBatchNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspectionDate">Inspection Date *</Label>
                <Input 
                  id="inspectionDate" 
                  type="date" 
                  value={inspectionDate} 
                  onChange={e => setInspectionDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sampleSize">Sample Size *</Label>
                <Input 
                  id="sampleSize" 
                  type="number" 
                  min="1" 
                  placeholder="Enter sample size" 
                  value={sampleSize} 
                  onChange={e => setSampleSize(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspectorName">Inspector Name *</Label>
                <Input 
                  id="inspectorName" 
                  placeholder="Enter inspector name" 
                  value={inspectorName} 
                  onChange={e => setInspectorName(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quality Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {checkItems.map((item, index) => (
                <div key={item.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.parameter}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`specification-${item.id}`}>Specification</Label>
                      <Input 
                        id={`specification-${item.id}`} 
                        placeholder="Required specification" 
                        value={item.specification} 
                        onChange={e => handleCheckItemChange(item.id, 'specification', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`actual-${item.id}`}>Actual Measurement</Label>
                      <Input 
                        id={`actual-${item.id}`} 
                        placeholder="Measured value" 
                        value={item.actual} 
                        onChange={e => handleCheckItemChange(item.id, 'actual', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`result-${item.id}`}>Result</Label>
                      <Select 
                        value={item.result} 
                        onValueChange={(value) => handleCheckItemChange(item.id, 'result', value as "pass" | "fail" | "")}
                      >
                        <SelectTrigger id={`result-${item.id}`}>
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pass">Pass</SelectItem>
                          <SelectItem value="fail">Fail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {index < checkItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inspection Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="overallResult">Overall Result *</Label>
                <Select required value={overallResult} onValueChange={(value: "pass" | "fail" | "") => setOverallResult(value)}>
                  <SelectTrigger id="overallResult">
                    <SelectValue placeholder="Select overall result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Pass</SelectItem>
                    <SelectItem value="fail">Fail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea 
                  id="comments" 
                  placeholder="Enter any comments or observations" 
                  value={comments} 
                  onChange={e => setComments(e.target.value)}
                  rows={4}
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
            <Save className="h-4 w-4" /> Submit Quality Check
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductionQualityCheck;
