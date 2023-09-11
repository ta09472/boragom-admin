import Providers from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";

import { Layout } from "antd";
import { Header, Footer } from "@/components/Layout";
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
          <Layout className="h-screen overflow-hidden" hasSider>
            <Layout className=" overflow-hidden">
              <Header />
              <StyledComponentsRegistry>
                <div className="mb-[4rem]">{children}</div>
              </StyledComponentsRegistry>
              <Footer />
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
