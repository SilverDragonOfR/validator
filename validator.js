// npm install express vm jsdom

const express = require('express')
const vm = require('vm')
const { JSDOM } = require('jsdom')
const fs = require('fs').promises
const path = require('path')

const app = express()
const port = 3000

app.use(express.json())

let testStrings = []
let testMessages = []

// Function to read test strings and messages from data.json file
async function getData() {
    const filePath = path.join(__dirname, 'data.json');

    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.forEach(data => {
        testStrings.push(data.string)
        testMessages.push(data.message)
    });
}

function validateCode(htmlCode) {
    let testResults = [];

    // Modify test strings to be executed in a try-catch block
    modifiedTestStrings = testStrings.map(testString => `
    try {
        ${testString}
    } catch(e) {
        false
    }`)

    // Create a virtual DOM environment
    const dom = new JSDOM(htmlCode, {
        runScripts: 'dangerously',
        resources: 'usable'
    })

    for (const testString of modifiedTestStrings) {
        const sandbox = {
            document: dom.window.document,
            console: console
        }
        const script = new vm.Script(testString)
        const result = script.runInNewContext(sandbox)
        testResults.push(result)
    }

    return testResults;
}

// Express route to handle HTML code validation
app.post('/validate', (req, res) => {
    try {
        const htmlCode = req.body.code;
        const testResults = validateCode(htmlCode)

        const returnObject = []
        for(let i=0; i<testResults.length; i++) {
            returnObject.push({
                message : testMessages[i],
                string: testStrings[i],
                result: testResults[i],
            })
        }

        res.status(200).json(returnObject)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Start the server
app.listen(port, async () => {
    await getData()
    console.log(`Server is running on port ${port}`)
})