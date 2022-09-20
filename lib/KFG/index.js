
import KFG from './kfg.js'
export default function main(file, wort, lastStepTree, steps = 20) {
    try {
        const results = KFG(file, wort, lastStepTree, steps)
        return results


    } catch (err) {
        throw new Error(err)
    }
}

