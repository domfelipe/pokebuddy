export const XP_REWARDS = Object.freeze({
  task_started: 2,
  task_done: 25,
  task_cancelled: 1,
  command_success: 6,
  command_failure: 2,
  tests_passed: 18,
  tests_failed: 4,
  build_passed: 16,
  build_failed: 3,
  lint_passed: 12,
  lint_failed: 3,
  typecheck_passed: 12,
  typecheck_failed: 3,
  commit_created: 20,
  merge_completed: 28,
  push_attempted: 8,
  docs_written: 15,
  watch_changed: 4,
  manual_focus: 10
});

export const LEVEL_TITLES = Object.freeze([
  { min: 1, title: 'Hatchling' },
  { min: 2, title: 'Junior Companion' },
  { min: 5, title: 'Debug Partner' },
  { min: 10, title: 'Terminal Guardian' },
  { min: 20, title: 'Senior Beast' },
  { min: 35, title: 'Mythic Companion' },
  { min: 50, title: 'Legend of the Prompt' }
]);

export function xpForNextLevel(level) {
  return Math.max(1, level) * Math.max(1, level) * 100;
}

export function levelFromXp(xp = 0) {
  let level = 1;
  while (xp >= xpForNextLevel(level)) {
    level += 1;
  }
  return level;
}

export function titleForLevel(level = 1) {
  return LEVEL_TITLES.filter((entry) => level >= entry.min).at(-1)?.title ?? 'Hatchling';
}

export function progressToNextLevel(xp = 0) {
  const level = levelFromXp(xp);
  const previous = level <= 1 ? 0 : xpForNextLevel(level - 1);
  const next = xpForNextLevel(level);
  return {
    level,
    title: titleForLevel(level),
    current: Math.max(0, xp - previous),
    needed: Math.max(1, next - previous),
    previous,
    next
  };
}

export function applyXp(entry, amount) {
  const beforeLevel = entry.level ?? levelFromXp(entry.xp ?? 0);
  entry.xp = Math.max(0, (entry.xp ?? 0) + amount);
  entry.level = levelFromXp(entry.xp);
  entry.energy = Math.min(100, Math.max(0, (entry.energy ?? 50) + Math.min(12, Math.ceil(amount / 3))));
  entry.mood = entry.level > beforeLevel ? 'level-up' : amount >= 15 ? 'proud' : 'focused';
  return { beforeLevel, afterLevel: entry.level, leveledUp: entry.level > beforeLevel };
}
