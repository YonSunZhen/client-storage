import { environment } from 'src/environments/environment';

// 本地版
// let HOST_URL = 'http://localhost:8092';

// 测试版
let HOST_URL = 'http://10.219.107.250/hololens/api/v1/resource-plan';

if (environment.production) {
  // 正式版
  // HOST_URL = 'https://10.219.107.80/hololens/api/v1/resource-plan';
  const _hostname = document.location.hostname;
  HOST_URL
    = ((_hostname !== 'itc.desaysv.com')
      ? 'https://10.219.107.80/hololens/api/v1/resource-plan'
      : 'https://itc.desaysv.com/hololens/api/v1/resource-plan');
}
export { HOST_URL };


