
import { QualityControlData, DefectSeverity, InspectionResult } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InspectionDetailsProps {
  formData: QualityControlData;
  setFormData: React.Dispatch<React.SetStateAction<QualityControlData>>;
}

const InspectionDetails = ({ formData, setFormData }: InspectionDetailsProps) => {
  return (
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
  );
};

export default InspectionDetails;
