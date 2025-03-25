import Footer from "@/components/Footer/Footer";
import "./globals.scss";
import Head from "next/head";
import HeaderFullWidth from "@/components/Header/HeaderOriginal";

export const metadata = {
  title: "Rent a Car | Iznajmi Auto Srbija - iznajmi.me",
  description: "Pročitajte sve što Vas zanima o automobilima na jednom mestu",
  icons: '/favicon.svg'
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <HeaderFullWidth />
        <main>
          {children}
        </main>
        <Footer />
      </body>

    </html>
  );
}
