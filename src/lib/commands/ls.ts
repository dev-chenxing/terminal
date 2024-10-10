import { filesystem } from "../filesystem"

const getWorkingDirectory = (workingDirectory: string) => {
    if (workingDirectory == "~") {
        return filesystem
    } else {
        return filesystem[workingDirectory].content
    }
}

const ls = (workingDirectory: string) => {
    const dir = Object.keys(getWorkingDirectory(workingDirectory))
    if (dir.length > 0) {
        console.log(dir)
        return '<div class="ls">' +
            dir.map((filename) => {
                const file = filesystem[filename];
                return `<span>${file.isDir ? `<b>${filename}</b>/` : filename}</span>`
            }).join(" ") + "</div>"
    }
    else {
        return ""
    }
}

export default ls