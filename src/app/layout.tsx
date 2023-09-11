import Providers from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";

import { Layout } from "antd";
import { Header } from "@/components/Layout";
import StyledComponentsRegistry from "@/app/libs/AntdRegistry";
import Head from "next/head";

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
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
      </Head>
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
