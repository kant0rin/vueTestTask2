<template>

    <HeaderComponent></HeaderComponent>

    <div class="content">
        <router-view></router-view>
    </div>

</template>

<script>

import {loadValute} from './api'
import HeaderComponent from "@/components/HeaderComponent";

export default {
  name: 'App',

    components: {
      HeaderComponent
    },

    data(){
      return {
          xuy: '123',
          placeholder: '',
          valute: ''
      }
    },

    methods: {

    },

    async created() {
        this.valute = await loadValute()
    }

}
</script >

<style lang="scss">

header{
    margin-top: 10px;
    border-bottom: 1px solid #bbbbbb;
}

.header__row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.header__title {
    display: flex;
    align-items: center;
    margin-right: auto;
    font-size: 30px;
    line-height: 100%;
    h1{
        margin-left: 5px;
        margin-right: 5px;
        font-weight: 500;
    }
}

.header__buttons {
    display: flex;
    margin-top: 8px;
    font-family: "Times New Roman";
    button {
        margin-right: 20px;
        background: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: 400;

        &:hover {
            border-bottom: 2px solid #46bd87;
        }

        &:last-child{
            margin-right: 0;
        }
    }
}

.active {
    border-bottom: 2px solid #46bd87;
}

.main__row {
    display: flex;
}

@media screen and (max-width: 420px){
    .header__title {
        display: flex;
        align-items: center;
        margin-right: auto;
        font-size: 15px;
        line-height: 100%;
        h1{
            margin-left: 5px;
            margin-right: 5px;
            font-weight: 500;
        }
    }
}


</style>
