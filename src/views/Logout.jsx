import axios from "axios";
import React, { useEffect } from "react";
import axiosClient from "../axiosCustom";
import { userStateContext } from "../context/ContextProvider";
import { redirect } from "react-router-dom";

export default function Logout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = userStateContext();

  useEffect(() => {
    logout();
  }, []);

  const logout = () => {
    // const cookie = await axios.get(
    //   "http://localhost:8000/sanctum/csrf-cookie",
    //   {
    //     withCredentials: true,
    //   }
    // );

    axios
      .post("http://localhost:8000/api/clearPosition", {
        headers: {
          accept: "application/json",
          // "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        // withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("http://localhost:8000/api/logout", {
        headers: {
          accept: "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        setCurrentUser("");
        setUserToken(null);
        redirect('/')
      })
      .catch((error) => {
        console.log(error);
      });

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    }
    
  };
  return(
    <>
        <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center bg-slate-300">
            <div className="text-slate-50 text-2xl font-semibold font-roboto">
                Saliendo...
            </div>
        </div>;
    </>
  ) 
  
}


 // const logout = async (e) => {
  //   e.preventDefault();
  //   setIsLoggingOut(true);
    
  //   const cookie = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
  //       withCredentials: true
  //   })

  //   await axios.post("http://localhost:8000/api/logout",
  //     {
  //       headers: {
  //         accept: "application/json",
  //         'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
  //       },
  //       withCredentials: true
  //     })
  //     .then(({ data }) => {
  //       setCurrentUser('');
  //       setUserToken(null);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //   });

  //   function getCookie(name) {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(';').shift();
  //     return null;
  //   }
  // };