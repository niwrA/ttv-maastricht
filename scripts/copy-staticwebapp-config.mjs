import { copyFile } from 'node:fs/promises'

await copyFile(
  new URL('../staticwebapp.config.json', import.meta.url),
  new URL('../.output/public/staticwebapp.config.json', import.meta.url)
)
