# -*- coding:utf-8 -*-
import hashlib
import sqlite3
import json
import csv
import cfg
import datetime

class SqliteServer(object):
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.cursor = self.conn.cursor()

        self.cursor.execute("select name from sqlite_master where type = 'table'")
        self.table_name = self.cursor.fetchall()[0][0]
        print('********* table name in init: ', self.table_name)
        self.cursor.execute('select * from {}'.format(self.table_name))
        self.col_name_list = [tuple[0] for tuple in self.cursor.description]
        print('********* columns in init: ', self.col_name_list)

    def addOrUpdate(self, json_str):
        try:
            print(json_str)
            json_data = json.loads(json_str)
            id = json_data.get('id', 0)     # 寻找id，找不到则返回0，因此返回0说明是新增
            result = ''
            newId = id

            if id == 0:  # 新增
                keys = ''
                values = ''
                isFirst = True
                for key, value in json_data.items():
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

                sql = "INSERT INTO %s (%s) values (%s)" % (self.table_name, keys, values)

                print(sql)
                self.cursor.execute(sql)
                result = '添加成功'
                newId = self.cursor.lastrowid
                print(result, "newId:", newId)
                cfg.record_operation(data=[datetime.datetime.now(), cfg.current_user, '添加', self.table_name, newId])
                print('添加成功，', cfg.current_user)
            else:
                #修改
                update = ''
                isFirst = True
                for key,value in json_data.items():  #假如{"service":"1","money":"2"}
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
                sql = "update %s set %s %s" % (self.table_name, update, where)
                print(sql) #update t_staff set service='1',money='2' where id='4'
                self.cursor.execute(sql)
                result = '更新成功'
                # print(cursor.rowcount, result)
                cfg.record_operation(data=[datetime.datetime.now(), cfg.current_user, '修改', self.table_name, id])
                print('更新成功，', cfg.current_user)

            self.conn.commit()
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

    def getDataList(self, job):
        # 当job为0时，表示获取所有数据
        tableName = self.table_name
        where = ''
        columns = ','.join(self.col_name_list)
        order = ' order by id desc'  #按照id的递减顺序排列，之后要改
        sql = "select %s from %s%s%s" % (columns, tableName, where, order)
        print(sql)
    
        self.cursor.execute(sql)
        dataList = self.cursor.fetchall()     # fetchall() 获取所有记录
        return dataList

    def getFinalJsonFromData(self, dataList):
        final_json_data = []
        for itemArray in dataList:   # dataList数据库返回的数据集，是一个二维数组
            #itemArray: ('1', '1', '2', '3', '4')
            d = {}
            for columnIndex, columnName in enumerate(self.col_name_list):
                columnValue = itemArray[columnIndex]
                # if columnValue is None: #后面remarks要用，现在不需要
                #     columnValue = 0 if columnName in (
                #         'job', 'education', 'birth_year') else ''
                d[columnName] = columnValue
    
            final_json_data.append(d)
    
        return final_json_data

    def delete(self, id):
    # 根据stock的id号来删除该条记录
        try: 
            sql = "delete from %s where id=%d" % (self.table_name, id)
            print(sql)
            self.cursor.execute(sql)
            self.conn.commit()
            re = {
                'code':0,
                'message':'删除成功',
            }
            cfg.record_operation(data=[datetime.datetime.now(), cfg.current_user, '删除', self.table_name, id])
            print('删除成功，', cfg.current_user)
            return json.dumps(re)
        except Exception as e:
            re = {
                'code': -1,
                'message': repr(e)
            }
            return json.dumps(re)

