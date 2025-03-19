"use client"
import MyAccount from './my-account';
import { useEffect, useState } from "react";

import Login from '../login/login';
import { getCookie } from '@/util/helper';
import Experimental from '../experimental/page';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(getCookie("login"));
  }, [isLoggedIn]);
  console.log(`isLoggedIn : ${isLoggedIn}`);
  if (!isLoggedIn) {
    return ( <Experimental /> )
  }
  return ( <MyAccount />);
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}