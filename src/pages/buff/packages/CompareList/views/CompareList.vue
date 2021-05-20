<template>
    <div>
        哈哈
        {{msg}}
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    components: {

    },
    setup(props, ctx) {
        let msg = ref("嘻嘻")
        return {
            msg
        }
    },
})
</script>

<style scoped>
</style>