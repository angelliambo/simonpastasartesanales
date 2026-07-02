#!/usr/bin/env node

const crypto = require("crypto");

let bytes = 32; // Default to 32 bytes (256 bits, 64 hex characters)

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--chars=")) {
    const chars = parseInt(arg.split("=")[1], 10);
    if (!isNaN(chars)) bytes = Math.max(1, Math.round(chars / 2));
  } else if (arg === "--chars" && args[i + 1]) {
    const chars = parseInt(args[i + 1], 10);
    if (!isNaN(chars)) {
      bytes = Math.max(1, Math.round(chars / 2));
      i++;
    }
  } else if (arg.startsWith("--bytes=")) {
    const b = parseInt(arg.split("=")[1], 10);
    if (!isNaN(b)) bytes = Math.max(1, b);
  } else if (arg === "--bytes" && args[i + 1]) {
    const b = parseInt(args[i + 1], 10);
    if (!isNaN(b)) {
      bytes = Math.max(1, b);
      i++;
    }
  } else if (arg.startsWith("--bits=")) {
    const bits = parseInt(arg.split("=")[1], 10);
    if (!isNaN(bits)) bytes = Math.max(1, Math.round(bits / 8));
  } else if (arg === "--bits" && args[i + 1]) {
    const bits = parseInt(args[i + 1], 10);
    if (!isNaN(bits)) {
      bytes = Math.max(1, Math.round(bits / 8));
      i++;
    }
  } else {
    // Numeric fallback without explicit flag
    const num = parseInt(arg.replace(/^--/, ""), 10);
    if (!isNaN(num)) {
      if (num === 32) {
        bytes = 32;
      } else if (num === 64) {
        bytes = 32; // 64 hex characters = 32 bytes
      } else if (num >= 128) {
        bytes = Math.max(1, Math.round(num / 8));
      } else {
        bytes = Math.max(1, Math.round(num / 8));
      }
    }
  }
}

const key = crypto.randomBytes(bytes).toString("hex");
console.log(`Generated: ${bytes} bytes | ${bytes * 8} bits | ${key.length} hex characters`);
console.log(key);
