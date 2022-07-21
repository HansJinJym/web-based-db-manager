from flask import Flask, request
import json
import SqliteUtil as DBUtil
import AdminSqliteUtil as AdminDBUtil
import cfg

# 实例化
app = Flask(__name__, template_folder='../front-end', static_folder='../front-end')

@app.route('/hi')
def hi():
    return 'hi~'

# api接口前缀
apiPrefix = '/api/v1/'

##################  Stock接口  ##################

@app.route(apiPrefix + 'updateStock', methods=['POST'])  # 对应ApiUtil的API_STOCK_UPDATE
def updateStock():
    data = request.get_data(as_text=True)
    print("后端数据：", data)
    # re = {'code': 0, 'data':data, 'message': "添加成功"}
    re = DBUtil.addOrUpdateStock(data)
    return json.dumps(re)

@app.route(apiPrefix + 'getStockList/<int:job>')
def getStockList(job):
    array = DBUtil.getStockList(job)  # 二维数组
    # print('array: ', array)
    jsonStocks = DBUtil.getStocksFromData(array)
    # print("jsonStocks: ", jsonStocks)
    return json.dumps(jsonStocks)

@app.route(apiPrefix + 'deleteStock/<int:id>')
def deleteStock(id):
    re = DBUtil.deleteStock(id)
    return re

@app.route(apiPrefix + 'checkPassword', methods=['POST'])
def checkPassword():
    data = request.get_data(as_text=True)
    print("登录账户密码：", data)
    # {"username":"admin1","password":"12345678"}
    json_data = json.loads(data)
    usr = json_data.get('username')
    cfg.current_user = usr
    print('checking, current user name: ', cfg.current_user)
    re = AdminDBUtil.checkUsernamePassword(data)
    return json.dumps(re)


if __name__=="__main__":
    app.run(host='0.0.0.0', debug=False, port=3001)