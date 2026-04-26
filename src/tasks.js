import crypto from 'node:crypto';
import { addEvent } from './state.js';

export function ensureTaskStore(state) {
  state.tasks ??= [];
  state.currentTaskId ??= null;
  return state.tasks;
}

export function startTask(state, title) {
  ensureTaskStore(state);
  const cleanTitle = String(title || '').trim();
  if (!cleanTitle) throw new Error('Task title is required.');

  const task = {
    id: `task_${crypto.randomUUID().slice(0, 8)}`,
    title: cleanTitle,
    status: 'active',
    startedAt: new Date().toISOString(),
    completedAt: null,
    cancelledAt: null,
    xpAwarded: 0
  };

  state.tasks.unshift(task);
  state.currentTaskId = task.id;
  addEvent(state, 'task_started', { id: task.id, title: task.title });
  return task;
}

export function getCurrentTask(state) {
  ensureTaskStore(state);
  return state.tasks.find((task) => task.id === state.currentTaskId && task.status === 'active') ?? null;
}

export function completeCurrentTask(state) {
  const task = getCurrentTask(state);
  if (!task) return null;
  task.status = 'done';
  task.completedAt = new Date().toISOString();
  state.currentTaskId = null;
  addEvent(state, 'task_done', { id: task.id, title: task.title });
  return task;
}

export function cancelCurrentTask(state) {
  const task = getCurrentTask(state);
  if (!task) return null;
  task.status = 'cancelled';
  task.cancelledAt = new Date().toISOString();
  state.currentTaskId = null;
  addEvent(state, 'task_cancelled', { id: task.id, title: task.title });
  return task;
}

export function recentTasks(state, limit = 10) {
  ensureTaskStore(state);
  return state.tasks.slice(0, limit);
}
