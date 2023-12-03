#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dayFlag = process.argv.indexOf('--day')
const day = dayFlag > -1 ? process.argv[dayFlag + 1] : null

if (!day) {
  console.error('Please specify a day using --day')
  process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

try {
  const input = fs.readFileSync(
    path.resolve(__dirname, `../day-${day}/input`),
    'utf8'
  )
  const lines = input.split('\n')
  const { default: fn } = await import(
    path.resolve(__dirname, `../day-${day}/index.js`)
  )
  console.dir(fn(lines))
} catch (e) {
  console.error(e)
  process.exit(1)
}
