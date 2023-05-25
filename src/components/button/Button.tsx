import { Link } from "react-router-dom";
import "./button.scss";

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    variant: "contained" | "text" | "outlined";
    to?: string;
}

function Button(props: ButtonType) {
    if (props.to) {
     return <Link to={props.to} {...props} className={`btn-${props.variant} relative ${props.className}`}>
            {props.children}
        </Link>;
    }
    return (
        <button {...props} className={`btn-${props.variant} relative ${props.className}`}>
            {props.children}
        </button>
    );
}

export default Button;
