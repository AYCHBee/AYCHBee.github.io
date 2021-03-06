# AYCHBee
A light-weight core banking application that supports a single bank and allows users create bank accounts and make withdrawals &amp; deposits by visiting a local branch

# Website

https://tolulope-od.github.io/indulgent-treats/

# Table of Contents

1. <a href="#hosted-app">Link to Hosted App</a>
2. <a href="#pivotal-tracker">Link to Pivotal Tracker Board</a>
3. <a href="#tech-stack-used">Tech Stack Used</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#how-to-use">How To Use</a>
6. <a href="#api-endpoints">API endpoints</a>
7. <a href="#author">Author</a>

## Link to Hosted App

https://banka-app.herokuapp.com


## Link to Pivotal Tracker Board

https://www.pivotaltracker.com/n/projects/2319922


## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Html]()
- [CSS]()


## Application Features

- User Registration
- Bank Account Creation
- Bank deposits and withdrawals
- Bank account management


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/tolulope-od/banka.git
```

## API endpoints
```
POST Request -> localhost:5000/api/v1/auth/signup
POST Request -> localhost:5000/api/v1/auth/signin
POST Request -> localhost:5000/api/v1/accounts
PATCH Request -> localhost:5000/api/v1/accounts/${account-number}
DELETE Request -> localhost:5000/api/v1/account/${account-number}
POST Request -> localhost:5000/api/v1/transactions/${account-number}/debit
POST Request -> localhost:5000/api/v1/transactions/${account-number}/credit
```

## Author

Jean Wallet
