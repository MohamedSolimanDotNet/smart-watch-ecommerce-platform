"use client";
import { useEffect, useState } from "react";
import Headroom from 'headroom.js';
import "./HeaderStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  
  useEffect(() => {

    const handleClickOutside = (e : any) => {
      const toggle = document.querySelector('.toggle-menu');
      const showMenu = document.querySelector('.show-menu');
      const headerClass = document.getElementById('header');

      if (!toggle || !showMenu || !headerClass) return;

      if (!toggle.contains(e.target) && !showMenu.contains(e.target)) {

        showMenu.classList.remove('show');
        headerClass.classList.remove('over-elements');
        
      }
    };

    document.addEventListener('click', handleClickOutside);

  }, []);
    

    useEffect(() => {

        // Initialize Headroom
        const header = document.querySelector('header') as HTMLElement;
        const headroom = new Headroom(header);
        headroom.init();

    }, [])

    const toggleMenu = () => {
      const headerClass = document.getElementById('header');
      const showMenu = document.querySelector('.show-menu');
  
      if (!headerClass || !showMenu) return;
  
      headerClass.classList.toggle('over-elements');
      showMenu.classList.toggle('show');
    };

    const handleMenuClick = (e : any) => {
      e.stopPropagation();
    };
  
  return (
    <header id="header">
    <div className="container">  
        <div className="logo">Time Watches</div>
        <nav>
          <FontAwesomeIcon onClick={toggleMenu} className="toggle-menu" icon={faBars} />
          <ul className="show-menu" onClick={handleMenuClick}>
            <li><a href={"/"} className="active">Home</a></li>
            <li><a href="#watches">Watches</a></li>
            <li><a href="#about-us">About</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
            <li><a href={"/Dashboard"} className="dashboard">Dashboard</a></li>
          </ul>
        </nav>
    </div>
  </header>
  );
}
// header toggle
