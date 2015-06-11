var config = require('config')
var p = module.exports

p.pagesDir = './public/pages/'
p.lessDir = './public/less/'
p.jsDir = './public/js/'

p.globAllImg    = './public/!(assets|dist)/**/*.{png,jpg,jpeg,gif,svg,json,woff}'
p.globAllLess   = './public/!(assets|dist)/**/*.less'
p.globAllJs     = './public/!(assets|dist)/**/*.js'
p.globPageLess  = `${p.pagesDir}/*/*.less`
p.globPageJs    = `${p.pagesDir}/*/*.js`
p.globAssetsImg = './public/assets/**/*.{png,jpg,jpeg,gif,svg,json,woff}'
p.globAssetsCss = './public/assets/**/*.css'
p.globAssetsJs  = './public/assets/**/*.js'

p.commonJs   = `${p.jsDir}common.js`
p.commonLess = `${p.lessDir}common.less`

p.assetsDir      = config.assets_dir_path
p.assetsDistDir  = config.assets_dist_dir_path
p.assetsManifest = config.dist_manifest_path