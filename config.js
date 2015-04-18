module.exports = {
  port: process.env.PORT || '9000',
  host: process.env.HOST || '0.0.0.0',
  dist_manifest_path: __dirname + '/public/dist/rev-manifest',
  assets_dir_path: __dirname + '/public/assets',
  public_dir_path: __dirname + '/public',
  facebook_app_secret: '2dbaf073d6791656e09d3c64dcbdff91',
  facebook_app_id: '796463073771303'
}