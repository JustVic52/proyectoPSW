import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ProjectsList from "./components/ProjectsList";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import Eventos from "./pages/Eventos";
import EventoDetalle from "./pages/EventoDetalle";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProjectsList />,
      },
      {
        path: "/rankings",
        element: <Rankings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/eventos",
        element: <Eventos />,
      },
      {
        path: "/eventos/:id",
        element: <EventoDetalle />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
