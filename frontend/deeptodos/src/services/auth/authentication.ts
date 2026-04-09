import { apiClient } from '../api'
import {
  authenticatedRouteAuthenticatedRouteGet,
  authJwtLoginAuthJwtLoginPost,
  authJwtLogoutAuthJwtLogoutPost,
  registerRegisterAuthRegisterPost,
  resetForgotPasswordAuthForgotPasswordPost,
  resetResetPasswordAuthResetPasswordPost,
  verifyRequestTokenAuthRequestVerifyTokenPost,
  verifyVerifyAuthVerifyPost,
} from '../../client'
import type {
  BodyAuthJwtLoginAuthJwtLoginPost,
  BodyResetForgotPasswordAuthForgotPasswordPost,
  BodyResetResetPasswordAuthResetPasswordPost,
  BodyVerifyRequestTokenAuthRequestVerifyTokenPost,
  BodyVerifyVerifyAuthVerifyPost,
  UserCreate,
} from '../../client'

export const authenticationService = {
  checkAuthenticated() {
    return authenticatedRouteAuthenticatedRouteGet({
        client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  login(body: BodyAuthJwtLoginAuthJwtLoginPost) {
    return authJwtLoginAuthJwtLoginPost({
        body, client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  logout() {
    return authJwtLogoutAuthJwtLogoutPost({
        client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  register(body: UserCreate) {
    return registerRegisterAuthRegisterPost({
        body, client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  requestPasswordReset(body: BodyResetForgotPasswordAuthForgotPasswordPost) {
    return resetForgotPasswordAuthForgotPasswordPost({
        body, client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  resetPassword(body: BodyResetResetPasswordAuthResetPasswordPost) {
    return resetResetPasswordAuthResetPasswordPost({
        body, client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  verifyRequestToken(body: BodyVerifyRequestTokenAuthRequestVerifyTokenPost) {
    return verifyRequestTokenAuthRequestVerifyTokenPost({
        body, client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
  verify(body: BodyVerifyVerifyAuthVerifyPost) {
    return verifyVerifyAuthVerifyPost({
        body, client: apiClient,
        onRequest: undefined,
        onSseError: undefined,
        onSseEvent: undefined,
        sseDefaultRetryDelay: undefined,
        sseMaxRetryAttempts: undefined,
        sseMaxRetryDelay: undefined
    })
  },
}
