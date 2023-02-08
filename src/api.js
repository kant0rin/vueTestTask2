
export const loadValute = async () => {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await response.json()
    return data.Valute
}



export const exhnage = async (from,to, amount) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "SriXjtSK2rKJ6HJUw20Szttle1xYPn6M");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    const data = await response.json()
    return data.result

}

export const loadList = async (base, symbols) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "uNOreed5T4bRjbJcTwpmK3ecX51vZmmQ");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const response = await fetch(`https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${base}`, requestOptions)
    const data = await response.json()

    return data.rates
}