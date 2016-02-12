import mimedb from "mime-db"
import { access, createReadStream } from "fs"
import { join } from "path"
import { parse as parseUrl } from "url"
import { parse as parseQuery } from "querystring"

function mime (path) {
  const type = path.slice(path.lastIndexOf(".")+1)
  for (const mime in mimedb) {
    const { [ mime ]: { extensions } } = mimedb
    if (extensions && extensions.includes(type)) return mime
  }
}

function filesStreamConfig (folderPath) {
  const fullFolderPath = join(process.cwd(), folderPath)
  return function filesStream (path, res) {
    const fullPath = join(fullFolderPath, path)
    access(fullPath, (err) => {
      if (err) { throw err }
      else {
        res.setHeader("Content-Type", mime(path))
        createReadStream(fullPath).pipe(res)
      }
    })
  }
}

export default filesStreamConfig