import Contact from "@/pages/footer/Contact";
import Terms from "@/pages/footer/Terms";
import PrivacyPolicy from "@/pages/footer/PrivacyPolicy";

export const footerRoutes = [
  { path: "/contact", element: <Contact /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
];