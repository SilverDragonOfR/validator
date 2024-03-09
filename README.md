# Validator for Code Submissions

This project implements a validator for code submissions on a learning platform's Web Development assignment. It uses Node.js, Express.js, and the `vm` and `jsdom` packages to evaluate HTML code against a set of test strings and provide feedback to users.

## Approach to Solving the Problem

The approach to solving the problem involved several key steps:

1. **Data Setup**: Create a `data.json` file to store test strings and messages. This file is read by the server to determine which tests to run and what messages to display.
2. **Server Setup**: Use Express.js to create a server that listens for incoming requests. Use the `vm` and `jsdom` packages to evaluate HTML code against test strings.
3. **Validation Logic**: Write functions to read data from `data.json`, validate HTML code against test strings, and format the results for response.
4. **Error Handling**: Implement error handling to catch and handle any errors that occur during the validation process.
5. **Testing**: Test the validator with different HTML code and ensure that it provides accurate feedback based on the test strings.

## Setup and Run

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install express vm jsdom`.
3. Create a `data.json` file in the root directory with the following format:
   ```json
   [
       {
           "string": "<test_string_1>",
           "message": "<test_message_1>"
       },
       {
           "string": "<test_string_2>",
           "message": "<test_message_2>"
       },
   ]
4. Use POSTMAN or any HTTP request service POST request to `http://localhost:3000/validate` with the format:
    ```json
    {
        "code": "<HTML_code>"
    }
5. Response is recevied in th format:
    ```json
   [
       {
           "message": "<test_message_1>",
           "string": "<test_string_1>",
           "result": <test_result_1>
       },
       {
           "message": "<test_message_2>",
           "string": "<test_string_2>",
           "result": <test_result_2>
       },
   ]

## Author
* [SilverDragonOfR](https://github.com/SilverDragonOfR)