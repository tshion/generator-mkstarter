const path = require('path');

const ArgsModel = require('./args.model');
const validators = require('./inspection.model');

/**
 * 対話関連処理
 */
module.exports = class {
  #argsModel;
  #generator;

  /**
   * @param {import('yeoman-generator')} generator
   */
  constructor(generator) {
    this.#argsModel = new ArgsModel(generator);
    this.#generator = generator;
  }

  /**
   * プロジェクトID の問い合わせ
   *
   * @param {import('./config.entity')} config 設定データ(副作用あり)
   * @param {(id: string) => boolean} validator 利用する書式検証ロジック
   */
  async askForProjectId(config, validator) {
    const id = this.#argsModel.projectId;
    if (validator(id)) {
      config.projectId = id;
      return Promise.resolve();
    }

    const answer = await this.#generator.prompt({
      type: `input`,
      name: `id`,
      message: `What's the id of your project?`,
      validate: validator,
    });
    config.projectId = answer.id;
  }

  /**
   * プロジェクト名の問い合わせ
   *
   * @param {import('./config.entity')} config 設定データ(副作用あり)
   */
  async askForProjectName(config) {
    const name = this.#argsModel.projectName;
    if (validators.validateNonEmpty(name)) {
      config.projectName = name;
      return Promise.resolve();
    }

    const candidate = path.basename(this.#argsModel.destination);
    const answer = await this.#generator.prompt({
      type: `input`,
      name: `name`,
      message: `What's the name of your project?`,
      default: candidate,
      validate: (text) => {
        if (!validators.validateNonEmpty(text)) {
          return `Missing project name`;
        }
        return true;
      },
    });
    config.projectName = answer.name;
  }
};
