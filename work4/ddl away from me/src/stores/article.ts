import { defineStore } from 'pinia';
import {ref} from 'vue'
export const useUserStore = defineStore('article',()=>{
    const article = ref({
        dolike:true
    })
    const setArticle = (currentArticle)=>{
        article.value = currentArticle
    }
    const removeArticle = ()=>{
        article.value={}
    }
    return {
        article,setUser,removeUser
    }
}
,
//参数持久化
{
    persist:true
}
)