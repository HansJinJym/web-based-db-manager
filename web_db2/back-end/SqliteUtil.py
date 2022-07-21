# -*- coding:utf-8 -*-
import hashlib
import sqlite3
import json
import csv
import cfg
import datetime

stock_db_name = '../stock.db'
futures_db_name = '../futures.db'

conn_stock = sqlite3.connect(stock_db_name, check_same_thread=False)
cursor_stock = conn_stock.cursor()
conn_futures = sqlite3.connect(futures_db_name, check_same_thread=False)
cursor_futures = conn_futures.cursor()

def createTables():
    try:
        sql_create_t_stock = '''create table IF NOT EXISTS t_stock(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code VARCHAR(10) NOT NULL,
            name VARCHAR(10) NOT NULL,
            trade VARCHAR(10) NOT NULL,
            price VARCHAR(10) NOT NULL,
            amount VARCHAR(10) NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')),
            modify_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime'))
        )'''
        cursor_stock.execute(sql_create_t_stock)
        sql_create_t_futures = '''create table IF NOT EXISTS t_futures(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cat VARCHAR(10) NOT NULL,
            code VARCHAR(10) NOT NULL,
            name VARCHAR(10) NOT NULL,
            trade VARCHAR(10) NOT NULL,
            price VARCHAR(10) NOT NULL,
            amount VARCHAR(10) NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')),
            modify_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime'))
        )'''
        cursor_futures.execute(sql_create_t_futures)
        sql = "INSERT INTO t_futures (cat,code,name,trade,price,amount) values ('股指期货','IF2208','沪深2208','买多','4260.0','100')"
        for _ in range(8):
            cursor_futures.execute(sql)
            conn_futures.commit()
        print('************ done ************')
    except Exception as e:
        print(repr(e))

createTables()
# cursor_stock.execute("select name from sqlite_master where type = 'table'")
# table_name = cursor_stock.fetchall()[0][0]
# print('********* test: ', table_name)
# cursor_stock.execute('select * from {}'.format(table_name))
# col_name_list = [tuple[0] for tuple in cursor_stock.description]
# print('********* test: ', col_name_list)

stockColumns = ("id", "code", "name", "trade", "price", "amount")

def addOrUpdateStock(json_str):
    try:
        print(json_str) #{"service":"1","money":"2","card_number":"3","name":"4","phone":"1"}
        # print("=="*30)
        stock = json.loads(json_str)
        id = stock.get('id', 0)     # 寻找id，找不到则返回0，因此返回0说明是新增
        result = ''
        newId = id

        if id == 0:  # 新增
            keys = ''
            values = ''
            isFirst = True
            for key, value in stock.items():
                if isFirst:
                    isFirst = False
                else:
                    keys += ','
                    values += ','
                keys += key
                if isinstance(value, str):
                    values += ("'%s'" % value)
                else:
                    values += str(value)

            sql = "INSERT INTO t_stock (%s) values (%s)" % (keys, values)

            print(sql)
            cursor_stock.execute(sql)
            result = '添加成功'
            newId = cursor_stock.lastrowid
            print(result, "newId:", newId)
            cfg.record_operation(data=[datetime.datetime.now(), cfg.current_user, '添加', '股票表格', newId])
            print('添加成功，', cfg.current_user)
        else:
            #修改
            update = ''
            isFirst = True
            for key,value in stock.items():  #假如{"service":"1","money":"2"}
                if key=='id':
                    #这个字段不用考虑，隐藏的
                    continue
                if isFirst:
                    isFirst = False
                else:
                    update += ','  #相当于除了第一个，其他的都需要在最前面加','
                if value==None:
                    value = ""
                if isinstance(value, str):
                    update += (key + "='" + value + "'")
                else:
                    update += (key + "=" + str(value))
            #update: service='1',money='2'
            where = "where id=" + str(id)
            sql = "update t_stock set %s %s" % (update, where)
            print(sql) #update t_staff set service='1',money='2' where id='4'
            cursor_stock.execute(sql)
            result = '更新成功'
            # print(cursor.rowcount, result)
            cfg.record_operation(data=[datetime.datetime.now(), cfg.current_user, '修改', '股票表格', id])
            print('更新成功，', cfg.current_user)

        conn_stock.commit()
        re = {
            'code': 0,
            'id': newId,
            'message': result
        }
        return re
    except Exception as e:
        print(repr(e))
        re = {
            'code': -1,
            'message': repr(e)
        }
        return re

def getStockList(job):
    # 当job为0时，表示获取所有数据
    tableName = 't_stock'
    where = ''
 
    columns = ','.join(stockColumns)
    order = ' order by id desc'  #按照id的递减顺序排列，之后要改
    sql = "select %s from %s%s%s" % (columns, tableName, where, order)
    print(sql)
 
    cursor_stock.execute(sql)
 
    dataList = cursor_stock.fetchall()     # fetchall() 获取所有记录
    return dataList
 
def getStocksFromData(dataList):
    stocks = []
    for itemArray in dataList:   # dataList数据库返回的数据集，是一个二维数组
        #itemArray: ('1', '1', '2', '3', '4')
        stock = {}
        for columnIndex, columnName in enumerate(stockColumns):
            columnValue = itemArray[columnIndex]
            # if columnValue is None: #后面remarks要用，现在不需要
            #     columnValue = 0 if columnName in (
            #         'job', 'education', 'birth_year') else ''
            stock[columnName] = columnValue
 
        stocks.append(stock)
 
    return stocks

def deleteStock(id):
    # 根据stock的id号来删除该条记录
    try: 
        sql = "delete from t_stock where id=%d" % (id)
        print(sql)
        cursor_stock.execute(sql)
        conn_stock.commit()
        re = {
            'code':0,
            'message':'删除成功',
        }
        cfg.record_operation(data=[datetime.datetime.now(), cfg.current_user, '删除', '股票表格', id])
        print('删除成功，', cfg.current_user)
        return json.dumps(re)
    except Exception as e:
        re = {
            'code': -1,
            'message': repr(e)
        }
        return json.dumps(re)
