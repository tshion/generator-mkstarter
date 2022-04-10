const ConfigEntity = require('./config.entity');

/**
 * コマンドライン引数関連ロジック
 */
module.exports = class {
  #generator;

  /**
   * @param {import('yeoman-generator')} generator
   */
  constructor(generator) {
    this.#generator = generator;
  }

  /**
   * コマンド種別
   * @type {string}
   */
  get commandType() {
    return this.#generator.options[ConfigEntity.keyCommandType];
  }

  /**
   * 配置先
   * @type {string}
   */
  get destination() {
    return this.#generator.options[ConfigEntity.keyDestination];
  }

  /**
   * プロジェクトID
   * @type {string}
   */
  get projectId() {
    return this.#generator.options[ConfigEntity.keyProjectId];
  }

  /**
   * プロジェクト名
   * @type {string}
   */
  get projectName() {
    return this.#generator.options[ConfigEntity.keyProjectName];
  }

  /**
   * 各設定値をコマンド引数から受け取るためのセットアップ
   */
  setupReceiver() {
    this.#generator.description = `Generates a project ready for development.`;

    this.#generator.argument(ConfigEntity.keyDestination, {
      type: String,
      required: false,
      description: `\n    The folder to create the project in, absolute or relative to the current working directory.\n    Use '.' for the current folder. If not provided, defaults to a folder with the project name.\n  `,
    });

    this.#generator.option(ConfigEntity.keyCommandType, {
      type: String,
      alias: `type`,
      description: `Type of the project`,
    });
    this.#generator.option(ConfigEntity.keyProjectId, {
      type: String,
      alias: `id`,
      description: `Id of the project`,
    });
    this.#generator.option(ConfigEntity.keyProjectName, {
      type: String,
      alias: `name`,
      description: `Name of the project`,
    });
  }
};
