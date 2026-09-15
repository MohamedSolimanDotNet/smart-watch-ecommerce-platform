"use client";
import Layout from "../../components/layout";
import "./login.css";
import { PersonOutline, LockClosedOutline } from 'react-ionicons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useRouter } from 'next/navigation';
import SigninButton from "@/app/components/SigninButton";
import Link from "next/link";
import Url from "@/app/api/Url";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] : any = useState(false);
  const [valid, setValid] = useState(false);
  const [validEmail, setValidEmail] : any = useState("");
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [captchaDisplay, setCaptchaDisplay] = useState('');
  const mainUrl = Url();
  const cookie = new Cookies();
 
  let fonts = ["cursive", "sans-serif", "serif", "monospace"];

  // Function to generate a random string for CAPTCHA
  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }

  useEffect(() => {
    displayCaptcha();
  }, []);

  // Function to display the CAPTCHA image
  const displayCaptcha = () => {
    const captchaText = generateCaptcha();
    setCaptcha(captchaText);
    const html = captchaText
      .split('')
      .map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const font = Math.trunc(Math.random() * fonts.length);
        return `<span style="transform:rotate(${rotate}deg);font-family:${fonts[font]}">${char}</span>`;
      })
      .join('');
    setCaptchaDisplay(html);
  };

  // Function to refresh the CAPTCHA
  const refreshCaptcha = () => {
    displayCaptcha();
  };

  // Function to validate the user input against the generated CAPTCHA
  const validateCaptcha = () => {
    if (userInput !== captcha) {
      alert('CAPTCHA is incorrect. Please try again.');
      refreshCaptcha();
      return false;
    }
    return true;
  };

  async function submit(e : any) {
    let send = true;
    e.preventDefault();
    setValid(true);

    // to check if captcha is valid
    if (!validateCaptcha()) return;


    if (email === "" || password.length < 6) {
      send = false;
    } else send = true;

    try {
      if (send) {
        let res = await axios.post(`${mainUrl}Login`, {
          email: email,
          password: password,
          CheckBox: check
        });

        const token = res.data.token;
        const customerId = res.data.id;

        if(check){
          cookie.set("Bearer", token, { path: "/", expires: new Date(Date.now()+1296000000) });
          cookie.set("CustId", customerId, { path: "/", expires: new Date(Date.now()+1296000000) });
          cookie.remove("ShortBearer", { path: "/" });
        } else {
          cookie.set("ShortBearer", token, { path: "/", expires: new Date(Date.now()+86400000) });
          cookie.set("CustId", customerId, { path: "/", expires: new Date(Date.now()+86400000) });
          cookie.remove("Bearer", { path: "/" });
        }

        window.location.pathname = "/Dashboard";

      }
    } catch (erro : any) {
      setValidEmail(erro.response.status);
    }
  }

  return(
    <Layout hideLayout={true}>
      <main>
        <section>
          <figure>
            Time Watches
          </figure>
          <form method="post" onSubmit={submit}>
              <div className="text container-email">
                  <PersonOutline />
                  <input className="login-email-input" value={email} onChange={(e) => setEmail(e.target.value)} 
                    type="email" asp-for="Email" required />
                  <span className="span"></span>
                  <label className="login-email-lable lable">Email</label>
              </div>
                  {email === "" && valid && (
                    <p className="error text-danger p-2 mb-2 w-100">Email is Require</p>
                  )}
                  {validEmail === 401 && valid && (
                    <p className="error text-danger p-2 mb-2 w-100">
                      Your Email is wrorng
                    </p>
                  )}
              <div className="text" style={{marginBottom: "0"}}>
                  <LockClosedOutline />
                  <input className="login-password-input" value={password} onChange={(e) => setPassword(e.target.value)} 
                    type="password" asp-for="Password" required />
                  <span className="span"></span>
                  <label className="login-password-lable lable">Password</label>
              </div>
                  {password.length < 8 && valid && (
                    <p className="error text-danger p-2 mb-2 w-100">
                      Password must be more than 8 char
                    </p>
                  )}

              <div className="forget"><a asp-action="ForgetPassword">Forget Password?</a></div>

              <div className="container-captcha" style={{marginBottom: "15px", marginTop: "10px"}}>
                  <p>Enter Captcha</p>
                  <div className="captchaText" dangerouslySetInnerHTML={{ __html: captchaDisplay }}></div>
                  <div className="container-input">
                      <input type="text"  value={userInput} onChange={(e) => setUserInput(e.target.value)}  id="captchaInput" required />
                      <FontAwesomeIcon icon={faArrowsRotate} onClick={refreshCaptcha} id='refresh-captcha' />
                  </div>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <input id="checkbox" className="checkbox me-2" name="checkbox" 
                  type="checkbox" value={check} onChange={(e) => setCheck(e.target.checked)} />
                <label htmlFor="checkbox">Remember Me</label>
              </div>

              <input className="submit" type="submit" value="Login" />

          </form>

          <div className="or">or</div>
          
          <SigninButton />

          <footer>
              Not a member? <a href="/Register">Register</a>
          </footer>
        </section>
      </main>
    </Layout>
  );
}