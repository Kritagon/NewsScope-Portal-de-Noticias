import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import Explore from "@/pages/explore/page";
import Trends from "@/pages/trends/page";
import Compare from "@/pages/compare/page";
import Sources from "@/pages/sources/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/explorar",
    element: <Explore />,
  },
  {
    path: "/tendencias",
    element: <Trends />,
  },
  {
    path: "/comparador",
    element: <Compare />,
  },
  {
    path: "/fuentes",
    element: <Sources />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;