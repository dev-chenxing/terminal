import { FC, Fragment, useEffect, useRef, useState } from "react";
import TerminalPrompt from "./TerminalPrompt";
import TerminalPromptInput from "./TerminalPromptInput";
import { History } from "../../types";
import { getColorfulPrompt, processPrompt } from "../../lib/utils";
import { v4 as uuidv4 } from "uuid";
import parse from "html-react-parser";
import { useUsernameContext } from "../../context/UsernameContext";
import { getCommandResponse } from "../../lib/commands";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import welcome from "../../lib/welcome";

interface TerminalBodyProps {}

const TerminalBody: FC<TerminalBodyProps> = () => {
  const { username, setUsername } = useUsernameContext();

  const [history, setHistory] = useState<History[]>([]);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [promptHistory, setPromptHistory] = useLocalStorage<string[]>(
    "promptHistory",
    []
  );

  const scrollToRef = useRef<HTMLDivElement>(null);

  function handleClear() {
    setHistory([]);
    setWelcomeVisible(false);
  }

  function handlePromptEnter(prompt: string) {
    const { command, args, sudo } = processPrompt(prompt);

    if (command) {
      setPromptHistory((prev) => [...prev, prompt]);
    }

    if (command === "clear") {
      handleClear();
      return;
    }

    if (command === "su") {
      setUsername(args[0]);
    }

    setHistory((prev) => [
      ...prev,
      {
        id: uuidv4(),
        prompt,
        username,
        response: getCommandResponse(
          { command, args, sudo },
          username,
          promptHistory
        ),
      },
    ]);
  }

  useEffect(() => {
    scrollToRef.current?.scrollIntoView({ behavior: "instant" });
  }, [history]);

  return (
    <section className="terminal-scrollbar h-full w-full overflow-y-scroll px-1 pb-2 pt-1 text-sm text-fg [&_a]:cursor-default hover:[&_a]:underline [&_b]:text-cyan">
      {welcomeVisible && parse(welcome + "<br/><br/>")}

      {history.map((item) => (
        <Fragment key={item.id}>
          <TerminalPrompt username={item.username}>
            {parse(getColorfulPrompt(item.prompt))}
          </TerminalPrompt>
          <div>
            {parse(
              item.response + (item.response?.trim() ? "<br/><br/>" : "<br/>")
            )}
          </div>
        </Fragment>
      ))}

      <TerminalPrompt username={username}>
        <TerminalPromptInput
          history={promptHistory}
          onEnter={handlePromptEnter}
          onClear={handleClear}
        />
      </TerminalPrompt>

      <div ref={scrollToRef} />
    </section>
  );
};

export default TerminalBody;
