# 复习webpack配置



## 入口和出口

```
var path = require('path');
module.exports = {
    entry:"./src/main.js",
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    }
}
```



配置好上面之后，在项目根目录，就可以输入webpack进行打包



## webpack-dev-server实时热更新打包

- 生成的bundle.js是在内存中，默认开启本地8080端口。
- 在index.html中访问

```
<script src="/bundle.js"></script>
```

- 如果是使用webpack进行打包（一般发布时候）

```
<script src="../dist/bundle.js"></script>
```





## webpack打包css文件

webpack默认只能加载.js后缀的文件，如果失败，会报错 ,需要加载合适的loader。

1. 加载两个loader:

```
npm install style-loader css-loader -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
module:{
    rules:[
    	//从右到左加载
        {test:/\.css$/,use:['style-loader','css-loader']}
    ]
}
```



## webpack打包css中的字体和图片



1. 加载两个loader:

```
npm install url-loader file-loader -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
module:{
    rules:[
    	//从右到左加载
        {test:/\.(jpg|png|jpeg|bmp|gif)$/,use:[{
            loader:"url-loader",
            options:{
                limit:5000,
                name:'[hash:8]-[name].[ext]'
            }
        }]},
        {test:/\.(ttf|ttf2|woff|woff2|eot|svg)$/,use:['url-loader']}
    ]
}
```



## webpack打包高级es6语法

注意：默认一些高级的es6语法，webpack不可以打包，如静态变量 static

1. 加载两个loader:

```
npm install babel-core babel-loader babel-preset-env babel-preset-stage-0 -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
module:{
    rules:[
    	//从右到左加载
        {test:/\.js$/,use:['babel-loader']}
    ]
}
```

3. 需要在根目录创建一个`.babelrc`的配置文件，需要指定转化js的语法规则

```
{
    "presets":['env','stage-0']
}
```



注意：默认不指定babel-loader版本，安装的是目前最新8版本，需要安装7版本才行。

www.npmjs.com,在这里找对应的版本进行下载即可

```
npm install babel-loader@7.1.4  -D
```



## webpack打包  .vue组件的

1. 加载两个loader:

```
npm install vue-loader vue-template-compiler -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
var VueLoaderPlugin = require("vue-loader/lib/plugin.js");
module:{
    rules:[
    	//从右到左加载
        {test:/\.vue$/,use:['vue-loader']}
    ]
},
plugins:[
    new VueLoaderPlugin();
]
```

3. 需要在根目录创建一个`.babelrc`的配置文件，需要指定转化js的语法规则

```
{
    "presets":['env','stage-0']
}
```



## webpack打包scss文件

1. 加载两个loader:

```
npm install sass-loader node-sass -D
```

1. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```

module:{
    rules:[
    	//从右到左加载
        {test:/\.scss$/,use:['style-loader',css-loader',sass-loader']}
    ]
}
```

1. 需要在根目录创建一个`.babelrc`的配置文件，需要指定转化js的语法规则

```
{
    "presets":['env','stage-0']
}
```



## es6中的导入和导出模块

- 两个语法： export defualt（一个）  、 export(导出多个，按需导出)
- 当使用 export defualt导出的时候，import 模块名 from '模块的标识符'
- 当使用export导出的时候，应该使用 import { title,content} from '模块的标识符'

==注意==： 模块的标识符可以是路径，也可以是node_modules中的模块名 

- 当js模块没有使用export default 或者是export进行导出，我们可以直接采用 import  '模块的路径即可'

  这种情况，一般加载css较多 

  ```
  import './lib/mui/css/style.css'
  ```



# vue项目第一天



包含两个项目：cms、shop

cms: content manger system ，内容管理系统



## 完成app组件的头部header部分

- 找页面所需要的组件，优先考虑mint-ui,再找mui.
- 这里我们用mintui的header组件
- 在main.js中引入mint-ui的header组件（按需导入），并且要引入样式文件
- 在App.vue，中头部设置以下代码：

```
 <mt-header fixed title="vue-cmsshop"></mt-header>
```

- 设置app-container样式，距离上内边距padding-top:40px



## 完成app组件的底部的tabbar部分

- 找到mui组件的==example/tabbar.html==组件，复制对应的tabbar代码部分即可
- 需要在main.js中引入mui的css样式



### 完成tabbar图标部分

- 其中购物车需要使用mui的扩展字体和扩展字体的css文件 icons-extra.css
- 需要在main.js将上面的css文件需要引过来
- 同时还需复制mui中扩展字体mui-icons-extra.ttf放到lib/mui/fonts文件夹下面



### 点击tabbar显示不同的组件

- 把a链接修改为router-link,指定to属性
- 在main.js文件中，导入vue-router,创建路由匹配的对象，把路由对象挂在vm实例身上
- 在app.vue设置路由匹配到的容器 router-view

### 点击tabbar高亮显示

- 修改路由对象的默认类

```
'linkActiveClass':'mui-active'
```

- 设置路由` '/'`重定向到`/home`

  



# 完成home组件的头部的轮播图

- 找mint-ui的轮播图

```
<mt-swipe :auto="2000">
      <mt-swipe-item>111111</mt-swipe-item>
      <mt-swipe-item>2222</mt-swipe-item>
      <mt-swipe-item>333333333333333333</mt-swipe-item>
</mt-swipe>
```

- 在main.js，按需导入轮播图所需要的组件
- 在home.vue中，要给轮播图设置高度，

```
 .mint-swipe{
      height: 200px;
  }
```



## 完成home组件的头部的轮播图数据的获取

- 安装vue-resource，模块
- 在main.js中引入我们的vue-resource
- 在home.vue的created生命周期函数中，发起ajax请求，获取轮播图数据，赋值到当前data的lunbo
- 在使用v-for遍历数据
- 把img中宽度和高度比例设置100%



# 完成home组件的九宫格布局设置

- 找mui组件的9宫格，复制其对应的html代码即可
- 修改9宫格的图标为自己的图片（6个）
- 设置样式：
  - 设置9宫格的背景色为白色 #fff
  - 把每个单元格边框去掉
- 设置每个单元格中的img宽度为50%



# 修改首页的新闻资讯的链接地址，展示对应的组件

# 完成新闻列表的布局

- 使用mui列表组件examples/media-list.html

- 后续需要微调样式即可。

  

# 完成新闻列表的数据的获取

- 发送ajax请求，获取数据 ，可以在main.js中设置ajax请求的根路径:

  ```
  //全局设置ajax请求的根域名
  Vue.http.options.root = "http://127.0.0.1:3000/";
  ```

  

- 使用v-for进行数据的渲染即可



# 抽出路由模块

- 首先把所有的路由匹配封装一个router.js文件中。
- router.js中通过export default 暴露出路由对象
- 在main.js中通过import  ‘router’ from 'router.js路径'



