"use client";
import axios from "axios";
import { useState } from "react";
import "./register.css";
import  Url  from "@/app/api/Url";

function Register() {

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
  const mainUrl = Url();

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
        await axios.post(`${mainUrl}Customers`, {
          username: form.username,
          email: form.email,
          address: form.address,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirmPassword,
        });

        window.location.pathname = "/Login";
      }
    } catch (erro : any) {
      setValidEmail(erro.response.status);
    }
  }

  return (
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
            <button
              className="text-light"
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
export default Register;
