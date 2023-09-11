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
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />

      <body>
        <Providers>
          <Layout>
            <Layout className="">
              <Header />
              <StyledComponentsRegistry>
                <>{children}</>
              </StyledComponentsRegistry>
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
