import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getCharacterStats, getSessionRating, incrementCharacterMatchCount, upsertRating } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // 角色评分和计数路由
  character: router({
    // 获取角色统计（匹配次数 + 平均评分）
    getStats: publicProcedure
      .input(z.object({ characterId: z.string() }))
      .query(async ({ input }) => {
        return await getCharacterStats(input.characterId);
      }),

    // 获取当前 session 对该角色的评分
    getMyRating: publicProcedure
      .input(z.object({ characterId: z.string(), sessionId: z.string() }))
      .query(async ({ input }) => {
        const rating = await getSessionRating(input.sessionId, input.characterId);
        return { rating };
      }),

    // 提交评分
    rate: publicProcedure
      .input(z.object({
        characterId: z.string(),
        sessionId: z.string(),
        rating: z.number().int().min(1).max(5),
      }))
      .mutation(async ({ input }) => {
        await upsertRating(input.characterId, input.sessionId, input.rating);
        return { success: true };
      }),

    // 记录测试完成（增加匹配次数）
    recordMatch: publicProcedure
      .input(z.object({ characterId: z.string() }))
      .mutation(async ({ input }) => {
        await incrementCharacterMatchCount(input.characterId);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
