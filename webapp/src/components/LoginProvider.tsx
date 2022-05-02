import { useState, useEffect, useContext } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, Container } from "@material-ui/core";
import { LangContext } from "../lang";


function LoginProvider(): JSX.Element {
    const { dispatch: { translate } } = useContext(LangContext);
    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  
    useEffect(() => {
      setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);
    
    return (
        <>
        <Container fixed>
          <FormGroup>
            <TextField
            label="Identity Provider"
            placeholder="Identity Provider"
            type="url"
            value={idp}
            onChange={(e) => setIdp(e.target.value)}
            InputProps={{
              endAdornment: (
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="contained" color="primary">
                  {translate("navbar.login")}
                  </Button>
              </LoginButton>
            ),
          }}
        />
      </FormGroup>
    </Container>
        </>
    );
}

export default LoginProvider;