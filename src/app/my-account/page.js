"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
export default function Page() {
    const router = useRouter();
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
    if (isLoggedIn) {
        return router.push('/my-account');
    }
    return router.push('/login');
}