import argparse
import json
import os
import requests
from typing import List, Dict, Any

class DeepSeekChatAPI:
    """DeepSeek AI 对话 API 客户端"""
    
    def __init__(self, api_key: str, model: str = "deepseek-chat", 
                 temperature: float = 0.7, max_tokens: int = 1000):
        """初始化 API 客户端"""
        self.api_key = api_key
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
        self.base_url = "https://api.deepseek.com/v1/chat/completions"
        self.messages = []  # 存储对话历史
    
    def add_user_message(self, content: str) -> None:
        """添加用户消息到对话历史"""
        self.messages.append({"role": "user", "content": content})
    
    def get_response(self) -> str:
        """发送请求并获取 AI 回复"""
        payload = {
            "model": self.model,
            "messages": self.messages,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens
        }
        
        try:
            response = requests.post(self.base_url, headers=self.headers, data=json.dumps(payload))
            response.raise_for_status()
            response_data = response.json()
            ai_message = response_data["choices"][0]["message"]["content"]
            self.messages.append({"role": "assistant", "content": ai_message})
            return ai_message
        except requests.exceptions.RequestException as e:
            print(f"请求错误: {e}")
            return "抱歉，请求过程中出现错误。"
        except (KeyError, json.JSONDecodeError) as e:
            print(f"响应解析错误: {e}")
            return "抱歉，解析响应时出现错误。"

def main():
    """主函数：处理命令行参数并启动对话"""
    parser = argparse.ArgumentParser(description="DeepSeek AI 对话客户端")
    parser.add_argument("--api-key", help="DeepSeek API 密钥")
    parser.add_argument("--model", default="deepseek-chat", help="使用的模型名称")
    parser.add_argument("--temperature", type=float, default=0.7, help="温度参数，控制随机性")
    parser.add_argument("--max-tokens", type=int, default=1000, help="最大生成长度")
    
    args = parser.parse_args()
    
    # 优先使用命令行参数中的 API 密钥，否则尝试从环境变量获取
    api_key = args.api_key or os.environ.get("DEEPSEEK_API_KEY")
    
    if not api_key:
        print("错误: 请提供 DeepSeek API 密钥 (通过 --api-key 参数或 DEEPSEEK_API_KEY 环境变量)")
        return
    
    # 初始化 API 客户端
    client = DeepSeekChatAPI(
        api_key=api_key,
        model=args.model,
        temperature=args.temperature,
        max_tokens=args.max_tokens
    )
    
    print("=== DeepSeek AI 对话系统 ===")
    print("输入 'exit' 结束对话，输入 'clear' 清空对话历史")
    
    while True:
        user_input = input("\n你: ")
        
        if user_input.lower() == "exit":
            break
        
        if user_input.lower() == "clear":
            client.messages = []
            print("对话历史已清空")
            continue
        
        client.add_user_message(user_input)
        response = client.get_response()
        print(f"DeepSeek AI: {response}")

if __name__ == "__main__":
    main()    