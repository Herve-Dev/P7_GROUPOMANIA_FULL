<template>

    <nav v-if="showHomeWall">
        <NavBar 
        :dataAvatar="picsAvatar"
        :username="userUsename"/>
    </nav>

    <header v-if="showHomeWall">
        <NewPostCreate/>
    </header>

    <section v-if="showHomeWall" class="homewall-view">
        <CardWall
         v-for="post in dataPostsApi" 
         v-bind:key="post.id"
         v-bind:data-id-card="post.id"
         v-bind:deleteId="post.id"
         v-bind:updateId="post.id"
         :dataTitle="post.title"
         :dataContent="post.content"
         :dataAttachment="post.attachment"
         :dataDate="post.createdAt"
         :dataAvatar="post.User.attachment"
         :UserUsername="post.User.username"
         :dataComment="post.Remarks"
         :postData="post"
         :dataPostIdUpdate="post.id"
         :dataId="post.id"
         :userId="post.User.id"
         :postId="post.id"/>
    </section>

    <UnauthorizedWall 
    :showMsg="showUnauthorizedWall"/>
    
    <footer v-if="showHomeWall">
        <FootComponent/>
    </footer>
</template>

<script>
import CardWall from '../components/CardWall.vue'
import NavBar from '../components/NavBar.vue'
import NewPostCreate from '../components/NewPostCreate.vue'
import FootComponent from '../components/FootWall.vue'
import UnauthorizedWall from '../components/UnauthorizedWall.vue'

export default {
    name: 'HoweWallView',
    components: {
        CardWall,
        NavBar,
        NewPostCreate,
        FootComponent,
        UnauthorizedWall
    },

    data() {
        return {
            dataPostsApi: null,
            catchMsgError: null,
            picsAvatar: null,
            userUsename: null,

            showUnauthorizedWall: false,
            showHomeWall: true,

            idInLikes: null,
            msgLikes: null,
        }
    },

    beforeMount() {
        const searchLocal = localStorage.getItem('USER_INFO');

        if (!searchLocal) {
            this.showHomeWall = false
            this.showUnauthorizedWall = true
        }

        if (searchLocal) {
            this.showUnauthorizedWall = false
        }
    },

    mounted() {
        
        this.axios.get("http://localhost:3000/newsWall")
            .then(response => {
                this.dataPostsApi = response.data.allPostUser
            })
            .catch((error) => {
                this.catchMsgError = error
            })

            const searchInLocal = localStorage.getItem('USER_INFO');
            const found = JSON.parse(searchInLocal)
            const token = found.token
            const idUser = found.id

            const config = { headers: {'Authorization': `Bearer ${token}`}}

            this.axios.get(`http://localhost:3000/myProfile/${idUser}`, config)
                .then(response => {
                    this.picsAvatar = response.data.infoUser.attachment
                    this.userUsename = response.data.infoUser.username
                })
    }
}
</script>

<style lang="scss">

    .homewall-view {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background-color: #EFEFEF;
    }

    header {
        display: flex;
        justify-content: center;
        background-color: #EFEFEF;
        padding: 15px;
        padding-top: 120px;
    }

    nav {
        display: flex;
        position: fixed;
        z-index: 1;
        background-color: white;
    }

    @media only screen and (max-width: 320px) {
        footer {
            justify-content: center;
        }
    }

</style>