
import { QualityControlData, RecommendedAction } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinalAssessmentProps {
  formData: QualityControlData;
  setFormData: React.Dispatch<React.SetStateAction<QualityControlData>>;
}

const FinalAssessment = ({ formData, setFormData }: FinalAssessmentProps) => {
  return (
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
  );
};

export default FinalAssessment;
