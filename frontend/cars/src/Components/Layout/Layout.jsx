import HeroHeader from "../HeroHeader/HeroHeader";
import Header from "../Header/Header";
import Footer from "../Footer";
export default function Layout({ header, children }) {

    return (<>
        <Header />
        <HeroHeader header={header} />
        <main>
            {children}
        </main>

        <Footer />
    </>
    )
}