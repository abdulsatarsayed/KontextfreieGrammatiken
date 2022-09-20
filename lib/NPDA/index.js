
import NPDA from './npda.js'
// import validate from './npdaValidation.js'
export default function main(file, word, lastStepTree, steps) {
    try {
        const results = NPDA(file, word, lastStepTree, steps)
        return results
    }
    catch (err) {
        throw new Error(err)
    }
}
