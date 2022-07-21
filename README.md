# Project Memo

## 第二周进度总结与思考
1. overview
    - 本周主要在上周工作的基础上，完成了web前端对数据库中数据的增删改功能，并且添加了管理员登录功能，即只有管理员才能进行增删改，一般用户只能查看
    - 目前基础功能只差对数据增删改的记录，同时进一步思考如何自动加载渲染任意表
2. 学习内容
    - sqlite的使用及sql语句
        - 学习python中sqlite库的使用方式，以及后端中如何根据前端传来的数据，执行相应的sql语句
        - 目前使用到的一些sql语句包括：创建表格create table，添加数据insert into，修改数据update where，查找数据select from，删除数据delete from where等
    - antd4的表单校验与双向绑定，组件复用等
        - 实现组件复用，即增加数据和修改数据复用同一个表单组件，后端再校验是增加还是修改，以此节约代码量
        - 管理员登录时后端验证账号密码是否填写正确
3. 当前进度
    - 在上周的基础上，首页点击“管理员”按钮时，不再直接进入，而需要填写正确的管理员账号和密码
    ![](fig/login1.png)

    - 当填写错误时，弹出信息显示“用户名或密码错误”，无法登录。填写正确时，跳转至管理员页面，即可以对数据进行增删改操作
    ![](fig/login2.png)
    ![](fig/login3.png)

    - 在上图中可以看到，进入管理员界面后，右上角多出新增数据按钮，表格多出一列，包括对这一行数据的编辑和删除两个按钮
    - 点击添加，输入对应的信息后，点击保存，可以发现数据已经添加至后端数据库，并且前端可以显示出来
    ![](fig/add1.png)
    ![](fig/add2.png)
    ![](fig/add3.png)

    - 对于刚刚添加的数据，点击操作栏里的编辑按钮，可以对当前这行的数据进行编辑，编辑之后点击保存可以在后端执行相应sql语句更新数据，并更新前端数据
    ![](fig/edit1.png)
    ![](fig/edit2.png)
    ![](fig/edit3.png)

    - 点击删除按钮，会弹出确认框，确认删除则在后端执行删除语句将对应数据删除，前端更新后这条数据已被正常删除
    ![](fig/delete1.png)
    ![](fig/delete2.png)
    ![](fig/delete3.png)
4. 遇到的问题，自己的思考与想法
- 本周遇到最大的问题在于antd4中表单的双向绑定问题，即在添加和编辑两个功能共用表单组件时如何做区分。在查阅资料时，要时刻认识到问题本质以及根源，才能更高效的解决问题。绝大部分资料都是针对antd3版本的双向绑定，antd4的资料较少，因此查阅资料后放弃这种方法，自己思考后采用js的原生逻辑判断，最终成功实现并解决这个问题
- 成功修改了上周web前端表格异常多显示一列的问题。上周发现componentDidMount()函数会被调用两次导致web前端表格异常多出一列，之前学习了antd表单组件中的各种方法，没有找到解决方案。在写代码过程中重新分析问题的根源，发现不应该是antd组件的问题，而是js的问题，因此同样用js中的slice()方法成功解决问题
5. 计划
- 上周计划按时完成，即前端对数据的增删改查全部实现，并且添加了管理员权限
- 目前基础功能仅差后台记录增删改操作，预计本周之内完成
- 下周思考并尝试实现摆脱hardcode表的限制，实现对任意一张表格自动加载并渲染

## 第一周进度总结与思考
1. 学习内容
    - 框架
        - 前端框架主要学习React，和VUE等其他框架对比，React创建交互式UI更加轻松，且能高效更新并渲染合适的组件
        - 后端学习flask框架，是一个使用Python编写的轻量级Web应用框架
    - Antd Design及相关组件
        - 包含一套高质量React组件，提炼自企业级中后台产品的交互语言和视觉风格，可以使页面更加美观
        - 学习并实现了表格、按钮、选择框、对话框等组件
    - 前后端数据传输
        - 学习Get和Post方法并代码实现，初步实验实现前后端的数据传输
2. 当前进度
    - 启动后端和前端，对应的后端终端和目前构建的web页面，展示如下。其中web页面为建立的一个模拟股票管理系统，表格内容包括股票代码、名称、买卖、价格、数量。左下角有一个管理员登录按钮，点击可以进入管理员模式，之后可以对表格内容进行增删改，非管理员只能对表格进行查看
    ![](fig/back-end_terminal.png)
    ![](fig/homepage.png)

    - 进入管理员模式后，左下角按钮变为“返回”，右上角添加一个“添加”按钮，即可以为表格增添数据。同时表格增加一列“操作”列，之后可以让管理员进行改、删操作
    ![](fig/homepage_admin.png)

    - 点击“添加”按钮，可以输入要添加的信息，所有项均为必填项，不填写就点击保存则会提示“请输入”
    ![](fig/InfoDialog.png)
    ![](fig/InfoDialog2.png)

    - 正常填写后，点击保存，后端可以收到刚刚填写的数据（已显示在控制台），之后可以将其存入数据库中，同时返回给前端已收到的信息，前后端成功建立连接并通信
    ![](fig/InfoDialog3.png)
    ![](fig/back-end_data.png)

3. 思考与想法
- 目前正在根据自己制定的计划和架构稳步推进进展。整体框架采用React + ant design和flask实现，对于前端web页面显示表格，进入管理员模式可以对表格进行增删改。在实现流程之前，需要对整套流程有一个清晰的认识，例如对web前端提前设计好再代码实现，可以使自己效率更高，目标更加明确
- 在查阅资料时，应当以官方文档为重。目前遇到的最大的问题是antd中组件嵌套时的验证问题，即管理员点击“添加”按钮时，出现的是一个对话框嵌套表单的形式，而对话框是自带“确认”按钮的，需要对话框的按钮验证嵌套表单填写内容的正确性。查阅大量资料发现其他人的做法自己都行不通，后来查阅官方文档发现是版本更新之后api发生变化，因此多阅读官方文档可以避免走弯路
4. 计划
- 目前前后端建立通信连接成功，准备进一步实现将前端数据保存至数据库，以及将数据库内容显示至前端，需要学习数据库相关知识
- 完成上一步后，实现删除和修改数据的功能
- 最后，设计实现记录增删改的操作的功能

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