<template>
    <div class="container-input-add-post" v-if="inputNewPost">
        <img class="logo-groupomania-inside-post" src="../assets/icon.png" alt="" >
        <it-input @click="showModalCreate" placeholder="Ajouter un nouveau post"/>
    </div>  

    <section v-if="modalCreatePost" class="container-form-new-post">
        <form method="post" class="form-new-post">
            <div class="container-input-new-post">
                <it-input v-model="newPost.title"  label-top="Titre du nouveau post" placeholder="Titre" />
            </div>

            <div class="container-input-new-post">
                <it-textarea v-model="newPost.content" label-top="Contenu du nouveau post" placeholder="Contenu"></it-textarea>
            </div>

            <div class="container-input-new-post">
                <it-button @click="addImg" type="success" icon="add">Ajouter une photo</it-button>
                
                <div class="input-files" v-if="inputFileImg">
                    <it-input v-model="newPost.attachment" @change="onFileSelected" type="file" label-top="Ajouter une illustration pour votre post ( non obligatoire )"/>
                </div>
            </div>

            <div class="container-btn-new-post">
                <it-button @click="createNewPost" type="success" icon="send">Ajouter votre post</it-button>
                <it-button @click="closeModalCreate" type="danger" text>Annuler</it-button>
            </div>
        </form>
    </section>  
</template>


<script>
export default {
    
    data() {
        return {
            inputNewPost : true,
            modalCreatePost: false,
            inputFileImg : false,

             newPost: {
                title: null,
                content: null,
                attachment: null,
            },  
        }
    },

    methods: {
        addImg(e) {
            e.preventDefault()
            this.inputFileImg = true
        },

        showModalCreate() {
            this.modalCreatePost = true
            this.inputNewPost = false
        },

        closeModalCreate() {
            this.modalCreatePost = false
            this.inputNewPost = true
            this.inputFileImg = false
        },

        onFileSelected(event) {
            this.newPost.attachment = event.target.files[0]
        },

         createNewPost(e) {
            e.preventDefault()
            
            const formData = new FormData()
            formData.append('title', this.newPost.title)
            formData.append('content', this.newPost.content)
            
            
            if (this.newPost.attachment != null) {
                formData.append('attachment', this.newPost.attachment, this.newPost.attachment.name)
            } 

            const searchToken = localStorage.getItem('USER_INFO');
            const tokenFound = JSON.parse(searchToken)
            const token = tokenFound.token
            
            const config = { headers: {'Authorization': `Bearer ${token}`}}

            this.axios.post(`http://localhost:3000/newsWall`, formData, config)
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
    .container-input-add-post {
        padding: 30px;
        width: 30%;
        background-color: white;
        border-radius: 10px;
        box-shadow: 5px 5px 16px 6px rgba(0,0,0,0.2);

            .logo-groupomania-inside-post {
                width: 100%;
                height: 100px;
                object-fit: contain;
            }
    }

    .container-form-new-post {
        background-image: url('../assets/icon.png');
        border-radius: 10px;
        box-shadow: 5px 5px 16px 6px rgba(0,0,0,0.2);

            .container-input-new-post {
                padding: 15px;
            }

            .container-btn-new-post {
                display: flex;
                justify-content: center;
                justify-content: space-evenly;
                padding: 15px;
            }

            .input-files {
                padding: 10px;
            }
    }

    @media only screen and (max-width: 320px) {
        .container-input-add-post {
            width: 80%;
        }
    }

    @media only screen and (max-width: 768px) {
        .container-input-add-post {
            width: 80%;
        }
    }

</style>