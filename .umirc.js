
export default {
  disableCSSModules: true,
  treeShaking: true,
  routes: [{
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        component: './index',
      },
      {
        path: '/home',
        component: './index',
      }]
  }],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,

      dynamicImport: false,
      title: 'sbd',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
