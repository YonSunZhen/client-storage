import { environment } from 'src/environments/environment';

// 本地版
let HOST_URL;
HOST_URL = 'http://localhost:8080';


if (environment.production) {
  // 正式版
  // HOST_URL = 'http://122.51.184.238/storage/api/v1';
}
export { HOST_URL };


