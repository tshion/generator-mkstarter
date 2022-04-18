const path = require('path');

const ConfigEntity = require('../models/config.entity');
const DialogueModel = require('../models/dialogue.model');
const validators = require('../models/inspection.model');

/**
 * iOS プロジェクトの複製
 */
module.exports = {
  id: ConfigEntity.typeIos,
  name: `New iOS Project`,

  /**
   * @param {import('yeoman-generator')} generator
   * @param {import('../models/config.entity')} config
   */
  prompting: async (generator, config) => {
    const model = new DialogueModel(generator);
    await model.askForProjectName(config);
    await model.askForProjectId(config, validators.validateProjectIdForApple);
  },

  /**
   * @param {import('yeoman-generator')} generator
   * @param {import('../models/config.entity')} config
   */
  writing: async (generator, config) => {
    const replaceExts = [`.md`, `.yml`];
    const templatePath = `ios`;

    const distPath = generator.destinationPath(config.projectName);
    generator.fs.copy(generator.templatePath(templatePath), distPath, {
      globOptions: { dot: true },
      process: (contents, targetPath) => {
        const targetExt = path.extname(targetPath);
        if (!replaceExts.some((ext) => targetExt === ext)) {
          return contents;
        }

        return contents
          .toString()
          .replace(/com\.github\.tshion\.mkstarter/g, `${config.projectId}`)
          .replace(/mkstarter/g, `${config.projectName}`);
      },
      processDestinationPath: (targetPath) => {
        const keyword = `/mkstarter`;
        if (!targetPath.includes(keyword)) {
          return targetPath;
        }

        const targetDirName = path.dirname(targetPath);
        const targetFileName = path.basename(targetPath);
        return path.join(
          targetDirName.replace(keyword, `/${config.projectName}`),
          targetFileName
        );
      },
    });
  },
};
