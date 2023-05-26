import { AppContext } from "../../App";
import { menuItems } from "../../utils/data";
import Button from "../button/Button";
import { forwardRef, useContext } from "react";

const Drawer = forwardRef<HTMLDivElement>((_props, ref) => {
    const { logout } = useContext(AppContext);
    return (
        <div ref={ref} className="fixed t-0 l-0 bg-white vp-h w-fit scroll-y row flex w-fit">
            <div className="flex-1 relative">
                <img className="pt-3 pl-2" src="img/logo.png" alt="logo" />
                <div className="mt-5">
                    <Button variant="text" className="flex center space-between min-2 ">
                        <img src="icons/briefcase 1.png" alt="arrow-right" />
                        <span className="pin-1 primary-color"> Switch Organization</span>
                        <img src="icons/arrow_down.png" alt="arrow-right" />
                    </Button>
                    <Button variant="text" className="flex center space-between mt-2 min-2">
                        <img src="icons/home 1.png" alt="arrow-right" />
                        <span className="pin-1 terriary-color"> Dashboard</span>
                    </Button>

                    {menuItems.map((item) => (
                        <div key={item.title}>
                            <p
                                className="primary-color mt-2 min-2"
                                style={{ fontSize: "12px", fontFamily: "Work Sans" }}>
                                {item.title}
                            </p>
                            {item.children.map((child) => (
                                <Button
                                    key={child.title}
                                    variant="text"
                                    className={`flex pl-2 p-1 mt-1 nav-item ${
                                        child.path === document.location.pathname ? "nav-active" : ""
                                    } ${child.path ? "" : "w-100"}`}
                                    to={child.path}>
                                    <img height="100%" src={child.icon} alt={child.title} />
                                    <span className="pin-1 terriary-color"> {child.title}</span>
                                </Button>
                            ))}
                        </div>
                    ))}
                    <div className="divider mbl-2" />

                    <Button variant="text" className="mb-1 min-2 flex center" onClick={logout}>
                        <img height="" src="icons/sign-out 1.png" alt="logout" />
                        <span className="pin-1 terriary-color"> Logout</span>
                    </Button>
                    <p className="min-2 mb-1 mt-1">v1.2.0</p>
                </div>
            </div>
        </div>
    );
});

export default Drawer;
