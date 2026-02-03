
import type { Metadata } from "next";
import StoreProvider from "@/shared/providers/store-provider";
import ThemeProvider from "@/shared/providers/theme-provider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "EduQuest | Premier Test Series",
  description: "Advanced exam preparation platform",
  icons: {
    icon: "/app-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
