import {
  Link
} from "@tanstack/react-router";

export function NavigationComponent() {
  return (
    <div className="flex-1 p-4 space-y-6">
      <div>
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
    </div>
  );
}
