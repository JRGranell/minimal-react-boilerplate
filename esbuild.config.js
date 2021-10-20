import dotenv from "dotenv";
import esBuildServe from "esbuild-serve";

// Load all environmental variables from the .env file
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const define = {};
for (const k in result.parsed) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

// Create build and serve
esBuildServe(
  {
    entryPoints: ["src/index.tsx"],
    bundle: true,
    minify: true,
    sourcemap: true,
    define,
    target: ["chrome90"],
    outfile: "public/index.js",
  },
  {
    // serve options (optional)
    port: 8080,
    root: "./public",
  }
);
