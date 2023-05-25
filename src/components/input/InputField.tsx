import { ReactNode } from "react";
import "./input.scss";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    suffix?: ReactNode; // prop type to accept a React component
    validated?: boolean;
}

function InputField(props: InputFieldProps) {
    return (
        <div className={props.className + " relative"} style={{ height: "3em" }}>
            <input
                {...props}
                placeholder={props.placeholder}
                className={`absolute ${props.validated !== null && props.validated === false ? "b-danger" : ""}`}
                style={{ top: 0, left: 0, zIndex: 0 }}
            />
            <div className="absolute suffix">{props.suffix}</div>
        </div>
    );
}

export default InputField;
