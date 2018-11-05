const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  target: "web",
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: "url-loader?limit=8096&name=assets/[name].[hash:8].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      'components': path.resolve(__dirname, '../src/components'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'apis': path.resolve(__dirname, '../src/apis'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      '~': path.join(__dirname, '..', 'src')
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    port: 6666,
    // host: '0.0.0.0',//设置后可以通过localhost,127.0.0.1,同时也可以通过内网ip来访问
    overlay: {
      errors: true//如果有任何错误都显示在网页上
    },
    open: true,//自动打开浏览器
    hot: true,//热加载，不刷新页面就显示改动
  },
  plugins: [
    new HtmlWebpackPlugin({
      //每次编译都在文件名中插入一个不同的哈希值。
      template: path.resolve(__dirname, './src/index.html'),
      js: ["common.js", "app.js"],
      //css: ["website.css", "style.css"],
      favicon: path.resolve(__dirname, './src/favicon.ico'),
      filename: 'index.html',
      minify: {
        //移除注释
        removeComments: true,
        //移除空白
        collapseWhitespace: true,
        //移除html中可以去掉的引号
        removeAttributeQuotes: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),//启动webpack的HotModuleReplacement这个功能的plugin
    new webpack.NoEmitOnErrorsPlugin()//减少不需要的信息展示问题
  ]
};


// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");

// module.exports = {
//   // entry: path.resolve(__dirname, "src/index.js"),
//   entry: {
//     app: "./src/index.js"
//   },
//   devtool: "inline-source-map",
//   devServer: {
//     contentBase: "./dist",
//     hot: true
//   },
//   plugins: [
//     new CleanWebpackPlugin(["dist"]),
//     new HtmlWebpackPlugin({
//       title: "Output Management"
//     }),
//     new webpack.HotModuleReplacementPlugin()
//     // new webpack.optimize.UglifyJsPlugin()
//   ],
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].bundle.[hash].js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js[x]?$/,
//         loader: "eslint-loader",
//         enforce: "pre",
//         exclude: /(node_modules|bower_components)/
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"]
//       },
//       {
//         test: /\.less$/,
//         use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
//       },
//       {
//         test: /\.js[x]?$/,
//         exclude: /(node_modules|bower_components)/,
//         use: [
// 					{
// 						loader: 'babel-loader'
// 					}
// 				]
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
//         loader: "url-loader?limit=8096&name=assets/[name].[hash:8].[ext]"
//       }
//     ]
//   }
// };
