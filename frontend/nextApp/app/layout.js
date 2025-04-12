import Footer from "@/components/Footer/Footer";
import "./globals.scss";
import HeaderFullWidth from "@/components/Header/HeaderOriginal";
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: "Rent a Car | Iznajmi Auto Srbija - iznajmi.me",
  description: "Pročitajte sve što Vas zanima o automobilima na jednom mestu",
  icons: {
    icon: "/favicon.svg",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Dodaj potrebne težine
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className={montserrat.className}>
        <HeaderFullWidth />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
