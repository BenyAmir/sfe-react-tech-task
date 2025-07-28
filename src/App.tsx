import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "@/store/auth";

// Create a client
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    AuthenticationState: { isAuthenticated: false }, // Default value, will be overridden
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const token = useAuthStore((state) => state.token);
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          queryClient,
          AuthenticationState: { isAuthenticated: !!token },
        }}
      />
    </QueryClientProvider>
  );
}

export default App
