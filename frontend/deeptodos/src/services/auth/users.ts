import { apiClient } from '../api'
import {
  usersCurrentUserUsersMeGet,
  usersDeleteUserUsersIdDelete,
  usersPatchCurrentUserUsersMePatch,
  usersPatchUserUsersIdPatch,
  usersUserUsersIdGet,
} from '../../client'
import type { UserUpdate } from '../../client'

export const usersService = {
  getCurrentUser() {
    return usersCurrentUserUsersMeGet({
        client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  getUserById(userId: string) {
    return usersUserUsersIdGet({
        client: apiClient, path: { id: userId },
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  updateCurrentUser(body: UserUpdate) {
    return usersPatchCurrentUserUsersMePatch({
        client: apiClient, body,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  updateUserById(userId: string, body: UserUpdate) {
    return usersPatchUserUsersIdPatch({
        client: apiClient, path: { id: userId }, body,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  deleteUserById(userId: string) {
    return usersDeleteUserUsersIdDelete({
        client: apiClient, path: { id: userId },
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
}
