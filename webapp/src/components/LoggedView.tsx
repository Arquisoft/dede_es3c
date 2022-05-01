import { useSession, CombinedDataProvider, LogoutButton, Text  } from "@inrupt/solid-ui-react";
import { Button, Card, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import React, { useContext } from "react";
import { LangContext } from "../lang";


const LoggedView: React.FC= () =>{
  const { dispatch: { translate } } = useContext(LangContext);
  const { session } = useSession();
  if (session.info.webId !== undefined ){
    localStorage.setItem("solidID", session.info.webId)
  }
  return (
    <Container fixed>
      {session.info.webId ? (
        <CombinedDataProvider 
          datasetUrl={session.info.webId} 
          thingUrl={session.info.webId}>
        <Card style={{ maxWidth: 480 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
             <Typography gutterBottom variant="h5" component="h2">  
            </Typography>
          </CardContent>
        </Card>
      </CombinedDataProvider>
      ): null } 
             

      <LogoutButton >
        <Button style={{ marginTop: 20 }} variant="contained" color="primary">
          {translate("navbar.logout")}
        </Button>
      </LogoutButton>


    </Container>
  );
}

export default LoggedView