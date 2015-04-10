# react-cli

A command line interface tool that seeks to automate some tasks when working on a React.js project.

## Getting Started

Install the react command line tool globally so you can use it from any project directory.

```
$ npm install -g madebyform/react-cli
```

## Commands

### Create an Application

```
$ react new my-app
```

This command sets up a new react application inside the `my-app` directory. This is what you get out of the box:

* [Isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) Node configuration
* ES6 support via [babel](https://babeljs.io)
* Express server + EJS templating system
* React router configuration

The application will have the following directory structure:

```
my-app/
  assets/
  src/
    components/
    utils/
    views/
```

### Generate React components

```
$ react generate MyComponent firstProp:string secondProp:requiredObject
```

This creates a skeleton `mycomponent.jsx` file inside your `src/components` directory.

#### Component Lifecycle methods

By default, the resulting file includes React lifecycle methods, like `componentWillMount`. You can skip these by passing in either `-l` or `--skip-lifecycle` to the command above. To know more run `$ react generate -h`.

#### Property Types

Currently supported property types:

| Optional Props  | Required Props |
| --------------- | -------------- |
| any             | requiredAny    |
| array           | requiredArray  |
| bool            | requiredBool   |
| func            | requiredFunc   |
| number          | requiredNumber |
| object          | requiredObject |
| string          | requiredString |

## Usage

Use the `--help` flag for a complete list of options and commands.

```
$ react --help

  Usage: react <command> [options]


  Commands:

    new <name>                                        Generate a new react app boilerplate.
    generate [options] <name> [propName:PropType...]  Generate a new react component.
  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## License

Available under [the MIT license](http://mths.be/mit).
