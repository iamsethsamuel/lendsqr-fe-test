import { ReactNode } from "react";

type GridType = {
    container?: boolean;
    children: ReactNode;
    className?: string;
};

function Grid({ className: classes, container, children }: GridType) {
    const containerType = container ? "flex" : "flex-item";
    return <div className={containerType + classes}>{children}</div>;
}

export default Grid;
