import UnautenticatedNavBar from "@/components/Navbar/unauthenticatedNavbar";
import type { Metadata } from "next";




export const metadata: Metadata = {
  title: "HouseCommerce",
  description: "HouseCommerce",
};

export default function RootLayoutUnauthenticated({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <UnautenticatedNavBar />
        {children}
      </body>
    </html>
  );
}
