"use client"
import { eraseCookie } from "@/util/helper";

export default function LogoutButton() {
    const logout = ()=>{
        console.log('logout clicked');
         eraseCookie("login") ;
         eraseCookie("session") ;
         eraseCookie("currentUser");
         window.location.reload();
    }
    return <button onClick={logout}>Logout</button>
}
