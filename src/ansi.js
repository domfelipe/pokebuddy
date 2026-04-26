export const RESET = '\x1b[0m';
export const BOLD = '\x1b[1m';
export const DIM = '\x1b[2m';

export const palette = {
  green: '\x1b[38;2;0;255;144m',
  cyan: '\x1b[38;2;0;230;255m',
  yellow: '\x1b[38;2;255;214;10m',
  magenta: '\x1b[38;2;255;77;255m',
  orange: '\x1b[38;2;255;106;61m',
  purple: '\x1b[38;2;167;139;250m',
  gray: '\x1b[38;2;155;163;175m',
  white: '\x1b[38;2;230;237;243m',
  red: '\x1b[38;2;255;90;90m'
};

export function paint(text, color = 'white') {
  return `${palette[color] ?? ''}${text}${RESET}`;
}

export function strong(text, color = 'white') {
  return `${BOLD}${palette[color] ?? ''}${text}${RESET}`;
}

export function dim(text) {
  return `${DIM}${text}${RESET}`;
}

export function stripAnsi(value) {
  return String(value).replace(/\x1b\[[0-9;]*m/g, '');
}
