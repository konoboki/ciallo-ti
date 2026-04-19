import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getCharacterStats: vi.fn().mockResolvedValue({
    matchCount: 42,
    avgRating: 4.5,
    ratingCount: 10,
  }),
  getSessionRating: vi.fn().mockResolvedValue(4),
  upsertRating: vi.fn().mockResolvedValue(undefined),
  incrementCharacterMatchCount: vi.fn().mockResolvedValue(undefined),
  getDb: vi.fn().mockResolvedValue(null),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("character router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getStats - 返回角色统计信息", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.character.getStats({ characterId: "kanna" });

    expect(result).toEqual({
      matchCount: 42,
      avgRating: 4.5,
      ratingCount: 10,
    });
  });

  it("getMyRating - 返回当前 session 的评分", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.character.getMyRating({
      characterId: "kanna",
      sessionId: "test-session-123",
    });

    expect(result).toEqual({ rating: 4 });
  });

  it("rate - 提交有效评分（1-5）", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.character.rate({
      characterId: "kanna",
      sessionId: "test-session-123",
      rating: 5,
    });

    expect(result).toEqual({ success: true });
  });

  it("rate - 拒绝超出范围的评分", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.character.rate({
        characterId: "kanna",
        sessionId: "test-session-123",
        rating: 6, // 超出范围
      })
    ).rejects.toThrow();
  });

  it("rate - 拒绝评分为 0", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.character.rate({
        characterId: "kanna",
        sessionId: "test-session-123",
        rating: 0, // 低于最小值
      })
    ).rejects.toThrow();
  });

  it("recordMatch - 记录匹配次数", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.character.recordMatch({ characterId: "kanna" });

    expect(result).toEqual({ success: true });
  });
});
