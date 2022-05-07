<template>
    <nav>
        <NavBar
        :dataAvatar="avatarFromLocal"
        :username="usernameUserLocal"/>
    </nav>

    <section class="container-profil">

        <div class="alert-delete" v-if="alertDelete"> 
            <it-alert type="warning" title="Suppression de compte">
                Êtes vous sûrs de vouloir supprimez ce compte ? 
                <it-button @click="deleteAccount" type="success">Oui</it-button>
                <it-button @click="alertDelete = !alertDelete" type="black" outlined>Annuler</it-button>
            </it-alert>
        </div>

        <CardProfil 
        :avatarUrl="dataUser.attachment"
        :dataUsernameProfil="dataUser.username"
        :dataBiographyProfil="dataUser.biography"
        />
    </section>

    <div v-if="buttonDeleteAdmin" class="btn-delete">
        <it-button @click="alertDelete = !alertDelete" type="danger"> Supprimer ce compte </it-button>
    </div>

    <footer>
        <FootProfil/>
    </footer>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import CardProfil from '../components/CardProfil.vue'
import FootProfil from '../components/FootWall.vue'
import jwt_decode from "jwt-decode";

export default {
    
    components: {
        CardProfil,
        NavBar,
        FootProfil
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
            
            avatarFromLocal: null,
            usernameUserLocal: null,
            alertDelete: false,
            buttonDeleteAdmin: false

        }
    },

    mounted() {
       
       const urlTarget = window.location.href
       let userId = parseInt(urlTarget.split('http://localhost:8080/userProfil/')[1]) 

        const searchToken = localStorage.getItem('USER_INFO');
        const found = JSON.parse(searchToken)
        const token = found.token
        const avatarUrl = found.avatarUrl
        const username = found.username
        this.usernameUserLocal = username
        this.avatarFromLocal = avatarUrl

       const verifyAdmin = jwt_decode(token);

        if (verifyAdmin.isAdmin === true) {
            this.buttonDeleteAdmin = true
        }
       
        const config = { headers: {'Authorization': `Bearer ${token}`}}
        this.axios.get(`http://localhost:3000/profilUser/${userId}`, config)
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

            const urlTarget = window.location.href
            let userId = parseInt(urlTarget.split('http://localhost:8080/userProfil/')[1]) 

            const searchToken = localStorage.getItem('USER_INFO');
            const found = JSON.parse(searchToken)
            const token = found.token
            const config = { headers: {'Authorization': `Bearer ${token}`}}

            this.axios.delete(`http://localhost:3000/deleteProfil/${userId}`, config)
                .then((res) => {
                    if (res) {
                        this.$router.push({ path: '/HomeWall' }) 
                    }
                })

        }
    }
    
}
</script>

<style lang="scss">

    nav {
        position: fixed;
        width: 100%;
        z-index: 1;
        background-color: white;
    }
    
    .btn-delete {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .alert-delete {
        margin-top: 350px;
    }
    
</style>