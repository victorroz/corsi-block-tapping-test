import { useEffect } from "react";
import { useGlobalContext } from "./GlobalProvider";

import { Flex, Button, TextInput, useMantineColorScheme } from "@mantine/core";
import "./App.css";
import Instructions from "./Instructions";

function App() {
  const { started, setStarted, participantId, setParticipantId } =
    useGlobalContext();

  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => setColorScheme("dark"), [setColorScheme]);

  return (
    <div>
      {!started ? (
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <TextInput
            variant="filled"
            size="xl"
            placeholder="Enter Participant ID"
            value={participantId}
            onChange={(e) => setParticipantId(e.currentTarget.value)}
          />
          <Button
            variant="outline"
            color="orange"
            size="xl"
            onClick={() => setStarted(true)}
            disabled={!participantId}
          >
            Click me to start
          </Button>
        </Flex>
      ) : (
        <Instructions />
      )}
    </div>
  );
}

export default App;
