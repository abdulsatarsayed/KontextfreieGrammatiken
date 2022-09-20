import NPDA from '../../lib/NPDA/index.js'
import treeGenerator from './treeGenerator.js'
import npdaValidation from '../../lib/NPDA/npdaValidation.js'
const importFile = document.getElementById('import-file')
const word = document.getElementById('word')
const errorsSection = document.getElementById('errors-section-container')
const parsedStates = document.getElementById('parsed-states')
const parsedInputSymbols = document.getElementById('parsed-input-symbols')
const parsedStackSymbols = document.getElementById('parsed-stack-symbols')
const parsedTransitions = document.getElementById('parsed-transitions')
const clearButton = document.getElementById('clear')
const customInputFileName = document.getElementById('custom-file-button-name')
const setNPDAButton = document.getElementById('set-NPDA-button')
const importForm = document.getElementById('import-form')
let TREE = null
let jsonFileContent = null
let steps = 2

const cleanStart = () => {
    errorsSection.innerHTML = ''
    document.getElementById('tree').innerHTML = ''
    steps = 0
    setNPDAButton.innerText = 'Start'
    // parsedStates.innerText = `Z: ()`
    // parsedInputSymbols.innerText = `Σ: ()`
    // parsedStackSymbols.innerText = `Γ: ()`
    // parsedTransitions.innerText = `δ: ()`
    // word.value = ''
    // jsonFileContent = ''
    // customInputFileName.innerText = ''
    // console.log(importForm)
}

importFile.addEventListener('change', (event) => {
    cleanStart()
    const reader = new FileReader()
    reader.readAsText(event.target.files[0], "UTF-8")
    reader.onload = async function (evt) {
        try {
            jsonFileContent = JSON.parse(evt.target.result)
            const validierung = npdaValidation(jsonFileContent)
            if (validierung !== true) return errorsSection.innerHTML = validierung ? `<div class="error">${validierung}</div>` : '<div class="error">Something went wrong!</div>'
            if (jsonFileContent.finalState) return errorsSection.innerHTML = '<div class="error">you have imported a dpda file</div>'
            parsedStates.innerText = `Z: {${jsonFileContent.states.join(', ')}}`
            parsedInputSymbols.innerText = `Σ: {${jsonFileContent.inputSymbols.join(', ')}}`
            parsedStackSymbols.innerText = `Γ: {${jsonFileContent.stackSymbols.join(', ')}}`

            let parsedTransitionsText = ''
            const zustaende = Object.keys(jsonFileContent.transitions)
            for (const zustand of zustaende) {
                const eingabeAlphabet = Object.keys(jsonFileContent.transitions[zustand])
                for (const eingabeSymbol of eingabeAlphabet) {
                    const kellerAlphabet = Object.keys(jsonFileContent.transitions[zustand][eingabeSymbol])
                    for (const kellerSymbol of kellerAlphabet) {
                        const transitions = jsonFileContent.transitions[zustand][eingabeSymbol][kellerSymbol]
                        for (const transition of transitions) {
                            const [state, newStack] = transition
                            parsedTransitionsText += `(${zustand}, ${eingabeSymbol}, ${kellerSymbol}) --> (${state}, ${newStack.join('')})\n`
                        }
                    }



                }
            }
            customInputFileName.innerText = event.target.files[0].name
            parsedTransitions.innerText = `δ: {${parsedTransitionsText}}`
        } catch (err) {
            errorsSection.innerHTML = err.message ? `<div class="error">${err.message}</div>` : '<div class="error">Something went wrong!</div>'
        }


    }
    reader.onerror = function (evt) {
        console.log('error while loading the file')
        jsonFileContent = null
    }
})



setNPDAButton.addEventListener('click', () => {
    errorsSection.innerHTML = ''
    const startTime = performance.now()
    if (!jsonFileContent) return errorsSection.innerHTML = '<div class="error">Please import a file before starting the script</div>'
    document.getElementById('tree').innerHTML = ''
    const arrWord = word.value.split(',')
    TREE = NPDA(jsonFileContent, arrWord, TREE, steps)
    steps += arrWord.length
    if (Number(setNPDAButton.innerText) !== steps) setNPDAButton.innerText = 'Next'
    treeGenerator(TREE, '#tree')
    const endTime = (performance.now() - startTime) / 1000
    console.log(endTime, "Sekunde")
})

clearButton.addEventListener('click', () => {
    importForm.reset()
    cleanStart()
})