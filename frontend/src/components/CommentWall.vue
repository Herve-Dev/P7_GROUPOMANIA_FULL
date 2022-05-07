<template>

    <section class="container-username-comment">
        <p>{{ remarkUsername }}</p>
    </section>

    <section class="container-user-comment">

        <div class="container-form-update-comment" v-if="showFormUpdateComment">

            <form class="form-update-comment" method="post">

                <div class="content-input-update-comments">
                    <it-textarea class="input-update-comment" :data-id-comment-bind="commentId" v-model="updateComment.comment" ></it-textarea>
                </div>

                <div class="content-btn-update-comments">

                    <div class="btn-update-comment"> 
                        <it-button @click="updateCommentPut" :data-id-update-remark-send="commentId" type="success" round icon="send" pulse></it-button>
                    </div>

                    <div class="btn-update-comment">
                        <it-button @click="closeFormUpdate" round icon="cancel" pulse></it-button>
                    </div>

                </div>

            </form>

        </div>

        <div v-if="alertComment" class="alert-comment">
            <it-alert type="primary" :title="msgBackend"/>
        </div>

        <p v-if="commentHideShow">{{ remarkComment }}</p> 
    </section>
            
    <section v-if="menuComment" class="container-delete-update-comments">
        <it-button @click="deleteComment" :data-id-delete-remark="commentId" icon='delete'/>
        <it-button @click="targetDataAndModalUpdate " :data-comment-bind="remarkComment" :data-id-update-remark="commentId" icon='edit'/>
    </section>
   
</template>

<script>

export default {
    name: 'CommentWall',
    components: {
        //FormUpdateComment
    },
    props: {
        remarkUsername: String,
        remarkComment: String,
        commentId: Number,
        bindDataComment: String
    },

    data() {
        return {
            updateComment: {
                comment: null,
            },

            dataIdComment: null,
            dataIdDelete: null,
            commentHideShow: true,
            showFormUpdateComment: false,
            menuComment: false,
            alertComment: false,

            msgBackend: null
        }
    },

    mounted()  {
        const search = localStorage.getItem('USER_INFO');
        const found = JSON.parse(search)
        const usernameLocal = found.username

        if (usernameLocal === "SuperAdmin") {
            this.menuComment = true
        }

        if (this.remarkUsername.includes(usernameLocal)) {
            this.menuComment = true
        }
    },

    methods: {
        closeFormUpdate() {
            this.showFormUpdateComment = false
            this.commentHideShow = true
        },

        closeAlert() {
            this.alertComment = false
        },

        targetDataAndModalUpdate(e) {
            e.preventDefault()

            this.showFormUpdateComment = true
            this.commentHideShow = false
            const curTarget = e.currentTarget
            let dataTarget = curTarget.dataset
            let idComment = parseInt(dataTarget.idUpdateRemark) 
        
            if (idComment) {
                this.updateComment.comment = dataTarget.commentBind
            }
        },

        updateCommentPut(e) {
            e.preventDefault()

            const curTarget = e.currentTarget
            let dataTarget = curTarget.dataset
            this.dataIdComment = parseInt(dataTarget.idUpdateRemarkSend)

            const searchToken = localStorage.getItem('USER_INFO');
            const tokenFound = JSON.parse(searchToken)
            const token = tokenFound.token
            
            const config = { headers: {'Authorization': `Bearer ${token}`}}
            this.axios.put(`http://localhost:3000/remarkUpdate/${this.dataIdComment}`, this.updateComment, config)
                .then(res => {
                    this.closeFormUpdate()
                    this.alertComment = true
                    this.msgBackend = res.data.message
                    setTimeout(this.closeAlert , 1000)
                    location.reload()

                })
        },

        deleteComment(e) {
            e.preventDefault()

            const curTarget = e.currentTarget
            let dataTarget = curTarget.dataset
            this.dataIdDelete = parseInt(dataTarget.idDeleteRemark)

            const searchToken = localStorage.getItem('USER_INFO');
            const tokenFound = JSON.parse(searchToken)
            const token = tokenFound.token
            
            const config = { headers: {'Authorization': `Bearer ${token}`}}

            this.axios.delete(`http://localhost:3000/remarkDelete/${this.dataIdDelete}`, config)
                .then(res => {
                    this.msgBackend = res.data.message
                    this.alertComment = true
                    setTimeout(this.closeAlert , 1000)
                    location.reload()
                })
        }
    }

}
</script>

<style lang="scss">
    .container-form-update-comment {
        //border: solid 3px black;
        width: 100%;

            .form-update-comment {
                display: flex;
            }

            .content-input-update-comments {
                //border: solid 3px green;
                width: 90%;
                padding: 10px;
            }

            .content-btn-update-comments {
                //border: solid 3px yellow;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 10%;

                    .btn-update-comment {
                        padding: 5px;
                    }

            } 
    }

    .alert-comment {
        position: absolute;
        right: 200px;
    }

</style>