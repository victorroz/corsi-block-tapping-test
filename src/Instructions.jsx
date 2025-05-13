import { List, Button, Center } from "@mantine/core";
import useSound from "use-sound";
import "./App.css";

import { useGlobalContext } from "./GlobalProvider";
import Countdown from "./Countdown";
import go from "./go.mp3";

const Instructions = () => {
  const { ready, setReady } = useGlobalContext();

  const [play] = useSound(go);

  return (
    <Center className="center">
      {!ready ? (
        <>
          <List type="ordered" size="xl" withPadding spacing={10}>
            <List.Item>You will need a mouse for this task.</List.Item>
            <List.Item>You will see 9 (nine) blocks on the screen.</List.Item>
            <List.Item>
              Some blocks will <strong>light up</strong> (yellow) in a sequence.
            </List.Item>
            <List.Item>
              Once you hear{" "}
              <button onClick={() => play()} className="go-btn">
                <strong>GO</strong>
              </button>{" "}
              , you need to click on the blocks in the same sequence.
            </List.Item>
            <List.Item>The sequences will get longer.</List.Item>
            <List.Item>
              <b>
                <u>KEEP IN MIND</u>
              </b>
              , once you select a block you cannot unselect it.
            </List.Item>
          </List>

          <Center mt={50}>
            <Button
              variant="outline"
              color="orange"
              size="xl"
              onClick={() => setReady(true)}
            >
              Click me when ready
            </Button>
          </Center>
        </>
      ) : (
        <Countdown />
      )}
    </Center>
  );
};

export default Instructions;
