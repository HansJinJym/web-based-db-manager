export default class ApiUtil {
    static URL_IP = 'http://127.0.0.1:5001';
    static URL_ROOT = '/api/v1';
 
    static API_STOCK_UPDATE = ApiUtil.URL_ROOT + '/updateStock';      // 不需要id，没有/，直接访问
    static API_STOCK_LIST = ApiUtil.URL_ROOT + '/getStockList/';      // 需要id，/后面即id号
    static API_STOCK_DELETE = ApiUtil.URL_ROOT + '/deleteStock/';

    // static API_STAFF_SEARCH_3 = ApiUtil.URL_ROOT + '/searchStaff_3';  //只搜索3个属性
    
    static API_CHECK_PASSWORD = ApiUtil.URL_ROOT + '/checkPassword';

    static API_PATH = ApiUtil.URL_ROOT + '/path';
    
    // static API_ADMIN = ApiUtil.URL_ROOT + '/gotoAdmin'; //进入管理员状态
    // static API_EXPORT_TO_FILE = ApiUtil.URL_ROOT + '/export_to_file'; //将数据导出到文件
    
}

