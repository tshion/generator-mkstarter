/**
 * 文字が設定されているかの検証
 *
 * @param {string} text
 */
module.exports.validateNonEmpty = (text) => !!text && 0 < text.length;

/**
 * Package ID の書式検証
 *
 * @param {string} id
 * @param {RegExp} regex
 */
const validateProjectId = (id, regex) => {
  if (!this.validateNonEmpty(id)) {
    return `Missing project identifier`;
  }
  if (!regex.test(id)) {
    return `Invalid project identifier`;
  }
  return true;
};

/**
 * Apple 関連のPackage ID の書式検証
 *
 * @see {@link https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier}
 *
 * @param {string} id
 */
module.exports.validateProjectIdForApple = (id) =>
  validateProjectId(id, /^[a-z](\-?[a-z0-9]*)*(\.[a-z](\-?[a-z0-9]*)*)*$/i);

/**
 * JVM 関連のPackage ID の書式検証
 *
 * @see {@link https://developer.android.com/studio/build/configure-app-module#set-application-id}
 *
 * @param {string} id
 */
module.exports.validateProjectIdForJvm = (id) =>
  validateProjectId(id, /^[a-z](\_?[a-z0-9]*)*(\.[a-z](\_?[a-z0-9]*)*){2,}$/);
