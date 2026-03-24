
import { describe, it, expect } from 'vitest'

describe('数学工具函数', () => {
  it('加法测试', () => {
    expect(1 + 1).toBe(2)
  })
  
  it('异步测试', async () => {
    const result = await Promise.resolve(42)
    expect(result).toBe(42)
  })
})