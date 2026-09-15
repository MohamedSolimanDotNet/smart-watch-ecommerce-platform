import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Testimonial(props:any) {
  return(
    <div className="box">
      <div className="img-box">
        <Image width={110} height={110} src={props.img} alt={props.img} />
      </div>
      <div className="detail-box">
        <div className="client_info">
          <div className="client_name">
            <h5>
              {props.CutomerName}
            </h5>
            <h6>
              {props.title}
            </h6>
          </div>
          <FontAwesomeIcon icon={faQuoteLeft} aria-hidden={true} />
        </div>
        <p>
          {props.desc}
        </p>
      </div>
    </div>
  )
}