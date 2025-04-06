import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
import Header from "components/header";
import MessageBox from "components/message-box";
import SidebarServer from "components/sidebar";
import { loadChats, verifySession } from "utils/actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  const chats = await loadChats();
  const verify = await verifySession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster />
          <main className="h-screen w-full bg-sidebar overflow-hidden text-black">
            <div className="flex h-full w-full">
              <SidebarServer chats={chats ?? []} isAuthenticated={verify} />
              <section
                data-testid="content"
                className="bg-primary transition-all duration-500 ease-in-out flex-1 relative overflow-y-auto flex flex-col"
              >
                <Header isAuthenticated={verify} />
                <div className="flex-1 overflow-y-auto px-5">{children}</div>
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
