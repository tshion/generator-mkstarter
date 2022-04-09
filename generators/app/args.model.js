exports.keyCommandType = `commandType`;
exports.keyProjectId = `projectId`;
exports.keyProjectName = `projectName`;

/**
 * コマンドライン引数関連ロジック
 */
module.exports = class {
  #generator;
  #keyDestination = `destination`;

  /**
   * @param {import('yeoman-generator')} generator
   */
  constructor(generator) {
    this.#generator = generator;
  }

  /**
   * @returns {string|undefined} コマンド種別
   */
  commandType = () => this.#generator.options[exports.keyCommandType];

  /**
   * @returns {string|undefined} 配置先
   */
  destination = () => this.#generator.options[this.#keyDestination];

  /**
   * @returns {string|undefined} プロジェクトID
   */
  projectId = () => this.#generator.options[exports.keyProjectId];

  /**
   * @returns {string|undefined} プロジェクト名
   */
  projectName = () => this.#generator.options[exports.keyProjectName];

  /**
   * 各設定値をコマンド引数から受け取るためのセットアップ
   */
  setupReceiver = () => {
    this.description = `Generates a project ready for development.`;

    this.#generator.argument(this.#keyDestination, {
      type: String,
      required: false,
      description: `\n    The folder to create the project in, absolute or relative to the current working directory.\n    Use '.' for the current folder. If not provided, defaults to a folder with the project name.\n  `,
    });

    this.#generator.option(exports.keyCommandType, {
      type: String,
      alias: `type`,
      description: `Type of the project`,
    });
    this.#generator.option(exports.keyProjectId, {
      type: String,
      alias: `id`,
      description: `Id of the project`,
    });
    this.#generator.option(exports.keyProjectName, {
      type: String,
      alias: `name`,
      description: `Name of the project`,
    });
  };
};
