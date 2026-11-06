import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Layout from "../components/feature/Layout";
import Home from "../pages/home/page";
import About from "../pages/about/page";
import Services from "../pages/services/page";
import Projects from "../pages/projects/page";
import ProjectDetailPage from "../pages/projects/detail/page";
import Contact from "../pages/contact/page";
import ServiceDetailPage from "../pages/services/detail/page";

// Public pages stay eager so prerendered HTML hydrates in one pass; admin code loads on demand.
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const ProtectedRoute = lazy(() => import("../pages/admin/ProtectedRoute"));
const AdminLayout = lazy(() => import("../pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminServices = lazy(() => import("../pages/admin/AdminServices"));
const AdminServiceForm = lazy(() =>
  import("../pages/admin/AdminServices").then((m) => ({ default: m.AdminServiceForm })),
);
const AdminMessages = lazy(() => import("../pages/admin/AdminMessages"));
const AdminProjects = lazy(() => import("../pages/admin/AdminProjects"));
const AdminProjectForm = lazy(() => import("../pages/admin/AdminProjectForm"));

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/:slug",
        element: <ServiceDetailPage />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:slug",
        element: <ProjectDetailPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Suspense fallback={null}><AdminLogin /></Suspense>,
  },
  {
    element: <Suspense fallback={null}><ProtectedRoute /></Suspense>,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/services",
            element: <AdminServices />,
          },
          {
            path: "/admin/services/new",
            element: <AdminServiceForm />,
          },
          {
            path: "/admin/services/:id",
            element: <AdminServiceForm />,
          },
          {
            path: "/admin/projects",
            element: <AdminProjects />,
          },
          {
            path: "/admin/projects/new",
            element: <AdminProjectForm />,
          },
          {
            path: "/admin/projects/:id",
            element: <AdminProjectForm />,
          },
          {
            path: "/admin/messages",
            element: <AdminMessages />,
          },
        ],
      },
    ],
  },
];

export default routes;