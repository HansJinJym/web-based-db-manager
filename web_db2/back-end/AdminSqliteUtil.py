# -*- coding:utf-8 -*-
import hashlib
import sqlite3
import json
import csv
import os
import cfg

db_name = '../admin.db'
admin_db_exist = os.path.exists(db_name)

conn = sqlite3.connect(db_name, check_same_thread=False)
cursor = conn.cursor()

def createAdminTables():
    try:
        sql_create_t_admin = '''create table IF NOT EXISTS t_admin(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(10) NOT NULL,
            password VARCHAR(20) NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')),
            modify_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime'))
        )'''
        cursor.execute(sql_create_t_admin)
    except Exception as e:
        print(repr(e))

createAdminTables()

stockColumns = ("id", "username", "password")

if not admin_db_exist:
    print('initialize admin database')
    keys, values = "username,password", "'admin1','12345678'"
    sql = "INSERT INTO t_admin (%s) values (%s)" % (keys, values)
    cursor.execute(sql)
    keys, values = "username,password", "'admin2','23456789'"
    sql = "INSERT INTO t_admin (%s) values (%s)" % (keys, values)
    cursor.execute(sql)
    keys, values = "username,password", "'admin3','34567890'"
    sql = "INSERT INTO t_admin (%s) values (%s)" % (keys, values)
    cursor.execute(sql)

def checkUsernamePassword(json_str):
    try:
        print(json_str)
        uandp = json.loads(json_str)
        username_getted = uandp.get('username')
        password_getted = uandp.get('password')
        username_getted = "'" + username_getted + "'"
        password_getted = "'" + password_getted + "'"
        print(username_getted, password_getted)

        sql = 'select * from t_admin where username=%s and password=%s' % (username_getted, password_getted)
        # sql = 'select count(*) from t_admin'

        print(sql)
        cursor.execute(sql)
        adminList = cursor.fetchall()     # fetchall() 获取所有记录
        print('adminList: ', adminList)

        if len(adminList) > 0:
            search_admin = True
        else:
            search_admin = False
        
        conn.commit()
        re = {
            'code': 0,
            'message': search_admin,
            'account': uandp.get('username')
        }
        return re
    except Exception as e:
        print(repr(e))
        re = {
            'code': -1,
            'message': repr(e),
            'account': ''
        }
        return re