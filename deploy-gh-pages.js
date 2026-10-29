const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting Direct GitHub Pages deployment...");

const BASE_PATH = "/Binghani";

// 1. Build Next.js static export with basePath
console.log(`📦 Building Next.js static export with basePath = "${BASE_PATH}"...`);
process.env.NEXT_EXPORT = "true";
process.env.NEXT_PUBLIC_BASE_PATH = BASE_PATH;

execSync("npx next build", {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_EXPORT: "true",
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
});

const outDir = path.resolve(__dirname, "out");

// Ensure .nojekyll exists so _next folder is served
fs.writeFileSync(path.join(outDir, ".nojekyll"), "# disable jekyll\n");

// Ensure CNAME is removed if present
const cnamePath = path.join(outDir, "CNAME");
if (fs.existsSync(cnamePath)) {
  fs.unlinkSync(cnamePath);
}

// 2. Post-process HTML/JS files in out/ to ensure all images and assets reference /Binghani/...
console.log("🔄 Ensuring all image and asset links use direct GitHub Pages prefix...");
function fixAssetPaths(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixAssetPaths(fullPath);
    } else if (
      entry.name.endsWith(".html") ||
      entry.name.endsWith(".js") ||
      entry.name.endsWith(".json")
    ) {
      let content = fs.readFileSync(fullPath, "utf8");
      // Replace root-relative static assets with /Binghani/ (excluding already prefixed ones)
      content = content.replace(
        /(["'])\/(?!(?:Binghani|_next|http:\/\/|https:\/\/|#))([a-zA-Z0-9_\-\.]+\.(?:png|jpg|jpeg|svg|webp|avif|ico|xml|txt|json))(?:\?[^"']*)?(\1)/g,
        `$1${BASE_PATH}/$2$3`
      );
      fs.writeFileSync(fullPath, content, "utf8");
    }
  }
}
fixAssetPaths(outDir);

// 3. Push to gh-pages branch
console.log("📤 Pushing directly to gh-pages branch...");
execSync("git init", { cwd: outDir, stdio: "pipe" });
try {
  execSync(
    "git remote add origin https://github.com/binghanipharmacy-cloud/Binghani.git",
    { cwd: outDir, stdio: "pipe" }
  );
} catch (e) {}

execSync("git checkout -B gh-pages", { cwd: outDir, stdio: "inherit" });
execSync("git add -A", { cwd: outDir, stdio: "inherit" });

try {
  execSync(
    'git commit -m "Direct GitHub Pages deployment for https://binghanipharmacy-cloud.github.io/Binghani/"',
    { cwd: outDir, stdio: "inherit" }
  );
} catch (e) {
  console.log("No new changes to commit.");
}

console.log("🌐 Pushing directly to remote origin gh-pages branch...");
execSync("git push -f origin gh-pages", { cwd: outDir, stdio: "inherit" });

console.log("🎉 Direct GitHub Pages deployment completed!");
console.log("🌐 URL: https://binghanipharmacy-cloud.github.io/Binghani/");
