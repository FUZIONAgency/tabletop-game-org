import Auth from "@/pages/Auth";
import AcceptInvite from "@/pages/AcceptInvite";

export const authRoutes = [
  { path: "/auth", element: <Auth /> },
  { path: "/accept-invite", element: <AcceptInvite /> },
];