# MyBudget Web

[![CircleCI](https://circleci.com/gh/ItalianCoders/myBudget-web-frontend.svg?style=svg)](https://circleci.com/gh/ItalianCoders/myBudget-web-frontend)

## Table of contents

- [MyBudget Web](#mybudget-web)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Serving the app](#serving-the-app)
    - [Unit teststing](#unit-teststing)
    - [Building a distribution version](#building-a-distribution-version)
  - [Infrostructure](#infrostructure)
    - [Initialize Terraform](#initialize-terraform)
    - [Plan your Terraform changes](#plan-your-terraform-changes)
    - [Apply your Terraform changes](#apply-your-terraform-changes)
  - [Deploy S3](#deploy-s3)
  - [Contributing](#contributing)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project requires NodeJS (at least version 8) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ node --version
v10.1.0

$ npm --version
6.0.1
```

### Installation

Start with cloning this repo on your local machine:

```sh
$ git clone git@github.com:ItalianCoders/myBudget-web-frontend.git
$ cd myBudget-web-frontend
```

Then install all the Node dependencies usin npm or Yarn

```sh
$ npm install
# Or using Yarn for a faster installation
$ yarn
```

## Usage

### Serving the app

```sh
$ npm start
```

### Unit teststing

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```

## Infrostructure

This project uses Terraform to create a `mubudget.com` S3 bucket into your AWS account.
Make sure you have your AWS credentials available in your machine and Terraform installed.

### Initialize Terraform

```sh
$ terraform init terraform/environments
```
### Plan your Terraform changes

```sh
$ terraform plan terraform/environments
```
### Apply your Terraform changes

```sh
$ terraform apply terraform/environments
```

This will create a `mubudget.com` S3 bucket and a `mubudget-s3-upload`
user with writing access to your new S3 bucket only.

## Deploy S3

```sh
$ make deploy
```

This will build a new distribution version of the project and sync the `dist/`
folder with the S3 bucket.

This task will create a distribution version of the project
inside your local `dist/my-budget-it` folder

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
1.  Create your feature branch: `git checkout -b my-new-feature`
1.  Add your changes: `git add .`
1.  Commit your changes: `git commit -am 'Add some feature'`
1.  Push to the branch: `git push origin my-new-feature`
1.  Submit a pull request :sunglasses:

## License

[MIT License](https://github.com/ItalianCoders/italiancoders.github.io/blob/master/LICENSE) © ItalianCoders
