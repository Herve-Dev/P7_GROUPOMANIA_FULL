<template>

<nav>
    <NavBar
    :dataAvatar="avatarFromLocal"
    :username="dataUser.username"/>
</nav>

<section class="container-profil">
    <CardProfil 
    :avatarUrl="dataUser.attachment"
    :dataUsernameProfil="dataUser.username"
    :dataBiographyProfil="dataUser.biography"
    />
</section>

<section class="container-biography-avatar">

    <div class="alert-delete" v-if="alertDelete"> 
        <it-alert type="warning" title="Suppression de compte">
            Êtes vous sûrs de vouloir supprimez votre compte ? 
            <it-button @click="deleteAccount" type="success">Oui</it-button>
            <it-button @click="alertDelete = !alertDelete" type="black" outlined>Annuler</it-button>
        </it-alert>
    </div>

    <div class="container-btn-add-avatar-biography-password">
        <div class="btn-profil">
            <it-button @click="modalForm = !modalForm" type="success">Modifier mon avatar ou ma biographie</it-button>
        </div>

        <div class="btn-profil">
            <it-button @click="alertDelete = !alertDelete" type="danger"> Supprimez Mon Compte </it-button>
        </div>
        
        <div class="btn-profil">
            <it-button @click="modalFormUpdatePassword = !modalFormUpdatePassword" type="success" outlined> modifier mon mot de passe </it-button>
        </div>
    </div>

    <div class="content-form" v-if="modalForm">
        <FormAvatarBiography
        :bindBiography="dataUser.biography"
        :closeModalFormBio="closeModalBio"/>
    </div>

    <div class="content-form-update-password" v-if="modalFormUpdatePassword">
        <FormUpdatePass/>
    </div>
</section>
    
<footer>
    <FootProfil/>
</footer>

</template>

<script>
import NavBar from '../components/NavBar.vue'
import CardProfil from '../components/CardProfil.vue'
import FormAvatarBiography from '../components/FormAvatarBiography.vue'
import FootProfil from '../components/FootWall.vue'
import FormUpdatePass from '../components/FormUpdatePassword.vue'


export default {
    name: 'MyProfilView',
    components: {
        CardProfil,
        NavBar,
        FormAvatarBiography,
        FootProfil,
        FormUpdatePass
    },

    data() {
        return {
            dataUser: {
                id: null,
                username: null,
                email: null,
                attachment: null,
                biography: null,
            },

            alertDelete: false,
            usernameAvatar: null,
            avatarFromLocal: null,
            modalForm: false,
            modalFormUpdatePassword: false
        }
    },

    mounted() {
        const searchInfo = localStorage.getItem('USER_INFO');
        const foundInfo = JSON.parse(searchInfo)
        const token = foundInfo.token
        const idUser = foundInfo.id
        const avatar = foundInfo.avatarUrl
        this.avatarFromLocal = avatar



        const config = { headers: {'Authorization': `Bearer ${token}`}}
        this.axios.get(`http://localhost:3000/myProfile/${idUser}`, config)
            .then(res => {
                this.dataUser.id = res.data.infoUser.id
                this.dataUser.username = res.data.infoUser.username
                this.dataUser.email = res.data.infoUser.email
                this.dataUser.attachment = res.data.infoUser.attachment
                this.dataUser.biography = res.data.infoUser.biography
            })
    },

    methods: {

        deleteAccount(e) {
            e.preventDefault()
            const searchToken = localStorage.getItem('USER_INFO');
            const found = JSON.parse(searchToken)
            const token = found.token
            const userId = found.id
            const config = { headers: {'Authorization': `Bearer ${token}`}}

            this.axios.delete(`http://localhost:3000/deleteProfil/${userId}`, config)
                .then((res) => {
                    if (res) {
                        localStorage.removeItem("USER_INFO");
                        this.$router.push({ path: '/' })
                    }  
                })
        },

        closeModalBio(e) {
            e.preventDefault()
            this.modalForm = false
        }
    }

}
</script>

<style lang="scss">

.container-profil {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 150px;
    background-color: #EFEFEF;

        .alert-delete {
            z-index: 1;
            position: absolute;
        }
}

.container-biography-avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 100px;
    background-color: #EFEFEF;

        .container-btn-add-avatar-biography-password {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px;
            width: 30%;
            border-radius: 10px;
            box-shadow: 5px 5px 16px 6px rgba(0,0,0,0.2);
            background-color: white;

                .btn-profil {
                    display: flex;
                    justify-content: center;
                    padding: 10px;
                }
        }

        .content-form {
            display: flex;
            justify-content: center;
            padding: 10px;
        }
}

@media only screen and (max-width: 320px) {
    .container-biography-avatar {
        .container-btn-add-avatar-biography-password {  
            width: 80%;
        }

        .alert-delete {
            margin-bottom: 40px;
            width: 80%;
        }
    }
}


</style>