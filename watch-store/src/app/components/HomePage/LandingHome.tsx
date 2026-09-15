"use client";
import Image from "next/image";
import Link from "next/link";

export default function LandingHome(props : any) {

  return(
    <div className="box">
      <div className="info">
        <h1 className="text-light fw-bold">{props.title}</h1>
        <p className="text-light">{props.desc}</p>
        <Link href={props.link}>{props.linkText}</Link>
      </div>
      <div className="img-content">
        <Image
          src={props.img}
          width={700}
          height={410}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
