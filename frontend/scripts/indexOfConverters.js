import KAzuKFG from '../../lib/KAzuKFG/index.js'
import KFGzuKA from '../../lib/KFGzuKA/index.js'
import fileFilter from '../../helpers/fileFilter.js'



const uploadFileCFG = document.getElementById('upload-file-cfg')
const uploadFileNPDA = document.getElementById('upload-file-npda')
const convertAndDisplayCFG = document.getElementById('convert-and-display-cfg')
const convertAndDisplayNPDA = document.getElementById('convert-and-display-npda')
const downloadCFG = document.getElementById('download-cfg')
const downloadNPDA = document.getElementById('download-npda')
const convertedResults = document.getElementById('converted-results')
const errorsSection = document.getElementById('errors-section')
const customFileNameCFG = document.getElementById('custom-file-button-name-cfg')
const customFileNameNPDA = document.getElementById('custom-file-button-name-npda')
let jsonFileContentCFG = null
let jsonFileContentNPDA = null

const cleanStart = () => {
    errorsSection.innerText = ''
}

uploadFileCFG.addEventListener('change', (event) => {
    cleanStart()
    const reader = new FileReader()
    customFileNameCFG.innerText = event.target.files[0].name
    reader.readAsText(event.target.files[0], "UTF-8")
    reader.onload = function (evt) {
        jsonFileContentCFG = JSON.parse(evt.target.result)
    }
    reader.onerror = function (evt) {
        console.log('error while loading the file')
        jsonFileContentCFG = null
        customFileNameCFG.innerText = ''
    }
})


convertAndDisplayCFG.addEventListener('click', () => {
    const startTime = performance.now()
    cleanStart()
    if (!jsonFileContentCFG) return errorsSection.innerText = 'Please import a file before starting the script'
    // const filteredFile = fileFilter(jsonFileContentCFG)
    const converted = KFGzuKA(jsonFileContentCFG)
    const endTime = (performance.now() - startTime) / 1000
    console.log(endTime, "Sekunde")
    convertedResults.value = JSON.stringify(converted, null, 100)
    const json = JSON.stringify(converted)
    const blob = new Blob([json], { type: "octet/stream" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url

})

downloadCFG.addEventListener('click', () => {
    cleanStart()
    if (!jsonFileContentCFG) return errorsSection.innerText = 'Please import a file before starting the script'
    // const filteredFile = fileFilter(jsonFileContentCFG)
    const filteredFile = jsonFileContentCFG
    const converted = KFGzuKA(filteredFile)
    convertedResults.value = JSON.stringify(converted, null, 100)
    const json = JSON.stringify(converted)
    const blob = new Blob([json], { type: "octet/stream" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'CFGtoNPDA.json'
    a.click()
    a.remove()

})


uploadFileNPDA.addEventListener('change', (event) => {
    const reader = new FileReader()
    customFileNameNPDA.innerText = event.target.files[0].name
    reader.readAsText(event.target.files[0], "UTF-8")
    reader.onload = function (evt) {
        jsonFileContentNPDA = JSON.parse(evt.target.result)
    }
    reader.onerror = function (evt) {
        console.log('error while loading the file')
        jsonFileContentNPDA = null
        customFileNameNPDA.innerText = ''
    }
})



convertAndDisplayNPDA.addEventListener('click', () => {
    cleanStart()
    if (!jsonFileContentNPDA) return errorsSection.innerText = 'Please import a file before starting the script'
    // const umgewandelt = fileFilter(KAzuKFG(jsonFileContentNPDA))
    const umgewandelt = KAzuKFG(jsonFileContentNPDA)
    convertedResults.value = JSON.stringify(umgewandelt, null, 100)
    const json = JSON.stringify(umgewandelt)
    const blob = new Blob([json], { type: "octet/stream" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url

})


downloadNPDA.addEventListener('click', () => {
    cleanStart()
    if (!jsonFileContentNPDA) return errorsSection.innerText = 'Please import a file before starting the script'
    // const umgewandelt = fileFilter(KAzuKFG(jsonFileContentNPDA))
    const umgewandelt = KAzuKFG(jsonFileContentNPDA)
    convertedResults.value = JSON.stringify(umgewandelt, null, 100)
    const json = JSON.stringify(umgewandelt)
    const blob = new Blob([json], { type: "octet/stream" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'NPDAtoCFG.json'
    a.click()
    a.remove()

})

