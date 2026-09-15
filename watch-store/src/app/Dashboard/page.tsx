"use client";
import { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import "./dashboard.css";
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const cookie = new Cookies();
  let tokenName = "";

  if(cookie.get("ShortBearer")) {
    tokenName = "ShortBearer";
  } else if(cookie.get("Bearer")) {
    tokenName = "Bearer";
  }

  if (tokenName == "Bearer" || tokenName == "ShortBearer") {
    // Check if the cookie is expired
    const expirationDate = cookie.get(tokenName, { doNotParse: true }).expires;

    if (expirationDate && new Date(expirationDate) < new Date()) {
      cookie.remove(tokenName);
      router.push("/Login");
    } else {
      // Cookie is not expired, continue to dashboard
      return(
        <DashboardLayout>
          <div className="d-flex justify-content-center align-items-center fs-2 fw-bold w-100">
          welcome to dashboard
          </div>
        </DashboardLayout>
      );
    }
  } else {
    router.push("/Login");
  }

}



