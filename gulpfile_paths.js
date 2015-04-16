var config = require('config')
var p = module.exports

p.globAllImg    = './public/!(assets)/**/*.{png,jpg,jpeg,gif,svg,json}'
p.globAllLess   = './public/!(assets)/**/*.less'
p.globAllJs     = './public/!(assets)/**/*.js'
p.globPageLess  = './public/pages/*/*.less'
p.globPageJs    = './public/pages/*/*.js'
p.globAssetsImg = './public/assets/**/*.{png,jpg,jpeg,gif,svg,json}'
p.globAssetsCss = './public/assets/**/*.css'
p.globAssetsJs  = './public/assets/**/*.js'

p.commonJs      = './public/js/common.js'
p.commonLess    = './public/less/common.less'

p.assetsDir          = config.assets_dir_path
p.assetsManifestName = 'rev-manifest.json'
p.assetsManifest     = "${p.assetsDir}/${p.assetsManifestName}"