import type { AuthenticationState } from '@/store/auth';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';


type RouterContext = {
    AuthenticationState: AuthenticationState;
    queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
