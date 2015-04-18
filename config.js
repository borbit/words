var config = module.exports

config.port = process.env.PORT || '9000'
config.host = process.env.HOST || '0.0.0.0'
config.hostname = process.env.HOSTNAME || `localhost:${config.port}`
config.dist_manifest_path = __dirname + '/public/dist/rev-manifest'
config.assets_dir_path = __dirname + '/public/assets'
config.public_dir_path = __dirname + '/public'
config.facebook_callback_url = `http://${config.hostname}/login/cb`
config.facebook_app_secret = '2dbaf073d6791656e09d3c64dcbdff91'
config.facebook_app_id = '796463073771303'