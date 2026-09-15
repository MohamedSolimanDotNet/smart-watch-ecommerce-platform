"use client";
import axios from "axios";
import { useContext, useState } from "react";
import Url from "@/app/api/Url";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import "./create-watch.css";
import Link from "next/link";

export default function CreateProduct() {

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [statuses, setStatuses] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [valid, setValid] = useState(false);
  const cookie = new Cookies();
  const nav = useRouter();
  const mainUrl = Url();
  const token = cookie.get("ShortBearer") || cookie.get("Bearer");
  let tokenName = "";

  // to know if user login or not
  if(cookie.get("ShortBearer")) {
    tokenName = "ShortBearer";
  } else if(cookie.get("Bearer")) {
    tokenName = "Bearer";
  }

  async function submit(e : any) {

    e.preventDefault();
    setValid(true);

    try {

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("statuses", statuses);
      formData.append("price", price);
      if (image !== null) {
        formData.append("Image", image);
      }
      
      await axios.post(`${mainUrl}Watches`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      nav.push("/Dashboard/Watches");
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        if(tokenName !== ""){
          cookie.remove(tokenName);
        }
        nav.push("/Dashboard/Watches");
      }
    }
  }


  // important login
  if (tokenName == "Bearer" || tokenName == "ShortBearer") {
    // Check if the cookie is expired
    const expirationDate = cookie.get(tokenName, { doNotParse: true }).expires;

    if (expirationDate && new Date(expirationDate) < new Date()) {
      cookie.remove(tokenName);
      nav.push("/Login");
    } else {
      // Cookie is not expired, continue to dashboard
      return(

        <div className="content-form d-flex align-items-center justify-content-center">
          <form
            action=""
            className="d-flex justify-content-center flex-column p-3 rounded-2"
            onSubmit={submit}
          >
            
            <label className="mb-1" htmlFor="name">
              Title:
            </label>
            <input
              className="p-2 rounded-1 mb-3"
              id="name"
              name="title"
              type="text"
              placeholder="Title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title === "" && valid && (
              <p className="error text-danger p-2 mb-2 w-100">Title is Require</p>
            )}

            <label className="mb-1" htmlFor="email">
              Description:
            </label>
            <input
              className="p-2 rounded-1 mb-3"
              id="email"
              name="description"
              type="text"
              placeholder=" Description..."
              required
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
            {description === "" && valid && (
              <p className="error text-danger p-2 mb-2 w-100">
                {" "}
                Description is Require
              </p>
            )}

            <label className="mb-1" htmlFor="price">
              Price:
            </label>
            <input
              className="p-2 rounded-1 mb-3"
              id="price"
              name="price"
              type="text"
              placeholder="Title..."
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {price === "" && valid && (
              <p className="error text-danger p-2 mb-2 w-100">Price is Require</p>
            )}

            <label className="mb-1" htmlFor="status">
              Status:
            </label>
            <input
              className="p-2 rounded-1 mb-3"
              id="status"
              name="statuses"
              type="text"
              placeholder="Title..."
              required
              value={statuses}
              onChange={(e) => setStatuses(e.target.value)}
            />
            {statuses === "" && valid && (
              <p className="error text-danger p-2 mb-2 w-100">Status is Require</p>
            )}
  
            <label className="mb-1" htmlFor="img">
              Image:
            </label>
            <input
              id="img"
              name="Image"
              type="file"
              placeholder="Image..."
              className="p-2 rounded-1 mb-3"
              onChange={(e) => {
                const file = e.target.files ? e.target.files.item(0) : null;
                setImage(file);
              }}
              required
            />
  
            <div className="d-flex justify-content-center">
            <Link
                href={"/Dashboard/Watches"}
                className="text-light back-btn"
              >
                Back
              </Link>
              <button
                className="submit-btn text-light"
                type="submit"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>

      );
    }
  } else {
    nav.push("/Login");
  }

}
