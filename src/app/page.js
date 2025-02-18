"use client"
import {getCookie} from "../lib/session"; 
import Login from "./login";
import MyAccount from "./myaccount";
export default function Home(props) {
  if(getCookie("login")){
    return (
      <div id="main-container">
        <MyAccount />
      </div>
    );
  }
  return (
    <div id="main-container">
      <Login />
    </div>
  );
}
