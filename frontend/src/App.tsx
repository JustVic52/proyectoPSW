import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ProjectsList from "./components/ProjectsList";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import Eventos from "./pages/Eventos";
import EventoDetalle from "./pages/EventoDetalle";
import CategoriaDetalle from "./pages/CategoriaDetalle";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/eventos" replace />,
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
      {
        path: "/eventos/:eventId/categorias/:categoryId",
        element: <CategoriaDetalle />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
