
import { QualityControlData } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BasicInformationProps {
  formData: QualityControlData;
  setFormData: React.Dispatch<React.SetStateAction<QualityControlData>>;
}

const BasicInformation = ({ formData, setFormData }: BasicInformationProps) => {
  return (
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
  );
};

export default BasicInformation;
