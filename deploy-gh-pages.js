const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting GitHub Pages deployment process...");

// 1. Build Next.js static export
console.log("📦 Building static export...");
process.env.NEXT_EXPORT = "true";
execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, NEXT_EXPORT: "true" },
});

const outDir = path.resolve(__dirname, "out");

// Ensure CNAME exists
fs.writeFileSync(path.join(outDir, "CNAME"), "binghanipharmacy.com\n");
// Ensure .nojekyll exists
fs.writeFileSync(path.join(outDir, ".nojekyll"), "# disable jekyll\n");

console.log("📤 Pushing out/ to gh-pages branch...");
execSync("git init", { cwd: outDir, stdio: "pipe" });
try {
  execSync(
    "git remote add origin https://github.com/binghanipharmacy-cloud/Binghani.git",
    { cwd: outDir, stdio: "pipe" }
  );
} catch (e) {
  // Remote might already exist
}
execSync("git checkout -B gh-pages", { cwd: outDir, stdio: "inherit" });
execSync("git add -A", { cwd: outDir, stdio: "inherit" });

try {
  execSync(
    'git commit -m "Deploy Bin Ghani Pharmacy to GitHub Pages (binghanipharmacy.com)"',
    { cwd: outDir, stdio: "inherit" }
  );
} catch (e) {
  console.log("No changes to commit or commit succeeded.");
}

console.log("🌐 Pushing directly to remote origin gh-pages branch...");
execSync("git push -f origin gh-pages", { cwd: outDir, stdio: "inherit" });

console.log("✅ Successfully deployed to gh-pages branch!");
