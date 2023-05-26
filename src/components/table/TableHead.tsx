import { ReactNode, useRef, useState } from "react";
import Button from "../button/Button";
import DropDown from "../dropdown/DropDown";
import { tableDropDown } from "../../utils/data";
import InputField from "../input/InputField";
import { useMediaQuery } from "../../utils/utils";

type TableHeadType = {
    children: ReactNode;
};
function TableHead({ children }: TableHeadType) {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery();

    return (
        <>
            <th className={`w-100 flex flex-start`} style={{width:isDesktop?"": "300px"}}>
                <Button ref={ref} variant="text" onClick={() => setOpen(!open)}>
                    {children}
                    {isDesktop && (
                        <span className="" style={{ marginLeft: "5px" }}>
                            <img src="icons/filter-results-button.png" width="16px" height="10.67px" alt="Filter" />
                        </span>
                    )}
                </Button>
            </th>
            <DropDown open={open} onClose={() => setOpen(false)} target={ref}>
                <div
                    className="flex flex-column pbl-1 pin-1 bg-white shadow-gray w-fit "
                    style={{ width: "200px", borderRadius: "5px" }}>
                    {tableDropDown.map((item) => (
                        <div key={item.name} className="">
                            <p style={{ paddingBottom: "5px" }}>{item.name}</p>

                            <InputField
                                placeholder={item.placeHolder}
                                className="mb-1"
                                style={{ width: "200px", height: "40px" }}
                                suffix={
                                    item.icon && (
                                        <Button variant="text">
                                            <img src={item.icon} />
                                        </Button>
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            </DropDown>
        </>
    );
}

export default TableHead;
