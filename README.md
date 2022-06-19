# herman-recruitment-demo

## 1. Install Node.js

Install Node.js in local machine.

This project is developed under Node.js version v14.17.6.

You can download the version in https://nodejs.org/download/release/v14.17.6/

OR

Run the following if you have nvm installed.

```sh
nvm install 14.7.0
nvm use 14.7.0
```

## 2. Clone Source to local

Clone the source to a project folder in your local machine using git tools (For example: GitHub Desktop or Tortoise Git)

## 3. Install dependency

Before start the app, it is required to install the dependency packages.

Open CLI, run the following command in the project folder to install the dependency packages.

```sh
npm install
```

## 4. Start the app

Open CLI, run the following command in the project folder to start the app in the development mode

```sh
npm start
```

## 5. Try the app

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Initially, the app only show a search text box. 

### Searching Repository

You can search git repository by typing key words in the text box and press "Enter" or "Tab".

After search result retrieved, the result table will show with pagination (25 items per page).

Press previous/next button to move to the previous/next page and those button only shown if there is previous/next page avaiable. 

### Sorting Search Result

Sort the result by pressing the table header. Only the column of no. of stars is avaiable to sort.

### Link to Readme page

Click the link in "Readme" column to open the readme page of the repository in new browser tab page.
