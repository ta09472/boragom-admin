import Providers from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";

import { Layout } from "antd";
import { Header } from "@/components/Layout";
import StyledComponentsRegistry from "@/app/libs/AntdRegistry";

export const metadata: Metadata = {
  title: "Boragom",
  description: "boragom admin",
  icons: {
    icon: "/boraom.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <link rel="icon" href="/boragom.ico" />
      <body className="min-h-screen antialiased">
        <Providers>
          <Layout style={{ height: "100svh" }}>
            <Layout className="">
              <Header />
              <StyledComponentsRegistry>
                <div>{children}</div>
              </StyledComponentsRegistry>
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
