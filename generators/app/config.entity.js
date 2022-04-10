exports.keyCommandType = `commandType`;
exports.keyDestination = `destination`;
exports.keyProjectId = `projectId`;
exports.keyProjectName = `projectName`;

/**
 * 設定データの定義
 */
module.exports = class {
  /**
   * 複製作業時に使うコマンド種別
   *
   * @type {string}
   */
  commandType;

  /**
   * 配置先
   *
   * @type {string}
   */
  destination;

  /**
   * プロジェクトID
   *
   * @type {string}
   */
  projectId;

  /**
   * プロジェクト名
   *
   * @type {string}
   */
  projectName;
};
