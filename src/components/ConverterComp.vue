<template>
    <div class="error_window">
        {{ unexpected }} is unexpected
    </div>

    <div class="converter">
        <div class="container">
            <div class="converter__row">
                <h1>Type your request</h1>
                <form action="#">
                    <input
                        v-model="input"
                        placeholder="for example: 15 usd in rub" type="text"
                    >
                    <button
                        @keyup.enter = 'convert'
                        @click.prevent = 'convert'
                    >Convert</button>
                </form>
                <div class="result">
                    {{quantity}} {{firstVal}} = {{result}} {{secVal}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {loadValute, exhnage} from '../api'


export default {
    name: "ConverterComp",

    async created() {
        this.valutes = await loadValute()
    },

    computed: {
        splitInput(){
            return this.input.split(' ')
        },

        namesOfValutes(){
            let arr = []
            for (let key in this.valutes){
                arr.push(key)
            }
            return arr
        }
    },

    data(){
        return{
            input: '',
            valutes: '',
            quantity: 15,
            firstVal: 'USD',
            secVal: 'RUB',
            result: 1500,
            unexpected: ''
        }
    },

    methods:{
        convert(){
            const splitedInput = this.splitInput
            const allNames = this.namesOfValutes

            let quantity = 0
            let firstVal = ''
            let secVal = ''

            splitedInput.forEach((e) => {
                let value = e.toUpperCase()
                if (isNaN(e) === false){
                    quantity = e
                } else if (firstVal === '' && value !== 'IN'){
                    if (allNames.indexOf(value) !== -1){
                        firstVal = value
                    } else {
                        if (value === 'RUB'){
                            firstVal = 'RUB'
                        } else {

                            console.log(value + ' is unexpected')
                            this.generateError(false, value)
                        }
                    }
                }
                else if (secVal === '' && value !== 'IN'){
                    if (allNames.indexOf(value) !== -1){
                        secVal = value
                    } else {
                        if (value === 'RUB'){
                            secVal = 'RUB'
                        } else {
                            console.log(value + ' is unexpected')
                            this.generateError(false, value)
                        }
                    }
                }
            })

            if (this.input !== ''){
                this.showResult(quantity, firstVal, secVal)
            } else {
                this.generateError(true, false)
            }

        },

        async showResult(quatity, first, sec){

            const result = await exhnage(first, sec, quatity)

            this.quantity = quatity
            this.firstVal = first
            this.secVal = sec
            this.result = result.toFixed(2)

            document.querySelector('.result').classList.add('active')
        },

        generateError(empty, unexpected){
            if (empty){
                document.querySelector('.result').innerText = 'Your request is empty'
            } else if (unexpected){
                document.querySelector('.result').classList.remove('active')
                this.unexpected = unexpected
                document.querySelector('.error_window').classList.add('active')
                setTimeout(() => {
                    document.querySelector('.error_window').classList.remove('active')
                }, 3000)
            }

        }
    }
}
</script>

<style lang="scss" scoped>

.converter__row {
    margin-top: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 45px;
        line-height: 100%;
    }

    input{
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid black;
        padding: 8px 10px 8px;
        margin-right: 5px;
        font-weight: 500;
    }

    button {
        font-size: 20px;

        font-weight: 500;
        padding: 8px 10px 8px;
        border-radius: 8px;
        border: 1px solid black;
        background: white;
        cursor: pointer;
    }

}

.result {
    margin-top: 10px;
    border: 1px solid black;
    width: 430px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    transition: .5s;
}

.result.active {
    opacity: 1;
    visibility: visible;
    transition: .5s;
}

.error_window {
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px 15px 10px;
    display: inline;
    position: absolute;
    top: 65px;
    right: 5px;
    color: black;
    background: #fc7575;
    font-size: 20px;
    transition: 1s;
    opacity: 0;
    visibility: hidden;
}

.error_window.active{
    opacity: 1;
    visibility: visible;
}

@media screen and (max-width: 420px){
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        input {
            margin-bottom: 10px;
        }
    }

    .result {
        max-width: 390px;
    }
}

</style>