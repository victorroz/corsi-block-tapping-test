import { useState, useEffect } from "react";
import { Center } from "@mantine/core";
import useSound from "use-sound";
import CorsiBlocks from "./CorsiBlocks";

import go from "/go.mp3";

const Countdown = () => {
  const counter = [3, 2, 1];
  const [index, setIndex] = useState(0);
  const [popClass, setPopClass] = useState("");

  useEffect(() => {
    if (index < counter.length) {
      setPopClass("pop");
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    if (popClass) {
      const timer = setTimeout(() => {
        setPopClass("");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [popClass]);

  const [play] = useSound(go);

  return (
    <>
      {index === 3 ? (
        <>
          {play()}
          <CorsiBlocks />
        </>
      ) : (
        <>
          <h3>Get ready in</h3>
          <Center>
            <h1 className={popClass}>{counter[index]}</h1>
          </Center>
        </>
      )}
    </>
  );
};

export default Countdown;
