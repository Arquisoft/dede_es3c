import { useState } from "react";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import LoginProvider from "./LoginProvider";
import LoggedView from "./LoggedView";

  const LoginSolid: React.FC= () =>
 {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { session } = useSession();

    session.onLogin(() => {
        setIsLoggedIn(true)
    })

    session.onLogout(() => {
        setIsLoggedIn(false)
    })

    return (
        <>
            <SessionProvider sessionId="login">
                {(!isLoggedIn) ? <LoginProvider /> : <LoggedView/>}
            </SessionProvider>
        </>
    );
}

export default LoginSolid;