/**
 * http 通用错误
 */
export interface AdHttpCommonError {
  urlWithParams: string;
  errorStatus: AdHttpErrorStatus;
  errorMsg: string;
}

/**
 * http api 错误
 */
export interface AdHttpApiError {
  urlWithParams: string;
  responseErr: any;
}

/**
 * http 定制错误
 */
export interface AdHttpCustomError {
  tag: string;
  errcode: number;
  errmsg: any;
}

/**
 * http 通用错误状态码
 */
export enum AdHttpErrorStatus {
  AD_UNKNOWN_ERROR,
  AD_HTTP_ERROR,
  AD_HTTP_401_ERROR,
  AD_HTTP_500_ERROR,
  AD_GENERAL_ERROR,
  AD_INTERNEL_SERVER_ERROR,
  AD_PARAMS_ERROR,
  AD_NO_ACCESS_PERMISSIONS,
  AD_NO_API_PERMISSIONS,
  AD_INVALID_USERNAME,
  AD_INVALID_PASSWORD,
  AD_INVALID_IDENTIFY_CODE,
  AD_INVALID_USERNAME_OR_PASSWORD,
  AD_INVALID_TIMESTAMP,
  AD_AUTH_FAIL,
  AD_INVALID_ACCESS_TOKEN,
  AD_LOGIN_TOO_OFTEN,
  AD_USERNAME_NOT_EXIST,
  AD_USERNAME_ALREADY_EXIST,
  AD_REGISTER_FAIL,
  AD_NON_COMPLIANT_USERNAME
}

/**
 *  获取通用错误状态码 Msg
 */
export function getAdHttpErrorString(err: AdHttpErrorStatus): string {
  switch (err) {
    case AdHttpErrorStatus.AD_UNKNOWN_ERROR:
      return '未知错误';
    case AdHttpErrorStatus.AD_HTTP_ERROR:
      return 'HTTP错误';
    case AdHttpErrorStatus.AD_HTTP_401_ERROR:
      return 'HTTP(401)错误';
    case AdHttpErrorStatus.AD_HTTP_500_ERROR:
      return 'HTTP(500)错误';
    case AdHttpErrorStatus.AD_GENERAL_ERROR:
      return '通用错误';
    case AdHttpErrorStatus.AD_INTERNEL_SERVER_ERROR:
      return '服务器错误';
    case AdHttpErrorStatus.AD_PARAMS_ERROR:
      return '参数错误';
    case AdHttpErrorStatus.AD_NO_ACCESS_PERMISSIONS:
      return '权限错误';
    case AdHttpErrorStatus.AD_NO_API_PERMISSIONS:
      return '无接口访问权限';
    case AdHttpErrorStatus.AD_INVALID_USERNAME:
      return '登录账号错误';
    case AdHttpErrorStatus.AD_INVALID_PASSWORD:
      return '登录密码错误';
    case AdHttpErrorStatus.AD_INVALID_IDENTIFY_CODE:
      return '验证码错误';
    case AdHttpErrorStatus.AD_INVALID_USERNAME_OR_PASSWORD:
      return '用户名或密码错误';
    case AdHttpErrorStatus.AD_INVALID_TIMESTAMP:
      return '登录时间戳错误，请重新登录';
    case AdHttpErrorStatus.AD_AUTH_FAIL:
      return '认证失败';
    case AdHttpErrorStatus.AD_INVALID_ACCESS_TOKEN:
      return 'AccessToken失效';
    case AdHttpErrorStatus.AD_LOGIN_TOO_OFTEN:
      return '登录太频繁';
    case AdHttpErrorStatus.AD_USERNAME_NOT_EXIST:
      return '用户名不存在';
    case AdHttpErrorStatus.AD_USERNAME_ALREADY_EXIST:
      return '用户名已存在';
    case AdHttpErrorStatus.AD_REGISTER_FAIL:
      return '注册失败';
    case AdHttpErrorStatus.AD_NON_COMPLIANT_USERNAME:
      return '用户名格式错误';
  }
}

