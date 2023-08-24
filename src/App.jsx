import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/HomePage/Home.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import Write from "./pages/WritePage/Write.jsx";
import EditPage from "./pages/WritePage/EditPage.jsx";
import * as filestack from "filestack-js"
import Cookies from 'js-cookie'

import "./App.scss";

const client = filestack.init(process.env.REACT_APP_KEY, {
  security: {
    policy: process.env.REACT_APP_POLICY,
    signature: process.env.REACT_APP_SIGNATURE,
  },
});

const Layout = () => {
  
  return (
    <>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/new",
        element: <Write client={client}/>,
      },
      {
        path: "/post/:id",
        element: <PostPage client={client}/>,
      },
      {
        path: "/post/update/:id",
        element: <EditPage client={client}/>,
      },
    ],
  },
]);

function App() {
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
