# from django.conf import settings
#
# settings.INSTALLED_APPS += ('pipeline',)
# settings.STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'
# settings.STATICFILES_FINDERS = (
#     'django.contrib.staticfiles.finders.FileSystemFinder',
#     'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#     'pipeline.finders.PipelineFinder',
# )
# settings.PIPELINE_COMPILERS = (
#     'pipeline_browserify.compiler.BrowserifyCompiler',
# )
# settings.PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.NoopCompressor'
# settings.PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.uglifyjs.UglifyJSCompressor'
# if settings.settingsDEBUG:
#     settings.PIPELINE_BROWSERIFY_ARGUMENTS = '-t babelify'
# settings.PIPELINE_JS = {
#     'webapp_builder_js': {
#         'source_filenames': (
#             'cartoview_geonode_viewer/vendor/jquery/dist/jquery.min.js',
#             'cartoview_geonode_viewer/vendor/react/JSXTransformer.js',
#             'cartoview_geonode_viewer/vendor/react/react-with-addons.js',
#             'cartoview_geonode_viewer/app.jsx',
#         ),
#         'output_filename': 'js/webapp_builder.js',
#     }
# }
