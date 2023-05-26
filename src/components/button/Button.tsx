import React from "react";
import { Link, LinkProps } from "react-router-dom";
import "./button.scss";

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "contained" | "text" | "outlined";
    to?: string;
    forwardedRef?: React.Ref<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonType>((props, ref) => {
    const { variant, to, className, children, forwardedRef, ...rest } = props;

    if (to) {
        return (
            <CustomLink
                to={to}
                //@ts-ignore
                forwardedRef={forwardedRef}
                className={`btn-${variant} relative ${className}`}
                {...rest}
                >
                {children}
            </CustomLink>
        );
    }

    return (
        <button {...rest} ref={ref || forwardedRef} className={`btn-${variant} relative ${className}`}>
            {children}
        </button>
    );
});

interface CustomLinkProps extends LinkProps {
    forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>((props, ref) => <Link {...props} ref={ref} />);

export default Button;
