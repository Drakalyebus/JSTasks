import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import './index.css';

import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Colors from './pages/Colors/Colors.jsx';
import Test from './pages/Test/Test.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/colors" />
            },
            {
                path: '/colors',
                element: <Colors />
            },
            {
                path: '/test',
                element: <Test />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);