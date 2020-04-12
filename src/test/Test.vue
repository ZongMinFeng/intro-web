<template>
    <div>
        <position-selection disabled v-model="position"></position-selection>
        权限值{{position}}
    </div>
</template>

<script>
    import PositionSelection from "../components/common/selection/PositionSelection";

    export default {
        components:{
            PositionSelection
        },

        data() {
            return {
                position:'FFF',
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
