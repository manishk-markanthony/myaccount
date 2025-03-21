"use client"
import { useEffect, useState } from "react";

import Login from '../login/login';
import { base64Decode, getCookie } from '@/util/helper';
import LogoutButton from "./logoutButton";

export default function Page() {
  const [userSession, setUserSession] = useState(); 
  const [score, setScore] = useState(1000);
  useEffect(() => {
    const session = getCookie("session"); 
    if(session){
      setUserSession(base64Decode(session));
    }
  }, [userSession]);
  if (!userSession) {
    return (<Login />)
  }
  if (document.getElementById("welcomeMsg")) {
    let currentUser = base64Decode(getCookie("currentUser"));
    document.getElementById("welcomeMsg").innerText = `Welcome, ${currentUser}!`;

    if (document.getElementById("rewardEntries")) {
      document.getElementById("rewardEntries").innerHTML = `Your entries available <b>${score}</b>`;
    }
  }
  const styles = {
    buttonStyle: {
      padding: '05px',
      fontSize: '1em',
    }, boxStyle: {
      padding: '10px 05px'
    }
  }
  return (
    <>
      <h1 style={styles.boxStyle}>
        My Account
      </h1>
      <div>
        <p id="welcomeMsg" style={styles.boxStyle}></p>
        <p id="rewardEntries" style={styles.boxStyle}></p>
      </div>
      <div style={styles.buttonStyle}>
        <LogoutButton />
      </div>
    </>
  );
}