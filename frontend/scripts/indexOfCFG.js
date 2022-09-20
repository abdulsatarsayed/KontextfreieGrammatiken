import KFG from '../../lib/kfg/index.js'
import treeGenerator from './treeGenerator.js'
import kfgValidation from '../../lib/kfg/kfgValidation.js'
import fileFilter from '../../helpers/fileFilter.js'
const importFile = document.getElementById('import-file')
const word = document.getElementById('word')
const errorsSection = document.getElementById('errors-section-container')
const parsedTerminals = document.getElementById('parsed-terminal-symbols')
const parsedVariablen = document.getElementById('parsed-variablen-symbols')
const parsedProduktionen = document.getElementById('parsed-produktionen')
const setKFGButton = document.getElementById('set-CFG-button')
const clearButton = document.getElementById('clear')
const customInputFileName = document.getElementById('custom-file-button-name')
let TREE = null
let jsonFileContent = null
let steps = 1000

const cleanStart = () => {
    errorsSection.innerHTML = ''
    document.getElementById('tree').innerHTML = ''
    steps = 0
    setKFGButton.innerText = 'Start'
    // parsedTerminals.innerText = `Σ: {}`
    // parsedVariablen.innerText = `V: {}`
    // parsedProduktionen.innerText = `P: {}`
    // word.value = ''
    // jsonFileContent = ''
    // customInputFileName.innerText = ''
}

importFile.addEventListener('change', (event) => {
    cleanStart()
    const reader = new FileReader()
    reader.readAsText(event.target.files[0], "UTF-8")
    reader.onload = async function (evt) {
        try {
            const validierung = kfgValidation(JSON.parse(evt.target.result))
            if (validierung !== true) return errorsSection.innerHTML = validierung ? `<div class="error">${validierung}</div>` : '<div class="error">Something went wrong!</div>'
            // jsonFileContent = await fileFilter(JSON.parse(evt.target.result))
            jsonFileContent = await JSON.parse(evt.target.result)
            parsedTerminals.innerText = `Σ: {${jsonFileContent.terminaleSymbole.join(', ')}}`
            parsedVariablen.innerText = `V: {${jsonFileContent.variablen.join(', ')}}`
            let parsedProduktionenText = ''
            const produktionen = jsonFileContent.produktionen
            for (const produktion of produktionen) {
                const key = Object.keys(produktion)
                let line = `${key} --> `
                for (const jede of produktion[key]) {
                    line += `(${jede.join()})`
                }
                line += '\n'
                parsedProduktionenText += line

            }

            parsedProduktionen.innerText = `P: {${parsedProduktionenText}}`
            customInputFileName.innerText = event.target.files[0].name

            reader.onerror = function (evt) {
                console.log('error while loading the file')
                jsonFileContent = null
            }

            // parsedTerminals.innerText = `Σ: {}`
            // parsedVariablen.innerText = `V: {}`
            // parsedProduktionen.innerText = `P: {}`
            // word.value = ''
            // jsonFileContent = ''
            // customInputFileName.innerText = ''


        } catch (err) {
            errorsSection.innerHTML = err.message ? `<div class="error">${err.message}</div>` : '<div class="error">Something went wrong!</div>'
        }


    }

})



setKFGButton.addEventListener('click', () => {

    errorsSection.innerHTML = ''
    if (!jsonFileContent) return errorsSection.innerHTML = '<div class="error">Please import a file before starting the script</div>'
    document.getElementById('tree').innerHTML = ''
    const arrWord = word.value.split(',')
    steps += arrWord.length
    const startTime = performance.now()
    TREE = KFG(jsonFileContent, arrWord, TREE, steps)
    setKFGButton.innerText = 'Next'
    treeGenerator(TREE, '#tree')
    const endTime = (performance.now() - startTime) / 1000
    console.log(endTime, "Sekunde")





})

clearButton.addEventListener('click', () => cleanStart())