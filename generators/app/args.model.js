/**
 * コマンドライン引数関連ロジック
 */
module.exports = class {
  #generator;
  #keyCommandType = `commandType`;
  #keyProjectId = `projectId`;
  #keyProjectName = `projectName`;

  /**
   * @param {import('yeoman-generator')} generator
   */
  constructor(generator) {
    this.#generator = generator;
  }

  /**
   * @returns {string|undefined} コマンド種別
   */
  commandType = () => this.#generator.options[this.#keyCommandType];

  /**
   * @returns {string|undefined} プロジェクトID
   */
  projectId = () => this.#generator.options[this.#keyProjectId];

  /**
   * @returns {string|undefined} プロジェクト名
   */
  projectName = () => this.#generator.options[this.#keyProjectName];

  /**
   * 各設定値をコマンド引数から受け取るためのセットアップ
   */
  setupReceiver = () => {
    this.#generator.option(this.#keyCommandType, {
      type: String,
      alias: `t`,
      description: ``,
    });
    this.#generator.option(this.#keyProjectId, {
      type: String,
      alias: `id`,
      description: ``,
    });
    this.#generator.option(this.#keyProjectName, {
      type: String,
      alias: `name`,
      description: ``,
    });
  };
};
