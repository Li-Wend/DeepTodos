import requests

def ask_deepseek(api_key, message):
    """
    向 DeepSeek API 发送请求并获取回复
    :param api_key: 你的 DeepSeek API 密钥
    :param message: 用户输入的消息
    :return: AI 生成的回复
    """
    # API 端点 (请替换为实际 DeepSeek API 地址)
    url = "https://api.deepseek.com/v1/chat/completions"
    #url = "https://api.deepseek.com/v1"
    
    # 请求头
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # 请求数据
    payload = {
        "model": "deepseek-chat",  # 模型名称 (根据实际可用模型调整)
        "messages": [
            {"role": "user", "content": message}
        ],
        "temperature": 0.7,  # 控制生成文本的随机性 (0-2)
        "max_tokens": 200     # 限制回复的最大长度
    }
    
    try:
        # 发送 POST 请求
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # 检查错误
        
        # 解析回复
        ai_reply = response.json()["choices"][0]["message"]["content"]
        return ai_reply.strip()
    
    except requests.exceptions.RequestException as e:
        return f"请求出错: {str(e)}"
    except (KeyError, IndexError) as e:
        return "解析响应时出错，请检查API格式"


# 使用示例
if __name__ == "__main__":
    # 替换为你的实际 API 密钥 (从 DeepSeek 控制台中获取，并且需要支付费用才可以使用)
    API_KEY = "sk-62d52788e82f465bb0a3e3e77bff4655"  
    
    while True:
        user_input = input("\n你: ")
        if user_input.lower() in ["exit", "quit"]:
            break
            
        # 获取 AI 回复
        reply = ask_deepseek(API_KEY, user_input)
        print(f"\nAI: {reply}")