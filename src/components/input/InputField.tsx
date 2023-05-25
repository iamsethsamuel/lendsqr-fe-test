import { ReactNode } from "react";
import "./input.scss";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    suffix?: ReactNode; // prop type to accept a React component
    validated?: boolean;
    suffixStyle?: React.CSSProperties;
}

function InputField(props: InputFieldProps) {
    return (
        <div className={props.className + " relative "} style={{ height: "3em" }}>
            <input
                placeholder={props.placeholder}
                className={`absolute ${props.validated !== null && props.validated === false ? "b-danger" : ""}`}
                style={{ top: 0, left: 0, zIndex: 0 }}
                {...props}
            />

            {props.suffix && (
                <div className="absolute suffix" style={{ ...props.suffixStyle }}>
                    {props.suffix}
                </div>
            )}
        </div>
    );
}

export default InputField;
