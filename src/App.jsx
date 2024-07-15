import { useEffect } from "react";
import { useGlobalContext } from "./GlobalProvider";
import {
  Flex,
  Button,
  TextInput,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

import { IconMaximize } from "@tabler/icons-react";
import "./App.css";
import Instructions from "./Instructions";

function App() {
  const { started, setStarted, participantId, setParticipantId } =
    useGlobalContext();

  const { toggle, fullscreen } = useFullscreen();
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => setColorScheme("dark"), [setColorScheme]);

  return (
    <div className="app-container center">
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

      {!fullscreen && (
        <div className="fullscreen-icon">
          <ActionIcon variant="transparent" onClick={toggle}>
            <IconMaximize stroke={2} />
          </ActionIcon>
        </div>
      )}
    </div>
  );
}

export default App;
