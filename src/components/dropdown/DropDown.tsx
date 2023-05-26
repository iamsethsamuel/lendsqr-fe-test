import { useEffect, useRef, useState } from "react";

type DropDownType = {
    target: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
};

function DropDown(props: DropDownType) {
    const [pos, setPos] = useState({ top: "0", left: "0" });
    const [open, setOpen] = useState(props.open || false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOpen(props.open);

    }, [props.open]);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                props.onClose();
            }
        }

        if (open) {
            calculatePosition();
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [open, props.target, calculatePosition, props]);

    if (!open) {
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function calculatePosition() {
        if (props.target.current && dropdownRef.current) {
            const targetRect = props.target.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            let top = `${targetRect.bottom}px`;
            let left = `${targetRect.left}px`;

            // Check if dropdown overflows horizontally
            if (dropdownRect.right > window.innerWidth) {
                left = `${targetRect.right - dropdownRect.width}px`;
            }

            // Check if dropdown overflows vertically
            if (dropdownRect.bottom > window.innerHeight) {
                top = `${targetRect.top - dropdownRect.height}px`;
            }

            setPos({ top, left });
        }
    }

    return (
        <div
            ref={dropdownRef}
            className="fixed w-fit h-fit flex flex-column flex-center center bg-white"
            style={{ top: pos.top, left: pos.left }}>
            {props.children}
        </div>
    );
}

export default DropDown;
