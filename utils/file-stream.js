import mimedb from "mime-db"
import {
  access,
  createReadStream
} from "fs"
import { join } from "path"

function mime (path) {
  const type = path.slice(path.lastIndexOf(".") + 1)

  for (const mime in mimedb) {
    const {
      [ mime ]: { extensions }
    } = mimedb

    if (extensions && extensions.includes(type)) return mime
  }
}

export default function (folderPath) {
  const fullFolderPath = join(process.cwd(), folderPath)

  return function filesStream (path, res) {
    const fullPath = join(fullFolderPath, path)

    access(fullPath, (error) => {
      if (error) throw error
      else {
        res.setHeader("Content-Type", mime(path))

        createReadStream(fullPath).pipe(res)
      }
    })
  }
}