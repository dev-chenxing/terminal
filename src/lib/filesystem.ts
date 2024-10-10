type FauxFile = {
  content: string;
};

interface FauxFileSystem {
  [key: string]: FauxFile;
}

const filesystem: FauxFileSystem = {
  "welcome.txt": {
    content: `Terminal-Style Website [version 0.1.0]
(c) <a href="https://github.com/dev-chenxing" target="_blank" rel="noopener noreferrer">chen.xing</a>
For a list of available commands, type \`help\`.`,
  },
};

export default filesystem;
