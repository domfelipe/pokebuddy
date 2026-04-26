import crypto from 'node:crypto';
import os from 'node:os';
import { creatures } from './creatures.js';

function seedSource() {
  const user = os.userInfo().username || 'anonymous';
  const host = os.hostname() || 'localhost';
  const custom = process.env.POKEBUDDY_SEED || '';
  return `${user}:${host}:${custom}:pokebuddy-cli-v0`;
}

export function nextCreature(excludedIds = []) {
  const pool = creatures.filter((creature) => !excludedIds.includes(creature.id));
  if (pool.length === 0) return null;

  const digest = crypto
    .createHash('sha256')
    .update(`${seedSource()}:${excludedIds.sort().join(',')}`)
    .digest('hex');
  const index = parseInt(digest.slice(0, 8), 16) % pool.length;
  return pool[index];
}
