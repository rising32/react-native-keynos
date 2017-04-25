import DeviceInfo from 'react-native-device-info';

// Develop (true) - Production (false)
export const DEVELOP = true

// Logs enabled - disabled
export const LOG_ENABLED = DEVELOP ? true : false

// API URL (Dev / Prod)
export const BASE_URL = DEVELOP ? 'http://keynos.mobi/api/v1/' : 'http://keynos.mobi/api/v1/'

export const APP_VERSION = DeviceInfo.getVersion()
export const DEVICE_ID = DeviceInfo.getUniqueID()
