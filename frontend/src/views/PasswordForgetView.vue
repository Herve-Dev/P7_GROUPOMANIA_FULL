<template>

    <div  class="container-form-verify-email">
        <form v-if="formEmail" class="form-verify-email" method="post">

            <div class="input-verify">
                <it-input v-model="emailVerify.email" label-top="Votre email" type="email" placeholder="email"/>
            </div>

            <div class="btn-verify-email">
                <it-button @click="getEmail" type="success">Valider</it-button>
            </div>

            <div class="btn-cancel-email">
                <it-button @click="cancelUpdate" type="danger">Annuler</it-button>
            </div>

            <it-alert v-if="hideErrorMsg" type="warning" :title="errorMsg"/>

        </form>

        <div class="container-link-update" v-if="linkUpdatePassword">
            <a class="link-update" :href="urlUpdatePass"> ==> Modification de votre mot de passe </a>
        </div>
    </div>

</template>

<script>
export default {

    data() {
        return {
            emailVerify: {
                email: null,
            },

            urlUpdatePass: null,
            linkUpdatePassword: false,
            formEmail: true,

            errorMsg: null,
            hideErrorMsg: false,
        }
    },


    methods: {
        
        getEmail(e) {

            e.preventDefault()
            
            this.axios.post("http://localhost:3000/passForget", this.emailVerify)
            .then(res => {

                if (res) {
                    this.formEmail = false
                    this.linkUpdatePassword = true
                    this.urlUpdatePass = res.data.urlUpdatePassword
                    localStorage.setItem('TOKEN',JSON.stringify(res.data.tokenGenerate)) 
                }
            })
            .catch((err) => {
                this.errorMsg = err.response.data.error
                this.hideErrorMsg = true
            }) 
        },

        cancelUpdate() {
            this.$router.push({ path: '/' })
        },
    }
    
}
</script>

<style lang="scss">

.container-form-verify-email {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FD2D01;
    background-image: url('../assets/icon-left-font-monochrome-white.png') ;
    background-repeat: no-repeat;
    background-position: center bottom 300px;

        .form-verify-email {
            width: 30%;
            padding: 20px;
            border-radius: 15px;
            background-color: white;
            -webkit-box-shadow: 3px 1px 33px 5px rgba(0,0,0,0.4); 
            box-shadow: 3px 1px 33px 5px rgba(0,0,0,0.4);
        }
        
        .btn-verify-email {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .container-link-update {
            display: flex;
            justify-content: center;
            width: 30%;
            padding: 20px;
            border-radius: 15px;
            background-color: white;
            -webkit-box-shadow: 3px 1px 33px 5px rgba(0,0,0,0.4); 
            box-shadow: 3px 1px 33px 5px rgba(0,0,0,0.4);

                .link-update {
                    text-decoration: none;
                    color: #07D85B;
                }
                .link-update:hover {
                    text-shadow: #9BEFBD 1px 1px 1px ;
                }
        }
}

</style>