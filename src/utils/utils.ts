import { useEffect, useState } from "react";

export const useIsDesktop = (minWidth?: string) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const query = `(min-width: ${minWidth || 1200}px)`;
        const media = window.matchMedia(query);

        media.addEventListener("change", () => {
            setIsDesktop(media.matches);
        });

        return () => {
            media.removeEventListener("change", () => {
                setIsDesktop(media.matches);
            });
        };
    }, [minWidth]);

    return isDesktop;
};
