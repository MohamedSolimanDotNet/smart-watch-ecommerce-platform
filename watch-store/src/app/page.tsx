"use client";
import "./home.css";
import Image from "next/image";
import { LandingData, FeaturesWatchData, TestimonialData } from "./components/Data";
import LandingHome from "./components/HomePage/LandingHome";
import Watches from "./components/HomePage/Watches";
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import FeaturesWatches from "./components/HomePage/FeaturesWatches";
import Testimonial from "./components/HomePage/Testimonial";
import Layout from "./components/layout";
import Url from "@/app/api/Url";
import axios from "axios";


export default function Home() {

  // for swiperjs
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // for swiperjs
  const progressContentt = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeftt = (time: number) => {

    if (progressContentt.current) {
      progressContentt.current.textContent = `${Math.ceil(time / 1000)}s`;
    }

  };

  // watches data
  const mainUrl = Url();
  const [userData, setUserData] = useState([]);
  async function Refresh() {
    try {

      const response = await axios.get(`${mainUrl}Watches`);
      setUserData(response.data);

    } catch (error:any) {
      console.log(error);
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    Refresh();
  }, []);


  
  // to view other hidden watches
  const showWatches = () => {
    let hiddenWatch = document.querySelectorAll(".hidden-watch");
    hiddenWatch.forEach((w) => {
      w.classList.add("show-watch");
    });
    document.querySelector(".view-all")?.classList.add("hidden-watch");
  }
   // to view other hidden watches
    const showFeatureWatches = () => {
      let hiddenWatch = document.querySelectorAll(".hidden-feature-watch");
      hiddenWatch.forEach((w) => {
        w.classList.add("show-feature-watch");
      });
      document.querySelector(".view-all-feature")?.classList.add("hidden-feature-watch");
    }

  return (
    <Layout hideLayout={false}>
      <main>
        {/* landing section */}
        <section className="Landing">
          <Swiper slidesPerView={1} loop={true} pagination={{ clickable: true,}} 
            autoplay={{ delay: 10000, disableOnInteraction: false,}} centeredSlides={true}
            modules={[Autoplay, Pagination, Navigation]} onAutoplayTimeLeft={onAutoplayTimeLeft} className="mySwiper">
            {LandingData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <LandingHome
                        title={slide.title}
                        desc={slide.desc}
                        linkText={slide.linkText}
                        link={slide.link}
                        img={slide.img}
                      />
                    </SwiperSlide>
                    
                ))}
                <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </section>

        {/* latest wathes section */}
        <section id="watches" className="watches">
          <div className="container">
            <div className="row content">
              <h1 className="latest-watch-title">Latest Watches</h1>
              {
                userData.map((data:any, index) => (
                  <Watches key={index} statuses={data.statuses} title={data.title} price={data.price} 
                    img={data.productUrl} DisplayWatch={index++ > 5 ? true : false} />
                ))
              }
            </div>
            <div className="btn-box">
              <a className="view-all" onClick={showWatches}>View All</a>
            </div>
          </div>
        </section>

        {/* about us */}
        <section id="about-us" className="about_section layout_padding">
          <div className="container  ">
            <div className="row">
              <div className="col-md-6 col-lg-5 ">
                <div className="img-box">
                  <Image width={375} height={470} src="/about-img.png" alt="watch" />
                </div>
              </div>
              <div className="col-md-6 col-lg-7 d-flex justify-content-center align-items-center">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>
                      About Us
                    </h2>
                  </div>
                  <p>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                    in some form, by injected humour, or randomised words which do not look even slightly believable. If you
                    are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in
                    the middle of text. All
                  </p>
                  <a href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Watches */}
        <section className="feature_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>
                Features Of Our Watches
              </h2>
              <p>
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="row">
              {
                FeaturesWatchData.map((data, index) =>  (
                  <FeaturesWatches key={index} img={data.img} title={data.title} desc={data.desc} hiddenFeatureWatch={data.hiddenFeatureWatch}  />
                ))
              }
            </div>
            <div className="btn-box">
              <a className="view-all-feature" onClick={showFeatureWatches}>View More</a>
            </div>
          </div>
        </section>

        {/* contact section */}
        <section id="contact-us" className="contact_section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form_container">
                  <div className="heading_container">
                    <h2>
                      Contact Us
                    </h2>
                  </div>
                  <form action="https://formsubmit.co/mohamedsayko354@gmail.com" method="POST">
                    <div>
                      <input type="text" placeholder="Full Name " />
                    </div>
                    <div>
                      <input type="email" placeholder="Email" />
                    </div>
                    <div>
                      <input type="text" placeholder="Phone number" />
                    </div>
                    <div>
                      <input type="text" className="message-box" placeholder="Message" />
                    </div>
                    <div className="d-flex ">
                      <button>
                        SEND
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <Image width={555} height={600} src="/contact-img.jpg" alt="contact-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* testimonial section */}
        <section className="testimonial">
          <div className="container">
            <div className="heading_container">
              <h2 className="text-center">
                Testimonial
              </h2>
            </div>
            <Swiper slidesPerView={2} loop={true} spaceBetween={30} pagination={{clickable: true,}}
              autoplay={{ delay: 3000, disableOnInteraction: false,}} onAutoplayTimeLeft={onAutoplayTimeLeftt}
              modules={[Autoplay, Pagination, Navigation]} className="mySwiper" >
              {
                TestimonialData.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Testimonial img={data.img} desc={data.desc} title={data.title} CutomerName={data.CutomerName} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </section>
      </main>
    </Layout>
   
  );
}
