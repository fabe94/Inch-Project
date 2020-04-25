const _ = require('lodash');
const pack = require('../package.json');
const {
  configureSettingsAndroid,
  configureSettingsIos,
} = require('./configureFacebookSdk');
const { injectFbSdk } = require('./injectFbSdk');

const ext = (resourceName) => (resourceName ? `${pack.name}.${resourceName}` : pack.name);

const getExtensionSettings = (appConfiguration) => {
  const included = _.get(appConfiguration, 'included');
  const extension = _.find(included,
    item => item.type === 'shoutem.core.extensions' && item.id === ext()
  );

  return _.get(extension, 'attributes.settings');
};

exports.preBuild = function preBuild(appConfiguration) {
  const extensionSettings = getExtensionSettings(appConfiguration);

  injectFbSdk();

  configureSettingsAndroid(extensionSettings);
  configureSettingsIos(extensionSettings);
};
