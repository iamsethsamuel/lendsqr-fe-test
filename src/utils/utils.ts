import { useEffect, useState } from "react";

export const useMediaQuery = (query?: string) => {
    const [isDesktop, setIsDesktop] = useState(!window.matchMedia("(max-width: 768px)").matches);

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
    }, []);

    return isDesktop;
};
