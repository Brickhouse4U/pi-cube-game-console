import { execSync } from 'child_process';
import * as fs from 'fs';

const STATE_FILE = process.env.NODE_ENV === 'production'
  ? '/etc/brightness.state'
  : `${process.env.HOME}/.brightness.state`;

export function detectDisplay(): string | null {
  try {
    const output = execSync('ddcutil detect --brief 2>/dev/null').toString();
    const match = output.match(/I2C bus:\s+(\/dev\/i2c-\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export function applyBrightness(value: number): boolean {
  const level = Math.round(value * 100);
  try {
    execSync(`ddcutil setvcp 10 ${level} 2>/dev/null`);
    fs.writeFileSync(STATE_FILE, String(value));
    return true;
  } catch {
    return false;
  }
}

export function loadBrightness(): number {
  try {
    const val = parseFloat(fs.readFileSync(STATE_FILE, 'utf8').trim());
    return isNaN(val) ? 1.0 : Math.min(1.0, Math.max(0.0, val));
  } catch {
    return 1.0;
  }
}
