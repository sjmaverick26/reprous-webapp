export interface UserProgressData {
  completedTopics: string[];
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  earnedBadges: string[];
}

const STORAGE_KEY = "reprous_user_progress_v1";

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export const DEFAULT_USER_PROGRESS: UserProgressData = {
  completedTopics: [],
  xp: 0,
  streak: 1,
  lastActiveDate: getTodayString(),
  earnedBadges: [],
};

/**
 * Loads stored user progress from browser localStorage.
 * Automatically updates streak based on last active calendar date.
 */
export function getStoredProgress(): UserProgressData {
  if (typeof window === "undefined") {
    return DEFAULT_USER_PROGRESS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_USER_PROGRESS;
    }

    const parsed = JSON.parse(raw);
    const today = getTodayString();
    const lastDate = typeof parsed.lastActiveDate === "string" ? parsed.lastActiveDate : today;

    // Calculate streak days
    let streak = typeof parsed.streak === "number" && parsed.streak > 0 ? parsed.streak : 1;
    if (lastDate !== today) {
      const last = new Date(lastDate);
      const current = new Date(today);
      const diffMs = current.getTime() - last.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day: increment streak
        streak += 1;
      } else if (diffDays > 1) {
        // Missed one or more days: reset streak to 1
        streak = 1;
      }
    }

    const progress: UserProgressData = {
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      xp: typeof parsed.xp === "number" && parsed.xp >= 0 ? parsed.xp : 0,
      streak,
      lastActiveDate: today,
      earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges : [],
    };

    // Save back with refreshed streak & date
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return progress;
  } catch (err) {
    console.warn("Could not read user progress from localStorage:", err);
    return DEFAULT_USER_PROGRESS;
  }
}

/**
 * Persists user progress strictly into browser localStorage.
 * No network requests, zero server transmission.
 */
export function saveStoredProgress(data: Partial<UserProgressData>): void {
  if (typeof window === "undefined") return;

  try {
    const current = getStoredProgress();
    const updated: UserProgressData = {
      ...current,
      ...data,
      lastActiveDate: getTodayString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Could not save user progress to localStorage:", err);
  }
}

/**
 * Completely resets user progress in browser localStorage back to zero.
 */
export function resetStoredProgress(): UserProgressData {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("Could not reset user progress in localStorage:", err);
    }
  }

  const fresh: UserProgressData = {
    completedTopics: [],
    xp: 0,
    streak: 1,
    lastActiveDate: getTodayString(),
    earnedBadges: [],
  };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
  }

  return fresh;
}
