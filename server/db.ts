import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, characterRatings, characterStats, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

/** 增加角色匹配次数（每次测试完成时调用） */
export async function incrementCharacterMatchCount(characterId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(characterStats)
    .values({ characterId, matchCount: 1 })
    .onDuplicateKeyUpdate({ set: { matchCount: sql`match_count + 1` } });
}

/** 获取角色统计信息（匹配次数 + 平均评分） */
export async function getCharacterStats(characterId: string) {
  const db = await getDb();
  if (!db) return { matchCount: 0, avgRating: null, ratingCount: 0 };

  const [stats] = await db
    .select()
    .from(characterStats)
    .where(eq(characterStats.characterId, characterId))
    .limit(1);

  const ratings = await db
    .select()
    .from(characterRatings)
    .where(eq(characterRatings.characterId, characterId));

  const ratingCount = ratings.length;
  const avgRating = ratingCount > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratingCount
    : null;

  return {
    matchCount: stats?.matchCount ?? 0,
    avgRating: avgRating ? Math.round(avgRating * 10) / 10 : null,
    ratingCount,
  };
}

/** 提交或更新评分 */
export async function upsertRating(characterId: string, sessionId: string, rating: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  // 查询是否已有评分
  const existing = await db
    .select()
    .from(characterRatings)
    .where(eq(characterRatings.sessionId, sessionId))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(characterRatings)
      .set({ rating, updatedAt: new Date() })
      .where(eq(characterRatings.sessionId, sessionId));
  } else {
    await db
      .insert(characterRatings)
      .values({ characterId, sessionId, rating });
  }
}

/** 获取特定 session 对某角色的评分 */
export async function getSessionRating(sessionId: string, characterId: string): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(characterRatings)
    .where(eq(characterRatings.sessionId, sessionId))
    .limit(1);

  return result.length > 0 ? result[0].rating : null;
}
