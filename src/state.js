import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const STATE_DIR = path.join(os.homedir(), '.pokebuddy');
const STATE_FILE = path.join(STATE_DIR, 'state.json');

export function getStatePath() {
  return STATE_FILE;
}

export function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return createInitialState();
  }

  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return createInitialState();
  }
}

export function saveState(state) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

export function resetState() {
  if (fs.existsSync(STATE_FILE)) {
    fs.rmSync(STATE_FILE);
  }
}

export function createInitialState() {
  return {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    active: null,
    companions: {},
    events: []
  };
}

export function ensureCompanionState(state, creature) {
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
  state.events.unshift({
    type,
    payload,
    at: new Date().toISOString()
  });
  state.events = state.events.slice(0, 30);
}
