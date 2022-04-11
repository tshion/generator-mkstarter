/**
 * 設定データの定義
 */
module.exports = class {
  static keyCommandType = `commandType`;
  static keyDestination = `destination`;
  static keyProjectId = `projectId`;
  static keyProjectName = `projectName`;

  /**
   * 複製作業時に使うコマンド種別
   * @type {string}
   */
  commandType;

  /**
   * プロジェクトID
   * @type {string}
   */
  projectId;

  /**
   * プロジェクト名
   * @type {string}
   */
  projectName;
};
