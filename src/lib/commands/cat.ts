import { filesystem } from "../filesystem"

const cat = (args: string[]) => {
    return args.map((arg) => {
        const file = filesystem[arg]
        if (file) {
            if (file.isDir)
                return `cat: ${arg}: Is a directory`
            else if (typeof file.content === "string") {
                return file.content.replace(/\n/g, "<br/>")
            }
            else {
                return ""
            }
        }
        else
            return `cat: ${arg}: No such file or directory`
    }).join()
}

export default cat