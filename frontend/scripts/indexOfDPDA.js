import DPDA from '../../lib/DPDA/dpda.js'
import dpdaValidation from '../../lib/DPDA/dpdaValidation.js'
import treeGenerator from './treeGenerator.js'
const importFile = document.getElementById('import-file')
const word = document.getElementById('word')
const errorsSection = document.getElementById('errors-section-container')
const parsedStates = document.getElementById('parsed-states')
const parsedInputSymbols = document.getElementById('parsed-input-symbols')
const parsedStackSymbols = document.getElementById('parsed-stack-symbols')
const parsedTransitions = document.getElementById('parsed-transitions')
const clearButton = document.getElementById('clear')
const setDPDAButton = document.getElementById('set-DPDA-button')
const customInputFileName = document.getElementById('custom-file-button-name')
const importForm = document.getElementById('import-form')
let jsonFileContent = null
let TREE = null
let steps = 2

const cleanStart = () => {
    errorsSection.innerHTML = ''
    document.getElementById('tree').innerHTML = ''
    setDPDAButton.innerText = 'Start'
    steps = 1
    // customInputFileName.innerText = ''
    // parsedStates.innerText = `Z: {}`
    // parsedInputSymbols.innerText = `Σ: {}`
    // parsedStackSymbols.innerText = `Γ: {}`
    // parsedTransitions.innerText = `δ: {}`
    // word.value = ''

}

importFile.addEventListener('change', (event) => {
    cleanStart()
    const reader = new FileReader()
    // console.log(event.target.files[0])
    //reading json file
    reader.readAsText(event.target.files[0], "UTF-8")
    reader.onload = async function (evt) {

        try {
            jsonFileContent = JSON.parse(evt.target.result)
            const validierung = dpdaValidation(jsonFileContent)
            if (validierung !== true) return errorsSection.innerHTML = validierung ? `<div class="error">${validierung}</div>` : '<div class="error">Something went wrong!</div>'
            if (!jsonFileContent.finalState) return errorsSection.innerHTML = '<div class="error">you have imported an npda file plesae use the npda script</div>'

            parsedStates.innerText = `Z: {${jsonFileContent.states.join(', ')}}`
            parsedInputSymbols.innerText = `Σ: {${jsonFileContent.inputSymbols.join(', ')}}`
            parsedStackSymbols.innerText = `Γ: {${jsonFileContent.stackSymbols.join(', ')}}`

            let parsedTransitionsText = ''
            const zustaende = Object.keys(jsonFileContent.transitions)
            for (const zustand of zustaende) {
                const eingabeSymbole = Object.keys(jsonFileContent.transitions[zustand])
                for (const eingabeSymbol of eingabeSymbole) {
                    const kellerSymbol = Object.keys(jsonFileContent.transitions[zustand][eingabeSymbol])
                    const transitions = jsonFileContent.transitions[zustand][eingabeSymbol][kellerSymbol]
                    for (const transition of transitions) {
                        const [state, newStack] = transition
                        parsedTransitionsText += `(${zustand}, ${eingabeSymbol}, ${kellerSymbol}) --> (${state}, ${newStack.join('')})\n`
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



setDPDAButton.addEventListener('click', () => {
    errorsSection.innerHTML = ''
    if (!jsonFileContent) return errorsSection.innerHTML = '<div class="error">Please import a file before starting the script</div>'
    document.getElementById('tree').innerHTML = ''
    const arrWord = word.value.split(',')
    TREE = DPDA(jsonFileContent, arrWord, TREE, steps)
    if (!TREE?.children?.length && !TREE.name) return errorsSection.innerHTML = '<div class="error">Could not find any acceptable transition</div>'
    steps += arrWord.length
    if (Number(setDPDAButton.innerText) !== steps) setDPDAButton.innerText = 'Next'
    treeGenerator(TREE, '#tree')
})

clearButton.addEventListener('click', () => {
    importForm.reset()
    cleanStart()
})