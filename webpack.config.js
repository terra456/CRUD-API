import path from 'path';
import nodeExternals from 'webpack-node-externals';
// import { Configuration } from 'webpack';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
// import WebpackShellPluginNext from "webpack-shell-plugin-next";
// webpack.config.js
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const getConfig = (
  env,
  argv,
) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, `.env.${env.mode}`) });
  return {
    entry: './src/index.ts',
    target: 'node',
    mode: argv.mode === 'production' ? 'production' : 'development',
    externals: [nodeExternals()],
    plugins: [new ForkTsCheckerWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: 'ts-loader',
          exclude: /node_modules/ },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: { moduleIds: 'deterministic', splitChunks: { chunks: 'all' } },
  };
};
export default getConfig;
