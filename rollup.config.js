import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
// 这个插件一定要用 8.0.0 的，最新版10.0.0 只能用于postcss 8.0，而rollup-plugin-postcss 中依赖的 postcss 是7.x.x版本的
import url from 'postcss-url';
import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: "cjs",
				sourcemap: true,
				exports: 'auto',
			},
			{
				file: pkg.module,
				format: "esm",
				sourcemap: true
			}
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ useTsconfigDeclarationDir: true }),
			postcss({
				extract: true,
				plugins: [
					url({
						url: "inline", // enable inline assets using base64 encoding
						maxSize: 10, // maximum file size to inline (in kilobytes)
						fallback: "copy", // fallback method to use if max size is exceeded
					}),
				]
			}),
		]
	},

];
