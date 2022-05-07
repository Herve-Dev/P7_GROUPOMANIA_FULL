<template>
    <form class="form-update-comment" method="post">
        <div class="content-input-update-comments">
            <it-textarea class="input-update-comment" :data-id-comment-bind="idComment" v-model="updateComment.comment" ></it-textarea>
        </div>

        <div class="content-btn-update-comments">
            <div>
                <it-button @click="updateCommentPost" :data-comment="bindComment" :data-id-comment="idComment" type="success" round icon="send" pulse></it-button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'FormUpdateComment',
    props: {
        bindComment: String,
        idComment: Number,
    },

    data() {
        return {
            updateComment: {
                comment: null,
                id: null
            }
        }
    },

    methods: {
        updateCommentPost(e) {
            const curTarget = e.currentTarget
            let dataTarget = curTarget.dataset
            if (dataTarget) {
                dataTarget.comment
            }
        },        
    }
}
</script>

<style lang="scss">
    
</style>