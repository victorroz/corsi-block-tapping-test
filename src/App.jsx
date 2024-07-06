import { useEffect } from "react";
import { useGlobalContext } from "./GlobalProvider";

import { Button, useMantineColorScheme } from "@mantine/core";
import "./App.css";
import Instructions from "./Instructions";

function App() {
  const { started, setStarted } = useGlobalContext();

  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => setColorScheme("dark"), [setColorScheme]);

  return (
    <div>
      {!started ? (
        <Button
          variant="outline"
          color="orange"
          size="xl"
          onClick={() => setStarted(true)}
        >
          Click me to start
        </Button>
      ) : (
        <Instructions />
      )}
    </div>
  );
}

export default App;
