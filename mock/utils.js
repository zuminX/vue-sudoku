const Mock = require('mockjs')

const mockAPI = (mockInfo) => {
  const apiInfo = mockInfo.apiInfo
  Mock.mock(apiInfo.url, apiInfo.type, mockInfo.param)
}

module.exports = {
  mockAPI
}
