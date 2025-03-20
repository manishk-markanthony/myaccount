"use client"
import { useEffect, useState } from "react";

import Login from '../login/login';
import { getCookie } from '@/util/helper';
import LogoutButton from "./logoutButton";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(1000);
  useEffect(() => {
    setIsLoggedIn(getCookie("login"));
  }, [isLoggedIn]);
  console.log(`isLoggedIn : ${isLoggedIn}`);
  if (!isLoggedIn) {
    return (<Login />)
  }
  if (document.getElementById("welcomeMsg")) {
    let currentUser = getCookie("currentUser");
    document.getElementById("welcomeMsg").innerText = `Welcome, ${currentUser}!`;

    if (document.getElementById("rewardEntries")) {
      document.getElementById("rewardEntries").innerHTML = `Your entries available <b>${score}</b>`;
    }
  }
  return (
    <>
      <h1>
        My Account
      </h1>
      <div>
        <p id="welcomeMsg" style={{padding: '10px 05px'}}></p>
        <p id="rewardEntries" style={{padding: '10px 05px'}}></p>
      </div>
      <div style={{padding: '10px 05px'}}>
        <LogoutButton />
      </div>
    </>
  );
}