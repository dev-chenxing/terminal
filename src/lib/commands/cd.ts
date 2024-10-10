

import { filesystem } from "../filesystem"

const cat = (args: string[]) => {
    if (args.length > 1) {
        return "cd: too many arguments"
    } else if (args.length == 1) {
        if (filesystem[args[0]]) {
            return ""
        }
        else
            return `cd : ${args[0]}: No such file or directory`
    } else if (args.length == 0) {
        return ""
    } else {
        return ""
    }
}

export default cat