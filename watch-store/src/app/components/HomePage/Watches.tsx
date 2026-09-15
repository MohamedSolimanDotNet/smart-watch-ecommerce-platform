import Image from "next/image";

export default function Watches(props : any) {
  return (
    <div className={`${props.statuses === "Featured" ? "col-md-6" : "col-md-3"} ${props.DisplayWatch ? "hidden-watch" : ""}`}>
      <div className="box position-relative">
        <div className="title">{props.statuses}</div>
        <a className="link-img" href="#">
          <div className="img-box">
            <img src={props.img} width={100} height={175} alt={props.title} />
          </div>
        </a>
        <div className="info d-flex justify-content-between">
          <span className="fw-bold">{props.title}</span>
          <span className="fw-bold">Price: <span className="price">{props.price}</span></span>
        </div>
      </div>
    </div>
  );
}