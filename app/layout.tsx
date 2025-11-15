import type { Metadata } from "next";
import { Header } from "@/components/header";
import { CartProvider } from "@/providers/cart-provider";
import { Analytics } from "@vercel/analytics/next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our collection",
};

export default function DomainLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <NextTopLoader showSpinner={false} />
          <div className="min-h-screen bg-background">
            <Header />
            {children}
            <Analytics />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
