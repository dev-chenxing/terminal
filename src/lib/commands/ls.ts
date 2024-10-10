import { filesystem } from "../filesystem"

const ls = () => {
    return '<div class="ls">' +
        Object.keys(filesystem).map((filename) => {
            const file = filesystem[filename];
            return `<span>${file.isDir ? `<b>${filename}</b>/` : filename}</span>`
        }).join(" ") + "</div>"
}

export default ls