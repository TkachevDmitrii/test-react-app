import path from 'path'
import { Configuration, EnvironmentPlugin, ProvidePlugin } from 'webpack'
// @ts-ignore
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'

const isDevelopmentMode = process.env.NODE_ENV !== 'production'

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      auto: true,
      exportLocalsConvention: 'camelCaseOnly',
    },
  },
}

const styleLoader = isDevelopmentMode
  ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
      esModule: false,
    },
  }
  : {
    loader: 'style-loader',
    options: {
      esModule: false,
    },
  }

const getCustomTransformers = () => ({
  before: [ReactRefreshTypeScript({ emitFullSignatures: true })],
})

const developmentPlugins = [
  new MiniCssExtractPlugin(),
  new ReactRefreshWebpackPlugin(),
]

export const config: Configuration = {
  mode: isDevelopmentMode ? 'development' : 'production',
  devtool: isDevelopmentMode ? 'source-map' : undefined,
  target: 'web',

  entry: './src/index.tsx',

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './node_modules/@my/ui-kit'),
          path.resolve(__dirname, './node_modules/@my/http-client'),
        ],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            ...(isDevelopmentMode && { getCustomTransformers }),
          },
        },
      },

      {
        test: /\.css$/,
        use: [styleLoader, cssLoader],
      },

      {
        test: /\.scss$/,
        use: [styleLoader, cssLoader, 'sass-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset',
      },
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    ...developmentPlugins.filter(() => isDevelopmentMode),
    new EnvironmentPlugin(process.env),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
    new ProvidePlugin({
      // react
      React: ['react'],
      useState: ['react', 'useState'],
      useMemo: ['react', 'useMemo'],
      useCallback: ['react', 'useCallback'],
      useEffect: ['react', 'useEffect'],
      useLayoutEffect: ['react', 'useLayoutEffect'],
      useRef: ['react', 'useRef'],
      useContext: ['react', 'useContext'],
      // react-query
      useQuery: ['react-query', 'useQuery'],
      useMutation: ['react-query', 'useMutation'],
      // react-router
      usePathParams: ['react-router', 'useParams'],

      styled: ['styled-components', 'default'],
      http: ['http', 'http'],
      notify: ['antd/lib/notification', 'default'],
    }),
  ],

  optimization: {
    moduleIds: 'named',
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!@my)/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
