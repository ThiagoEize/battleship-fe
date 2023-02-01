import Cell from "./Cell";
import "./style/cell.css";
import GameField from "./lib/gameField";
import Field from "./Field";
import { UseGameContext } from "../../contexts/GameContext";

export default function PreviewDeploy({ gameField }) {
    const {selectedCell} = UseGameContext()
    console.log();
    const  {top, left} = selectedCell.target.getBoundingClientRect()
  return (
    <div style={{top: top, left: left}}className="preview">
      <Field field={gameField.field} />
    </div>
  );
}
