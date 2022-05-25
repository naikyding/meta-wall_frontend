import { getPostsList, creatPost } from './posts'
import { getUserFollows } from './follows'
import {
  userRegister,
  userLogin,
  userProfile,
  updateProfile,
  updatePassword,
} from './user'

export const getPostsListAPI = getPostsList
export const creatPostAPI = creatPost

export const userRegisterAPI = userRegister
export const userLoginAPI = userLogin

export const userProfileAPI = userProfile
export const updateProfileAPI = updateProfile
export const updatePasswordAPI = updatePassword

export const getUserFollowsAPI = getUserFollows
