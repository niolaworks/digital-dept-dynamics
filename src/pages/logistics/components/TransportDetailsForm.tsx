
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
              value={formData.transportDetails.transporter}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, transporter: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleRegNumber">Vehicle Register Number</Label>
            <Input 
              id="vehicleRegNumber"
              value={formData.transportDetails.vehicleRegNumber}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, vehicleRegNumber: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Input 
              id="vehicleType"
              value={formData.transportDetails.vehicleType}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, vehicleType: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleCapacity">Vehicle Capacity</Label>
            <Input 
              id="vehicleCapacity"
              value={formData.transportDetails.vehicleCapacity}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, vehicleCapacity: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driverName">Driver Name</Label>
            <Input 
              id="driverName"
              value={formData.transportDetails.driverName}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, driverName: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickedBy">Picked By</Label>
            <Input 
              id="pickedBy"
              value={formData.transportDetails.pickedBy}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, pickedBy: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkedBy">Checked By</Label>
            <Input 
              id="checkedBy"
              value={formData.transportDetails.checkedBy}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, checkedBy: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea 
              id="comments"
              value={formData.transportDetails.comments}
              onChange={e => setFormData({
                ...formData,
                transportDetails: { ...formData.transportDetails, comments: e.target.value }
              })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
