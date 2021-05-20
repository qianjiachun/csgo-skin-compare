<template>
    <div>
        哈哈
        {{msg}}
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
    components: {

    },
    setup(props, ctx) {
        let msg = ref("嘻嘻");
        onMounted(() => {
            console.log("我被挂载了")
        })
        return {
            msg
        }
    },
})
</script>

<style scoped>
</style>