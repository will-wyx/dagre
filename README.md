# dagre - Graph layout for JavaScript

[![Build Status](https://github.com/dagrejs/dagre/workflows/Build%20Status/badge.svg?branch=master)](https://github.com/dagrejs/dagre/actions?query=workflow%3A%22Build+Status%22)
[![npm](https://img.shields.io/npm/v/dagre.svg)](https://www.npmjs.com/package/dagre)


Dagre is a JavaScript library that makes it easy to lay out directed graphs on the client-side.

For more details, including examples and configuration options, please see our [wiki](https://github.com/dagrejs/dagre/wiki).

There are 2 versions on NPM, but only [the one in the DagreJs org](https://www.npmjs.com/package/@dagrejs/dagre) is receiving updates right now.

该 fork 在原项目的基础上，替换了 rollup 作为打包工具，还需要实现嵌套子图布局和增量式布局功能。

原项目的嵌套子图布局（cluster）不支持集群间的边、集群与节点间的边，本项目将在其基础上，参考 [nomnoml](https://github.com/skanaar/nomnoml) 进行扩展。

对于增量式布局，将参考 [@antv/layout](https://github.com/antvis/layout) 的实现。

## License

dagre is licensed under the terms of the MIT License. See the LICENSE file for details.
