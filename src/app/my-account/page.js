"use client"
import MyAccount from './my-account';
import { Suspense, useEffect, useState } from "react";

import Login from '../login/login';
import { getCookie } from '@/util/helper';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(getCookie("login"));
  }, [isLoggedIn]);
  console.log(`isLoggedIn : ${isLoggedIn}`);
  if (!isLoggedIn) {

    return (
      <>
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </>
    )
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MyAccount />
      </Suspense>
    </>
  );
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}