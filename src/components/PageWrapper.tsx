import { ReactNode } from "react";
import { useMediaQuery } from "../utils/utils";

function PageWrapper({ children }: { children: ReactNode }) {
    const isDesktop = useMediaQuery();

    return (
        <div className={`${isDesktop ? "ml-12 mt-8" : "mt-4"} f-work-sans`}>
            <div className={`${isDesktop ? "ml-10 mt-5" : "mt-5"}`}>{children}</div>
        </div>
    );
}

export default PageWrapper;
