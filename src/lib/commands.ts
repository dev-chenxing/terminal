import { Prompt } from "../types";
import cat from "./commands/cat";
import cd from "./commands/cd";
import curl from "./commands/curl";
import ls from "./commands/ls";

const COMMANDS: Record<
  string,
  (username: string, args: string[], history: string[], workingDirectory: string) => string
> = {
  cd: (_, args) => cd(args),
  curl: async (_, args) => curl(args),
  su: () => "",
  whoami: (username) => username,
  pwd: () => "/",
  date: () => new Date().toLocaleDateString(),
  github: () => openLink("https://github.com/"),
  cat: (_, args) => cat(args),
  ls: (_, __, ___, workingDirectory) => ls(workingDirectory),
  echo: (_, args) => args.join("&nbsp;"),
  history: (_, __, history) => history.join("<br/>"),
};

export const COMMAND_NAMES = [...Object.keys(COMMANDS), "clear", "help"].sort(
  (a, z) => a.localeCompare(z)
);

export function getCommandResponse(
  { command, sudo, args }: Prompt,
  username: string,
  history: string[],
  workingDirectory: string
) {
  if (sudo && !command) return "Usage: sudo [command] [args]";
  if (!command) return "";

  if (command in COMMANDS) {
    let result = COMMANDS[command](username, args, history, workingDirectory);
    result = result.replace(/\n/g, "<br/>");
    return result;
  }

  if (command === "help") {
    return COMMAND_NAMES.join("<br/>")
  }

  return `${command}: command not found`;
}

function openLink(url: string) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 1000);
  return `Redirecting to <a href="" target="_blank" rel="noreferrer noopener">${url}</a>...`;
}
