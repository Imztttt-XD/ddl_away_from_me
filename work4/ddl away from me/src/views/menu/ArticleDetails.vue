<template>
    <el-affix :offset="150">
        <el-button circle size="large" @click="likeArticle()" v-if="!isLike">
            <img src="../../assets/Union2.png" alt="">
        </el-button>
        <el-button circle size="large" @click="deleteLikeArticle()" v-if="isLike">
            <img src="../../assets/Union3.png" alt="">
        </el-button>
    </el-affix>
    <el-affix :offset="250">
        <el-button circle size="large" @click="scrollToComment">
            <img src="../../assets/Vector.png" alt="">
        </el-button>
    </el-affix>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="articleInfo">
                    <div class="articleTitle">
                        <span>{{ articleDetail.title }}</span>
                    </div>
                    <div class="articledetail">
                        <span>{{ articleDetail.authorName }}</span>
                        <div>
                            {{ articleDetail.publishTime }}
                        </div>
                        <div>
                            <img src="../../assets/Polygon 5.png" alt="">
                            {{ articleDetail.views }}
                        </div>
                    </div>
                </div>
            </el-header>
            <el-main class="articlelist">
                <v-md-preview :text="articleDetail.content"></v-md-preview>
            </el-main>
            <div class="comment" ref="commentSection">
                <Commentlist></Commentlist>
            </div>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token.ts';
import { getArticleDetailService, likeArticleService, deletLikeArticleService } from '@/apis/article.js'
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import Commentlist from './Commentlist.vue';
import Articlemenu from './Articlemenu.vue';
const tokenStore = useTokenStore()
const loading = ref(false)
const route = useRoute()
const articleDetail = ref({})
const commentSection = ref(null);
const isLike = ref(false)
const likeArticle = async () => {
    try {
        let result = await likeArticleService(route.params.articleId, tokenStore.token)
        if (result.code === 1) {
            isLike.value = true
            ElMessage.success("点赞成功");
        } else {
            return false;
        }
    } catch (err) {
        ElMessage.error("之前点过就不可以再点了哦");
    }
}
const deleteLikeArticle = async () => {
    try {
        let result = await deletLikeArticleService(route.params.articleId, tokenStore.token)
        if (result.code === 1) {
            isLike.value = false
            ElMessage.success("取消点赞");
        } else {
            return false;
        }
    } catch (err) {
        ElMessage.error("之前点过就不可以再点了哦")
    }
}
const scrollToComment = () => {
    if (commentSection.value) {
        commentSection.value.scrollIntoView({ behavior: "smooth" });
    }
};
const getArticle = async () => {
    try {
        loading.value = true
        let result = await getArticleDetailService(route.params.articleId)
        if (result.code === 1) {
            articleDetail.value = result.data
        } else {
            return false;
        }
        loading.value = false
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
getArticle()
</script>

<style scoped>
.el-affix {
    display: flex;
    justify-content: flex-start;
    margin-left: 200px;
    height: 0px;

    .el-button {
        width: 50px;
        height: 50px;

        img {
            margin-left: 2px;
            width: 90%;
            height: 90%;
        }

    }


}

.common-layout {
    width: 850px;
    margin: 40px auto;

    :deep(.el-icon-my-export:before) {
        content: "替";
        font-size: 16px;
    }

    :deep(.el-header) {
        height: 150px;
        background-color: #fff;

        .articleTitle {
            padding-left: 30px;
            padding-top: 40px;
            font-size: 32px;
            font-weight: 700;
        }

        .articledetail {
            display: flex;
            justify-content: space-between;
            margin: 40px 30px;
            font-size: 16px;


            div {
                color: #A1A1A1;
            }
        }

    }

    .el-main {
        background-color: #fff;

    }

    .comment {
        margin-top: 50px;
        padding: 20px;
        background-color: #fff;
        /* height: 100%; */
    }

    :deep(.github-markdown-body) {
        font-size: 20px;
        padding: 20px 30px;
    }
}

.el-icon-like {
    width: 50px;
    height: 50px;
}

:deep(.el-icon-my-message) {
    background: url('') center no-repeat;
    width: 21px;
    height: 26px;
}

:deep(.el-icon-my-message:before) {
    content: "替";
    font-size: 20px;
    visibility: hidden;
}
</style>