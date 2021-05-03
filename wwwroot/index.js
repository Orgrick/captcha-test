const img = document.querySelector('#img')
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const $res = document.querySelector('#res')
$res.style.display = 'none'
let imgUrl;
btn.addEventListener('click', async () => {
    const body = input.value || 'empty'
    await fetch('https://localhost:5001/WeatherForecast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
        body: JSON.stringify(body)
    }).then(mes => mes.json()).then(res => {
        $res.style.display = 'block'
        console.log(res)
        if (res.success) {
            $res.textContent = 'Правильно'
            $res.style.color = 'green'
            getCaptcha()
        }
        if (!res.success) {
            $res.textContent = 'Неправильно, попробуйте еще раз'
            $res.style.color = 'red'
            getCaptcha()
        }
    })
})
input.addEventListener('input', () => {
    input.value = input.value.replace(/[^+\d]/g, '')
    if (input.value.length > 4) {
        input.value = input.value.substring(0,4)
    }
})
async function getCaptcha() {
    await fetch('https://localhost:5001/WeatherForecast')
        .then(res => {
            return res.blob()
        })
        .then(image => {
            imgUrl = URL.createObjectURL(image)
            img.src = imgUrl
        })
}

getCaptcha()
