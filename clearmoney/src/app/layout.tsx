import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../app/financeOverview/NavBar";
import { Footer } from "./components/ui/Footer";
import StateProvider from "./components/StateProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ClearSuper",
  description: "See how your super is invested",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
          <main className="flex flex-col flex-grow w-screen min-h-screen">
            <NavBar />
            <div className="flex-grow pt-16">{children}</div>
          </main>
          <Footer />
        </StateProvider>
      </body>
    </html>
  );
}
