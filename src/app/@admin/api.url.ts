import { environment } from 'src/environments/environment';

// 本地版
let HOST_URL;
HOST_URL = 'http://localhost:8092';


if (environment.production) {
  // 正式版
  // HOST_URL = 'http://122.51.184.238/api/v1/storage';
}
export { HOST_URL };


