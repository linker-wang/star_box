const TIME_OUT = 6000

export class MyRequest {
  constructor(config) {
    this.timeout = config?.timeout || TIME_OUT
    this.header = config?.header || {}
    this.baseUrl = config?.baseUrl || ""
  }

  request(url, method, data, header) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + url,
        method: method ? method : undefined,
        data: data ? data : undefined,
        timeout: this.timeout,
        header: { ...this.header, ...header },
        success: (res) => {
          const data = res.data
          resolve(data)
        },
        fail: (err) => {
          reject(err)
        }
      })

      uni.addInterceptor('request', {
        invoke(args) {
          // console.log(args.url)
        },
        success(args) {},
        fail(err) {
          console.log('interceptor-fail', err)
        },
        complete(res) {
          // console.log('interceptor-complete', res)
        }
      })
    })
  }

  get(url, header) {
    return this.request(url, "GET", null, header)
  }

  post(url, params, header) {
    return this.request(url, "POST", params, header)
  }
}