type FauxFile = {
    content: string
}

interface FauxFileSystem {
    [file: string]: FauxFile
}

export const filesystem: FauxFileSystem = {
    "welcome.txt": {
        content: `Terminal-Style Website [version 0.1.0]
(c) <a href="https://github.com/dev-chenxing" target="_blank" rel="noopener noreferrer">chen.xing</a>
Type 'help' to see the available commands.`
    }
}