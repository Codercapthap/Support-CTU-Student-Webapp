import React from "react";

import Home from "../Views/Home";
import Contact from "../Views/Contact";
import Setting from "../Views/Setting";
import Forum from "../Views/Forum";
import Schedule from "../Views/Schedule";
import Auth from "../Components/Auth/Auth";
import Error from "../Views/Error";
// component
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "/contact",
    element: <Contact />,
    children: [],
  },
  {
    path: "/forum",
    element: <Forum />,
    children: [],
  },
  {
    path: "/setting",
    element: <Setting />,
    children: [],
  },
  {
    path: "/schedule",
    element: <Schedule />,
    children: [],
  },
  {
    path: "/auth/profile",
    element: <Auth />,
    children: [],
  },
  {
    path: "/auth/login",
    element: <Login />,
    children: [],
  },
  {
    path: "/auth/register",
    element: <Register />,
    children: [],
  },
  {
    path: "*",
    element: <Error />,
    children: [
      // { path: '404', element: <NotFoundView /> },
      // { path: '*', element: <NotFoundView /> }
    ],
  },
];

export default routes;
