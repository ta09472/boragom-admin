import { ConfigProvider } from "antd";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

// 'text': '#07020d',
// 'background': '#eee5fa',
// 'primary': '#7f40dd',
// 'secondary': '#d9c7f5',
// 'accent': '#6724cc',

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token

          colorPrimary: "#7f40dd",
          colorFillSecondary: "#d9c7f5",
          colorText: "#07020d",
          // colorBgContainer: "#eee5fa",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default Providers;
