import type { Metadata } from "next";
import "./globals.css";
import UserInitializer from "@/components/user-initializer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chat trying two",
  description: "A simple chat app to master socket.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserInitializer />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
