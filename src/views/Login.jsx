// '@heroicons/react/24/solid'
import { useState } from "react";
import { userStateContext } from "../context/ContextProvider";
import axios from "axios";
import { Blocks, FallingLines } from "react-loader-spinner";

export default function Login() {
  const { setCurrentUser, setUserToken } = userStateContext();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError({ __html: "" });

    const data = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      })
      // const csrfToken = document.querySelector('meta[name="XSRF-TOKEN"]');
      // console.log(csrfToken);

    await axios.post("http://localhost:8000/api/login",
      {
        email: email,
        password: password
      },
      {
        headers: {
          accept: "application/json",
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        withCredentials: true
      })
      .then(({ data }) => {
        console.log(data);
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError({ __html: "<p>Email o contraseña incorrectos</p>" });
          setIsLoading(false);
        } 
        else if (error.response.data.errors.email) {
          setError({ __html: `<p>${error.response.data.errors.email}</p>` });
          setIsLoading(false);
        }
    });

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }

    setIsLoading(false);

    // axiosClient
    //   .post("/login", {
    //     email,
    //     password,
    //   })
    //   .then(({ data }) => {
    //     setCurrentUser(data.user);
    //     setUserToken(data.token);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-52"
            src="./img/logo.png"
            alt="Your Company"
          />
        </div>



        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>

            {isLoading ?
              <div className="w-full flex justify-center items-center">
                <Blocks
                  height="40"
                  width="40"
                  color="#4fa94d"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  visible={true}
                />
              </div>
            :
              ''
            }

            {error.__html && (
              <div
                className="bg-red-500 rounded py-2 px-3 text-white"
                dangerouslySetInnerHTML={error}
              ></div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex disabled:bg-gray-500 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
