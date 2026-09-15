import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMapMarker, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./footer.css"

export default function Footer() {
  return(
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 footer-col">
            <div className="footer_detail">
              <h4>
                About
              </h4>
              <p>
                Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with
              </p>
              <div className="footer_social">
                <a href="">
                  <FontAwesomeIcon icon={faFacebookF} aria-hidden={true} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faTwitter} aria-hidden={true} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faLinkedin} aria-hidden={true} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faInstagram} aria-hidden={true} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 footer-col">
            <div className="footer_contact">
              <h4>
                Reach at..
              </h4>
              <div className="contact_link_box">
                <Link href="">
                  <FontAwesomeIcon icon={faMapMarker} aria-hidden={true} />
                  <span>
                    Location
                  </span>
                </Link>
                <Link href="">
                  <FontAwesomeIcon icon={faPhone} aria-hidden={true} />
                  <span>
                    Call +01 1234567890
                  </span>
                </Link>
                <Link href="">
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden={true} />
                  <span>
                    demo@gmail.com
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 footer-col">
            <div className="footer_contact">
              <h4>
                Subscribe
              </h4>
              <form action="#">
                <input type="text" placeholder="Enter email" />
                <button type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
        <div className="footer-info">
          <p>
            © <span id="displayYear">2024</span> All Rights Reserved By
            <Link href="https://mohamedsolimanporfolio.kesug.com/">Mohamed Soilman</Link>
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}