import Footer from "@/components/Footer/Footer";
import "./globals.scss";
import Header from "@/components/Header/Header";
import Head from "next/head";

export const metadata = {
  title: "Iznajmi me Blog",
  description: "Pročitajte sve što Vas zanima o automobilima na jednom mestu",
  icons: '/blog/favicon.svg'
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>

    </html>
  );
}
