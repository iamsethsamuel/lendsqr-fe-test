import { useContext, useEffect, useRef, useState } from "react";
import { userStats } from "../utils/data";
import { useMediaQuery } from "../utils/utils";
import { AppContext } from "../App";
import Button from "../components/button/Button";
import TableHead from "../components/table/TableHead";

function UsersPage() {
    const isDesktop = useMediaQuery();
    const context = useContext(AppContext);
    const [pos, setPos] = useState({ start: 0, end: 10 });
    const [users, setUsers] = useState(context.users.slice(pos.start, pos.end));
    const usersLength = useRef(context.users.length);

    useEffect(() => {
        setUsers(context.users.slice(0, 10));
        usersLength.current = context.users.length;
        setUsers(context.users.slice(pos.start, pos.end));
    }, [context.users, pos]);

    const status = (amt: string) => {
        const amount = Number(amt);

        if (amount < 100) {
            return <div className="active br-10">Active</div>;
        }

        if (amount < 300) {
            return <div className="pending br-10">Pending</div>;
        }

        if (amount < 500) {
            return <div className="inactive br-10">Inactive</div>;
        }

        return <div className="blacklisted br-10">Blacklisted</div>;
    };

    return (
        <div className="f-work-sans">
            <p style={{ fontSize: "24px" }} className="primary-text bold">
                Users
            </p>
            <div className={`flex ${isDesktop ? "flex-row mt-4" : "flex-column"}  w-100`}>
                {userStats.map((stats) => (
                    <div
                        className={`${
                            isDesktop ? "mr-2" : "mt-1"
                        } flex flex-column flex-start center  bg-white p-2 pl-0 shadow-grey `}
                        key={stats.title}
                        style={{ width: isDesktop ? "18%" : "81%" }}>
                        <img width="40px" src={stats.icon} alt={stats.title} />
                        <p className="primary-text mt-1" style={{ color: "#545F7D" }}>
                            {stats.title}
                        </p>
                        <p className="primary-text mt-1 bolder">{stats.value}</p>
                    </div>
                ))}
            </div>
            <div className={`bg-white mt-5 pbl-2  ${isDesktop ? "mr-2" : "scroll-x w-100"}`}>
                <table className="table w-100 pin-2">
                    <tr className="flex row space-evenly w-100">
                        {["organization", "Username", "Email", "Phone number", "Date joined", "Status"].map((h) => (
                            <TableHead key={h}>{h.toUpperCase()}</TableHead>
                        ))}
                    </tr>
                    <tbody className="">
                        {users.map((user) => (
                            <>
                                <tr className="flex row space-evenly  w-100 pbl-1 ">
                                    <td className={`w-25 flex flex-start`}>{user.orgName}</td>
                                    <td className="w-25 flex flex-start">{user.userName}</td>
                                    <td className="w-25 flex flex-start">{user.email}</td>
                                    <td className="w-25 flex flex-start">{user.phoneNumber}</td>
                                    <td className="w-25 flex flex-start">{user.createdAt}</td>
                                    <td className="w-25 flex flex-start">{status(user.education.loanRepayment)}</td>

                                    <td>
                                        <Button variant="text">
                                            <img src="icons/ic-more-vert-18px.png" alt="more" />
                                        </Button>
                                    </td>
                                </tr>
                                <div className="divider"></div>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={`mbl-2 flex center  ${isDesktop ? "row space-between mr-2" : "flex-column flex-center"}`}>
                <div className="flex center flex-center ">
                    <span>Showing</span>
                    <Button variant="contained" className="min-1 btn-faded primary-color flex center flex-center">
                        <div>10</div> <div className="pl-1 h-10 bold">&#8964;</div>
                    </Button>
                    <span>out of {context.users.length}</span>
                </div>
                <div className={`${isDesktop ? "" : "mt-2"}`}>
                    {pos.start > 0 && (
                        <Button
                            variant="contained"
                            className="btn-faded primary-color bold ml-2"
                            onClick={() =>
                                setPos((prev) => {
                                    return {
                                        end: prev.start - 1,
                                        start: prev.start - 10 >= 0 ? prev.start - 10 : 0,
                                    };
                                })
                            }>
                            &#8249;
                        </Button>
                    )}
                    {[1, 2, 3].map((num) => (
                        <Button
                            variant="text"
                            key={num}
                            id={`page-${num}`}
                            className="primary-color"
                            onClick={() => {
                                setPos({ start: num * 10, end: num * 10 + 10 });
                            }}
                            style={{
                                paddingInline: "5px",
                                fontWeight: num === pos.start / 10 ? "bolder" : "normal",
                            }}>
                            {num}
                        </Button>
                    ))}
                    ...
                    {[8, 9, 10].map((num) => (
                        <Button
                            id={`next-${num}`}
                            variant="text"
                            className="primary-color"
                            onClick={() => {
                                setPos({
                                    start: num === 10 ? 90 : num * 10,
                                    end: num === 10 ? usersLength.current : num * 10 + 10,
                                });
                            }}
                            key={num}
                            style={{ paddingInline: "5px", fontWeight: num === pos.start / 10 ? "bolder" : "normal" }}>
                            {num}
                        </Button>
                    ))}
                    {pos.end < usersLength.current && (
                        <Button
                            id="next"
                            variant="contained"
                            className="btn-faded primary-color bold mr-2"
                            onClick={() =>
                                setPos((prev) => {
                                    const newStart = prev.start + 10;
                                    const newEnd = prev.end + 10;

                                    return {
                                        start: newStart < usersLength.current ? newStart : usersLength.current - 10,
                                        end: newEnd < usersLength.current ? newEnd : usersLength.current,
                                    };
                                })
                            }>
                            &#8250;
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
