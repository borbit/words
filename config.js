var config = module.exports

config.host = process.env.HOST || 'localhost'
config.port = process.env.PORT || 9000
config.port_io = process.env.PORT_IO || 9001
config.assets_dir_path = __dirname + '/public/assets'
config.assets_dist_dir_path = __dirname + '/public/dist'
config.dist_manifest_path = config.assets_dist_dir_path + '/rev-manifest'
config.public_dir_path = __dirname + '/public'
config.facebook_callback_url = `http://${config.host}:${config.port}/login/cb`
config.facebook_app_secret = process.env.FB_APP_SECRET
config.facebook_app_id = process.env.FB_APP_ID
config.yandex_api_key = 'dict.1.1.20150501T092330Z.970602729e47362f.9f474c1924def746ee78771f9793e6e5f4fc993c'
config.yandex_lookup_url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'