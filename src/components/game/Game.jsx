import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "./lib/gameField";
import Field from "./Field";
import "./style/game.css";
import SelectShip from "./SelectShip";
import PreviewDeploy from "./previewDeploy";
import initShips from "./lib/initShips";
import AiGameField from "./lib/aiGameField";
import { useNavigate } from "react-router-dom";
import { GameContextProvider } from "../../contexts/GameContext";

const Game = () => {
  const [aiField, setAiField] = useState(new AiGameField(10, 10, initShips));
  const [field, setField] = useState(new GameField(10, 10, "empty"));
  const [isWin, setIsWin] = useState(undefined);
  const [enemyField, setEnemyField] = useState(
    new GameField(10, 10, "unknown")
  );
  const [selectedShip, setSelectedShip] = useState();
  const [shipsToDeploy, setShipsToDeploy] = useState(initShips);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (shipsToDeploy.length > 0) return;
    if (field.deployedShips === 0) setIsWin(false);
    if (aiField.deployedShips === 0) setIsWin(true);
  }, [field, aiField]);

  useEffect(()=> {
    setMessage("")
  }, [selectedShip])

  const deploySelectedShip = (coords) => {
    if (!selectedShip) return;
    setField((prev) => {
      const newGameField = cloneDeep(prev);
      const isAdded = newGameField.addShip(selectedShip, coords);
      if (isAdded) {
        setShipsToDeploy((prev) =>
          prev.filter((x) => x.id !== selectedShip.id)
        );
        setSelectedShip(null);
      }
      setMessage("ship out of bounds")
      return newGameField;
    });
  };

  const shoot = (coords) => {
    if (enemyField.getState(coords) !== "unknown") return;
    if (isWin !== undefined) return;
    setAiField(aiField.shoot(coords));
    setEnemyField(
      enemyField.changeCell(
        coords,
        aiField.getState(coords),
        aiField.getShipId(coords)
      )
    );
    if (enemyField.getState(coords) === "d-ship")
      setEnemyField(enemyField.shotShip(coords));
    setField((prev) => {
      return aiField.aiShot(prev);
    });
  };

  return (
    <GameContextProvider>
    <div className="game-container">
      {isWin !== undefined && (
        <h1 className="pointer" onClick={() => navigate("/")}>{`${
          isWin ? "You won" : "You lost"
        }. Exit to menu`}</h1>
      )}
      {isWin === undefined && (
        <h1>{`${
          shipsToDeploy.length > 0 ? "Deploy your ships" : "Destroy your enemy"
        } `}</h1>
      )}

      <div className="game">
        <div className="field-container">
          <h2>{`My field. Deployed: ${field.deployedShips}`}</h2>
          <Field field={field.field} handleCellClick={deploySelectedShip} id="main" message={message} />
          {selectedShip ? <PreviewDeploy gameField={selectedShip.gameField}/>: <></>}

        </div>
        {shipsToDeploy.length === 0 && (
          <div className="field-container">
            <h2>{`Enemy field. Deployed: ${aiField.deployedShips}`}</h2>
            <Field field={enemyField.field} handleCellClick={shoot} />
          </div>
        )}
      </div>
      {shipsToDeploy.length > 0 && (
        <SelectShip
          setSelectedShip={setSelectedShip}
          shipsToDeploy={shipsToDeploy}
          setShipsToDeploy={setShipsToDeploy}
        />
      )}
    </div>
    </GameContextProvider>
  );
};

export default Game;
