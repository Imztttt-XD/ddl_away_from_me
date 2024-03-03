<template>
    <div class="catalog-card" v-if="Object.keys(titles).length > 0">
        <div class="catalog-card-header">
            <div>
                <span><font-awesome-icon :icon="['fas', 'bars-staggered']" class="catalog-icon"/></span>
                <span>目录</span>
            </div>
            <span class="progress">{{ progress }}</span>
        </div>
        <div class="catalog-content">
            <div
                v-for="title in titles"
                :key="title.id"
                @click="scrollToView(title.scrollTop)"
                :class="['catalog-item', currentTitle.id === title.id ? 'active' : 'not-active']"
                :style="{ marginLeft: title.level * 20 + 'px' }"
                v-show="title.isVisible"
                :title="title.rawName"
            >
                {{ title.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
  container: {
    type: String,
    default: ".post-body .article-content",
  },
});

const titles = reactive([]);
const currentTitle = reactive({});
const progress = ref(0);

const getTitles = () => {
  // 留空：实现逻辑与之前相同
};

const scrollToView = (scrollTop) => {
  window.scrollTo({ top: scrollTop, behavior: "smooth" });
};

const updateProgressAndTitles = () => {
  // 留空：实现逻辑与之前相同
};

onMounted(() => {
  Object.assign(titles, getTitles());
  window.addEventListener('scroll', updateProgressAndTitles);
});

watch(() => currentTitle, (newVal, oldVal) => {
  // 可以在这里加入对currentTitle变化的响应逻辑
}, { deep: true });

</script>
 
<style scoped>
.catalog-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    padding: 20px 24px;
    width: 100%;
    margin-top: 25px;
    box-sizing: border-box;
}
 
.catalog-card-header {
    text-align: left !important;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
 
.catalog-icon {
    font-size: 18px;
    margin-right: 10px;
    color: dodgerblue;
}
 
.catalog-card-header div > span {
    font-size: 17px;
    color: #4c4948;
}
 
.progress {
    color: #a9a9a9;
    font-style: italic;
    font-size: 140%;
}
 
.catalog-content {
    max-height: calc(100vh - 120px);
    overflow: auto;
    margin-right: -24px;
    padding-right: 20px;
}
 
.catalog-item {
    color: #666261;
    margin: 5px 0;
    line-height: 28px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 14px;
    padding: 2px 6px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
 
    &:hover {
        color: #1892ff;
    }
}
 
.active {
    background-color: #;
    color: white;
 
    &:hover {
        background-color: #0c82e9;
        color: white;
    }
}
</style>