import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const STATE_DIR = path.join(os.homedir(), '.pokebuddy');
const STATE_FILE = path.join(STATE_DIR, 'state.json');
const CURRENT_SCHEMA_VERSION = 2;

export function getStatePath() {
  return STATE_FILE;
}

export function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return createInitialState();
  }

  try {
    return migrateState(JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')));
  } catch {
    return createInitialState();
  }
}

export function saveState(state) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, `${JSON.stringify(migrateState(state), null, 2)}\n`, 'utf8');
}

export function resetState() {
  if (fs.existsSync(STATE_FILE)) {
    fs.rmSync(STATE_FILE);
  }
}

export function createInitialState() {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    createdAt: new Date().toISOString(),
    active: null,
    companions: {},
    events: [],
    tasks: [],
    currentTaskId: null
  };
}

export function migrateState(state) {
  const next = state && typeof state === 'object' ? state : createInitialState();
  next.schemaVersion = CURRENT_SCHEMA_VERSION;
  next.createdAt ??= new Date().toISOString();
  next.active ??= null;
  next.companions ??= {};
  next.events ??= [];
  next.tasks ??= [];
  next.currentTaskId ??= null;
  return next;
}

export function ensureCompanionState(state, creature) {
  migrateState(state);

  if (!state.companions[creature.id]) {
    state.companions[creature.id] = {
      id: creature.id,
      alias: creature.name,
      discoveredAt: new Date().toISOString(),
      level: 1,
      xp: 0,
      energy: 50,
      mood: 'idle',
      pokes: 0,
      feeds: 0
    };
  }

  if (!state.active) {
    state.active = creature.id;
  }

  return state.companions[creature.id];
}

export function addEvent(state, type, payload = {}) {
  migrateState(state);
  state.events.unshift({
    type,
    payload,
    at: new Date().toISOString()
  });
  state.events = state.events.slice(0, 50);
}
