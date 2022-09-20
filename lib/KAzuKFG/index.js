import KAzuKFG from "./KAzuKFG.js";
import npdaValidation from "./kazukfgValidation.js";
export default function main(file) {
    try {
        const umgewandelt = KAzuKFG(file)
        return umgewandelt
    } catch (err) {
        console.log(err)
    }

}