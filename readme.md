# Bulk Email Finder
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Find email addresses of people in bulk by providing a list of companies. Made using Hunter.io's API.

## Steps to use the app

  - Clone the repo.
  - Install the required packages using:
  ```sh
  npm install
  ```
  - Run the following command:
   ```sh
 node app.js
  ```
  - Visit http://localhost:4000.
  - Paste your API key from Hunter.io. *For detailed steps, please see the next section.*
  - Upload your CSV (**Important**: Please ensure that your entries are in a single column).
  - Submit the form, and download the list of emails by clicking on download button.

## Steps to get Hunter.io's API key
- Login or Signup on Hunter.io.
- Visit hunter.io/api_keys.
- Copy the API key.

*Please note that the free version of Hunter.io allows only up to 50 API calls per month.*

## Important Notes
- The app takes in a CSV with a single column that has names of companies in it, and returns a CSV with a list that has emails which:
    1. Belong to humans, and are not generic (for instance, it will never return contact@xyz.com, or help@xyz.com. Edge cases yet to be tested).
    2. Have the most probability of being correct. For best results, it's limited to return only two entries with good confidence score, per company.

- Sometimes, the app might download an empty sheet, or would miss some entries. This might be because:
    1. Hunter.io does not have any contacts for that company
    2. Hunter.io has only generic contacts for that company
- This version of the app outputs the email, first name (if available) and position (if available) of the fetched contact. Other required information could be found in the body of the request.