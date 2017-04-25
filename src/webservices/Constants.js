// Develop (true) - Production (false)
export const DEVELOP = true

// Logs enabled - disabled
export const LOG_ENABLED = DEVELOP ? true : false

// API URL (Dev / Prod)
export const BASE_URL = DEVELOP ? 'http://keynos.mobi/api/v1/' : 'http://keynos.mobi/api/v1/'

export const APP_VERSION = '1.0.1'
