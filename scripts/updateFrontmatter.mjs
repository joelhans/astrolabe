/* eslint-disable import/no-extraneous-dependencies */
import { promises as fsp } from 'fs'
import matter from 'gray-matter'
const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv
  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path)
    const { data: currentFrontmatter } = file
    if (currentFrontmatter.draft === false) {
      const updatedFrontmatter = {
        ...currentFrontmatter,
        updatedOn: new Date().toISOString(),
      }
      file.data = updatedFrontmatter
      const updatedFileContent = matter.stringify(file)
      fsp.writeFile(path, updatedFileContent)
    }
  })
}
updateFrontmatter()
