import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

// 防止抛弃main.js中的代码
function noTreeShakeForSpecificFiles() {
    return {
        name: "no-treeshake",
        resolveId(source) {
            // 仅针对指定的文件或模块;
            if (source.endsWith("main.js")) {
                return { id: source, moduleSideEffects: "no-treeshake" };
            }
            return null;
        },
    };
}

export default {
    input: "src/main.js",
    output: {
        file: "dist/script.js",
        format: "es",
    },
    plugins: [
        copy({
            targets: [
                { src: "static/**/*", dest: "dist" }, // 将 static 文件夹中的所有内容复制到 dist 文件夹
            ],
            flatten: false,
        }),
        noTreeShakeForSpecificFiles(),
        resolve(), // 解析 node_modules 中的 npm 包
        commonjs(), // 将 CommonJS 模块转换为 ES 模块
        terser(), // 压缩代码
    ],
};
