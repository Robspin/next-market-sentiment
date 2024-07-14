import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Market Mood",
  description: 'Current sentiment, "At-A-Glance"'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={montserrat.className}>
        <link rel="icon" href="/m-favicon.ico" sizes="any"/>
        {children}
      </body>
      </html>
  );
}
