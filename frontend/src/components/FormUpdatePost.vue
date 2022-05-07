<template>
    <form class="form-update-post" method="post" enctype="multipart/form-data" >
        <h2>Mise à jour de votre Post</h2>
        <div class="content-input">
            <it-input class="input-title" name='title'  :data-title-update="bindTitle" v-model="postUp.title" label-top="Votre nouveau titre" placeholder="Titre"/>
        </div>

        <div class="content-input">
            <it-textarea class="textarea-content" name='content' :data-content-update="bindContent" v-model="postUp.content" label-top="Votre nouveau contenu" placeholder="Contenu" />
        </div>

        <div class="content-input">
            <it-input class="input-attachment" name='attachment' :data-attachment-update="bindAttchment" @change="onFileSelected" v-model="postUp.attachment" type="file" label-top="Votre nouvelle photo"  />
        </div>

        <div class="content-button">
            <it-button type="primary" @click="updatePost" :data-post-id-update ="dataPostId" icon="send">Mettre à jour mon post</it-button>
            <it-button type="danger" @click="cancelUpdate" text>Annuler</it-button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'FormUpdatePost',
    props: {
        dataPostId: Number,
        cancelUpdate: Function,
        bindTitle: String,
        bindContent: String,
        bindAttchment: String,
    }, 

    data() {
        return {
            postUp: {
                title: null,
                content: null,
                attachment: null,
            },
        }
    },

    mounted() {
       
       let targetdataTitle = document.querySelector('.input-title')
       let targetDataContent = document.querySelector('.textarea-content')

       this.postUp.title = targetdataTitle.dataset.titleUpdate;
       this.postUp.content = targetDataContent.dataset.contentUpdate
    },
    
    methods: {
        onFileSelected(event) {
            this.postUp.attachment = event.target.files[0]
        },

        updatePost(e) {

            e.preventDefault()
            const curTarget = e.currentTarget
            let dataTarget = curTarget.dataset
            let idPostUpdate = parseInt(dataTarget.postIdUpdate) 


            const searchToken = localStorage.getItem('USER_INFO');
            const tokenFound = JSON.parse(searchToken)
            const token = tokenFound.token
            //const idUser = tokenFound.id

            const formData = new FormData()
            formData.append('title', this.postUp.title)
            formData.append('content', this.postUp.content)

            if (this.postUp.attachment) {
                formData.append('attachment', this.postUp.attachment, this.postUp.attachment.name)
            }
            
            const config = { headers: {'Authorization': `Bearer ${token}`}}
            this.axios.put(`http://localhost:3000/newsWall/update/${idPostUpdate}`, formData, config )
            .then(res => {
                if (res) {
                    this.cancelUpdate(e)
                    location.reload()
                }
            }) 

        },
    }
}
</script>

<style lang="scss">

.form-update-post {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 50%;
    background-image: url('../assets/icon.png') ;
    border-radius: 10px;
    padding: 10px;
}

.content-input {
    padding: 10px;
}

.content-button {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    justify-content: space-evenly;
}

@media only screen and (max-width: 320px) {
    .form-update-post {
        width: 90%;
    }
}
</style>