import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 用户API的基地址
 */
const baseUrl = 'user/profile'

const userProfileAPI = {
  uploadAvatar: new APIInfo('uploadAvatarPolicy', baseUrl, 'post')
}

/**
 * 获取上传头像的凭证
 */
export const getUploadAvatarPolicy = () => {
  return request(userProfileAPI.uploadAvatar)
}

