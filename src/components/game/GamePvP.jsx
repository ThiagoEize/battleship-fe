import { useContext, useEffect, useState } from "react";
import { cloneDeep, set } from "lodash";
import GameField from "./lib/gameField";
import Field from "./Field";
import "./style/game.css";
import SelectShip from "./SelectShip";
import initShips from "./lib/initShips";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import sendScore from "./lib/sendScore";
import AudioPlayer from "react-audio-player";

const initEnemyField = new GameField(10, 10, "unknown");
initEnemyField.deployedShips = initShips.length;

const socket = io(
  `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_WS_PORT}`
);

const Game = () => {
  const { userId } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [gamePhase, setGamePhase] = useState("wait-player");
  const [isMyMove, setIsMyMove] = useState();
  const [isWin, setIsWin] = useState();
  const [playDeploymentSound, setPlayDeploymentSound] = useState(false);
  const [playShotMissSound, setPlayShotMissSound] = useState(false);
  const [playShotHitSound, setPlayShotHitSound] = useState(false);

  useEffect(() => {
    socket.on("deployment", () => {
      setGamePhase("deployment");
    });

    socket.on("battle", (isMyMove) => {
      setIsMyMove(isMyMove);
      setGamePhase("battle");
    });

    socket.on("shot", (coords) => {
      setField((prev) => {
        const newField = prev.shoot(coords);
        socket.emit(
          "hit",
          coords,
          newField.getState(coords),
          newField.getShipId(coords)
        );
        if (newField.deployedShips === 0) socket.emit("game-over");
        return newField;
      });
      setIsMyMove(true);
    });
    socket.on("hit", (coords, state, shipId) => {
      setEnemyField(enemyField.changeCell(coords, state, shipId));
      if (state === "d-ship") {
        setPlayShotHitSound(true);
        setTimeout(() => {
          setPlayShotHitSound(false);
        }, 500);
        setEnemyField(enemyField.shotShip(coords));
      } else {
        setPlayShotMissSound(true);
        setTimeout(() => {
          setPlayShotMissSound(false);
        }, 500);
      }
      setIsMyMove(false);
    });
    socket.on("game-over", (isWin) => {
      setGamePhase("game-over");
      setIsWin(isWin);
      sendScore(field.deployedShips - enemyField.deployedShips, userId);
    });
  }, []);

  const [field, setField] = useState(new GameField(10, 10, "empty"));
  const [enemyField, setEnemyField] = useState(initEnemyField);
  const [selectedShip, setSelectedShip] = useState();
  const [shipsToDeploy, setShipsToDeploy] = useState(initShips);

  useEffect(() => {
    if (shipsToDeploy.length === 0) socket.emit("deployed");
  }, [shipsToDeploy]);

  const deploySelectedShip = (coords) => {
    if (!selectedShip) return;
    setField((prev) => {
      const newGameField = cloneDeep(prev);
      const isAdded = newGameField.addShip(selectedShip, coords);
      if (isAdded) {
        setPlayDeploymentSound(true);
        setShipsToDeploy((prev) =>
          prev.filter((x) => x.id !== selectedShip.id)
        );
        setSelectedShip(null);
      }
      setTimeout(() => {
        setPlayDeploymentSound(false);
      }, 500);
      return newGameField;
    });
  };

  const shoot = (coords) => {
    if (enemyField.getState(coords) !== "unknown") return;
    socket.emit("shot", coords);
  };

  return (
    <div className="game-container">
      {playShotHitSound && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3"
          autoPlay
        />
      )}
      {playShotMissSound && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_d5ed57b584.mp3?filename=error-sound-39539.mp3"
          autoPlay
        />
      )}
      {playDeploymentSound && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_a5fa3caf34.mp3?filename=good-6081.mp3"
          autoPlay
        />
      )}
      <AudioPlayer
        src="https://cdn.pixabay.com/download/audio/2021/11/24/audio_838dbb98e5.mp3?filename=inspiring-epic-motivation-cinematic-trailer-11218.mp3"
        autoPlay
        loop
      />
      {isWin === true && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3"
          autoPlay
        />
      )}
      {isWin === false && (
        <AudioPlayer
          src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c20f9c798.mp3?filename=failure-2-89169.mp3"
          autoPlay
        />
      )}
      {gamePhase === "wait-player" && (
        <h1 className="centeredText">Waiting for another player...</h1>
      )}
      {gamePhase === "deployment" && (
        <h1 className="centeredText">Deploy your ships</h1>
      )}
      {gamePhase === "battle" && <h1>Destroy your enemy</h1>}
      {gamePhase === "game-over" && (
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
      )}
      {gamePhase === "battle" && (
        <h1>{`${isMyMove ? "Your move" : "Enemy move"}`}</h1>
      )}
      <div className="game">
        <div className="field-container">
          <h3>
            <span>My field. Deployed :</span>
            <span class="number">{field.deployedShips} </span>
          </h3>
          <Field field={field.field} handleCellClick={deploySelectedShip} />
        </div>
        {shipsToDeploy.length === 0 && (
          <div className="field-container">
            <h3>
              <span>Enemy field. Deployed :</span>
              <span class="number">{enemyField.deployedShips} </span>
            </h3>
            <Field
              field={enemyField.field}
              handleCellClick={
                isMyMove && gamePhase === "battle" ? shoot : () => {}
              }
            />
          </div>
        )}
      </div>
      {gamePhase === "deployment" && (
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
