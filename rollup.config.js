import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";
import typescript from 'rollup-plugin-typescript'

import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const getPluginsConfig = () => {
  const plugins = [
    typescript(),  
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    externalGlobals({
      react: "React",
    }),
    visualizer(),
    terser(), /** minified */
  ];

  return plugins;
};

export default (CLIArgs) => {
  const prod = !!CLIArgs.prod;
  const mini = !!CLIArgs.mini;
  const bundle = {
    input: ["./src/index.ts"],
    output: [
      {
        dir: pkg.main,
        format: "esm"
      },
    ],
  };
  bundle.external = pkg.peerDependencies;
  bundle.plugins = getPluginsConfig();
  return bundle;
};
