const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Building optimized production export for Hostinger...");

// 1. Build Next.js static export at root (basePath = "")
process.env.NEXT_EXPORT = "true";
process.env.NEXT_PUBLIC_BASE_PATH = "";

execSync("npx next build --webpack", {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_EXPORT: "true",
    NEXT_PUBLIC_BASE_PATH: "",
  },
});

const outDir = path.resolve(__dirname, "out");
const zipPath = path.resolve(__dirname, "hostinger-deploy.zip");

// 2. Ensure .htaccess is in out/ for Hostinger Apache/LiteSpeed web server
const htaccessSource = path.resolve(__dirname, "public", ".htaccess");
const htaccessDest = path.join(outDir, ".htaccess");
if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
}

// Ensure .nojekyll
fs.writeFileSync(path.join(outDir, ".nojekyll"), "# disable jekyll\n");

// Ensure CNAME is removed for Hostinger
const cnamePath = path.join(outDir, "CNAME");
if (fs.existsSync(cnamePath)) {
  fs.unlinkSync(cnamePath);
}

// 3. Create zip file using PowerShell Compress-Archive
console.log("📦 Packaging into hostinger-deploy.zip...");
try {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  execSync(
    `powershell -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: "inherit" }
  );
  console.log("✅ Successfully created: " + zipPath);
} catch (err) {
  console.error("Error creating zip:", err);
}

console.log("\n🎉 Ready for Hostinger!");
console.log("👉 Upload 'hostinger-deploy.zip' to Hostinger's 'public_html' folder and click Extract.");
