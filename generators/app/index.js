'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const yosay = require('yosay');

const ArgsModel = require('./models/args.model');
const commands = [
  require('./commands/android.command'),
  require('./commands/ios.command'),
];
const ConfigEntity = require('./models/config.entity');
const validators = require('./models/inspection.model');

module.exports = class extends Generator {
  #argsModel;
  #configEntity;
  #selectedCommand;

  constructor(args, opts) {
    super(args, opts);

    this.#configEntity = new ConfigEntity();
    this.#selectedCommand = undefined;

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
    let commandType = this.#argsModel.commandType;
    if (validators.validateNonEmpty(commandType)) {
      const isMatch = commands.some((c) => c.id === commandType);
      if (!isMatch) {
        this.log(`Don't support "${commandType}".`);
        return;
      }
    } else {
      const choices = [];
      for (const c of commands) {
        choices.push({ name: c.name, value: c.id });
      }
      commandType = (
        await this.prompt({
          type: 'list',
          name: 'type',
          message: 'What type of project do you want to create?',
          pageSize: choices.length,
          choices,
        })
      ).type;
    }

    this.#selectedCommand = commands.find((c) => c.id === commandType);
    await this.#selectedCommand.prompting(this, this.#configEntity);
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
    if (!this.#selectedCommand) {
      return;
    }
    return this.#selectedCommand.writing(this, this.#configEntity);
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
