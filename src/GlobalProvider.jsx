import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <GlobalContext.Provider value={{ started, setStarted, ready, setReady }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
