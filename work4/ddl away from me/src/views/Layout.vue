<script lang="ts" setup>
import { onMounted} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { userInfoSevrvice} from '@/apis/user.js'
import { useTokenStore } from '@/stores/token.ts'
import { useUserStore } from '@/stores/user.ts'
import Avatar from '@/components/Avatar.vue';

const userStore = useUserStore()
const tokenStore = useTokenStore()

const getUser = async () => {
    try {
        let result = await userInfoSevrvice(tokenStore.token)
        userStore.setUser(result.data)
    } catch (err) {
        alert("登录过期，请重新登录");
        Back()
    }
}
onMounted(() => {
    getUser()
}
)

const Back = () => {
    router.push('/')
    tokenStore.removeToken()
    userStore.removeUser()
}

</script>
<template>
    <div class="common-layout" style=" background-color: #f4f5f5">
        <el-menu router mode="horizontal">
            <img src="../assets/Rectangle 4.png" alt="">
            <el-menu-item index="/menu" :class="{ 'choose': $route.path === '/menu' }"
                @click="router.push('/menu')">首页</el-menu-item>
            <el-menu-item style="background: none;width: 150px;margin-left: 850px;">
                <el-button type="primary" size="large" @click="router.push('/EditPost')" style="font-size: 18px;">
                    创作者中心
                </el-button>
            </el-menu-item>
            <el-dropdown>
                <Avatar :size="40" :userId="userStore.user.userId" style="margin-left: 40px;"></Avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="router.push('/UserCenter')">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="Back()">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.el-menu {
    img {
        height: 36px;
        margin: 0 40px 0 80px;
    }
    font-style: normal;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;

    .el-menu-item {
        width: 120px;
        font-size: 20px;
        box-sizing: border-box;
    }

    .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: none;
    }

    .el-menu--horizontal>.el-menu-item {
        border-bottom: none;
    }
}

.user {
    width: 200px;
}

.main {
    margin-top: 60px;
}

.choose {
    color: #4585FF;
}
</style>