import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import WorkingDirectoryContextProvider from "./WorkingDirectoryContext";

interface UsernameContextType {
  username: string;
  setUsername: (username: string) => void;
}

const UsernameContext = createContext<null | UsernameContextType>(null);

export function useUsernameContext() {
  const context = useContext(UsernameContext);

  if (!context) {
    throw new Error(
      "useUsernameContext must be used within a UsernameContextProvider"
    );
  }

  return context;
}

interface UsernameContextProviderProps extends PropsWithChildren { }

const UsernameContextProvider: FC<UsernameContextProviderProps> = ({
  children,
}) => {
  const [username, setUsername] = useLocalStorage("username", "root");

  function handleUsernameChange(possibleUsername?: string | null) {
    const newUsername = possibleUsername || "root";
    setUsername(newUsername);
  }

  // useEffect(() => {
  //   document.title = `${username}@${hostname}: ${workingDirectory}`;
  // }, [username]);

  return (
    <UsernameContext.Provider
      value={{ username, setUsername: handleUsernameChange }}
    >
      <WorkingDirectoryContextProvider username={username}>
        {children}
      </WorkingDirectoryContextProvider>
    </UsernameContext.Provider>
  );
};

export default UsernameContextProvider;
