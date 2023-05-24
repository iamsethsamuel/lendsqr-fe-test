import { useEffect } from "react";
import Grid from "../components/Grid";


function Login() {
    useEffect(()=>{
        document.title = "Lensqr | Login"
    }, [])

    return ( <div className="p-5">
        <img src="img/logo.png" className="mb-5" />
        <Grid container className="space-between row">
            <img src="img/pablo-sign-in 1.png" />
            <Grid>
                <form>
                    
                </form>
            </Grid>
        </Grid>
    </div> );
}

export default Login;