"use client"
import MyAccount from './my-account';
import { useEffect, useState } from "react";

import Login from '../login/login';

export default function Page() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      useEffect(() => {
        function getCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
        }
        setIsLoggedIn(getCookie("login"));
      }, [isLoggedIn]);
       
      console.log('isLoggedInisLoggedInisLoggedInisLoggedIn');
      if(!isLoggedIn) { 
        return <Login></Login>;
      }
    return <MyAccount/>;
}