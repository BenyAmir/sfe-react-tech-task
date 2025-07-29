import { NavigationComponent } from '@/components/navigation';
import { useAuthStore } from '@/store/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  beforeLoad: () => {
    const isAuthenticated = !!useAuthStore.getState().token
    if (!isAuthenticated) {
      throw redirect({to: '/login'});
    }
  }
});

function LayoutComponent() {
  const userName = useAuthStore((state) => state.name);
  return (
    <div className="flex min-h-screen bg-gray-50">
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
        <NavigationComponent/>
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
                <span className="text-sm font-medium text-gray-900">{userName}</span>
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
