import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Create a client
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          queryClient,
        }}
      />
    </QueryClientProvider>
  );
}

export default App
