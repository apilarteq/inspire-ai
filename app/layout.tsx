import type { Metadata } from "next";
import { Geist, Geist_Mono, Mulish } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
import Header from "components/header";
import MessageBox from "components/message-box";
import Sidebar from "components/sidebar";
import { loadGroupedChats, verifySession } from "utils/actions";

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
          <Toaster />
          <main className="h-screen w-full bg-sidebar text-black">
            <div className="flex h-full w-full">
              <Sidebar
                groupedChats={groupedChats ?? []}
                isAuthenticated={verify}
              />
              <section
                data-testid="content"
                className="bg-primary transition-all duration-500 ease-in-out flex-1 relative flex flex-col h-full overflow-y-auto"
              >
                <Header isAuthenticated={verify} />
                <div className="px-5 flex-1 flex flex-col">{children}</div>
                <MessageBox />
              </section>
            </div>
          </main>
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
