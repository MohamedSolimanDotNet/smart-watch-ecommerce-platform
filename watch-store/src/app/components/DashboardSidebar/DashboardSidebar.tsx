"use client";
import { useEffect, useState } from "react";
import "./dashboardsidebar.css";
import { PeopleOutline, WatchOutline, HomeOutline, ReorderThreeOutline, LogOutOutline } from 'react-ionicons';
import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import Url from "@/app/api/Url";

export default function DashboardSidebar() {
  const [sidebar, setSidebar] = useState(window.sessionStorage.getItem("switchSidebar") ?? "unClick");
  const cookie = new Cookies();
  const pathname = usePathname();
  const rout = useRouter();
  const mainUrl = Url();
  const token = cookie.get("ShortBearer") || cookie.get("Bearer");
  let tokenName = "";
  const [isAdmin, setIsAdmin] = useState(false);

  async function IsAdmin(){
    let id = cookie.get("CustId");

    try{

      let res = await axios.get(`${mainUrl}Customers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
  
      if(res.data.roleName === "Admin"){
        setIsAdmin(true);
      }

    } catch  (error:any) {
      return;
    }
    
  }

  useEffect(() => {
    IsAdmin();
  },[])

  const Navlinks = [
    {href: "/Dashboard/Users", pathName: "Users", icon: PeopleOutline},
    {href: "/Dashboard/Watches", pathName: "Watches" , icon: WatchOutline},
    {href: "/", pathName: "Logout" , icon: LogOutOutline},
  ];

  const switchSidebar = () => {
    if(sidebar === "click"){
      window.sessionStorage.setItem("switchSidebar", "unClick");
      setSidebar("unClick");
    } else{
      window.sessionStorage.setItem("switchSidebar", "click");
      setSidebar("click");
    }
    
  };

  const Logout = async () =>{
    cookie.remove("ShortBearer", { path: "/" });
    cookie.remove("Bearer", { path: "/" });
    cookie.remove("CustId", { path: "/" });
    await signOut({ redirect: false });
    window.location.pathname = "/";
  }

  

  return(
    <aside className={sidebar === "click" ? "navigation": "sidebar"}>
      <div className="home-icon"><a href="/">{sidebar === "click" ? <HomeOutline /> : "Time Watches"}</a></div>

      <ReorderThreeOutline cssClasses={"bar"} onClick={switchSidebar} />

      <ul>
          {Navlinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              if(link.href !== "/"){

                if(isAdmin === false && link.href === "/Dashboard/Users"){
                  return;
                }

                return (
                  <li key={link.pathName}  className={isActive ? 'active' : ''}>
                    <a onClick={() => rout.push(link.href)}>
                      <span className="icon">{sidebar !== "click" ? <> <link.icon />  <span>{link.pathName}</span> </> : <link.icon />}</span>
                    </a>
                  </li>
                    
                )
              } else{
                return (
                  <li key={link.pathName}>
                    <a onClick={Logout}>
                      <span className="icon">{sidebar !== "click" ? <> <link.icon />  <span>{link.pathName}</span> </> : <link.icon />}</span>
                    </a>
                  </li>
                    
                )
              }
          })}
        
        <div className="indicator"><span></span></div>
      </ul>
  </aside>
  );
}