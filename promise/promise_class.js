// 自定义promise函数模块：IIFE
(function (window) {
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'


    class Promise {

        // promise构造函数
        // excutor执行器函数(同步执行)
        constructor (excutor) {
            var self = this;

            this.status = PENDING  // 给promise对象指定status属性，初始值为pending
            this.data = undefined // 给promise对象指定一个用户存储结果数据的属性
            this.callbacks = [] // 每个元素的结构{ onResolved(){}, onReject(){}}
            // 立即同步执行excutor
            function resolve(value) {
                // 如果当前状态不是pending，直接结束
                if (self.status !== PENDING) {
                    return 
                }
                // 将状态改为resolved
                self.status = RESOLVED
                // 保存value数据
                self.data = value
                // 如果有待执行的callback函数，立即异步执行回调函数onResolved
                if (self.callbacks.length > 0) {
                    // 异步执行
                    setTimeout(() => {
                        self.callbacks.forEach(callbacksObj => {
                                callbacksObj.onResolved(value)
                        })                    
                    })

                }
            }
            function reject(reason) {
                // 如果当前状态不是pending，直接结束
                if (self.status !== PENDING) {
                    return
                }
                // 将状态改为resolved
                self.status = REJECTED
                // 保存value数据
                self.data = reason
                // 如果有待执行的callback函数，立即异步执行回调函数onRejected
                if (self.callbacks.length > 0) {
                    // 异步执行
                    setTimeout(() => {
                        self.callbacks.forEach(callbacksObj => {
                            callbacksObj.onRejected(reason)
                        })                    
                    })

                }
            }
            try { 
                excutor(resolve, reject)
            } catch(error){
                reject(error)
            }
            
        }
        // promise原型对象的then方法
        // 指定成功和失败的回调函数
        // 返回一个新的promise对象
        then (onResolved, onRejected) {
            // 向后传递成功的value
            onResolved = typeof onResolved === 'function' ? onResolved : value => value
            // 指定默认的失败的回调(实现错误/异常穿透的关键点)
            onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

            const self = this
            // console.log(self.data)
            return new Promise((resolve, reject) => {
                // 调用指定的函数处理
                // 根据执行结果，改变return的promise的状态
                function handle(callback) {
                        // 1、如果抛出异常，return的promise就会失败，reason就是error
                        // 2、如果回调函数返回非promise，return的promise就会成功，value就是返回值
                        // 3、如果回调函数返回的是promise，return的promise结果就是这个promise的结果
                    try {
                            const result = callback(self.data)
                            // 3、如果回调函数返回的是promise，return的promise结果就是这个promise的结果
                            if (result instanceof Promise) {
                                // result.then(
                                //     value => {
                                //         resolve(value) // 当result成功时，return的promise就会成功，value就是返回的值
                                //     },
                                //     reason => {
                                //         reject(reason) // 当result失败时，让return的promise也失败
                                //     }
                                // )
                                // 或者直接
                                result.then(resolve,reject)
                            } else {
                                // 2、如果回调函数返回非promise，return的promise就会成功，value就是返回值
                                resolve(result)
                            }
                        } catch (error) {
                            // 1、如果抛出异常，return的promise就会失败，reason就是error
                            reject(error)
                        }
                                        
                }

                if (self.status === PENDING) {
                    // 当前状态还是peding状态，将回调函数保存起来
                    self.callbacks.push({
                        onResolved(value) {
                            handle(onResolved)
                            // onResolved(self.data)
                        },
                        onRejected(reason) {
                            handle(onRejected)
                            // onRejected(reason)
                        }
                    })            
                } else if (self.status === RESOLVED) {
                    // 如果当前是resolved 异步执行onResolved并改变return的promise状态
                    setTimeout(() => {
                        // handle(onRejected)
                        handle(onResolved)
                    })
                } else { // reject
                    // 如果当前是resolved 异步执行onRejectd并改变return的promise状态
                    setTimeout(() => {
                        handle(onRejected)
                    })
                }            
            })
        }
        // promise原型对象的catch方法
        // 指定失败的回调函数
        // 返回一个新的promise对象
        catch (onRejected) {
            return this.then(undefined,onRejected)
        }
        // promise函数对象的resolve方法
        // 返回一个指定结果的成功的promise

        resolve = function (value) {
            // 如果是一般值
            // 如果是成功的promise
            // 如果是失败的promise
            return new Promise((resolve, reject) => {
                if (value instanceof Promise) {
                    value.then(resolve, reject)
                } else {
                    // value不是promise =》 promise 变成功，数据是value
                    resolve(value)
                }
            })
        }
        // promise函数对象的reject方法
        // 返回一个指定reason的成功的promise
        reject = function (reason) {
            return new Promise((resolve, reject) => {
                reject(reason)
            })
        }
        // promise函数对象的all方法
        // 返回一个promise，只有当所有的promise都成功时才算成功，否则失败
        all = function (promises) {
            return new Promise((resolve, reject) => {
                // 用来保存所有成功value数组
                const values = new Array(promises.length) 
                // 计数器
                let resolvedCount = 0
                // 遍历获取每一个promise的结果
                promises.forEach((p, index) => {
                    Promise.resolve(p).then(
                        value => {
                            resolvedCount++
                            // p成功，将成功的value保存values
                            value[index] = value
                            // 如果全部成功了，将return的promise改变成功
                            if (resolvedCount === promises.length) {
                                resolve(values)
                            }
                        },
                        reason => {
                            reject(reason)
                        }
                    )
                })
            })
        }
        // promise函数对象的race方法
        // 返回一个promise，其结果由第一个完成的promise决定
        race = function (promises) {
            return new Promise((resolve, reject) => {
                promises.forEach((p, index) => {
                    // Promise.resolve(p)为了兼容传入的不是一个promise
                    Promise.resolve(p).then(
                        value => {
                            resolve(value)    
                        },
                        reason => {
                            reject(reason)
                        }
                    )
                })
            })
        }
        // 返回一个promise对象，在指定的时间后再确认结果
        resolveDelay = function (value,time) {
            return new Promise((resolve, reject) => { 
                setTimeout(() => {
                    // value是promise
                    if (value instanceof Promise) {
                        value.then(resolve, reject)
                    } else {
                        // value不是promise =》 promise 变成功，数据是value
                        resolve(value)
                    }
                }, time)
            })
        }
        rejectDelsy = function (reason, time) {
            return new Promise((resolve, reject) => { 
                setTimeout(() => {
                    reject(value)
                }, time)
            })
        }        
    }




    // 向外暴露promise函数
    window.Promise = Promise
})(window)