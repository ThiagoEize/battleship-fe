import "./style/cell.css";
import crossImg from "../../assets/cross.svg";
import { UseGameContext } from "../../contexts/GameContext";
import { useRef } from "react";

const cellSize = 30; //!!! Important !!!//

const Cell = ({ cellState, handleCellClick }) => {
  const {setSelectedCell}= UseGameContext()
  
  const cellPos = useRef(null)
  const { coord, state } = cellState;
  return (
    <div
    onMouseEnter={(e)=>{
      setSelectedCell(e)
    }}
    ref={cellPos}
      onClick={() => {
        handleCellClick(coord);
      }}
      className={`cell`}
      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
    >
      <div className={`cell-inner cell-${state}`}>
        {["d-ship", "w-ship", "s-empty"].includes(state) && (
          <img src={crossImg} />
        )}
      </div>
    </div>
  );
};

export default Cell;
