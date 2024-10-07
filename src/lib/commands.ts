import { Prompt } from "../types";

export const MOTD = `Terminal-Style Website [version 0.1.0]
<br/><br/>
(c) <a href="https://github.com/dev-chenxing" target="_blank" rel="noopener noreferrer">chen.xing</a>
<br/><br/>
Type 'help' to see the available commands.`;


const TECH_STACK = `<a href="https://github.com/0l1v3rr/github-readme-tech-stack" target="_blank"><img src="https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&width=420&align=center&titleAlign=center&fontSize=20&lineHeight=10&lineCount=2&theme=0l1v3rr&line1=node.js%2Cnode.js%2Cauto%3Bexpress%2Cexpress%2Cffffff%3Bnestjs%2Cnestjs%2Ce12a54%3B&line2=react%2Creact%2Cauto%3Btailwindcss%2Ctailwind%2Cauto%3Btypescript%2Ctypescript%2Cauto%3B" alt="Tech Stack" /></a>`;

const COMMANDS: Record<
  string,
  (username: string, args: string[], history: string[]) => string
> = {
  su: () => "",
  whoami: (username) => username,
  motd: () => MOTD,
  pwd: () => "/",
  date: () => new Date().toLocaleDateString(),
  github: () => openLink("https://github.com/0l1v3rr"),
  linkedin: () => openLink("https://linkedin.com/in/0l1v3rr"),
  repo: () => openLink("https://github.com/0l1v3rr/0l1v3rr.github.io"),
  email: () => openLink("mailto:oliver.mrakovics@gmail.com"),
  cat: () =>
    `Here's a cute cat for you! 🐱<br/><br/>${openLink("https://cataas.com/cat/cute")}`,
  techstack: () => TECH_STACK,
  about: (username) => `Hello, ${username}!

    Passionate about <b>web development</b>, I am a <b>full-stack engineer</b> specializing in <b>front-end development</b>. I started my coding journey at the age of <b>12</b>, proving my dedication and expertise in the field.

    My focus on delivering high-quality applications is fueled by a genuine interest in leading technologies, particularly <b>React</b>, <b>TypeScript</b>, and <b>Node.js</b>. Leveraging hands-on experience with various JavaScript frameworks and libraries <b>(Next.js, Express, NestJS, etc.)</b> within the React and Node.js ecosystem, I bring a versatile skill set to every project.

    I also enjoy showing off my skills in <b>various competitions</b>. My most notable achievement is my participation in the prestigious <b>WorldSkills</b> competitions, where I won a <b>gold medal in Web Technologies category</b>, making me a <b>world champion</b>.`,
  echo: (_, args) => args.join("&nbsp;"),
  history: (_, __, history) => history.join("<br/>"),
};

export const COMMAND_NAMES = [...Object.keys(COMMANDS), "clear", "help"].sort(
  (a, z) => a.localeCompare(z)
);

export function getCommandResponse(
  { command, sudo, args }: Prompt,
  username: string,
  history: string[]
) {
  if (sudo && !command) return "Usage: sudo [command] [args]";
  if (!command) return "";

  if (command in COMMANDS) {
    let result = COMMANDS[command](username, args, history);
    result = result.replace(/\n/g, "<br/>");


    return result;
  }

  if (command === "help") {
    return `Usage: [command] [options] 
    
      ${COMMAND_NAMES.join(", ")}`.replace(/\n/g, "<br/>");
  }

  return `${command}: command not found`;
}

function openLink(url: string) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 1000);
  return `Redirecting to <a href="" target="_blank" rel="noreferrer noopener">${url}</a>...`;
}
