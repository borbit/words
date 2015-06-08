var config = require('config')
var p = module.exports

p.pagesDir = './public/pages/'
p.lessDir = './public/less/'
p.jsDir = './public/js/'

p.globAllImg    = './public/!(assets)/**/*.{png,jpg,jpeg,gif,svg,json}'
p.globAllLess   = './public/!(assets)/**/*.less'
p.globAllJs     = './public/!(assets)/**/*.js'
p.globPageLess  = `${p.pagesDir}/*/*.less`
p.globPageJs    = `${p.pagesDir}/*/*.js`
p.globAssetsImg = './public/assets/**/*.{png,jpg,jpeg,gif,svg,json}'
p.globAssetsCss = './public/assets/**/*.css'
p.globAssetsJs  = './public/assets/**/*.js'

p.commonJs   = `${p.jsDir}common.js`
p.commonLess = `${p.lessDir}common.less`

p.assetsDir          = config.assets_dir_path
p.assetsManifestName = 'rev-manifest.json'
p.assetsManifest     = `${p.assetsDir}/${p.assetsManifestName}`