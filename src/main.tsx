import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/auth/Login.tsx";
import TodoList from "./pages/todolist/TodoList.tsx";
import { AuthProvider } from "./pages/auth/AuthGuard.tsx";
import { queryClient } from "./shared/quertClient.ts";
import { RequireAuth } from "./shared/RequiredAuth.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/todolist" element={<RequireAuth><TodoList /></RequireAuth>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
