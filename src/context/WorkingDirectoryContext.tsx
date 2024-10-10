import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { hostname } from "../TerminalConfig.json";
import { filesystem } from "../lib/filesystem";

interface WorkingDirectoryContextType {
    workingDirectory: string;
    setWorkingDirectory: (workingDirectory: string) => void;
}

const WorkingDirectoryContext = createContext<null | WorkingDirectoryContextType>(null);

export function useWorkingDirectoryContext() {
    const context = useContext(WorkingDirectoryContext);

    if (!context) {
        throw new Error(
            "useWorkingDirectoryContext must be used within a WorkingDirectoryContextProvider"
        );
    }

    return context;
}

interface WorkingDirectoryContextProviderProps extends PropsWithChildren { username: string }

const WorkingDirectoryContextProvider: FC<WorkingDirectoryContextProviderProps> = ({
    username,
    children,
}) => {
    const [workingDirectory, setWorkingDirectory] = useLocalStorage("workingDirectory", "~");

    function handleWorkingDirectoryChange(possibleWorkingDirectory?: string | null) {
        const newWorkingDirectory = possibleWorkingDirectory || "~";
        if (filesystem[newWorkingDirectory]) {
            setWorkingDirectory(newWorkingDirectory);
        } else if (newWorkingDirectory == "~")
            setWorkingDirectory("~")
    }

    useEffect(() => {
        document.title = `${username}@${hostname}: ${workingDirectory}`;
    }, [username, workingDirectory]);

    return (
        <WorkingDirectoryContext.Provider
            value={{ workingDirectory, setWorkingDirectory: handleWorkingDirectoryChange }}
        >
            {children}
        </WorkingDirectoryContext.Provider>
    );
};

export default WorkingDirectoryContextProvider;
