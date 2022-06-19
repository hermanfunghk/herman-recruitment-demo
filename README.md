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

Before start the app, you need to install the dependency packages.

Run the following command in the project folder

```sh
npm install
```

## 4. Start the app

Runs the app in the development mode by the following command in the project folder

```sh
npm start
```

## 4. Try the app

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Initially, the app only show a search text box. 

### Searching Repository

You can search git repository by typing key words in the text box and press "Enter" or "Tab".

After search result retrieved, the result table will show with pagination (25 items per page).

You can press previous/next button to move to the previous/next page and those button only shown if there is previous/next page avaiable. 

### Sorting Search Result

You can sort the result by pressing the table header. Only the column of no. of stars is avaiable to sort.

### Link to Readme page

You can click the link in each record to open the readme page of the repository.
