import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


const SessionTimeout = ({ children, timeoutInMinutes = 30 }) => {
  const navigate = useNavigate() 
  const location = useLocation()
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  localStorage.setItem("isLoggedIn",false)

console.log(location,"location");
console.log(isLoggedIn,"isLoggedIn");

  useEffect(() => {
    let timer;
    const userActivity = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Perform logout or session expiration action
        localStorage.setItem("isLoggedIn",false)
        // You might want to redirect to a login page or show a modal
        // toast.warning("session")
        navigate("/adminpanel/login")
      }, timeoutInMinutes);
    };

    const resetTimer = () => {
      userActivity();
    };

    // Add event listeners to track user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Set up an initial timer
    userActivity();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [timeoutInMinutes]);

  return <>{(isLoggedIn || location?.pathname == "/adminpanel/login") ? children : <p>Session timed out. Please log in again.</p>}</>;
};

export default SessionTimeout;
