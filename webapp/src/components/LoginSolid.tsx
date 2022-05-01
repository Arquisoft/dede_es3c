import { useState } from "react";
import LoginForm from "./LoginProvider"
import ProfileViewer from "./LoggedView"
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";

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
                {(!isLoggedIn) ? <LoginForm /> : <ProfileViewer/>}
            </SessionProvider>
        </>
    );
}

export default LoginSolid;