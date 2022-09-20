
import DPDA from "./dpda.js"
import validate from "./dpdaValidation.js"
export default function main(file, word, lastStepTree, steps) {
    try {
        validate(file)
        const results = DPDA(file, word, lastStepTree, steps)
        return results
    }
    catch (err) {
        throw new Error(err)
    }
}