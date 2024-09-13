import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import config from "./rollup.config.mjs";

config.plugins = [
    ...config.plugins,
    serve({
        //  开发服务器
        open: true, // 自动在浏览器中打开
        contentBase: ["dist"], // 服务的静态文件目录
        port: 3000, // 本地服务器端口
    }),
    livereload("dist"), // 监听 dist 目录中的文件变化并自动刷新浏览器)
];

export default config;
