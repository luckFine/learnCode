var button = document.createElement('button');
button.innerHTML = '点击按需加载';

button.addEventListener('click', function () {
    import(/* webpackChunkName: "print" */'./print.js').then((login) => {
        console.log(login)
    })
})

document.body.appendChild(button);