import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/HomePage/Home.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import Write from "./pages/WritePage/Write.jsx";
import EditPage from "./pages/WritePage/EditPage.jsx";

import "./App.scss";

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
        element: <Write />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/post/update/:id",
        element: <EditPage />,
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
