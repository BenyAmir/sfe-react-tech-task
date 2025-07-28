import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
// TODO: Implement route protection here (redirect to /login if not authenticated)
// You can use Zustand store (src/store/auth.ts) for auth state
export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  beforeLoad: ({ context }) => {
    const {isAuthenticated} = context.AuthenticationState
    if (!isAuthenticated) {
      throw redirect({to: '/login'});
    }
  }
});

function LayoutComponent() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-58 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Admin Panel</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-6">
          {/* General Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">General</h3>
            <nav className="space-y-1">
              {[
                { name: 'User management', icon: '👥', active: true },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Admin Panel</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">User management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">AD</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Admin</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            

            {/* Content Area */}
            <div className="bg-white rounded-lg border border-gray-200">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
