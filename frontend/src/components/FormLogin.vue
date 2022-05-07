<template>
<div class="container-form-login">
    <form class="form-login" @submit="loginData" method="post">

        <div class="container-input">
            <it-input v-model="postLogin.email" class="input_form" labelTop="Email" prefix-icon="email" type="email" placeholder="yourmail@gmail.com" />
        </div>

        <div class="container-input">
            <it-input v-model="postLogin.password" name="password" class="input_form" labelTop="Password" prefix-icon="lock" type="password" suffix-icon="remove_red_eye" placeholder="Password" />
        </div>

        <div class="container-input container-btn-login">
            <it-button class="btn-login" size="normal" icon="login" >Se connecter</it-button>
            <it-button @click="showModalRegister" type="success" text>S'inscrire</it-button>
        </div>  

        <div class="container-password-forget">
            <router-link class="link-password" to="/PasswordForget">
                <p>mot de passe oublier</p> 
            </router-link>
        </div>
        
        <it-alert v-if="msg.errorLogin" id="alert-error" type="warning" title="Erreur" closable @on-close="closeAlertLogin">
            {{msg.errorLogin}}
        </it-alert>
    </form>
</div>

<div class="container-msg-user slide-top" >
    <it-alert type="success" title="Validé" closable >
        {{msg.userCreate}}
    </it-alert>
</div>

<div class="container-form-register"  v-if="modalRegisterForm">
    <form @submit="registerData" method="post">

        <div class="container-input" >
            <it-input v-model="postRegister.username"  class="input_form" labelTop="Username" prefix-icon="account_circle" placeholder="Username"/>
        </div>

        <div class="container-input">
            <it-input v-model="postRegister.email" class="input_form" labelTop="Email" prefix-icon="email" type="email" placeholder="yourmail@gmail.com" />
        </div>

        <div class="container-input">
            <it-input v-model="postRegister.password" class="input_form" labelTop="Password" prefix-icon="lock" type="password" suffix-icon="remove_red_eye" placeholder="Password" />
        </div>

        <div class="container-input ">
            <it-switch v-model="postRegister.isAdmin" disabled label="Compte Utilisateur" value="0"/>

            <div class="container-btn-register">
                <it-button size="normal" icon="how_to_reg">Créer nouveau compte</it-button>
                <it-button @click="closeModalRegister" type="success" text>Se Connecter</it-button>
            </div>
        </div>  

        <it-alert v-if="msg.errorRegister" id="alert-error" type="warning" title="Erreur" closable @on-close="closeAlertRegister">
            {{msg.errorRegister}}
        </it-alert>
        
    </form>

    <div>
        <img class="background-building-register" src="../assets/pexels-matthew-simmonds-1570404.webp" alt="">
    </div>
</div>
    


</template>

<script>
export default {
    name: 'FormLogin',

    data() {
        return {

            modalRegisterForm: false,
            msgUser:false,

            postLogin: {
                email: null,
                password: null
            }, 

            postRegister: {
                username: null,
                email: null, 
                password: null,
                isAdmin: false,
            },

            msg: {
                errorLogin: null,
                errorRegister: null,
                userCreate: 'Création de votre profil effectué veuillez vous connecter'
            },

            authUser: { 
                id: null,
                username: null,
                token: null,
                avatarUrl: null,
            },
            
        }
    },

    methods: {

        loginData(e) 
        {
            e.preventDefault();

            this.axios.post("http://localhost:3000/login", this.postLogin)
            .then((response) => {

                this.authUser.id = response.data.id
                this.authUser.username = response.data.username
                this.authUser.token = response.data.token
                this.authUser.avatarUrl = response.data.avatar
                
                    if (response) {
                        localStorage.setItem('USER_INFO',JSON.stringify(this.authUser))    
                    }
                    this.$router.push({ path: '/HomeWall' }) 
            })
            .catch((err) => {  
                this.msg.errorLogin = err.response.data.error      
            })
        },

        registerData(e) {
            e.preventDefault();
            
            this.axios.post("http://localhost:3000/signup", this.postRegister)
            .then((response) => {
                if (response) {
                    this.msgUser = true
                    this.modalRegisterForm = false
                }
            })
            .catch((err) => {  
               this.msg.errorRegister = err.response.data.error      
            })
        },

        closeAlertLogin() {
            this.msg.errorLogin = false    
        },

        closeAlertRegister() {
            this.msg.errorRegister = false
        },

        showModalRegister(e) {
            e.preventDefault();
            this.modalRegisterForm = true
        },

        closeModalRegister(e) {
            e.preventDefault();
            this.modalRegisterForm = false
        },

        
    }
}
</script>

<style lang="scss">
    .container-form-login {
        background: white;
        z-index: 1;
        width: 50%;
        border-radius: 10px ;

            .container-btn-login {
                display: flex;
                justify-content: space-around;
                padding: 10px;
            }   

            .container-password-forget {
                display: flex;
                justify-content: center;
                padding: 10px;

                    .link-password {
                        text-decoration: none;
                        color: #07D85B;
                    }
                    .link-password:hover {
                        text-shadow: #9BEFBD 1px 1px 1px ;
                    }
            }
    }

    .container-input {
        padding: 10px;
    }

    .container-form-register {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        height: 100%;
        align-items: center;
        background: white;
        z-index: 1;
       
            form {
                width: 70%;
                z-index: 3;
                background-color: white;
                border-radius: 5px ;
                padding: 10px;
            }

            .container-btn-register {
                display: flex;
                justify-content: center;
                justify-content: space-evenly;
                padding: 10px;
            }

            .background-building-register {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                opacity: 70%;
            }
    }

    .container-msg-user {
        position: absolute;
        z-index: 3;
        top: -150px;
    }

    .slide-top {
        -webkit-animation: slide-bottom 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: slide-bottom 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }  

    @-webkit-keyframes slide-bottom {
    0% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
    }
  100% {
    -webkit-transform: translateY(100px);
            transform: translateY(100px);
  }
}
@keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-50);
            transform: translateY(-50);
  }
  100% {
    -webkit-transform: translateY( 170px);
            transform: translateY( 170px);
  }
}

@media only screen and (max-width: 320px) {
        .container-form-login {
            width: 80%;
        }

        .container-msg-user {
            width: 80%;
        }
}

@media only screen and (max-width: 470px) {
        .container-btn-login {
            display: flex;
            flex-direction: column;
        }
}

@media only screen and (min-width: 768px) and (max-width: 992px){ 
        .container-form-login {
            width: 50%;
        }
}

@media only screen and (max-width: 940px){ 
    .container-btn-login {
        flex-direction: column;
    }
}

    
</style>