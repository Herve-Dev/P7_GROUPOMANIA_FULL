<template>
    <div class="register-login-view">

        <div class="container-logo-groupomania">
            <img class="logo" src="../assets/icon-above-font.png" alt="" srcset="">
            <!--<img class="background-logo-building" src="../assets/pexels-mantas-sinkevičius-1106476.webp" alt="">-->
        </div>

        <div class="container-form">

            <div class="content-img-building">
                <img class="background-logo-building" src="../assets/pexels-mantas-sinkevičius-1106476.webp" alt="">
            </div>
            
            <FormLogin/>
        </div>
        
        
    </div>
</template>

<script>
import FormLogin from '../components/FormLogin.vue'

export default {
    name: 'RegisterLoginView',
    components: {
        FormLogin
    }    
}
</script>

<style lang="scss">
    .register-login-view {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        

            .container-logo-groupomania {
                position: relative;
                width: 50%;
                display: flex;
                align-items: center;

                    .background-logo-building {
                        position: absolute;
                        opacity: 0.5;
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                    }

                    .logo {
                        z-index: 1;
                        margin:1px;
                        width: 100%;
                        height: 700px;
                    }
                    
            }

            .container-form {
                position: relative;
                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;

                    .background-logo-building {
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
    }

    @media only screen and (max-width: 320px) {

        .register-login-view {
            background-color: #FD2D01;
            background-image: url('../assets/icon-left-font-monochrome-white.png');
            background-size: 50%;
            background-repeat: no-repeat;
            background-position: center bottom 10%;

                .container-logo-groupomania {
                    border: solid 1px black;
                    display: none;

                        .logo {
                            display: none;
                        }
                }

                .container-form {
                    width: 100%;

                        .content-img-building {
                            display: none;
                        }
                }
        }
    }

    @media only screen and (max-width: 768px) { 
        .register-login-view {

            .container-logo-groupomania {
                display: none;
            }

            .container-form {
                width: 100%;
            }
        }
    }

</style>