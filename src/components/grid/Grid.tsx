import { ReactNode } from "react";

interface GridType extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    children: ReactNode;
    className?: string;
}

function Grid(props: GridType) {
    const containerType = props.container === true ? "flex " : "flex-item ";
    return (
        <div {...props} className={containerType.toString() + props.className}>
            {props.children}
        </div>
    );
}

export default Grid;
