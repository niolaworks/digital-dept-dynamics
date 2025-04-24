
import { Menu, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toggle } = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggle} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Package className="h-6 w-6 text-manufacturing-600" />
          <span className="font-semibold text-lg">Digital Dept Dynamics</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
