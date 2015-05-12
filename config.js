var config = module.exports

config.port = process.env.PORT || '9000'
config.host = process.env.HOST || '0.0.0.0'
config.hostname = process.env.HOSTNAME || `localhost:${config.port}`
config.dist_manifest_path = __dirname + '/public/dist/rev-manifest'
config.assets_dir_path = __dirname + '/public/assets'
config.public_dir_path = __dirname + '/public'
config.facebook_callback_url = `http://${config.hostname}/login/cb`
// config.facebook_callback_url = `http://192.168.0.61:9000/login/cb`
config.facebook_app_secret = '2dbaf073d6791656e09d3c64dcbdff91'
config.facebook_app_id = '796463073771303'
config.yandex_api_key = 'dict.1.1.20150501T092330Z.970602729e47362f.9f474c1924def746ee78771f9793e6e5f4fc993c'
config.yandex_lookup_url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'