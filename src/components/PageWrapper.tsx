import { ReactNode } from "react";
import { useMediaQuery } from "../utils/utils";

function PageWrapper({ children }: { children: ReactNode }) {
    const isDesktop = useMediaQuery();

    return (
        <div className={`${isDesktop ? "ml-12 mt-10" : "mt-4"} `}>
            {children}
        </div>
    );
}

export default PageWrapper;
