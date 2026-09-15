import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

export default function FeaturesWatches(props : any) {
  return(
    <div className={props.hiddenFeatureWatch ? "col-sm-6 col-lg-3 hidden-feature-watch" : "col-sm-6 col-lg-3"}>
      <div className="box">
        <div className="img-box">
          <Image width={75} height={75} src={props.img} alt={props.img} />
        </div>
        <div className="detail-box">
          <h5>
            {props.title}
          </h5>
          <p>
            {props.desc}
          </p>
          <Link className="read-more" href="#">
            <span>
              Read More
            </span>
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </Link>
        </div>
      </div>
  </div>
  );
}