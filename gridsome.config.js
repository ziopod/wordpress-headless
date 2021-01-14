module.exports = {
  siteName: 'Worpdress Headless',
  plugins: [
    {
      // use: 'gridsome-source-wordpress',
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: 'http://guidoline.com',
        // baseUrl: 'http://wordpress.loc',
        // apiBase: 'wp-json/wp/v2'
      }
    },
    // À utiliser avec @gridsome/source-wordpress
    {
      use: '@noxify/gridsome-plugin-remote-image',
      options: {
        forceHttps: false,
        // downloadFromLocalNetwork: false,
        typeName: 'WordPressAttachment',
        sourceField: 'sourceUrl',
        targetField: 'remoteLink',
        targetPath: './src/assets/remoteImages'
      }
    }
  ],
  templates: {
    WordPressPost: '/blog/:slug'
  },
  css: {
    loaderOptions: {
      postcss: {
        sourceMap: true,
        plugins: [
          require('postcss-preset-env'),
          require('postcss-font-magician'),
          require('cssnano'),
        ]
      }
    }
  }  
}