const path = require('path');

/**
 * Android(Kotlin) の生成
 */
module.exports = {
  id: `ext-android-kt`,
  name: `Android(Kotlin)`,

  /**
   * @param {import('yeoman-generator')} generator
   * @param {Object} config
   */
  prompting: async (generator, config) => {
    await generator
      .prompt([
        {
          type: 'input',
          name: 'packageId',
          message: 'Would you like to set package id?',
        },
      ])
      .then((answer) => (config.id = answer.packageId));

    await generator
      .prompt([
        {
          type: 'input',
          name: 'appName',
          message: 'Would you like to set app name?',
        },
      ])
      .then((answer) => (config.name = answer.appName));
  },

  /**
   * @param {import('yeoman-generator')} generator
   * @param {Object} config
   */
  writing: async (generator, config) => {
    const appName = config.name;
    const packages = config.id.split('.');
    const replaceExts = [`.gradle`, `.java`, `.kt`, `.pro`, `.xml`];

    const distPath = generator.destinationPath(appName);
    generator.fs.copy(generator.templatePath('android_kt'), distPath, {
      globOptions: { dot: true },
      process: (contents, targetPath) => {
        const targetExt = path.extname(targetPath);
        if (!replaceExts.some((ext) => targetExt === ext)) {
          return contents;
        }

        return contents
          .toString()
          .replace(/com\.github\.mkstarter/g, `${config.id}`)
          .replace(/mkstarter/g, `${appName}`);
      },
      processDestinationPath: (targetPath) => {
        const keyword = `java`;
        if (!targetPath.includes(keyword)) {
          return targetPath;
        }

        const targetDirName = path.dirname(targetPath);
        const targetFileName = path.basename(targetPath);
        return path.join(
          targetDirName.substring(0, targetDirName.indexOf(keyword)),
          keyword,
          ...packages,
          targetFileName
        );
      },
    });
  },
};
