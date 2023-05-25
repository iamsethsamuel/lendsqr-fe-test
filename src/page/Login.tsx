import { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "../components/grid/Grid";
import InputField from "../components/input/InputField";
import Button from "../components/button/Button";
import { UserType } from "../utils/types";
import { AppContext } from "../App";
import { useIsDesktop } from "../utils/utils";

function Login() {
    const [type, setType] = useState<"password" | "text">("password");
    const [emailValidated, setEmailValidate] = useState<boolean>();
    const [passwordValidated, setPasswordValidate] = useState<boolean>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const context = useContext(AppContext);
    const [users, setUsers] = useState<UserType[]>();
    const isDesktop = useIsDesktop();

    useEffect(() => {
        document.title = "Lensqr | Login";
        fetch("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
            .then((res) => {
                res.json()
                    .then((data) => {
                        setUsers(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
        if (event.currentTarget.value.length > 8) {
            handleEmailUnfocus(event);
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
        if (event.currentTarget.value.length > 8) {
            handlePasswordUnfocus(event);
        }
    };

    const handleEmailUnfocus = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        setEmailValidate(regex.test(event.currentTarget.value));
    };

    const handlePasswordUnfocus = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        setPasswordValidate(regex.test(event.currentTarget.value));
    };

    const handleTypeChange = () => {
        setType((prev) => (prev === "password" ? "text" : "password"));
    };

    const handleFormSubmit = () => {
        if (passwordValidated && emailValidated) {
            const user = users?.find((user) => user.email === email);
            if (user) {
                context.handleUserChange(user);
            } else {
                context.showSnackBar("User not Found");
            }
        } else {
            context.showSnackBar("Please Fill filled correctly");
        }
    };

    return (
        <div className={isDesktop ? "p-5" : "p-1"}>
            <img src="img/logo.png" className="mb-5" />
            <Grid container className="space-between row">
                {isDesktop && <img src="img/pablo-sign-in 1.png" />}
                <Grid container className={`flex-column w-100 ${isDesktop ? "pin-7" : ""}`}>
                    <div>
                        <p className="title pb-1">Welcome</p>
                        <p className="terriary-color pb-4">Enter details to login.</p>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFormSubmit();
                        }}>
                        <InputField
                            placeholder="Email"
                            onChange={handleEmailChange}
                            className="mbl-1 w-100"
                            validated={!email ? undefined : emailValidated}
                            onBlur={handleEmailUnfocus}
                            value={email}
                        />
                        <InputField
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            className="w-100"
                            type={type}
                            value={password}
                            validated={!password ? undefined : passwordValidated}
                            onBlur={handlePasswordUnfocus}
                            suffix={
                                <Button variant="text" type="button" onClick={handleTypeChange}>
                                    SHOW
                                </Button>
                            }
                        />
                        <Button variant="text" className="mt-2" type="button">
                            FORGOT PASSWORD?
                        </Button>

                        <Button
                            variant="contained"
                            className="mt-2 w-100 relative"
                            type="submit"
                            style={{ height: "40px" }}>
                            LOGIN
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
