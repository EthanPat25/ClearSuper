import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import NavBar from "../app/dashboard/NavBar";
import { Footer } from "./components/ui/Footer";
import StateProvider from "./components/StateProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// Used for calculator figures via globals.css `.font-numeric`.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-numeric",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "ClearSuper",
  description: "See how your super is invested",
  icons: {
    icon: "./favicon1.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${plusJakartaSans.variable}`}>
        <StateProvider>
          <main className="flex flex-col flex-grow w-full min-h-screen">
            <NavBar />
            <div className="flex-grow">{children}</div>
          </main>
          <Footer />
        </StateProvider>
        <Analytics />
      </body>
    </html>
  );
}
