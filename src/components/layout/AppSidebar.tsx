
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/lib/utils";
import { ChevronDown, FileText, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Department = {
  name: string;
  path: string;
  icon: React.ElementType;
  forms: {
    name: string;
    path: string;
  }[];
};

const departments: Department[] = [
  {
    name: "Logistics",
    path: "/logistics",
    icon: Truck,
    forms: [
      { name: "Picking List", path: "/logistics/picking-list" },
      { name: "View Picking Lists", path: "/logistics/picking-lists" },
      { name: "Dispatch Note", path: "/logistics/dispatch-note" },
    ],
  },
  {
    name: "Production",
    path: "/production",
    icon: Package,
    forms: [
      { name: "Job Card", path: "/production/job-card" },
      { name: "Quality Check", path: "/production/quality-check" },
    ],
  },
];

const AppSidebar = () => {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    Logistics: true,
    Production: true,
  });

  const toggleDepartmentExpansion = (deptName: string) => {
    setExpandedDepts(prev => ({
      ...prev,
      [deptName]: !prev[deptName]
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn(
      "border-r bg-white w-64 min-h-[calc(100vh-65px)] p-4 transition-all duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "fixed md:static z-10 max-md:shadow-lg"
    )}>
      <div className="flex flex-col gap-2">
        <Link to="/" className={cn(
          "flex items-center gap-2 p-2 rounded-md",
          location.pathname === "/" ? "bg-manufacturing-100 text-manufacturing-700" : "hover:bg-gray-100"
        )}>
          <FileText className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        
        <div className="mt-4 mb-2 px-2 text-sm font-semibold text-gray-500 uppercase">
          Departments
        </div>

        {departments.map((dept) => (
          <div key={dept.path} className="mb-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-md",
                location.pathname === dept.path ? "bg-manufacturing-100 text-manufacturing-700" : "hover:bg-gray-100"
              )}
              onClick={() => toggleDepartmentExpansion(dept.name)}
            >
              <div className="flex items-center gap-2">
                <dept.icon className="h-5 w-5" />
                <span>{dept.name}</span>
              </div>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform",
                  expandedDepts[dept.name] ? "transform rotate-180" : ""
                )} 
              />
            </Button>
            
            {expandedDepts[dept.name] && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                {dept.forms.map((form) => (
                  <Link
                    key={form.path}
                    to={form.path}
                    className={cn(
                      "p-2 rounded-md text-sm",
                      location.pathname === form.path ? "bg-manufacturing-50 text-manufacturing-600" : "hover:bg-gray-50"
                    )}
                  >
                    {form.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSidebar;
