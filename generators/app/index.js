'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const yosay = require('yosay');

const ArgsModel = require('./models/args.model');
const commandAndroidKotlin = require('./generators/android-kt.generator');
const ConfigEntity = require('./models/config.entity');
const validators = require('./models/inspection.model');

const commands = [commandAndroidKotlin, commandAndroidKotlin];

module.exports = class extends Generator {
  #argsModel;
  #configEntity;

  _config;

  _generator;

  constructor(args, opts) {
    super(args, opts);

    this.#configEntity = new ConfigEntity();

    this.#argsModel = new ArgsModel(this);
    this.#argsModel.setupReceiver();
  }

  /**
   * Your initialization methods (checking current project state, getting configs, etc)
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  initializing() {
    // Welcome
    this.log(yosay(`Welcome to the project generator!`));

    const destinationPath = this.#argsModel.destination;
    if (validators.validateNonEmpty(destinationPath)) {
      const folderPath = path.resolve(this.destinationPath(), destinationPath);
      this.destinationRoot(folderPath);
    }

    const sourceRootPath = path.join(this.sourceRoot(), `../../../templates`);
    this.sourceRoot(sourceRootPath);
  }

  /**
   * Where you prompt users for options (where you’d call this.prompt())
   *
   * @see {@link https://yeoman.io/authoring/running-context.html}
   */
  async prompting() {
    const commandType = this.#argsModel.commandType;
    if (commandType) {
      this.log(`You selected ${commandType}`);
    } else {
      const choices = [];
      for (const c of commands) {
        choices.push({ name: c.name, value: c.id });
      }

      const type = (
        await this.prompt({
          type: 'list',
          name: 'type',
          message: 'What type of extension do you want to create?',
          pageSize: choices.length,
          choices,
        })
      ).type;

      this._generator = commands.find((g) => g.id === type);
      await this._generator.prompting(this, this._config);
    }
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
    if (!this._generator) {
      return;
    }
    return this._generator.writing(this, this._config);
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
  // end() {}
};
