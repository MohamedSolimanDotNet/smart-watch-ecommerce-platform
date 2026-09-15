"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../DashboardLayout";
import "./watches.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Url from "@/app/api/Url";
import Pagination from "@/app/components/Pagination";
import SelectLimitsPagination from "@/app/components/SelectLimitsPagination";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Watches() {
  // Initialize state variables
  const [userData, setUserData] = useState([]);
  const cookie = new Cookies();
  const router = useRouter();
  const mainUrl = Url();
  const token = cookie.get("ShortBearer") || cookie.get("Bearer");
  let tokenName = "";

  // to know if user login or not
  if(cookie.get("ShortBearer")) {
    tokenName = "ShortBearer";
  } else if(cookie.get("Bearer")) {
    tokenName = "Bearer";
  }

  // Fetch user data function
  async function Refresh() {
    try {

      const response = await axios.get(`${mainUrl}Watches`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setUserData(response.data);

    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        if(tokenName !== ""){
          cookie.remove(tokenName);
        }
        window.location.pathname = "/login";
        
      }
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    Refresh();
  }, []);

  // Delete user function
  async function deleteUser(id:any) {
    try {
      await axios.delete(`${mainUrl}Watches/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      // Refresh data after successful deletion
      Refresh();
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        if(tokenName !== ""){
          cookie.remove(tokenName);
        }
        window.location.pathname = "/login";
      }
    }
  }

  // Pagination method
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState("");
  let data : any[] = [];

  // Helper function to get paginated user data
  const GetUsers = (pageNum:number, limitNum:number) => {
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    return userData.slice(startIndex, endIndex);
  };

  // input search
  const keys = ["statuses", "title", "price", "description"];
  const search = (data : any) => {
    return data.filter((user : any) => 
        keys.some((key) => user[key].toLowerCase().includes(query))
    ).slice(0,limit);
  };

   // map data based on search if there is data in input search
  data = query.length > 0 ? search(userData) : GetUsers(page, limit);

  // Total number of pages
  const totalPage = query.length > 0 ? Math.ceil(data.length / limit) : Math.ceil(userData.length / limit);

  // Handle page change
  const handlePageChange = (value : any) => {
    if(value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "Previous") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "Next"){
      if(page !== totalPage) {
        setPage(page + 1);
      }
    } else if(value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  }
  

    let getData = data.map((user:any) => (
      <tr key={user.id}>
        <td>{user.title}</td>
        <td>{user.description}</td>
        <td>{user.price}</td>
        <td>
          <img width="30" height="40" src={user.productUrl} alt="img" />
        </td>
        <td>{user.statuses}</td>
        <td>
          <a href={`/Dashboard/Watches/Edit/${user.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} className="update me-2 text-black" />
          </a>
          <FontAwesomeIcon icon={faTrashCan} style={{cursor: "pointer", color: "red"}} className="trash ms-2" onClick={() => deleteUser(user.id)} />
        </td>
      </tr>
    ));

    // important login
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
            <div className="layout" 
              style={{width: window.sessionStorage.getItem("switchSidebar") === "click" ? "calc(100% - 80px)" : "calc(100% - 200px)" }}>
              <Link className="create-watch" href={"/Dashboard/Watches/Create"}>Create New Product</Link>
              <div className="search-and-limit">
                <SelectLimitsPagination onLimitChange={setLimit} />
                <input className="search-input" type="search" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
              </div>
              
              <table className="table table-striped table-hover border text-center w-100">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{getData}</tbody>
              </table>

              <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
            </div>
          </DashboardLayout>
        );
      }
    } else {
      router.push("/Login");
    }
}
