import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./(routes)/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stepful Coach",
  description: "Work with a coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          <h1>Stepful Coaching</h1>
          {children}
        </main>
      </body>
    </html>
  );
}

