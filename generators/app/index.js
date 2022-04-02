'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {

  /**
   * パス構成の設定
   *
   * @see {@link https://yeoman.io/authoring/file-system.html}
   */
  paths() {
    const sourceRootPath = path.join(
      this.sourceRoot(),
      `../../../templates`
    );
    this.sourceRoot(sourceRootPath);
  }


  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the great ${chalk.red(
          'generator-mkstarter-android'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Would you like to set app name?',
      },
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  async writing() {
    const appName = this.props.appName;

    const distPath = this.destinationPath(appName);
    this.fs.copy(this.templatePath(''), distPath);
  }

  install() {
    this.installDependencies();
  }
};
