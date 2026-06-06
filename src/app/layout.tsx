import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Mali – Personal Wealth Platform",
  description: "Your personal wealth operating system for the Kenyan market.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "var(--mali-slate-50)",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
