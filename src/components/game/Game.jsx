import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import GameField from "./lib/gameField";
import Field from "./Field";
import "./style/game.css";
import SelectShip from "./SelectShip";
import initShips from "./lib/initShips";
import AiGameField from "./lib/aiGameField";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "react-audio-player";

const Game = () => {
  const [aiField, setAiField] = useState(new AiGameField(10, 10, initShips));
  const [field, setField] = useState(new GameField(10, 10, "empty"));
  const [isWin, setIsWin] = useState(undefined);
  const [enemyField, setEnemyField] = useState(
    new GameField(10, 10, "unknown")
  );
  const [selectedShip, setSelectedShip] = useState();
  const [shipsToDeploy, setShipsToDeploy] = useState(initShips);

  const navigate = useNavigate();

  useEffect(() => {
    if (shipsToDeploy.length > 0) return;
    if (field.deployedShips === 0) setIsWin(false);
    if (aiField.deployedShips === 0) setIsWin(true);
  }, [field, aiField]);

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
    <div className="game-container">
      {
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2022/05/24/audio_7ba9344ade.mp3?filename=epic-piano-111910.mp3"
          autoPlay
          loop
        />
      }
      {isWin === true && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3"
          autoPlay
        />
      )}
      {isWin === false && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c20f9c798.mp3?filename=failure-2-89169.mp3"
          autoPlay
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1
          className="pointer"
          style={{
            color: isWin === undefined ? "initial" : isWin ? "green" : "red",
          }}
        >
          {isWin !== undefined && (
            <>
              <span>{isWin ? "You win" : "You lose"}</span>
              <br />
              <br />
              <span
                className="pointer"
                onClick={() => window.location.reload()}
              >
                {" "}
                Restart{" "}
              </span>
              <br />
              <span className="pointer" onClick={() => navigate("/")}>
                {" "}
                Back to menu{" "}
              </span>
            </>
          )}
        </h1>
      </div>
      {isWin === undefined && (
        <h1 className="centeredText">
          {`${
            shipsToDeploy.length > 0
              ? "Deploy your ships"
              : "Destroy your enemy"
          } `}
        </h1>
      )}

      <div className="game">
        <div className="field-container">
          <h2>
            <span class="text">My field. Deployed :</span>
            <span class="number">{field.deployedShips}</span>
          </h2>
          <Field field={field.field} handleCellClick={deploySelectedShip} />
        </div>
        {shipsToDeploy.length === 0 && (
          <div className="field-container">
            <h2>
              <span>Enemy field. Deployed :</span>
              <span class="number">{aiField.deployedShips}</span>
            </h2>
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
  );
};

export default Game;
