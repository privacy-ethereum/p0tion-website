import type { Metadata } from "next";
import "./../globals.css";
import { Poppins, Roboto_Mono } from "next/font/google";
import { QueryClientProviderLayout } from "../components/layouts/QueryClientProviderLayout";
import { Footer } from "../components/shared/Footer";
import { Header } from "../components/shared/Header";
import { StateProvider } from "../context/StateContext";

export const metadata: Metadata = {
  title: "P0tion",
  description: "Toolkit for Groth16 Phase 2 Trusted Setup ceremonies.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    images: "/og-image.png",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${poppins.variable} ${robotoMono.variable} min-h-screen bg-background antialiased flex flex-col`}
      >
        <QueryClientProviderLayout>
          <StateProvider>
            <Header />
            <main className="flex-1 relative overflow-auto">{children}</main>
            <Footer />
          </StateProvider>
        </QueryClientProviderLayout>
      </body>
    </html>
  );
}
