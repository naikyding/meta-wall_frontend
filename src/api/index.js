import { getPostsList, creatPost, commentPost } from './posts'
import { getUserFollows } from './follows'
import {
  userRegister,
  userLogin,
  userProfile,
  updateProfile,
  updatePassword,
  getUserLikes,
  toggleUserLikes,
} from './user'

export const getPostsListAPI = getPostsList
export const creatPostAPI = creatPost
export const commentPostAPI = commentPost

export const userRegisterAPI = userRegister
export const userLoginAPI = userLogin

export const userProfileAPI = userProfile
export const updateProfileAPI = updateProfile
export const updatePasswordAPI = updatePassword

export const getUserFollowsAPI = getUserFollows

export const getUserLikesAPI = getUserLikes
export const toggleUserLikesAPI = toggleUserLikes
