<template>
    <header class="header">
        <div class="container">
            <div class="header__row">
                <div class="header__title">
                    <h1>Currency Converter by kant0rin. </h1><i class="fa-solid fa-dollar-sign"></i>
                </div>
                <div class="header__buttons">
                    <button
                        @click.prevent = 'navBtnClick'
                        class="active header__btn"
                    >
                        <router-link to="/">Converter</router-link>

                    </button>
                    <button
                        @click.prevent = 'navBtnClick'
                        class="header__btn"
                    >

                        <router-link to="/daily">Daily</router-link>

                    </button>
                    <button><a href="https://github.com/kant0rin">GitHub</a></button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",

    data(){
        return{

        }
    },

    methods:{
        navBtnClick(e){
            const target = e.target.parentNode
            if (target.classList.contains('active')){
                return
            } else {
                document.querySelectorAll('.header__btn').forEach(e => {
                    e.classList.remove('active')
                })
                target.classList.add('active')
            }

        }
    }
}
</script>

<style>


</style>