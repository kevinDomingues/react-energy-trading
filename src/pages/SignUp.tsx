import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../constants/apiURL";

const SignUp: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [isBusinessAccount, setIsBusinessAccount] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | undefined>('');
  const [registerMessage, setRegisterMessage] = useState<string | undefined>('');

  const register = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setRegisterError(undefined);
      const userType = isBusinessAccount ? 2 : 1
      const response = await axios.post(apiURL+"/user/create",  { 
        email: email,
        password: password,
        name: name, 
        address: address, 
        city: city,
        postalCode: postalCode, 
        userType: userType 
      });
      if(response.status === 204){
        setRegisterMessage("Account created successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }
    } catch (error) {
      setRegisterError("SignUp failed. Please check the information provided and try again")
    }
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src="./energy-trading.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your { isBusinessAccount ? "business" : "consumer"} account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={register}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-lg shadow-sm space-y-4 md:space-y-6 text-gray-900">
              <div>
                <label htmlFor="email-address" className="block mb-2 font-medium">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="user-name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  id="user-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="User name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 font-medium">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address-level1"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-2 font-medium">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="postal-code" className="block mb-2 font-medium">
                  Postal Code
                </label>
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="City"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a className="font-medium text-gray-800 hover:text-sky-600 cursor-pointer"
                onClick={() => setIsBusinessAccount(!isBusinessAccount)}
                >
                  { isBusinessAccount ? "Registering a consumer account?" : "Registering a business account?" }
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create account
              </button>
            </div>
            <Link key={100} to="/">
              <div className="mt-3">
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-600 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Already has an account?
                </button>
              </div>
            </Link>
            {registerError && 
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{registerError}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
            }
            {registerMessage && 
              <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">{registerMessage}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-emerald-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
            }
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;