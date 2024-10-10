import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { hostname } from "../../TerminalConfig.json";

interface TerminalPromptProps {
  children?: ReactNode;
  username: string;
}

const TerminalPrompt: FC<TerminalPromptProps> = ({ children, username, workingDirectory }) => {
  const isRoot = username === "root";
  const borderColor = isRoot ? "text-blue" : "text-green";
  const usernameColor = isRoot ? "text-cyan" : "text-blue";

  const icon = isRoot ? <>🌱</> : <>👨‍💻</>;

  return (
    <div className="relative flex w-full flex-col">
      <div
        className={twMerge(
          "before:content[''] after:content[''] ml-5 select-none font-bold before:absolute before:left-0.5 before:top-1/4 before:h-[2px] before:w-5 before:-translate-y-[2px] after:absolute after:left-0.5 after:h-1/2 after:w-[2px] after:translate-y-1/2",
          isRoot && "before:bg-blue after:bg-blue",
          !isRoot && "before:bg-green after:bg-green"
        )}
      >
        <span className={borderColor}>(</span>
        <span className={usernameColor}>
          {username}
          {icon}
          {hostname}
        </span>
        <span className={borderColor}>)-[</span>
        <span className="text-yellow">{workingDirectory}</span>
        <span className={borderColor}>]</span>
      </div>

      <div
        className={twMerge(
          "before:content[''] ml-3 flex items-center gap-0 before:absolute before:left-0.5 before:top-[75%] before:h-[2px] before:w-3 before:-translate-y-[2px]",
          isRoot && "before:bg-blue",
          !isRoot && "before:bg-green"
        )}
      >
        <span
          className={twMerge("ml-0.5 select-none font-bold", usernameColor)}
        >
          {isRoot ? "#" : "$"}
        </span>

        <div className="relative w-full pl-2 text-sm text-fg">{children}</div>
      </div>
    </div>
  );
};

export default TerminalPrompt;
