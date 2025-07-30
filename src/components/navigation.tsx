import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/auth";
import { useSetTheme, useTheme } from "@/store/theme";
import { Link, useNavigate } from "@tanstack/react-router";

import { LogOut } from "lucide-react";

export function NavigationComponent() {
  const logOut = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const theme = useTheme();
  const setTheme = useSetTheme();

  const handleLogOut = () => {
    logOut();
    navigate({ to: "/login" });
  };

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
        <div className="flex items-center space-x-2">
          <span className="text-xs">🌞</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked:boolean) => {
              setTheme(checked ? "dark" : "light");
            }}
          />
          <span className="text-xs">🌙</span>

          <Button
            className="flex items-center  px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            variant="ghost"
            onClick={() => handleLogOut()}
          >
            <LogOut />
            <span className="ms-2">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
