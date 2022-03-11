import _ from 'lodash';
import ExtensionCommand from './extension-command';
import { KNOWN_DRIVERS } from '../constants';
import '@colors/colors';

const REQ_DRIVER_FIELDS = ['driverName', 'automationName', 'platformNames', 'mainClass'];
/**
 * @extends {ExtensionCommand<import('../extension/manifest').DriverType>}
 */
export default class DriverCommand extends ExtensionCommand {

  /**
   * @param {DriverCommandOptions} opts
   */
  constructor ({config, json}) {
    super({config, json});
    this.knownExtensions = KNOWN_DRIVERS;
  }

  getPostInstallText ({extName, extData}) {
    return `Driver ${extName}@${extData.version} successfully installed\n`.green +
           `- automationName: ${extData.automationName.green}\n` +
           `- platformNames: ${JSON.stringify(extData.platformNames).green}`;
  }

  validateExtensionFields (appiumPkgData) {
    const missingFields = REQ_DRIVER_FIELDS.reduce((acc, field) => (
      appiumPkgData[field] ? acc : [...acc, field]
    ), []);

    if (!_.isEmpty(missingFields)) {
      throw new Error(`Installed driver did not expose correct fields for compability ` +
                      `with Appium. Missing fields: ${JSON.stringify(missingFields)}`);
    }

  }

}

/**
 * @typedef DriverCommandOptions
 * @property {import('../extension/extension-config').ExtensionConfig<import('../extension/manifest').DriverType>} config
 * @property {boolean} json
 */
