import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {
  ClerkProvider
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import NavBar from "@/components/layout/navBar/navBar";
import { Container } from "@/components/shared/container";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Management System",
  description: "Manage, book, and discover premium hotels worldwide with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col min-h-screen bg-secondary">
              <NavBar />
              <section className="grow">
                <Container>{children}</Container>
              </section>
            </main>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
