"use client"
import MyAccount from './my-account';
import { useEffect, useState } from "react";

import Login from '../login/login';
import { getCookie } from '@/util/helper';

export default function Page() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      useEffect(() => {
        setIsLoggedIn(getCookie("login"));
      }, [isLoggedIn]);
       
      console.log('isLoggedInisLoggedInisLoggedInisLoggedIn');
      if(!isLoggedIn) { 
        return <Login></Login>
      }
    return <MyAccount/>;
}