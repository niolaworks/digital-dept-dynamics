
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
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  QualityControlData, 
  DefectSeverity, 
  InspectionResult, 
  RecommendedAction 
} from "./types";

const ProductionQualityCheck = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QualityControlData>({
    inspectionDate: new Date().toISOString().split('T')[0],
    materialName: "",
    batchReference: "",
    vendorName: "",
    inspectionResult: "Passed",
    defectType: "",
    severityLevel: "Minor",
    vendorRating: 3,
    recommendedAction: "Accept",
    inspectorName: "",
    remarks: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quality Control Report Saved",
      description: `Inspection for ${formData.materialName} has been recorded.`
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/production" className="text-gray-500 hover:text-gray-800">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Vendor Evaluation & Defect Report</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inspectionDate">Inspection Date *</Label>
                <Input 
                  id="inspectionDate" 
                  type="date"
                  value={formData.inspectionDate}
                  onChange={e => setFormData(prev => ({ ...prev, inspectionDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materialName">Material Name *</Label>
                <Input 
                  id="materialName" 
                  placeholder="Enter material name"
                  value={formData.materialName}
                  onChange={e => setFormData(prev => ({ ...prev, materialName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchReference">Batch/Delivery Reference *</Label>
                <Input 
                  id="batchReference" 
                  placeholder="Enter batch reference"
                  value={formData.batchReference}
                  onChange={e => setFormData(prev => ({ ...prev, batchReference: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor Name *</Label>
                <Input 
                  id="vendorName" 
                  placeholder="Enter vendor name"
                  value={formData.vendorName}
                  onChange={e => setFormData(prev => ({ ...prev, vendorName: e.target.value }))}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inspection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inspectionResult">Inspection Result *</Label>
                <Select 
                  value={formData.inspectionResult}
                  onValueChange={(value: InspectionResult) => setFormData(prev => ({ ...prev, inspectionResult: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Passed">Passed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defectType">Defect Type</Label>
                <Input 
                  id="defectType" 
                  placeholder="Enter defect type if any"
                  value={formData.defectType}
                  onChange={e => setFormData(prev => ({ ...prev, defectType: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="severityLevel">Severity Level *</Label>
                <Select 
                  value={formData.severityLevel}
                  onValueChange={(value: DefectSeverity) => setFormData(prev => ({ ...prev, severityLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minor">Minor</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorRating">Vendor Performance Rating (1-5) *</Label>
                <Select 
                  value={formData.vendorRating.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vendorRating: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(rating => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Final Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="recommendedAction">Recommended Action *</Label>
                <Select 
                  value={formData.recommendedAction}
                  onValueChange={(value: RecommendedAction) => setFormData(prev => ({ ...prev, recommendedAction: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Accept">Accept</SelectItem>
                    <SelectItem value="Reject">Reject</SelectItem>
                    <SelectItem value="Conditional Use">Conditional Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspectorName">QC Inspector Name *</Label>
                <Input 
                  id="inspectorName" 
                  placeholder="Enter inspector name"
                  value={formData.inspectorName}
                  onChange={e => setFormData(prev => ({ ...prev, inspectorName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea 
                  id="remarks" 
                  placeholder="Enter any additional remarks"
                  value={formData.remarks}
                  onChange={e => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
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
          <Button type="submit">Submit Quality Control Report</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductionQualityCheck;
