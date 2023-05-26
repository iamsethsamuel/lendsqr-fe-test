import { useContext, useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import Drawer from "../drawer/Drawer";
import InputField from "../input/InputField";
import { AppContext } from "../../App";
import { useMediaQuery } from "../../utils/utils";
import DropDown from "../dropdown/DropDown";

function NavBar() {
    const context = useContext(AppContext);
    const isDesktop = useMediaQuery();
    const buttonRef = useRef(null);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLButtonElement>(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDrawer, setShowDrawer] = useState(isDesktop);

    useEffect(() => {
        setShowDrawer(isDesktop);
        if (!isDesktop) {
            document.addEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isDesktop]);

    function handleOutsideClick(event: MouseEvent) {
        //@ts-ignore
        if (String(event.target?.src).includes("menu")) {
            setShowDrawer(true);

            return;
        }
        if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setShowDrawer(false);
        }
    }

    return (
        <div
            className={` fixed t-0 ${
                isDesktop ? "l-10 pl-10" : "l-0 "
            }  h-fit flex space-between bg-white w-100 scroll-x pt-1  `} style={{zIndex: 1000}}>
            {showDrawer && <Drawer ref={dropDownRef} />}
            {!isDesktop && (
                <div className="h-fit">
                    {!showDrawer && (
                        <>
                            <Button ref={menuRef} variant="text" onClick={() => setShowDrawer(true)}>
                                <img height="20px" width="20px" className=" pl-2" src="icons/menu.png" alt="logo" />
                            </Button>
                            <Button variant="text" to="/">
                                <img height="20px" width="90px" className=" pl-1" src="img/logo.png" alt="logo" />
                            </Button>
                        </>
                    )}
                </div>
            )}
            {isDesktop && (
                <div className="w-15">
                    <InputField
                        placeholder="Search for anything"
                        style={{ height: "40px" }}
                        suffixStyle={{ top: "0px", right: "0px", height: "101%" }}
                        suffix={
                            <Button
                                variant="contained"
                                style={{ borderRadius: "0px 10px 10px 0px", paddingInline: "20px", height: "40px" }}>
                                <img src="icons/search.png" />
                            </Button>
                        }
                    />
                </div>
            )}
            {isDesktop && (
                <div className="w-40 row flex flex-start flex-center ">
                    <div className="pin-3">
                        <Button variant="text" className="primary-color" to="/docs">
                            Docs
                        </Button>
                    </div>
                    <div className="">
                        <img src="icons/bell.png" />
                    </div>
                    <div className="pl-1 flex center flex-center pb-1">
                        <img
                            width="38px"
                            height="40px"
                            className="rounded-full"
                            src={context.user?.profile.avatar}
                            alt={context.user?.userName}
                        />
                        <Button variant="text" to="/profile" className="pl-1 primary-color bold" style={{ fontSize: "14px" }}>
                            {context.user?.userName} &#9660;
                        </Button>
                    </div>
                </div>
            )}

            {!isDesktop && (
                <div>
                    <Button
                        variant="text"
                        ref={buttonRef}
                        onClick={() => {
                            setShowDropDown((prev) => !prev);
                        }}
                        className="pl-1 primary-color bold flex center flex-center r-1 pb-1"
                        style={{ fontSize: "14px" }}>
                        <img
                            width="25px"
                            className="rounded-full mr-1"
                            src={context.user?.profile.avatar}
                            alt={context.user?.userName}
                        />
                    </Button>
                    <DropDown
                        target={buttonRef}
                        open={showDropDown}
                        onClose={() => {
                            setShowDropDown(false);
                        }}>
                        <div className="pin-3">
                            <Button variant="text" className="primary-color" to="/docs">
                                Docs
                            </Button>
                        </div>
                        <div className="primary-color bold pt-1">Notification</div>
                        <Button variant="text" to="/profile" className="primary-color bold mt-1">Profile</Button>
                    </DropDown>
                </div>
            )}
        </div>
    );
}

export default NavBar;
