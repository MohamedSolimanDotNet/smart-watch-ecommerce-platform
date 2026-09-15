import PaginationRange from "../utils/PaginationRange";


export default function Pagination(Props : any) {

  let list = PaginationRange(Props.totalPage, Props.page, Props.limit, Props.siblings);
  return (
    <ul className="pagination pagination-md justify-content-end">
      <li className="page-item"><span onClick={() => Props.onPageChange("&laquo;")} 
          style={Props.page === 1 ? {backgroundColor: "#9a9a9a", color: "#FFF", cursor: "not-allowed"} : {}} 
          className="page-link">&laquo;</span></li>

      <li className="page-item"><span onClick={() => Props.onPageChange("Previous")} 
          style={Props.page === 1 ? {backgroundColor: "#9a9a9a", color: "#FFF", cursor: "not-allowed"} : {}} 
          className="page-link">Previous</span></li>

      {list.map((value:any, index:any) => (
        <li key={index} className={`page-item ${value === Props.page ? "active" : ""}`}><span onClick={() => Props.onPageChange(value)} className="page-link">{value}</span></li>
      ))}

      <li className="page-item"><span onClick={() => Props.onPageChange("Next")} 
        style={Props.page === Props.totalPage ? {backgroundColor: "#9a9a9a", color: "#FFF", cursor: "not-allowed"} : {}} 
        className="page-link">Next</span></li>

      <li className="page-item"><span onClick={() => Props.onPageChange("&raquo;")} 
        style={Props.page === Props.totalPage ? {backgroundColor: "#9a9a9a", color: "#FFF", cursor: "not-allowed"} : {}} 
        className={`page-link `}>&raquo;</span></li>
    </ul>
  );
}