
export default function SelectLimitsPagination(Props:any) {
  return (
    <select onClick={(e:any) => Props.onLimitChange(e.target.value)} className="select">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  )
}