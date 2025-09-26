import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "@/FrontendLogic/components/NavBar";
import Footer from "@/FrontendLogic/components/Footer";
import SessionContainer from "@/FrontendLogic/Providers/SessionContainer";
import AuthContextProvider from "@/FrontendLogic/Providers/AuthContextProvider";
import ReduxProvider from "@/FrontendLogic/Providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Next App",
  description: "Its a blog application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        <SessionContainer>
          <AuthContextProvider>
          <ReduxProvider>
            <NavBar/>
              {children}
            <Footer/>
            </ReduxProvider>
          </AuthContextProvider>
        </SessionContainer>
      </body>
    </html>
  );
}
