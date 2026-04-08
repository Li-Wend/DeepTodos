// src/services/api.ts
import { client } from '../client/client.gen';
import { authService } from './authentication';
// 配置客户端
client.setConfig({
    baseUrl: 'http://localhost:8000',
});
// API 服务类
export class ApiService {
    /**
     * 认证相关 API
     */
    auth = {
        register: (data) => authService.register(data),
    };
}
// 创建单例实例
export const api = new ApiService();
// 导出客户端（如果需要直接使用）
export { client };
