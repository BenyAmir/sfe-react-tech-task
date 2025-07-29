import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import {
  Link,
  useNavigate
} from "@tanstack/react-router";

import { LogOut } from "lucide-react";

export function NavigationComponent() {
  const logOut = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  const handleLogOut = () =>{
    logOut();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate({ to: "/login" });
  }

  return (
    <div className="flex flex-col flex-1 p-4 space-y-6">
      <div className="grow">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          General
        </h3>
        <nav className="space-y-1">
          {[{ name: "User management", icon: "👥", active: true }].map(
            (item) => (
              <Link
                to="/users"
                key={item.name}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            )
          )}
        </nav>
      </div>

      <div className="pt-3 border-t border-gray-200">
            <div className="space-y-1">
                <Button
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  variant="ghost"
                  onClick={()=>handleLogOut()}
                >
                  <LogOut/>
                  <span className="ms-2">Logout</span>
                </Button>
            </div>
          </div>
    </div>
  );
}
