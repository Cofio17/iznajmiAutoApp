import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const prevPathnameRef = useRef();

    useEffect(() => {
        // Store the current pathname before updating it
        const currentPath = pathname;

        // Check if coming from a car detail page
        const isFromCarPage = prevPathnameRef.current?.startsWith('/rent-a-car/car');

        // Check if going to rent-a-car page
        const isToRentACar = currentPath === '/rent-a-car';

        console.log(`pathname: ${pathname}`);
        console.log(`prevPath: ${prevPathnameRef.current}`);

        // Don't scroll if coming from a car page to rent-a-car page
        if (isFromCarPage && isToRentACar) {
            // Do nothing - prevent scroll
        } else {
            window.scrollTo(0, 0);
        }

        // Update the previous pathname ref after the effect
        prevPathnameRef.current = currentPath;

    }, [pathname]);

    return null;
};

export default ScrollToTop;