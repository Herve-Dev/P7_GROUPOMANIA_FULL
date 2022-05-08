<template>
    <form class="form-avatar-biography" method="post" >
            <h2>Mettre à jour mon profil</h2>
            <div class="input-form">
                <it-input @change="onFileSelected" v-model="postAvatarBio.attachment" label-top="Avatar" type="file"/>
            </div>

            <div class="input-form" >
                <it-textarea class="biography" v-model="postAvatarBio.biography" :data-biography="bindBiography" label-top="Biographie" placeholder="Votre biographie"></it-textarea>
            </div>

            <div class="container-btn">
                <it-button type="success" @click="updateProfil">Valider</it-button>
                <it-button type="danger" text @click="closeModalFormBio">Annuler</it-button>
            </div>
        </form>
</template>

<script>

export default {
    name: 'FormAvatarBiography',
    props: {
        bindBiography: String,
        closeModalFormBio: Function
    },

    data() {
        return {
            postAvatarBio: {
                attachment: null,
                biography:null
            },

            msgError: null
        }
    },

    mounted() {
        let targetDataBiography = document.querySelector('.biography')
        let dataBiography = targetDataBiography.dataset.biography
        this.postAvatarBio.biography = dataBiography
    },

    methods: {

        onFileSelected(event) {
            this.postAvatarBio.attachment = event.target.files[0]
        },

        updateProfil(e) {
            e.preventDefault()

            const search = localStorage.getItem('USER_INFO');
            const found = JSON.parse(search)
            const token = found.token
            const idUser = found.id

            const formData = new FormData()
            formData.append('biography', this.postAvatarBio.biography)

            if (this.postAvatarBio.attachment != null) {
                formData.append('attachment', this.postAvatarBio.attachment, this.postAvatarBio.attachment.name)
            }
            
            const config = { headers: {'Authorization': `Bearer ${token}`}}
            this.axios.put(`http://localhost:3000/myProfile/update/${idUser}`, formData, config )
            .then(res => {
                if (res) {
                    location.reload()
                }
            })
            .catch((err) => {
                this.msgError = err
            }) 

        }
    }
}
</script>

<style lang="scss">
    .form-avatar-biography {
        width: 100%;
        box-shadow: 5px 5px 16px 6px rgba(0,0,0,0.2);
        background-color: white;
        border-radius: 15px;

            h2 {
                padding: 10px;
            }

            .input-form {
                padding: 10px;
            }

            .container-btn {
                padding: 10px;
                display: flex;
                justify-content: flex-end;
            }
    }

    @media only screen and (max-width: 320px) {
        .form-avatar-biography {
            width: 80%;
            border-radius: 10px;
        }
    }
</style>