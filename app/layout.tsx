import "./globals.css";
import NextAuthProvider from "./providers";
import Header from "@/components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  children: React.ReactNode;
}



export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Header />
          <div className="pt-10 px-3 min-h-[calc(100vh-300px)]">{children}</div>
          <ToastContainer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
