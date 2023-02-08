<template>
    <div class="daily__row">
        <div class="select_dropdown">
            <h1>Chose base currency</h1>
            <div
                class="selected"
            >
                <div
                    @click = 'dropdownClick'
                    class="selected_item"
                >
                    {{baseVal}}
                </div>

                <div
                    v-show="dropdownOpen"
                    class="dropdown_menu"
                >
                    <ul>
                        <li
                            @click = 'changeBase'
                        >
                            RUB
                        </li>
                        <li
                            @click = 'changeBase'
                        >
                            EUR
                        </li>
                        <li
                            @click = 'changeBase'
                        >
                            JPY
                        </li>
                        <li
                            @click = 'changeBase'
                        >
                            CNY
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="daily_table">
            <ul>
                <li
                    v-bind:key = 'key'
                    v-for="key in Object.keys(currencyList)"
                >
                    <h1>{{key}}</h1>
                    <h2>{{currencyList[key].toFixed(2)}}</h2>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import {loadList} from "@/api";

export default {
    name: "DailyComp",

    data(){
        return {
            baseVal: 'USD',
            dropdownOpen: false,
            valuteList: ['USD', 'RUB', 'EUR', 'JPY', 'CNY'],
            currencyList: {}
        }
    },

    methods:{
        changeBase(e){
            const base = this.baseVal
            this.baseVal = e.target.innerText
            e.target.innerText = base
            this.dropdownOpen = false
            this.deleteBaseInArr()
            this.valuteList.push(base)
            this.sendRequest()
        },

        dropdownClick(){
            this.dropdownOpen ? this.dropdownOpen = false : this.dropdownOpen = true
        },

        deleteBaseInArr(){
            const index = this.valuteList.indexOf(this.baseVal)
            this.valuteList.splice(index, 1)
        },

        async sendRequest() {
            const base = this.baseVal
            const symbols = this.valuteList.join('%2C')
            this.currencyList = await loadList(base, symbols)
        }

    },

    created() {
        window.addEventListener('click', (e) => {
            if (!(e.target.classList.contains('selected_item'))){
                this.dropdownOpen = false
            }
        });

    },

    mounted() {
        this.deleteBaseInArr()
        this.sendRequest()


    }


}
</script>

<style scoped lang="scss">

.selected {
    display: inline;
}

.select_dropdown {
    display: flex;
}

.dropdown_menu {
    form {
        display: flex;
        flex-direction: column;
    }
}

.daily__row {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.select_dropdown {
    margin-top: 200px;
    display: flex;
    h1 {
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 30px;
        line-height: 100%;
    }
}

.selected_item {
    margin-left: 10px;
    padding: 5px 10px 5px;
    font-size: 20px;
    border: 1px solid black;
    border-radius: 8px;
    cursor: pointer;
}

.selected {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.dropdown_menu {
    position: absolute;
    top: 40px;
    left: 10px;
    background: #f6f6f6;
    border-radius: 8px;

    li {
        font-size: 20px;
        padding: 5px 10px 5px;
        cursor: pointer;
    }
}

.daily_table {
    ul {
        display: flex;
        flex-direction: column;

        li {
            display: flex;
            height: 50px;
            align-items: center;
            margin-bottom: 5px;
            border: 1px solid black;
            border-radius: 8px;

            h1 {
                display: inline;
                font-size: 18px;
                margin-right: 10px;
                height: 50px;
                width: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 1px solid black;

            }

            h2 {
                display: inline;
                font-size: 18px;

                height: 50px;
                width: 270px;
                display: flex;
                justify-content: center;
                align-items: center;

            }
        }
    }
}

</style>