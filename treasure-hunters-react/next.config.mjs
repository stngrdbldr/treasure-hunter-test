import path from "path";

// get dirname from current file
const dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(dirname, "src")],
  },
};

export default nextConfig;
