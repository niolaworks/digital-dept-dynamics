
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { QualityControlData } from "./types";
import BasicInformation from "./components/BasicInformation";
import InspectionDetails from "./components/InspectionDetails";
import FinalAssessment from "./components/FinalAssessment";

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
        <BasicInformation formData={formData} setFormData={setFormData} />
        <InspectionDetails formData={formData} setFormData={setFormData} />
        <FinalAssessment formData={formData} setFormData={setFormData} />

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
