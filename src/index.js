import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import App from './App';
import PostAJob from './pages/PostAJob'
import JobDetailsPage from './pages/JobDetailsPage';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/postajob",element:<PostAJob/>},
  {path: "/detial/:detailId", element: <JobDetailsPage/>}
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
