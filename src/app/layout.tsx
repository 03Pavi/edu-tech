import type { Metadata } from "next";
import StoreProvider from "@/shared/providers/store-provider";
import ThemeProvider from "@/shared/providers/theme-provider";
import SessionSync from "@/shared/components/session-sync";
import { getSession } from "./actions";
import "./globals.scss";

export const metadata: Metadata = {
  title: "EduQuest | Premier Test Series",
  description: "Advanced exam preparation platform",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <SessionSync
            session={{
              isLoggedIn: session.isLoggedIn,
              name: session.name,
              role: session.role
            }} />
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
