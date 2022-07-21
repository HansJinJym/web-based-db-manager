# 基于web的数据库操作

## 环境
- Anaconda3 + python3.7.13
- flask 2.1.2
- sqlite 3.38.5
- node 17.0.1
- npm 8.1.0
- yarn 1.22.17
- react 18.2.0
- antd 4.21.5

## 资料
- [Antd GitHub](https://github.com/ant-design/ant-design)
- [Antd Design中文官网](https://ant.design/index-cn)
- [Antd Design of React手册](https://ant.design/docs/react/introduce-cn)
- [antd表格组件](https://ant.design/components/table-cn/)
- [antd表单组件](https://ant.design/components/form-cn/#header)
- [antd表单v3到v4的变化](https://ant.design/components/form/v3-cn/)
- [antd模态对话框组件](https://ant.design/components/modal-cn/)
- [select选择器](https://ant.design/components/select-cn/)

## Step
- ```yarn create react-app front-end``` 构建react前端文件夹front-end
- 同级目录下手动构建空的后端文件夹back-end
- ```/front-end/src/App.js``` 为主页面js代码
- ```/front-end/src/pages/HomePage.js``` 为HomePage页面js代码
- 通过 ```npm install --save antd``` 安装Ant Design等
    - ```--save``` 参数表示自动写入 ```/front-end/package.json``` 
- ```/front-end/src/App.css``` 第一行加入 ```@import '~antd/dist/antd.css';```，即使用antd样式
- ```npm start``` 或 ```yarn start``` 即可启动
- 表格组件 HomePage1.js
    - 按照 React 的规范，所有的数组组件必须绑定 key。在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值
    - 但是，在Column中：React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
- 动态添加列 HomePage2.js
    - 设置两个columns，分别为一般用户的和管理员的，管理员多一列
    - 设置两个链接，进入管理员模式则启用columns2，返回时重新启用columns1
    - 两个按钮“管理员”和“返回”，分别代表进入管理员模式和返回一般用户模式
    - *初始化componentDidMount()会触发两次，暂未查明原因*，现通过slice()将多的最后一列手动删除
- 添加数据的form HomePage3.js
    - 右上角新增“添加”按钮，只有在管理员模式下才会显示
    - 添加页面的本质是一个antd的form，包含了表头里的几项，并且包含default文本，不填空格时会提示
- Modal嵌套form并验证 HomePage4.js
    - 添加按钮的页面为modal嵌套form，modal本身自带取消和确认按钮，而form不带，因此采用组件嵌套
    - 确认按钮需要验证表单，采用[v4表单间接引用](https://www.cnblogs.com/samve/p/13493151.html)的方法，即```handleOK```下调用子组件表单的```this.formRef.current.validateFields()```，实现嵌套验证
    - 在表单的```Form.Item```下设定```required: true```，可以将其设为必填项
    - 在控制台下，正确输入并点击保存后，可以得到一个字典，即需要展示在前端和传入后端的数据
- 前端后端数据传输 HomePage5.js
    - 新增后端flask文件，ApiUtil、HttpUtil，InfoDialog的handleOK处理数据传输
    - ApiUtil保存各个需要的api，HttpUtil保存定义的get和post方法，post相较get更安全
    - ```./back-end/run.py```为后端文件，接收前端传递来的数据，返回添加成功信息给前端
    - handleOK新增post方法将验证过的数据传送给后端
    - ```./package.json```需要在最后加上proxy```"proxy": "http://127.0.0.1:3001"```
    - 先运行run.py启动后端，然后```yarn start```启动前端web页面，即可
    - 添加SqliteUtil.py，run.py里调用，将收到的数据写入数据库中
- 将后端数据展示在前端 HomePage5.js
    - 加入getData()方法，获取数据库全部数据
    - 加入handleInfoDialogClose()，在点击对话框“保存”时，即新增数据后对前端刷新，可以展示出新数据
    - 后端加入getStockList()用于根据sql语句获取全部数据
- web前端修改、删除后端数据 HomePage5.js
    - 思路：修改数据和新增数据采用组件复用，节省代码量，可以用是否存在id来进行区分
    - this.props.onDialogConfirm(values)可以在每次更新后自动刷新显示新数据
    - 新增、修改都调用showUpdateDialog(item)，根据item是否包含数据来判断是新增还是修改
    - handleOK()中进行进一步判断是否存在id字段
        - antd3中用mapPropsToFields(props)填写表单默认值，并封装在Form.create()中，而antd4中弃用了create方法
        - [antd4官方文档](https://ant.design/components/form-cn/#components-form-demo-global-state)介绍，可以用onFieldsChange和fields将表单数据存储于上层组件，但是此处需要双向绑定
        - 采用在校验函数中判断的方法，即将stock通过父组件传递过来，在验证函数中判断是否包含id字段，不包含既是添加操作，包含即修改操作
        - 可以继续思考，如何将表格上的值自动填入表单，目前学习使用setFields和setFieldsValue暂不成功
    - SqliteUtil.py中的addOrUpdateStock()函数接收并判断id，存在id字段为添加，发出sql修改语句，不存在id字段则发出添加语句
    - 删除，根据当前stock的id来删除数据库对应的内容
- 管理员登录功能与后台记录操作 HomePage5.js
    - 思路：点击“管理员”按钮，弹出对话框提示输入用户名和密码，后端根据管理员数据库验证账号密码信息，查找到即允许登录，否则提示账号密码有误，不能登录
    - HomePage5.js中加入AdminDialog对话框，类似InfoDialog对话框，登录成功才能进入管理员模式对数据进行增删改
    - AdminDialog5.js同样为对话框嵌套表单的形式，表单为用户名和密码，不填写会报错，填写后将数据发送给后端指定api，并接收后端反馈是否正确，正确则登录成功进入管理员页面，否则不进入
    - 后端先建立管理员账号密码信息数据库，预存三条信息，然后根据前端传递的账号密码来进行查找，找到则返回true，没找到返回false。其中cursor.fetchall()可以返回全部匹配信息，返回数据类型为列表，如果不为空则说明查找到，即账号密码正确
    - 后台记录前端的增删改操作，首先根据登录的用户名和密码，后端cfg.py中进行记录，因为每一次操作必须先登录，因此此参数值唯一。然后在进行sql增删改之后，将对应的管理员用户名以及修改的数据id、当前时间、操作和被操作的表格等信息，填入record.xlsx当中，完成记录功能
- 加载渲染任意数据库表 web_db2/
    - 思路：由于需要可以渲染任意数据库表，因此需要将全部对数据库的操作函数放入一个class中，并接收一个路径来初始化。同时前端传递需要渲染的数据库路径给后端。前端根据后端反馈的数据库的key和value，动态增加列，并进行渲染
    - 后端重构
        - 将原SqliteUtil.py中的方法写入至一个类SqliteClass.py中，构造体接收数据库路径，并包含对数据库的增删改方法
    - 前端重构
        - 加入“路径”按钮，前端输入数据库路径，后端接收并验证是否存在数据库
        - 在接收后端的json字典时，将所有key取出，构造table的表头，再将value对应填入
        - 操作列一直显示，管理员未登录时，点击编辑和删除后会提示登录