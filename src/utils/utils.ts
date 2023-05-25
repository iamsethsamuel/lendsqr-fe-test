import { useEffect, useState } from "react";

export const useMediaQuery = (query?: string) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // const query = `(min-width: ${minWidth || 1200}px)`;
        const media = window.matchMedia(query || "(min-width: 1200px)");

        media.addEventListener("change", () => {
            setIsDesktop(media.matches);
        });

        return () => {
            media.removeEventListener("change", () => {
                setIsDesktop(media.matches);
            });
        };
    }, [query]);

    return isDesktop;
};
