const Config = require('./config.entity');

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
   * @returns {string|undefined} コマンド種別
   */
  commandType = () => this.#generator.options[Config.keyCommandType];

  /**
   * @returns {string|undefined} 配置先
   */
  destination = () => this.#generator.options[Config.keyDestination];

  /**
   * @returns {string|undefined} プロジェクトID
   */
  projectId = () => this.#generator.options[Config.keyProjectId];

  /**
   * @returns {string|undefined} プロジェクト名
   */
  projectName = () => this.#generator.options[Config.keyProjectName];

  /**
   * 各設定値をコマンド引数から受け取るためのセットアップ
   */
  setupReceiver = () => {
    this.description = `Generates a project ready for development.`;

    this.#generator.argument(Config.keyDestination, {
      type: String,
      required: false,
      description: `\n    The folder to create the project in, absolute or relative to the current working directory.\n    Use '.' for the current folder. If not provided, defaults to a folder with the project name.\n  `,
    });

    this.#generator.option(Config.keyCommandType, {
      type: String,
      alias: `type`,
      description: `Type of the project`,
    });
    this.#generator.option(Config.keyProjectId, {
      type: String,
      alias: `id`,
      description: `Id of the project`,
    });
    this.#generator.option(Config.keyProjectName, {
      type: String,
      alias: `name`,
      description: `Name of the project`,
    });
  };
};
