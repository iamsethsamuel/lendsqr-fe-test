import { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "../components/grid/Grid";
import InputField from "../components/input/InputField";
import Button from "../components/button/Button";
import { AppContext } from "../App";
import { useMediaQuery } from "../utils/utils";

function Login() {
    const [type, setType] = useState<"password" | "text">("password");
    const [emailValidated, setEmailValidate] = useState<boolean>();
    const [passwordValidated, setPasswordValidate] = useState<boolean>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const context = useContext(AppContext);
    const users = context.users;
    const isDesktop = useMediaQuery();

    useEffect(() => {
        document.title = "Lensqr | Login";
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
                {isDesktop && <img src="img/pablo-sign-in 1.png" className="w-100"/>}
                <Grid container className={`flex-column w-100 ${isDesktop ? "pin-7" : ""}`}>
                    <div>
                        <p className="title pb-1" style={{ fontSize: "40px" }}>
                            Welcome
                        </p>
                        <p className="terriary-color pb-4" style={{ fontSize: "20px" }}>
                            Enter details to login.
                        </p>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFormSubmit();
                        }}>
                        <div className="mb-1">
                            <InputField
                                placeholder="Email"
                                onChange={handleEmailChange}
                                className="w-100"
                                validated={!email ? undefined : emailValidated}
                                onBlur={handleEmailUnfocus}
                                value={email}
                                style={{ height: "50px" }}
                            />
                        </div>
                        <InputField
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            className="w-100 "
                            type={type}
                            value={password}
                            validated={!password ? undefined : passwordValidated}
                            onBlur={handlePasswordUnfocus}
                            style={{ height: "50px" }}
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
