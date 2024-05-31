export const API_SERVER = "http://localhost:3001";

export const AB_LIST = `${API_SERVER}/address-book/api`;

////////////member start///////////////////////////
export const LOGIN_POST = `${API_SERVER}/login`; // POST
export const AB_ADD_POST = `${API_SERVER}/address-book/add`; // POST
export const MEMBER_ADD_POST = `${API_SERVER}/member/add`; // POST

// AB_ITEM_DELETE: `${AB_ITEM_DELETE}/17`
export const AB_ITEM_DELETE = `${API_SERVER}/address-book`; // DELETE

// 取得通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const MEMBER_ITEM = `${API_SERVER}/member`; // GET

// 修改通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM_UPDATE_PUT}/${sid}`
export const MEMBER_ITEM_UPDATE_PUT = `${API_SERVER}/member/edit`; // PUT

// 聯絡客服
export const CONTACT_ADD_POST = `${API_SERVER}/contact/add`; // POST

// 取得問答紀錄單筆資料 主鍵為 id,  `${AB_ITEM}/${sid}`
export const REPLY_ITEM = `${API_SERVER}/contact`; // GET

// 取得訂單紀錄單筆資料 主鍵為 id,  `${AB_ITEM}/${sid}`
export const ORDER_LIST_ITEM = `${API_SERVER}/order-list`; // GET

// 取得預約紀錄單筆資料 主鍵為 id,  `${AB_ITEM}/${sid}`
export const BOOKING_LIST_ITEM = `${API_SERVER}/booking-list`; // GET

// 取得收藏店家資料 主鍵為 id,  ``
export const TR_STORE_ITEM = `${API_SERVER}/tr-store`; // GET

// // 會員寄送忘記密碼
// export const REPLY_ITEM = `${API_SERVER}/contact`

// *** JWT ***
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`; // 登入, POST

// 加入或移除 喜愛清單 "/like-toggle-jwt/:sid"
export const JWT_TOGGLE_LIKE = `${API_SERVER}/like-toggle-jwt`; // GET
////////////member end///////////////////////////

// store-desk
export const STORE_DESK = `${API_SERVER}/store-desk/api`;

// store-escape for es1
export const STORE_ESCAPE = `${API_SERVER}/store-escape/api`;

// store-escape for es3
export const STORE_ESCAPEFORES3 = `${API_SERVER}/store-escape/apiForES3`;

// game for es2
export const GAME = `${API_SERVER}/game/api`;

// game for es3
export const GAMEFORES3 = `${API_SERVER}/game/apiForES3`;

// booking-escape
export const BOOKING_ESCAPE = `${API_SERVER}/booking-escape/api`;

// booking-record
export const BOOKING_RECORD = `${API_SERVER}/booking-record/api`;

// 取得預約資料單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const BOOKING_ESCAPE_ITEM = `${API_SERVER}/booking-escape/record`;

// 取得預約的修改的資料單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const BOOKING_ESCAPE_EDIT_ITEM = `${API_SERVER}/booking-record/getEdit`;

// 修改預約資料單筆資料 主鍵為 sid,  `${AB_ITEM_UPDATE_PUT}/${sid}`
export const BOOKING_ESCAPE_ITEM_UPDATE_PUT = `${API_SERVER}/booking-record/edit`; // PUT

// AB_ITEM_DELETE: `${AB_ITEM_DELETE}/17`
export const BOOKING_ESCAPE_ITEM_DELETE = `${API_SERVER}/booking-escape`; // DELETE

// booking-escape 的日期+時間數據
export const BOOKING_ESCAPE_DATETIME = `${API_SERVER}/booking-escape/dateTime`;

// booking-escape 的每日已預約時段的數量
export const BOOKING_ESCAPE_BookedSlots = `${API_SERVER}/booking-escape/bookedSlotsPerDate`;

// booking-escape add
export const BE_ADD_POST = `${API_SERVER}/booking-escape/add`; // POST

// // gamejoinstore-es(不用join)
// export const GAMEGOINSTOREES = `${API_SERVER}/gamejoinstore/api`;

///////////////////////////////////////////////////////////////////

export const MATCH_LIST = `${API_SERVER}/match/api`;
export const MD_ADD_POST = `${API_SERVER}/match/desk/add`;
// 取得通訊錄單筆資料 主鍵為 md_id,  `${AB_ITEM}/${md_id}`
export const MD_ITEM = `${API_SERVER}/match/desk/detail`;

export const MD_ITEM_UPDATE_PUT = `${API_SERVER}/match/desk/edit`; // 修改桌遊揪團資料

export const MD_MEMBER_ADD_POST = `${API_SERVER}/match/desk/detail/add-in`; // 會員加入揪團

export const MY_MATCH_LIST = `${API_SERVER}/match/my-match/api`; // 我的揪團

export const ALMOST_MD_LIST = `${API_SERVER}/match/desk/almost/api`;

//商品
export const PRODUCT_S = `${API_SERVER}/product-s/api`;

/////////////////////////////////////////////////
