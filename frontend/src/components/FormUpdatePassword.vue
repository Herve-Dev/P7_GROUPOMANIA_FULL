<template>
    <form class="form-update-pass" method="post">
        <h2>Mettre à jour mon mot de passe</h2>

        <div class="input-form">
            <it-input v-model="updatePassword.oldPassword" label-top="Ancien mot de passe" type="password" placeholder="Ancien mot de passe"/>
        </div>

        <div class="input-form">
            <it-input v-model="updatePassword.newPassword" label-top="Nouveau mot de passe" type="password" placeholder="Nouveau mot de passe"/>
        </div>

        <div>
            <it-button @click="updateOldPassword" type="success">Valider</it-button>
        </div>
    </form>    
</template>


<script>
export default {
    name: 'FormUpdatePass',

    data() {
        return {

            updatePassword: {
                oldPassword: null,
                newPassword: null
            },

            msgBackend: null
        }
    },

    methods: {

        updateOldPassword(e) {

            e.preventDefault()

            const search = localStorage.getItem('USER_INFO');
            const found = JSON.parse(search)
            const token = found.token
            const idUser = found.id

            const config = { headers: {'Authorization': `Bearer ${token}`}}
            this.axios.put(`http://localhost:3000/updateOldPassword/${idUser}`, this.updatePassword, config )
                .then(res => {
                    if (res) {
                        this.msgBackend = res.data.message
                        location.reload()
                    }
                })
                .catch((err) => {
                    this.msgBackend = err.data.error
                })
        }
    }
}
</script>


<style lang="scss">
    .form-update-pass {
        background-color: white;
        width: 100%;
        margin-top: 30px;
        padding: 10px;
        border-radius: 10px;

            .input-form {
                padding: 10px;
            }
    }

    

    @media only screen and (max-width: 320px) {
        .form-update-pass {
            width: 100%;
            padding: 10px;
            
            margin-top: 30px;
            border-radius: 10px;     
        }
    }
</style>