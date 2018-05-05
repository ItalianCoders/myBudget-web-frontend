# MyBudget Web

> App running live at [www.mubudget.tk](http://www.mubudget.tk/)

[![CircleCI](https://circleci.com/gh/ItalianCoders/myBudget-web-frontend.svg?style=svg)](https://circleci.com/gh/ItalianCoders/myBudget-web-frontend)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Creating infrostructure

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
