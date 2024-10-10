import { Prompt } from "../types";

export function getColorfulPrompt(input: string) {
  input = input.replace(/ /g, "&nbsp;");
  const pieces = input.split("&nbsp;");
  if (pieces.length === 0) return input;

  if (pieces[0] === "sudo") {
    pieces[0] = `<span class="text-yellow underline">${pieces[0]}</span>`;

    if (pieces[1]) {
      pieces[1] = `<span class="text-yellow">${pieces[1]}</span>`;
    }
  } else {
    pieces[0] = `<span class="text-yellow">${pieces[0]}</span>`;
  }

  return pieces.join("&nbsp;");
}

export function processPrompt(input: string): Prompt {
  let pieces = input.match(/[^\s"']+|"([^"]*)"/gim) || input.split(" ");
  pieces = pieces.map((arg) => arg.replace(/['"]+/g, ""));
  let sudo = false;

  if (pieces[0] === "sudo") {
    pieces.shift();
    sudo = true;
  }

  return {
    command: pieces[0],
    args: pieces.slice(1),
    sudo,
  };
}
