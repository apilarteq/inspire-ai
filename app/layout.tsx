import type { Metadata } from "next";
import { Geist, Geist_Mono, Mulish } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
import Header from "components/header";
import MessageBox from "components/message-box";
import Sidebar from "components/sidebar";
import { loadGroupedChats, verifySession } from "utils/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inspire AI",
  description: "AI Chat Application",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const groupedChats = await loadGroupedChats();
  const verify = await verifySession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mulish.className} antialiased`}
      >
        <Providers>
          <Toaster position="top-center" />
          <main className="bg-sidebar text-black">
            <Header isAuthenticated={verify} />
            <section
              data-testid="content"
              className="bg-primary transition-all duration-500 ease-in-out flex-1 relative flex h-[calc(100vh-65px)] w-full"
            >
              <Sidebar
                groupedChats={groupedChats ?? []}
                isAuthenticated={verify}
              />
              <div className="relative overflow-hidden w-full">
                {children}
                <MessageBox />
              </div>
            </section>
          </main>
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
