<template>
  <ul class="content-nav">
    <li class="container-nav-logo">
      <router-link to="/HomeWall">
        <img
          class="logo-nav"
          src="../assets/icon-left-font.png"
          alt="logo groupomania"
        />
      </router-link>
    </li>

    <li class="info-user">
      <Avatar :image="dataAvatar" />
      <p class="username-nav">{{ username }}</p>
    </li>

    <li class="container-url home-responsive">
      <router-link class="link-nav home-responsive" to="/HomeWall">
        <span class="material-icons">
          home
        </span>
      </router-link>
    </li>

    <li class="container-url">
      <router-link class="link-nav" to="/MyProfil">Mon Profil</router-link>
    </li>

    <li class="container-url">
      <router-link class="link-nav" @click="deleteInfoLocalStorage" to="/"
        >Déconnexion</router-link
      >
    </li>
  </ul>
</template>

<script>
import Avatar from "vue-avatar-component";

export default {
  name: "NavBar",
  props: {
    dataAvatar: String,
    username: String,
  },
  components: {
    Avatar,
  },

  methods: {
    deleteInfoLocalStorage() {
      localStorage.removeItem("USER_INFO");
    },
  },
};
</script>

<style lang="scss">
.content-nav {
  margin: 0;
  padding: 0;
  display: flex;
  height: 80px;
  width: 100%;
  list-style: none;

    .info-user {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 10%;

        .username-nav {
          font-weight: 600;
          font-size: 15px;
          color: black;
        }
    }

    .home-responsive {
      display: none;
    }

  .container-nav-logo {
    width: 90%;

    .logo-nav {
      width: 200px;
      height: 100%;
      object-fit: cover;
    }
  }

  .container-url {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;


    .link-nav {
      white-space: nowrap;
      text-decoration: none;
      color: black;
      font-weight: 600;
    }

    .link-nav:hover {
      color: #fc2d04;
    }
  }
}

@media only screen and (min-width: 320px) and (max-width: 484px) {
    .content-nav {
        justify-content: center;

          .container-nav-logo {
            display: none;
          }

        .info-user {
          margin-right: 10px;
          margin-left: 5px;
        }

        .home-responsive {
          display: flex;
        }
    }

        
}
</style>
