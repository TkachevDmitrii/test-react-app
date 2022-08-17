import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import webpack from 'webpack'

if (process !== undefined)
  process.env = {
    HOST: 'localhost',
    PORT: '3000',
    NODE_ENV: 'production',
    ...dotenv.parse(fs.readFileSync(path.join(__dirname, '.env'))),
    ...process?.env,
  }

async function build() {
  const { config } = await import('./webpack.config')
  const compiler = webpack(config)
  compiler.run(() => {})
}

build()
