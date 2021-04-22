
let btn = document.getElementById('btn');

btn.addEventListener('click', function () {
    import(/* webpackChunkName: "login" */'./login').then((login) => {
        console.log(login)
    })
})

console.log('index.js 内容执行了');