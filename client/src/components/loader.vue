<template>
    <div class="loader" :style="{background:bg}">
           <img src="https://s2.svgbox.net/loaders.svg?ic=elastic-spinner" alt="loader">
    </div>
</template>

<script>
export default {
     props:['bg']
}
</script>

<style scoped>
    div.loader{
        width: 100%;
        height: calc(100vh - 67px);
        position: fixed;
        top: 67px;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }
    img{
        width: 60px;
        height: 60px;
    }
    @media only screen and (max-width: 720px) {
    img{
        width: 45px;
        height: 45px;
    }
    }
</style>