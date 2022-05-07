<template>
    <form class="form-new-comment" method="post">
        <div class="content-input-new-comments">
            <it-textarea v-model="addNewComment.comment" placeholder="Poster un nouveau commentaire"></it-textarea>
        </div>

        <div class="content-btn-new-comments">
            <div>
                <it-button :data-id-comment-post="dataId" @click="createComment" type="success" round icon="send" pulse></it-button>
            </div>
        </div>
    </form>
</template>

<script>

export default {
    name: 'FormComments',
    props: {
        dataId: Number,
    },
    

    data() {
        return {
            addNewComment: {
                userId: null,
                postId: null,
                comment: null,
                username: null,
            }
        }
    },

    methods: {
        createComment(e) {
            e.preventDefault()
            
            const curTarget = e.currentTarget
            let dataTarget = curTarget.dataset
        

            const searchToken = localStorage.getItem('USER_INFO');
            const tokenFound = JSON.parse(searchToken)
            const token = tokenFound.token
            
            this.addNewComment.userId = parseInt(tokenFound.id) 
            this.addNewComment.postId = dataTarget.idCommentPost 
            this.addNewComment.username = tokenFound.username
            
            const config = { headers: {'Authorization': `Bearer ${token}`}}
            
            this.axios.post(`http://localhost:3000/addRemark/${this.addNewComment.postId}/${this.addNewComment.userId}`,this.addNewComment, config)
                .then(res => {
                    if (res) {
                        location.reload()
                    } 
                })
        }
    }
    
}
</script>

<style lang="scss">
.form-new-comment {
    display: flex;

        .content-input-new-comments {
            width: 80%;
            padding: 5px;
        }

        .content-btn-new-comments {
            display: flex;
            width: 20%;
            justify-content: center;
            align-items: center;
        }
}


</style>