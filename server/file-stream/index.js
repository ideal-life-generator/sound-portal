import fs from "fs"
import path from "path"
import url from "url"
import querystring from "querystring"

function filesStreamConfig ({ directory, supportedTemplates, supportedFiles }) {
  const FULL_PATH = path.join(process.cwd(), directory)

  function checkSupportTemplate (path) {
    return supportedTemplates.find((template) => {
      return template.test.test(path)
    })
  }

  function checkFileType (filePath) {
    return supportedFiles.find((fileType) => {
      return fileType.test.test(filePath)
    })
  }

  function loadTemplate (res, templatePath) {
    const templateFullPath = path.join(FULL_PATH, templatePath)
    try {
      const { contentType } = checkFileType(templateFullPath)
      let supportedFileReadStrem = fs.createReadStream(templateFullPath)
      res.setHeader("Content-Type", contentType)
      supportedFileReadStrem.pipe(res)
    }
    catch (error) { throw error }
  }

  function loadFile (res, filePath) {
    const fileFullPath = path.join(FULL_PATH, filePath)
    try {
      const { contentType } = checkFileType(fileFullPath)
      let supportedFileReadStrem = fs.createReadStream(fileFullPath)
      res.setHeader("Content-Type", contentType)
      supportedFileReadStrem.pipe(res)
    }
    catch (error) { throw error }
  }

  return function filesStream (req, res) {
    const fullUrl = req.url
    const urlParsed = url.parse(fullUrl)
    const pathname = urlParsed.pathname
    const urlQuery = urlParsed.query
    const query = querystring.parse(urlQuery)
    const isSupportedTemplate = checkSupportTemplate(pathname)
    if (isSupportedTemplate) {
      loadTemplate(res, isSupportedTemplate.path)
    }
    else if (!urlQuery) {
      loadFile(res, pathname)
    }
  }
}

export default filesStreamConfig