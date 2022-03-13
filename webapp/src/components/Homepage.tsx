import React, {Fragment, FC, useEffect, useState} from "react";
import Header from "./Header";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import  {getUsers} from '../api/api';
import {User} from '../shared/shareddtypes';
import "bootswatch/dist/minty/bootstrap.min.css"

interface HomepageProps {
    translate: (key: string) => string
    setUser: (user:string) => void
}

const Homepage: FC<HomepageProps> = (props: HomepageProps) => {
    const [users,setUsers] = useState<User[]>([]);
    const refreshUserList = async () => {
      setUsers(await getUsers());
    } 
    useEffect(()=>{
      refreshUserList();
    },[]);

    return(
        <Fragment>  
          <Header setUser={props.setUser}/>
          <Box component="div" sx={{ py: 2}}>{props.translate('app.description')}</Box>
          <Link href="https://github.com/pglez82/asw2122_0">{props.translate('app.code')}</Link>
      </Fragment>
    );
  }
  export default Homepage;