/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = (config) => {
  config.set({
    // ... normal karma configuration

    // make sure to include webpack as a framework
    frameworks: ['mocha', 'webpack'],
    singleRun: true,
    autoWatch: true,

    // plugins: [
    //   'karma-webpack',
    //   'karma-mocha',
    //   'karma-chrome-launcher',
    //   'karma-mocha-reporter',
    //   'karma-html-reporter',
    // ],

    files: [
      // all files ending in ".test.js"
      // !!! use watched: false as we use webpacks watch
      { pattern: 'tests/unit/*.spec.ts', watched: false },
    ],

    preprocessors: {
      // add webpack as preprocessor
      'tests/unit/*.spec.ts': ['webpack'],
    },
    reporters: ['mocha', 'html'],
    webpack: {
      // karma watches the test entry points
      // Do NOT specify the entry option
      // webpack watches dependencies

      // webpack configuration
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            use: [
              /* config.module.rule('vue').use('cache-loader') */
              {
                loader: '/Users/YAN7/code/vue/vue-test/node_modules/cache-loader/dist/cjs.js',
                options: {
                  cacheDirectory: '/Users/YAN7/code/vue/vue-test/node_modules/.cache/vue-loader',
                  cacheIdentifier: 'ed3ca474',
                },
              },
              /* config.module.rule('vue').use('vue-loader') */
              {
                loader: '/Users/YAN7/code/vue/vue-test/node_modules/vue-loader/lib/index.js',
                options: {
                  compilerOptions: {
                    whitespace: 'condense',
                  },
                  cacheDirectory: '/Users/YAN7/code/vue/vue-test/node_modules/.cache/vue-loader',
                  cacheIdentifier: 'ed3ca474',
                  optimizeSSR: false,
                },
              },
            ],
          },
          {
            test: '/.css$/',
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(svg|otf|ttf|woff2|eot|gif|png|jpe?g)(\?\S*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  esModule: false,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
      ],
    },
    browsers: ['Chrome'],
    mochaReporter: {
      // output: 'minimal',
    },
    htmlReporter: {
      outputFile: 'tests/units.html',

      // Optional
      pageTitle: 'AiP Web',
      subPageTitle: '组件测试报告',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: false,
      showOnlyFailed: false,
    },
  });
};
