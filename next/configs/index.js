export const PORT = 3000;
export const DEV = true;

// express 的位置
// export const apiBaseUrl = 'http://localhost:3005/api'
// export const avatarBaseUrl = 'http://localhost:3005/avatar'

// breadcrumb面包屑使用
// 用pathname英文對照中文的名稱(類似關聯陣列的物件)
// 使用方式需用 ex. pathnameLocale['home']
// 下面是防止自動格式化使用註解
/* eslint-disable */
// prettier-ignore
export const pathsLocaleMap = {
  'cart': '購物車',
  'forget-password': '重設密碼',
  'register': '註冊',
  'login': '登入',
  'member': '會員',
  'news': '新聞',
  'about': '關於我們',
  'product': '產品',
  'men': '男性',
  'women': '女性',
  'category': '分類',
  'list': '列表',
  'mobile': '手機',
  'pc': '電腦',
  'student': '學生資料',
  'com-test': '元件測試',
  'breadcrumb': '麵包屑',
  'home': '首頁',
  'posts': '張貼文章',
  'test': '測試',
  'user': '會員',
  'booking': '線上預約',
  'booking-es1': '店家資訊',
  'booking-es2': '遊戲選擇',
  'booking-record': '預約紀錄',
  'question-reply': '問答紀錄',
  'tr-store': '收藏店家',
  'contact': '聯絡客服',
  'order-list': '訂單紀錄',
  'booking-list': '預約紀錄',
  'checkout': '結帳',
  'order-success': '訂單成功',
  'match': '快速媒合',
  'desk': '桌遊媒合',
  'my-match': '我的揪團',
  'detail': '揪團內容',
  'reset-password': '重設密碼',
  'forgot-password': '忘記密碼',
  'edit':'修改預約紀錄',
}
/* eslint-enable */

////////////////////新德路由////////////////////////////

export const API_SERVER = "http://localhost:3001";
export const MATCH_LIST = `${API_SERVER}/match/api`;

///////////////

export const LOGIN_POST = `${API_SERVER}/login`; // POST

export const AB_LIST = `${API_SERVER}/address-book/api`;
export const AB_ADD_POST = `${API_SERVER}/address-book/add`; // POST

// AB_ITEM_DELETE: `${AB_ITEM_DELETE}/17`
export const AB_ITEM_DELETE = `${API_SERVER}/address-book`; // DELETE

// 取得通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const AB_ITEM = `${API_SERVER}/address-book`; // GET

// 修改通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM_UPDATE_PUT}/${sid}`
export const AB_ITEM_UPDATE_PUT = `${API_SERVER}/address-book/edit`; // PUT

// *** JWT ***
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`; // 登入, POST

// 加入或移除 喜愛清單 "/like-toggle-jwt/:pid"
export const JWT_TOGGLE_LIKE = `${API_SERVER}/like-toggle-jwt`; // GET
