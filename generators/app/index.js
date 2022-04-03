'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const replaceInFile = require('replace-in-file');
const yosay = require('yosay');

module.exports = class extends Generator {
  /**
   * 回答
   * @type {{ appName: string; packageId: string; }}
   */
  _answers;

  /**
   * Your initialization methods (checking current project state, getting configs, etc)
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  initializing() {
    this.sourceRoot(this._getSourceRootPath());

    this.log(
      yosay(
        `Welcome to the great ${chalk.red('generator-mkstarter')} generator!`
      )
    );
  }

  /**
   * Where you prompt users for options (where you’d call this.prompt())
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  async prompting() {
    this._answers = await this.prompt([
      {
        type: 'input',
        name: 'packageId',
        message: 'Would you like to set package id?',
      },
      {
        type: 'input',
        name: 'appName',
        message: 'Would you like to set app name?',
      },
    ]);
  }

  /**
   * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  // configuring() {}

  /**
   * If the method name doesn’t match a priority, it will be pushed to this group.
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  // default() {}

  /**
   * Where you write the generator specific files (routes, controllers, etc)
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  async writing() {
    const appName = this._answers.appName;
    const packages = this._answers.packageId.split('.');

    const distPath = this.destinationPath(appName);
    this.fs.copy(this.templatePath(''), distPath, {
      globOptions: { dot: true },
      processDestinationPath: (targetPath) => {
        const keyword = `java`;
        if (!targetPath.includes(keyword)) {
          return targetPath;
        }

        const targetDirName = path.dirname(targetPath);
        const targetFileName = path.basename(targetPath);
        return path.join(
          targetDirName.substring(0, targetDirName.indexOf(keyword)),
          keyword,
          ...packages,
          targetFileName
        );
      },
    });
  }

  /**
   * Where conflicts are handled (used internally)
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  // conflicts() {}

  /**
   * Where installations are run (npm, bower)
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  // install() {}

  /**
   * Called last, cleanup, say good bye, etc
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  async end() {
    const appName = this._answers.appName;

    await replaceInFile({
      files: [`${this.destinationPath(appName)}/**/*.*`],
      from: [/com\.github\.mkstarter/g, /mkstarter/g],
      to: [`${this._answers.packageId}`, `${appName}`],
    });
  }

  /**
   * テンプレートファイルのルートパス取得
   *
   * @see {@link https://yeoman.io/authoring/file-system.html}
   */
  _getSourceRootPath() {
    return path.join(this.sourceRoot(), `../../../templates`);
  }
};
