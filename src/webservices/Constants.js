import DeviceInfo from 'react-native-device-info';
import { PixelRatio } from 'react-native';


// Develop (true) - Production (false)
export const DEVELOP = true

// Logs enabled - disabled
export const LOG_ENABLED = DEVELOP ? true : false

// API URL (Dev / Prod)
export const BASE_URL = DEVELOP ? 'http://keynos.mobi/api/v1/' : 'http://keynos.mobi/api/v1/'

export const APP_VERSION = DeviceInfo.getVersion()
export const DEVICE_ID = DeviceInfo.getUniqueID()
export const DEVICE_LOCALE = DeviceInfo.getDeviceLocale()

// MIN TYPING TIMER
export const DEFAULT_TYPING_TIMER = 2000

// TIME PER LETTER
export const CHARACTER_TYPING_TIMER = 30

// TIME PER IMAGE
export const IMAGE_TYPING_TIMER = 2000

export const CAMERA_OPTIONS = {
  quality: 0.6,
  maxWidth: PixelRatio.getPixelSizeForLayoutSize(640), // photos only
  maxHeight: PixelRatio.getPixelSizeForLayoutSize(480), // photos only
  allowsEditing: false,
  storageOptions: {
    skipBackup: true,
    path: 'keynos'
  }
}
