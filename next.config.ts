import { codeInspectorPlugin } from 'code-inspector-plugin'
import type { NextConfig } from 'next'

export const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }))
    return config
  }
}

export default nextConfig
