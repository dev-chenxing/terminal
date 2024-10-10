import { FC } from "react";
import { GrFormClose } from "react-icons/gr";
import { useUsernameContext } from "../../context/UsernameContext";
import { IoTerminal } from "react-icons/io5";
import { hostname } from "../../TerminalConfig.json";

interface TerminalHeaderProps {}

const TerminalHeader: FC<TerminalHeaderProps> = () => {
  const { username } = useUsernameContext();

  return (
    <header className="relative flex select-none items-center justify-between rounded-tl-md rounded-tr-md border-b border-solid border-black/[.3] bg-black/[.5] px-4 py-2.5 font-segoe font-semibold">
      <IoTerminal className="text-muted opacity-75" />

      <div className="absolute left-1/2 top-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 text-muted">
        {username}@{hostname}: ~
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        <button
          aria-label="Close terminal"
          type="button"
          className="relative h-4 w-4 cursor-pointer rounded-full border border-solid border-black/[.5] bg-blue text-base text-black transition-all hover:bg-bright-blue"
        >
          <GrFormClose className="absolute left-1/2 top-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2" />
        </button>
      </div>
    </header>
  );
};

export default TerminalHeader;
