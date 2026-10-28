const { spawn } = require("child_process");

console.log("==================================================================");
console.log("🚀  BIN GHANI PHARMACY - STARTING FULL-STACK ENVIRONMENT");
console.log("==================================================================\n");

// 1. Launch Backend Express API (port 5000)
console.log("📡 Starting Backend API on http://localhost:5000 ...");
const backend = spawn("node", ["backend/src/index.js"], {
  stdio: "inherit",
  shell: true,
  cwd: __dirname,
});

// 2. Launch Frontend Next.js Web Application (port 3000)
console.log("🌐 Starting Next.js Web App on http://localhost:3000 ...");
const frontend = spawn("npx", ["next", "dev", "-p", "3000"], {
  stdio: "inherit",
  shell: true,
  cwd: __dirname,
});

function shutdown() {
  console.log("\n🛑 Gracefully stopping Bin Ghani Pharmacy servers...");
  try {
    backend.kill();
    frontend.kill();
  } catch (e) {
    // ignore
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
