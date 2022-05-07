<template>
    <div class="container-form-update-password">

        <form  class="form-update-password" method="post">

            <div class="input-verify">
                <it-input class="input-password" v-model="updatePass.newPassword" label-top="Votre nouveau mot de passe" type="password" placeholder="mot de passe" />
                <span v-if="hidePassword" @click="passwordShow" class="material-icons visibility-off"> visibility_off </span>
                <span v-if="showPassword" @click="passwordHide" class="material-icons visibility"> visibility </span>
            </div>

            <div class="input-verify">
                <it-input class="input-password" v-model="updatePass.reNewPassword" label-top="retaper votre nouveau mot de passe" type="password" placeholder="mot de passe" />
                <span v-if="hidePassword" @click="passwordShow" class="material-icons visibility-off"> visibility_off </span>
                <span v-if="showPassword" @click="passwordHide" class="material-icons visibility"> visibility </span>
            </div>

            <div class="btn-validate">
                <it-button @click="validateUpdatePassword" type="success">Valider votre nouveau mot de passe</it-button>
            </div>

            <div class="btn-cancel-update">
                <it-button @click="cancelUpdate" type="danger">Annuler</it-button>
            </div>

            <it-alert v-if="hideErrorMsg" type="warning" :title="errorMsg"/>
               
               
        </form>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    
    data () {
        return {
            updatePass: {
                newPassword: null,
                reNewPassword: null
            },

            hidePassword: true,
            showPassword: false,

            errorMsg: null,
            hideErrorMsg: false,
        }
    },

    methods: {

        validateUpdatePassword(e) {

            e.preventDefault()

            const search = localStorage.getItem('TOKEN');
            const found = JSON.parse(search)
            const token = found
            const decryptedToken = jwt_decode(token)
            const userId = decryptedToken.userId
            

            const config = { headers: {'Authorization': `Bearer ${token}`}}
            this.axios.put(`http://localhost:3000/updatePassworForget/${userId}`, this.updatePass, config)
               .then(res => {
                   if (res) {
                       localStorage.removeItem('TOKEN')
                       this.$router.push({ path: '/' })
                   }
               }) 
               .catch((err) => {
                   
                   this.errorMsg = err.response.data.error
                   this.hideErrorMsg = true
               }) 
        },

        passwordShow() {
            this.hidePassword = false
            this.showPassword = true
            let inputPassHide = document.querySelector('.input-password')

            if (inputPassHide) {
                inputPassHide.type ="text"
            }
        },

        passwordHide() {
            this.hidePassword = true
            this.showPassword = false
            let inputPassHide = document.querySelector('.input-password')

            if (inputPassHide) {
                inputPassHide.type ="password"
            }
        },

        cancelUpdate() {
            this.$router.push({ path: '/' })
        }
    }
}
</script>

<style lang="scss">
.container-form-update-password {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: #FD2D01;
    background-image: url('../assets/icon-left-font-monochrome-white.png') ;
    background-repeat: no-repeat;
    background-position: center bottom 300px;
    

    

        .form-update-password {
            width: 30%;
            padding: 20px;
            border-radius: 15px;
            background-color: white;
            -webkit-box-shadow: 3px 1px 33px 5px rgba(0,0,0,0.4); 
            box-shadow: 3px 1px 33px 5px rgba(0,0,0,0.4);
        }

        .input-verify {
            position: relative;
            padding: 10px;

                .visibility-off {
                    position: absolute;
                    top: 35px;
                    left: 90%;
                    cursor: pointer;
                    color: grey;
                    user-select: none;
                }

                .visibility {
                    position: absolute;
                    top: 35px;
                    left: 90%;
                    cursor: pointer;
                    color: grey;
                    user-select: none;
                }
        }

        .btn-validate {
            padding: 10px;
            display: flex;
            justify-content: center;
        }

        .btn-cancel-update {
            display: flex;
            justify-content: center;
        }
}

    
</style>