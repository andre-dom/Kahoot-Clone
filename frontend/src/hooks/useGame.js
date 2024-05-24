import { useContext } from "react";
import GameContext from "../Context/GameProvider";

/*
 * removes the need to import gameContext and using useContext hook
 * we can make the code cleaner by just making our own hook that returns
 * the context.
 */
const useGame = () => {
  return useContext(GameContext);
};

export default useGame;
