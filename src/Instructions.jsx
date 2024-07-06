import { List, Button, Center } from "@mantine/core";

import { useGlobalContext } from "./GlobalProvider";
import Countdown from "./Countdown";

const Instructions = () => {
  const { ready, setReady } = useGlobalContext();

  return (
    <>
      {!ready ? (
        <>
          <List type="ordered" size="xl" withPadding spacing={10}>
            <List.Item>You will need a mouse for this task.</List.Item>
            <List.Item>You will see 9 (nine) blocks on the screen.</List.Item>
            <List.Item>
              Some blocks will <strong>light up</strong> (yellow) in a sequence.
            </List.Item>
            <List.Item>
              Once you hear <strong>GO</strong>, you need to click on the blocks
              in the same sequence.
            </List.Item>
            <List.Item>The sequences will get longer.</List.Item>
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
    </>
  );
};

export default Instructions;
