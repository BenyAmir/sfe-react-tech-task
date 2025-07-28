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
    <div className="h-screen bg-sky-500">
      <Outlet />
    </div>
  );
}
