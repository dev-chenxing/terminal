import { filesystem } from "../filesystem"

const cat = (args: string[]) => {
    return args.map((arg) => filesystem[arg] ? filesystem[arg].content.replace(/\n/g, "<br/>") : `cat: ${arg}: No such file or directory`).join()
}

export default cat