import { Prompt } from "../types";
import cat from "./commands/cat";
import cd from "./commands/cd";
import ls from "./commands/ls";
import { hostname } from "../TerminalConfig.json";

type CommandData = {
  callback: (
    username: string,
    args: string[],
    history: string[],
    workingDirectory: string
  ) => string;
  usage: string;
};

const COMMANDS: Record<string, CommandData> = {
  cd: { callback: (_, args) => cd(args), usage: "cd [dir]" },
  exit: { callback: () => "", usage: "exit" },
  hostname: { callback: () => hostname, usage: "hostname" },
  su: { callback: () => "", usage: "su" },
  whoami: { callback: (username) => username, usage: "whoami" },
  pwd: {
    callback: (_, __, ___, workingDirectory) => workingDirectory,
    usage: "pwd",
  },
  date: {
    callback: () =>
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    usage: "date",
  },
  github: { callback: () => openLink("https://github.com/"), usage: "github" },
  cat: { callback: (_, args) => cat(args), usage: "cat [arg ...]" },
  ls: {
    callback: (_, __, ___, workingDirectory) => ls(workingDirectory),
    usage: "ls",
  },
  echo: { callback: (_, args) => args.join("&nbsp;"), usage: "echo [arg ...]" },
  history: {
    callback: (_, __, history) =>
      "<table>" +
      history
        .map(
          (h, index) =>
            `<tr><td style="text-align: right; padding-right: 10px">${index + 1}</td><td>${h}</td></tr>`
        )
        .join("") +
      "</table>",
    usage: "history",
  },
};

export const COMMAND_NAMES = [
  ...Object.keys(COMMANDS).map((name) => COMMANDS[name].usage),
  "clear",
  "help",
].sort((a, z) => a.localeCompare(z));

export function getCommandResponse(
  { command, sudo, args }: Prompt,
  username: string,
  history: string[],
  workingDirectory: string
) {
  if (sudo && !command) return "Usage: sudo [command] [args]";
  if (!command) return "";

  if (command in COMMANDS) {
    let result = COMMANDS[command].callback(
      username,
      args,
      history,
      workingDirectory
    );
    result = result.replace(/\n/g, "<br/>");
    return result;
  }

  if (command === "help") {
    return (
      '<div class="help">' +
      COMMAND_NAMES.map((command) => {
        return `<span>${command}</span>`;
      }).join(" ") +
      "</div>"
    );
  }

  return `${command}: command not found`;
}

function openLink(url: string) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 1000);
  return `Redirecting to <a href="" target="_blank" rel="noreferrer noopener">${url}</a>...`;
}
