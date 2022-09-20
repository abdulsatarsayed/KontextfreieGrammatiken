import KFGzuKAValidation from "./kfgzukaValidation.js"
import KFGzuKA from "./kfgzuka.js"
export default function main(file) {
    try {
        if (KFGzuKAValidation(file)) {
            const umwandlung = KFGzuKA(file)
            return umwandlung
        }

    } catch (err) {
        console.log(err)
    }

}


