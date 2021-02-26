const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

const baseUrl = '/security'

const securityAPI = {
  login: new APIInfo(`${baseUrl}/login`, 'post'),
  captchaImage: new APIInfo(`${baseUrl}/captchaImage`, 'get'),
  logout: new APIInfo(`${baseUrl}/logout`, 'post')
}

module.exports = [
  new MockInfo(securityAPI.login, () => {
    return require('./data/login.json')
  }),
  new MockInfo(securityAPI.captchaImage, () => {
    return require('./data/captchaImage.json')
  }),
  new MockInfo(securityAPI.logout, () => {
    return require('./data/logout.json')
  })
]
