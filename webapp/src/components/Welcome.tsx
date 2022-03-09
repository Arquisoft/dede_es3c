import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../img/logo-dede.svg';

type WelcomeProps = {
  message: string;
  translate: (key: string) => string
}

function Welcome(props: WelcomeProps): JSX.Element {

  return (
    <Grid container>
      <Grid item xs={10}>
        <Box component="h2"> {props.translate('app.hi')}{props.message}</Box>
      </Grid>
      <Grid item xs={2}>
        <img width={5} height = {5} src={logo} className="App-logo" alt="logo" />
      </Grid>
      
    </Grid>
    
  );
}

export default Welcome;