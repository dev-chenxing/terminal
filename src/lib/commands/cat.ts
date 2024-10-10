import { filesystem } from "../filesystem"

const cat = (args: string[]) => {
    return args.map((arg) => {
        const file = filesystem[arg]
        if (file) {
            if (file.isDir)
                return `cat: ${arg}: Is a directory`
            else
                return file.content ? file.content.replace(/\n/g, "<br/>") : ""
        }
        else
            return `cat: ${arg}: No such file or directory`
    }).join()
}

export default cat