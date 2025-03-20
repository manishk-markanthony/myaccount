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
  const boxStyle = {
    padding: '10px 05px'
  }
  return (
    <>
      <h1 style={{boxStyle}}>
        My Account
      </h1>
      <div>
        <p id="welcomeMsg" style={boxStyle}></p>
        <p id="rewardEntries" style={boxStyle}></p>
      </div>
      <div style={boxStyle}>
        <LogoutButton />
      </div>
    </>
  );
}