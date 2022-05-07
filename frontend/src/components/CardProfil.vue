<template>
    <article class="card-profil">
        <div class="container-avatar">
            <Avatar 
            :size='250' 
            :image="avatarUrl"
            class="avatar-profil"/>
        </div>
        

        <section class="container-biography">
            <h1 class="username-biography">{{dataUsernameProfil}}</h1>
            
            <article class="content-biography">
                <p>{{dataBiographyProfil}}</p>
            </article>
            
        </section>
    </article>
</template>

<script>
import Avatar from 'vue-avatar-component'

export default {
    name: 'CardProfil',
    components: {
        Avatar
    },

    props: {
        avatarUrl: String,
        dataUsernameProfil: String,
        dataBiographyProfil: String,
    }
}
</script>

<style lang="scss">
    .card-profil {
        padding: 20px;
        background-image: url('../assets/architecture-g275038af9_1920.webp');
        background-position: center bottom 40%;
        background-repeat: no-repeat;
        position: relative;
        border-radius: 10px;
        box-shadow: 5px 5px 16px 6px rgba(0,0,0,0.2);
        width: 60%;
        margin-bottom: 90px;

            .container-biography {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding-top: 120px;

                    .username-biography {
                        font-size: 60px;
                        font-weight: 600;
                        margin: 0;
                    }
            }

            .container-avatar {
                display: flex;
                justify-content: center;
                background-position: center bottom 42%;
                background-repeat: no-repeat;
            }

            .avatar-profil {
                position: relative;
                top: 120px;
            }

            .content-biography {
                padding: 20px;
                width: 250px;
                display: flex;
                background: white;
                border-radius: 25px ;
            }
    }

    @media only screen and (max-width: 320px) {
        .card-profil {
            width: 80%;

                .content-biography {
                    width: 80%;
                }
        }
    }

    @media only screen and (max-width: 768px) {
        .card-profil {
            width: 80%;

                .content-biography {
                    width: 80%;
                }
        }
    }
</style>