
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PickingListData } from "../types";

interface TransportDetailsFormProps {
  formData: PickingListData;
  setFormData: (data: PickingListData) => void;
}

export const TransportDetailsForm = ({ formData, setFormData }: TransportDetailsFormProps) => {
  // Ensure transportDetails exists to prevent the error
  const transportDetails = formData.transportDetails || {
    transporter: '',
    vehicleRegNumber: '',
    vehicleType: '',
    vehicleCapacity: '',
    driverName: '',
    driverSignature: '',
    datePicked: '',
    pickedBy: '',
    checkedBy: '',
    comments: ''
  };

  const handleTransportDetailsChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      transportDetails: {
        ...transportDetails,
        [field]: value
      }
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Transport Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="transporter">Transporter</Label>
            <Input 
              id="transporter"
              value={transportDetails.transporter}
              onChange={e => handleTransportDetailsChange('transporter', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleRegNumber">Vehicle Register Number</Label>
            <Input 
              id="vehicleRegNumber"
              value={transportDetails.vehicleRegNumber}
              onChange={e => handleTransportDetailsChange('vehicleRegNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Input 
              id="vehicleType"
              value={transportDetails.vehicleType}
              onChange={e => handleTransportDetailsChange('vehicleType', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleCapacity">Vehicle Capacity</Label>
            <Input 
              id="vehicleCapacity"
              value={transportDetails.vehicleCapacity}
              onChange={e => handleTransportDetailsChange('vehicleCapacity', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driverName">Driver Name</Label>
            <Input 
              id="driverName"
              value={transportDetails.driverName}
              onChange={e => handleTransportDetailsChange('driverName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickedBy">Picked By</Label>
            <Input 
              id="pickedBy"
              value={transportDetails.pickedBy}
              onChange={e => handleTransportDetailsChange('pickedBy', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkedBy">Checked By</Label>
            <Input 
              id="checkedBy"
              value={transportDetails.checkedBy}
              onChange={e => handleTransportDetailsChange('checkedBy', e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea 
              id="comments"
              value={transportDetails.comments}
              onChange={e => handleTransportDetailsChange('comments', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
