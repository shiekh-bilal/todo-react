import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TodoList from './components/TodoList';
import {Loading}  from './components/Loading';
import { Error } from './components/Error';
import { MainLayout } from './components/Layouts/MainLayout';
import './App.css'
import { ErrorBoundary } from 'react-error-boundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <TodoList />,
        errorElement: <Error />
      },
      {
        path: "/loading",
        element: <Loading />,
        errorElement: <Error />
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary FallbackComponent={Error}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ErrorBoundary>
        </Suspense>
    </QueryClientProvider>
  );
}

export default App;