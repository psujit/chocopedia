# Chocopedia
A chocolate inventory that shows the list of chocolates and prices in different stores.

## Table of Contents
- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Enhancements](#enhancements)
- [Validations](#validations)

## General Information
- User will see the list of chocolates fetched from the database along with the lowest price per hundred grams, average price per hundred grams and link to the shop providing the lowest price.
- Chocolate can also be searched by using text search based on name, brand or link to the shop using the Search field on the top.
- On clicking on any row of the table, a modal will open showing details of that chocolate.
- On the modal, the user would see the link to all the shops and a pie chart showing the nutrition values of that chocolate.
- The modal also allows changing the name and/or brand of the specific chocolate.

## Technologies Used

- HTML

- React

- TypeScript

- React Google Charts

- MirageJS

- Tailwind CSS

- Vitest

- React Testing Library


## Features

- View the chocolates.

- Get the lowest price per 100gm and average price per 100gm for each chocolate.

- Get the link to the shop providing the lowest price for 100gm.

- Search chocolates.

- See nutritional values and list of all the shops selling the chocolate in a modal.

- Edit Name and/or Brand of the chocolates.

## Configuration
- Used Prettier for maintaining formatting style of code.


## Setup
This project was bootstrapped using [Vite](https://vitejs.dev/).

### Steps
- The project can be cloned using 
```sh
git clone https://github.com/psujit/chocopedia.git
```

- To install the dependencies, use 
```sh
cd chocopedia
yarn install
```

- Once the dependencies are installed, the application can be run using 
```sh
yarn dev
```
- The application will run on http://localhost:5173/


## Testing
- The app is tested using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- To run the tests, use
```sh
yarn test
```
- To run the tests with coverage, use
```sh
yarn test:coverage 
```

## Enhancements

- Pagination
- Column Sorting

## Validations

- Name and Brand can be maximum 32 characters long.
- User must edit either of Name or Brand or both before submitting the edit.
