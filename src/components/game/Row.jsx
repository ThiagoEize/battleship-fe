import Cell from "./Cell";
import "./style/row.css";
const Row = ({ row, handleCellClick }) => {
  return (
    <div className="row">
      {row.map((v, i) => (
        <Cell cellState={v} key={i} handleCellClick={handleCellClick} />
      ))}
    </div>
  );
};

export default Row;
