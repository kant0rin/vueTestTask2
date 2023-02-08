import {createRouter, createWebHistory} from "vue-router";
import dailyComp from "@/components/DailyComp";
import converterComp from "@/components/ConverterComp";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/daily', component: dailyComp
        },

        {
            path: '/', component: converterComp
        }
    ]
})