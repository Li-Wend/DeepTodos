/**
 * 认证服务
 * 负责处理用户注册、登录等认证相关的 API 操作
 */
import * as sdk from '../../client/sdk.gen';
/**
 * 认证服务类
 */
export class AuthService {
    /**
     * 用户注册
     * @param data - 注册数据（邮箱、密码、用户名）
     * @returns 注册结果
     */
    async register(data) {
        try {
            const response = await sdk.registerRegisterAuthRegisterPost({
                body: data,
            });
            if (!response.data) {
                throw new Error('注册失败：服务器未返回数据');
            }
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    /**
     * 错误处理
     * @param error - 捕获的错误
     * @returns 处理后的错误信息
     */
    handleError(error) {
        if (error instanceof Error) {
            return error;
        }
        if (typeof error === 'object' && error !== null) {
            const message = error.message || error.detail || JSON.stringify(error);
            return new Error(message);
        }
        return new Error('未知错误');
    }
}
// 导出单例
export const authService = new AuthService();
