module.exports = {
  presets: ['@babel/preset-env'], // 자바스크립트의 모든 기능 지원
  plugins: [['@babel/plugin-transform-runtime']] // for 비동기처리
}