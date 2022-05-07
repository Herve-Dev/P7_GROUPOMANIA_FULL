<template>
<div v-if="showMsg" class="Unauthorized">
    <h1>une erreur s'est produite </h1>
    <p class="error-code"> 401</p>
</div>
    
</template>

<script>
export default {
    name: 'unauthorizedMsg',
    props: {
        showMsg: Boolean
    }
    
}
</script>

<style lang="scss">
.Unauthorized {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 100%; 

        .error-code {
            font-size: 250px;
        }
}
</style>