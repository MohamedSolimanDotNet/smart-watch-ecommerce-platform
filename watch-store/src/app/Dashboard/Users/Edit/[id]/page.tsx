"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Url from "@/app/api/Url";
import "./edit.css";
import Link from "next/link";

type Props = {
  params: {
      id: string;
  }
};

export default function UpdateUsers({params} : Props) {
  const mainUrl = Url();
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function onChangeValue(e : any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [valid, setValid] = useState(false);
  const [validEmail, setValidEmail] : any = useState("");
  const cookie = new Cookies();
  const token = cookie.get("ShortBearer") || cookie.get("Bearer");
  let tokenName = "";

  // to know if user login or not
  if(cookie.get("ShortBearer")) {
    tokenName = "ShortBearer";
  } else if(cookie.get("Bearer")) {
    tokenName = "Bearer";
  }


  useEffect(() => {
    axios
      .get(`${mainUrl}Customers/${params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {

        setForm({
          ...form,
          username: res.data.userName,
          email: res.data.email,
          address: res.data.address,
          phone: res.data.phoneNumber,
        });
        
      }).catch((error:any) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          if(tokenName !== ""){
            cookie.remove(tokenName);
          }
          window.location.pathname = "/login";
          
        }
      });
      
  }, []);

  async function submit(e : any) {
    let send = true;
    e.preventDefault();
    setValid(true);

    if (
      form.username === "" ||
      form.email === "" ||
      form.address === "" ||
      form.phone === "" ||
      form.password.length < 6 ||
      form.confirmPassword !== form.password
    ) {
      send = false;
    } else send = true;

    try {

      if (send) {
        await axios.put(`${mainUrl}Customers/${params.id}`, {
            userName: form.username,
            email: form.email,
            address: form.address,
            phone: form.phone,
            password: form.password,
            confirmPassword: form.confirmPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + token
            },
          }
        );
        window.location.pathname = "/Dashboard/Users";
      }

    } catch (erro:any) {
      setValidEmail(erro.response.status);
    }
  }


  // important login
  if (tokenName == "Bearer" || tokenName == "ShortBearer") {
    // Check if the cookie is expired
    const expirationDate = cookie.get(tokenName, { doNotParse: true }).expires;

    if (expirationDate && new Date(expirationDate) < new Date()) {
      cookie.remove(tokenName);
      window.location.pathname = "/login"
    } else {
      // Cookie is not expired, continue to dashboard
      return(
        <div className="register-content d-flex align-items-center justify-content-center">
      <div>
        <form
          action=""
          className="d-flex justify-content-center flex-column p-3 rounded-2"
          onSubmit={submit}
        >
          
        <label className="nlabel mb-1" htmlFor="username">
            UserName:
        </label>
          
          <input
            className="p-2 rounded-1 mb-3"
            id="username"
            name="username"
            type="text"
            placeholder="username..."
            value={form.username}
            onChange={onChangeValue}
          />
          {form.username === "" && valid && (
            <p className="error text-danger p-2 mb-2 w-100">
              Username is Require
            </p>
          )}

        <label className="mb-1" htmlFor="email">
            Email:
        </label>
          
          <input
            className="p-2 rounded-1 mb-3"
            id="email"
            name="email"
            type="email"
            placeholder="Email..."
            value={form.email}
            onChange={onChangeValue}
          />
          {form.email === "" && valid && (
            <p className="error text-danger p-2 mb-2 w-100">Email is Require</p>
          )}
          {validEmail === 422 && valid && (
            <p className="error text-danger p-2 mb-2 w-100">
              Email has been teken
            </p>
          )}

        <label className="mb-1" htmlFor="email">
          Address:
        </label>
          
          <input
            className="p-2 rounded-1 mb-3"
            id="address"
            name="address"
            type="text"
            placeholder="address..."
            value={form.address}
            onChange={onChangeValue}
          />
          {form.address === "" && valid && (
            <p className="error text-danger p-2 mb-2 w-100">Address is Require</p>
          )}


        <label className="mb-1" htmlFor="email">
          Phone:
        </label>
     
          <input
            className="p-2 rounded-1 mb-3"
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone..."
            value={form.phone}
            onChange={onChangeValue}
          />
          {form.phone === "" && valid && (
            <p className="error text-danger p-2 mb-2 w-100">Phone is Require</p>
          )}

        
            <label className="mb-1" htmlFor="password">
                password:
            </label>
        
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password..."
            className="p-2 rounded-1 mb-3"
            value={form.password}
            onChange={onChangeValue}
          />
          {form.password.length < 6 && valid && (
            <p className="error text-danger p-2 mb-2 w-100">
              Password must be more than 8 char
            </p>
          )}
       
            <label className="mb-1" htmlFor="request-password">
             Confirm-Password:
           </label>
       
          <input
            id="request-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm-Password..."
            className="p-2 rounded-1 mb-3"
            value={form.confirmPassword}
            onChange={onChangeValue}
          />
          {form.confirmPassword !== form.password && valid && (
            <p className="error text-danger p-2 mb-2 w-100">
              Password dose not match
            </p>
          )}
          <div className="d-flex justify-content-center">

            <Link
                href={"/Dashboard/Users"}
                className="text-light back-btn"
              >
                Back
              </Link>

              <button
                className="text-light submit-btn"
                type="submit"
              >
                Register
              </button>
          </div>
        </form>
      </div>
    </div>
      );
    }
  } else {
    window.location.pathname = "/login"
  }

}
