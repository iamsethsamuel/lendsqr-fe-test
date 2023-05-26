import { useContext, useMemo, useState } from "react";
import Button from "../components/button/Button";
import { AppContext } from "../App";
import { useMediaQuery } from "../utils/utils";

function UserProfile() {
    const { user } = useContext(AppContext);

    const isDesktop = useMediaQuery();

    const [activePage, setPage] = useState("General Details");
    const pageTitle = useMemo(() => {
        const prevPage = document.referrer.substring(document.referrer.lastIndexOf("/") + 1);

        return prevPage.replace(/^./, function (match) {
            return match.toUpperCase();
        });
    }, []);

    return (
        <div>
            <div className="flex flex-start">
                <Button
                    variant="text"
                    //I am having issues with in during test. So I disenabled it
                    to={
                        process.env.NODE_ENV === "development"
                            ? undefined
                            : document?.referrer.substring(document?.referrer.lastIndexOf("/"))
                    }
                    className="terriary-color">
                    <span style={{ fontWeight: "bolder", fontSize: "2rem" }}>&#8592;</span> Back to{" "}
                    {pageTitle || "Home"}
                </Button>
            </div>
            <div className={`flex space-between ${isDesktop ? "row" : "flex-column pb-1"}`}>
                <h3 className="page-title">User Details</h3>
                <div>
                    <Button
                        variant="text"
                        className={`br-color-blacklisted color-blacklisted ${isDesktop ? "min-1" : "mr-1 w-50"}`}
                        style={{ padding: "10px", borderRadius: "5px" }}
                        data-testid="blacklist-button">
                        Blacklist User
                    </Button>
                    <Button
                        variant="text"
                        className={`br-color-secondary ${isDesktop ? "" : " w-45"}`}
                        style={{ padding: "10px", borderRadius: "5px" }}
                        data-testid="activate-button">
                        Activate User
                    </Button>
                </div>
            </div>
            <div className="bg-white pin-3 pt-3 flex flex-column ">
                <div
                    className={`bg-white flex wrap ${isDesktop ? "row mb-3 " : "flex-column center flex-center mb-1"}`}>
                    <img
                        src={user?.profile.avatar}
                        alt="profile"
                        className={`profile-image br-10  ${isDesktop ? "min-1" : ""}`}
                        id="profile-image"
                        data-testid="profile-image"
                    />

                    <div className={`flex flex-column  center ${isDesktop ? "mr-2" : "mt-2 flex-center"}`}>
                        <span className="page-title " id="user-name" data-testid="user-name">
                            {user?.profile.firstName} {user?.profile.lastName}
                        </span>
                        <span style={{ marginTop: "5px" }}>{user?.accountNumber}</span>
                    </div>
                    {isDesktop && <div className="divider-right" />}

                    <div className={`flex flex-column center ${isDesktop ? "min-4 " : "flex-center mt-1"}`}>
                        <span>User’s Tier</span>
                        <div className="flex flex-row">
                            <img src="icons/star_filled.png" alt="star" />
                            <img src="icons/star.png" alt="star" />
                            <img src="icons/star.png" alt="star" />
                        </div>
                    </div>
                    {isDesktop && <div className="divider-right" />}

                    <div className={`flex flex-column min-2 center ${isDesktop ? "" : "flex-center mt-1"}`}>
                        <p className="page-title">₦ {user?.accountBalance}</p>
                        <p data-testid="account-details">{user?.accountNumber}/Providus Bank</p>
                    </div>
                </div>
                <div className="flex row scroll-x w-100 ">
                    {["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"].map(
                        (page) => (
                            <Button
                                key={page}
                                variant="text"
                                className={` ${
                                    page === activePage ? "br-active-bottom terriary-color" : "primary-color"
                                } p-1 ${isDesktop ? "w-20" : "w-100"}`}
                                style={{ fontWeight: page === activePage ? "bolder" : "normal" }}
                                onClick={() => setPage(page)}
                                data-testid={`${page.toLowerCase().replace(" ", "-")}-button`}>
                                {page}
                            </Button>
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-column p-2 bg-white p-3 mt-3 ">
                <div className="flex row flex-column">
                    <p className="bold mb-1 f-16 ml-2">Personal Information</p>

                    <div className="flex row w-100 wrap">
                        <InfoCard title="full Name" details={`${user?.profile.lastName} ${user?.profile.firstName}`} />
                        <InfoCard title="Phone Number" details={`${user?.profile.phoneNumber}`} />
                        <InfoCard title="Email Address" details={`${user?.email}`} />
                        <InfoCard title="Bvn" details={`${user?.profile.bvn}`} />
                        <InfoCard title="Gender" details={`${user?.profile.gender}`} />
                        <InfoCard title="Marital status" details="Single" />
                        <InfoCard title="Children" details="None" />
                        <InfoCard title="Type of residence" details="Parent’s Apartment" />
                        <div className="divider" />
                    </div>
                </div>
                <div className="flex row flex-column mt-2">
                    <p className="bold mb-1 f-16 ml-2">Education and Employment</p>

                    <div className="flex row w-100 wrap">
                        <InfoCard title="level of education" details={`${user?.education.level}`} />
                        <InfoCard title="employment status" details={`${user?.education.employmentStatus}`} />
                        <InfoCard title="sector of employment" details={`${user?.education.sector}`} />
                        <InfoCard title="Duration of employment" details={`${user?.education.duration}`} />
                        <InfoCard title="office email" details={`${user?.education.officeEmail}`} />
                        <InfoCard title="Monthly income" details={`${user?.education.monthlyIncome}`} />
                        <InfoCard title="loan repayment" details={`${user?.education.loanRepayment}`} />
                        <div className="divider" />
                    </div>
                </div>
                <div className="flex row flex-column mt-2">
                    <p className="bold mb-1 f-16 ml-2">Socials</p>

                    <div className="flex row w-100 wrap">
                        <InfoCard title="Twitter" details={`${user?.socials.twitter}`} />
                        <InfoCard title="Facebook" details={`${user?.socials.facebook}`} />
                        <InfoCard title="Instagram" details={`${user?.socials.instagram}`} />

                        <div className="divider" />
                    </div>
                </div>
                <div className="flex row flex-column mt-2">
                    <p className="bold mb-1 f-16 ml-2">Guarantor</p>

                    <div className="flex row w-100 wrap">
                        <InfoCard
                            title="full Name"
                            details={`${user?.guarantor.lastName} ${user?.guarantor.firstName}`}
                        />
                        <InfoCard title="Phone Number" details={`${user?.guarantor.phoneNumber}`} />
                        <InfoCard title="Email Address" details="debby@gmail.com" />
                        <InfoCard title="Relationship" details="Sister" />
                        <div className="divider" />
                    </div>
                </div>
                <div className="flex row flex-column mt-2">
                    <div className="flex row w-100 wrap">
                        <InfoCard
                            title="full Name"
                            details={`${user?.guarantor.lastName} ${user?.guarantor.firstName}`}
                        />
                        <InfoCard title="Phone Number" details={`${user?.guarantor.phoneNumber}`} />
                        <InfoCard title="Email Address" details="debby@gmail.com" />
                        <InfoCard title="Relationship" details="Sister" />
                        <div className="divider" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const InfoCard = ({ title, details }: { title: string; details: string }) => {
    return (
        <div className="flex flex-column w-50 min-2 mb-2 " style={{ width: "170px" }}>
            <p>{title.toUpperCase()}</p>
            <p className="bold mt-1">{details}</p>
        </div>
    );
};

export default UserProfile;
