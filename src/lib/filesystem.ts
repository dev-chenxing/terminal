type FauxFile = {
    content: string | undefined,
    isDir: boolean
}

interface FauxFileSystem {
    [file: string]: FauxFile
}

export const filesystem: FauxFileSystem = {
    "CODE_OF_CONDUCT.md": {
        content: `# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
education, socio-economic status, nationality, personal appearance, race,
religion, or sexual identity and orientation.`,
        isDir: false
    },
    "CONTRIBUTING.md": {
        content: ``,
        isDir: false
    },
    "dist": {
        content: undefined,
        isDir: true
    },
    "eslint.config.js": {
        content: ``,
        isDir: false
    },
    "index.html": {
        content: ``,
        isDir: false
    },
    "LICENSE": {
        content: ``,
        isDir: false
    },
    "node_modules": {
        content: undefined,
        isDir: true
    },
    "package.json": {
        content: ``,
        isDir: false
    },
    "tsconfig.node.tsbuildinfo": {
        content: ``,
        isDir: false
    },
    "welcome.txt": {
        content: `Terminal-Style Website [version 0.1.0]
(c) <a href="https://github.com/dev-chenxing" target="_blank" rel="noopener noreferrer">chen.xing</a>
Type 'help' to see the available commands.`,
        isDir: false
    }
}