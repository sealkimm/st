const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
  mode: 'development', //development, production, none --> 개발모드는 번들 파일의 크기가 크지만, 디버깅 쉽고 빠름. 프로덕션모드는 번들 파일의 크기가 작아지며 최적화된 결과물을 생성(배포용)
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 실행순서 중요!(밑에서 부터 실행됨)
          'css-loader',
          'postcss-loader',
          'sass-loader', // 제일 먼저 수행
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // 원본 경로를 유지하면서 'img' 폴더로 이동
            const filePath = pathData.filename.replace(/^src\//, '');
            return filePath;
          },
        },
      },
      {
        test: /\.js$/,  // .js로 끝나는 파일을 찾음
        exclude: /node_modules/, // node_modules 폴더 내의 파일은 제외
        use: {
          loader: 'babel-loader', // babel-loader를 사용
          options: {
            presets: ['@babel/preset-env'] // Babel이 사용할 프리셋을 설정
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main.html',
      filename: 'index.html',
      }),
    new HtmlWebpackPlugin({
      template: './src/pages/sub.html',
      filename: 'sub.html',
    }) 
  ],
  devServer: {
    host: 'localhost',
    open: true, // npm run dev 시 자동으로 브라우저 open
  },
}