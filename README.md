# University of Helsinki - Full Stack Open - 2021/22

### About the course

The course introduce to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use _REST APIs_ built with _Node.js_. This course covers: _React_, _Redux_, _Node.js_, _MongoDB_, _GraphQL_ and _TypeScript_.

### About this repository

This repository contains my own exercise solutions to the latest edition of the [Full Stack Open](https://fullstackopen.com/en) course from the [University of Helsinki](https://www.helsinki.fi/en).

### Certificates

![Certificate of completion Fullstack Open Course from the University of Helsinki](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/e290f66d1dc63b5b8c36db335ef7880a)

![Certificate of completion Fullstack Open TypeScript Course from the University of Helsinki](https://studies.cs.helsinki.fi/stats/api/certificate/fs-typescript/en/3fb84bb28cd32218d5668a1bc9ae3a48)

### Part 0 - [Fundamentals of Web apps](https://fullstackopen.com/en/part0)

An overall introduction to the course. It introduces to some concepts like HTTP requests, how traditional web apps work, DOM, CSS and Single Page Applications.

- [new note](/part0) - The diagram shows how communicate the browser and the server when user added a note to a page containing JavaScript.
- [single page app](/part0) - The diagram shows the communication between the browser and the server when user opened single page app on the browser.
- [new note (single page app)](/part0) - The diagram shows how communicate the browser and the server when user added a note to a single page app.

[View solutions folder](/part0)

### Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

This part introduces to _React_ concepts. It covers the basics: components, props, _JSX_ and more advanced concepts: _Javascript_ functionalities that are used a lot in _React_ (`.map()`, `.filter()`, `.reduce()`), destructuring, event handlers in _React_ and passing state to child components, spread operator, hooks and their rules and conditional rendering.

- [courseinfo](/part1/courseinfo) - Simple course information page which counts total number of exercises of the course.
- [unicafe](/part1/unicafe) - This app gathers feedbacks and makes statistic.
- [anecdotes](/part1/anecdotes) - This app provides to vote for a random anecdote, also shows the most voted anecdote.

[View solutions folder](/part1)

### Part 2 - [Communicating with server](https://fullstackopen.com/en/part2)

This part covers how to display list items in _React_ and how to handle forms. Introduces _JSON server_ and fetching data from it, _axios_ for sending `GET`, `PUT`, `POST` and `DELETE` requests and how to style your _React_ app (CSS).

- [courseinfo](/part2/courseinfo) - Extended Course info app from part 1.
- [phonebook](/part2/phonebook) - Phonebook, add/delete contacts with numbers, edit numbers.
- [dataforcountries](/part2/dataforcountries) - A react app that fetches and displays information form the [REST Countries](https://restcountries.eu) and [OPEN Weather](https://openweathermap.org) API's.

[View solutions folder](/part2)

### Part 3 - [Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3)

This part is focused on the backend. How to: implement a simple _REST API_ in _Node.js_ using _Express_, connect to a database (_MongoDB_) to store and retrieve data, deploy your app.

- [phonebook](/part3.0/phonebookbackend) - The app source backend code.
- [phonebook](https://phonebook-backend-ldwv.onrender.com/) - The app deployed on Render. Frontend from part 2 and Backend from part 3 works together.

[View solutions folder](/part3.0/)

### Part 4 - [Testing Express servers, user administration](https://fullstackopen.com/en/part4)

This part is focused on testing _Node.js_ applications, async/await, user administration, references across collections, token based authentication.

- [bloglist](/part4/bloglist) - Allows users to save information (blog author, title, url, and amount of upvotes from users) about interesting blogs they have stumbled across on the internet.

[View solutions folder](/part4)

### Part 5 - [Testing React apps](https://fullstackopen.com/en/part5)

This part is focused on token based authentication and testing the _React_ components using _Jest_, _React Testing Library_ and _Cypress_.

- [bloglist-frontend](/part5/bloglist-frontend) - The app frontend code.

[View solutions folder](/part5)

### Part 6 - [Advanced state management](https://fullstackopen.com/en/part6)

This part is focused on _Redux_, which can be used for more complex state management of your _React_ app (covers concepts like immutability, global store, actions and reducers). Also this chapter covers how to use _Redux_ with `hooks`, and `redux thunk` for asynchronous code. An additional section is included on _React Query_ using `useReducer` and `React context` to simplify server state management.

- [unicafe-redux](/part6/unicafe-redux) - The app source code.
- [redux-anecdotes](/part6/redux-anecdotes) - The app source code.
- [query-anecdotes](/part6/query-anecdotes/) - The  app source code.

[View solutions folder](/part6)

### Part 9 - [TypeScript](https://fullstackopen.com/en/part9)

This is a standalone part focused on being able to understand, develop and configure projects using TypeScript. The tools previous learnt have been updated to work with the TypeScript library covering _React_, _Express_ and building end-to-end features.

- [courseinfo](/part9/courseinfo/) - The app source code.
- [first-steps-with-typescript](/part9/first-steps-with-typescript/) - The app source code.
- [flight-diary](/part9/flight-diary/) - The  app source code.
- [patientor](/part9/patientor/) - The  app source code.

[View solutions folder](/part9)