import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import GeminiPage from "@/pages/gemini";
import HelloPage from "@/pages/hello";
import Sidebar from "@/components/layout/Sidebar";

function Router() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-6 lg:p-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/api/gemini" component={GeminiPage} />
          <Route path="/api/hello" component={HelloPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;