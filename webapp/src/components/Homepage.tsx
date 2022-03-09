import React, {Fragment, FC, useEffect, useState} from "react";
import Header from "./Header";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './EmailForm';
import Welcome from './Welcome';
import UserList from './UserList';
import  {getUsers} from '../api/api';
import {User} from '../shared/shareddtypes';

interface HomepageProps {
    translate: (key: string) => string
}

const Homepage: FC<HomepageProps> = ({ translate }) => {
    const [users,setUsers] = useState<User[]>([]);
    const refreshUserList = async () => {
      setUsers(await getUsers());
    } 
    useEffect(()=>{
      refreshUserList();
    },[]);

    return(
        <Fragment>  
          <Welcome translate = {translate} message= {translate('app.students')}/>
          <Box component="div" sx={{ py: 2}}>{translate('app.description')}</Box>
          <EmailForm translate={translate} OnUserListChange={refreshUserList}/>        
          <UserList users={users}/>
          <Link href="https://github.com/pglez82/asw2122_0">{translate('app.code')}</Link>
      </Fragment>
    );
  }
  export default Homepage;