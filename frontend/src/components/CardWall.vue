<template>
  <article class="card" :key="postId" :data-id-card="postId">
    <section v-if="showFormUpdatePost" class="container-form-update-post">
      <FormUpdatePost
        :dataPostId="dataPostIdUpdate"
        :cancelUpdate="cancelUpdateForm"
        :bindTitle="dataTitle"
        :bindContent="dataContent"
        :bindAttchment="dataAttachment"
      />
    </section>

    <section class="alert-delete-post" v-if="alertDelete">
      <it-alert
        type="warning"
        title="Êtes-vous sûr de vouloir supprimer ce post"
      >
        <div class="container-btn-delete-post">
          <it-button
            @click="deletePost"
            :data-id-delete-post="postId"
            icon="delete"
            type="danger"
          />
          <it-button
            @click="alertDelete = !alertDelete"
            icon="cancel"
            outlined
            type="black"
          />
        </div>
      </it-alert>
    </section>

    <section class="card__head">

      <div class="card__avatar-name">
        <router-link :to="`/userProfil/${userId}`">
          <Avatar :size="80" :image="dataAvatar" />
        </router-link>
        <p class="username-card-head">{{ UserUsername }}</p>
      </div>

      <div v-if="menuPost" class="card__btn-post">
        <it-button
          @click="showAlertDelete"
          :data-id-delete="postId"
          icon="delete"
        />
        <it-button
          @click="showUpdateForm"
          :data-id-update="postId"
          icon="edit"
        />
      </div>
    </section>

    <section class="card__title">
      <p class="title-card">{{ dataTitle }}</p>
    </section>

    <section class="card__content">
      <p class="data-content">{{ dataContent }}</p>
    </section>

    <section v-if="postImgShow" class="card__image">
      <img
        :data-attachment="dataAttachment"
        class="img-post"
        :src="dataAttachment"
        alt="Image"
      />
    </section>

    <section class="card__reaction">

      <div class="container-icon-likes">
        <it-button @click="likePost" :data-like-id-btn="postId" text>
          <span
            :data-like-id-span="postId"
            class="material-icons redgroupo icon-reaction">
            favorite
          </span>
        </it-button>

        <div v-if="alertLiked" class="alert-likes">
          <span class="material-icons">done</span>
          <p @click="alertLiked = !alertLiked">{{msgLikes}}</p>
        </div>
      </div>

      <div class="container-icon-remark icon-comments">
        <it-button @click="showComments = !showComments" text>
          <span class="material-icons icon-reaction"> add_comment </span>
        </it-button>
      </div>
    </section>

    <section class="card__footer">
      <p>{{ dataDate }}</p>
    </section>

    <section class="container-comments">
      <div
        v-for="remark in postData.Remarks"
        :key="remark.id"
        v-show="showComments"
        class="content-comments"
      >
        <CommentWall
          :commentId="remark.id"
          :remarkComment="remark.comment"
          :remarkUsername="remark.username"
          :bindDataComment="remark.comment"
        />
      </div>

      <div class="container-new-comments">
        <FormComments :dataId="postId" />
      </div>
    </section>
  </article>
</template>

<script>
import Avatar from "vue-avatar-component";
import FormUpdatePost from "../components/FormUpdatePost.vue";
import FormComments from "../components/FormComments.vue";
import CommentWall from "../components/CommentWall.vue";
import jwt_decode from "jwt-decode";

export default {
  name: "CardWall",
  components: {
    Avatar,
    FormUpdatePost,
    FormComments,
    CommentWall,
  },
  props: {
    dataApi: String,
    postId: Number,
    dataAvatar: String,
    dataTitle: String,
    dataContent: String,
    dataAttachment: String,
    dataDate: String,
    UserUsername: String,
    dataPostIdUpdate: Number,
    userId: Number,

    postData: Object,

  },

  data() {
    return {
      showComments: false,
      showFormUpdatePost: false,
      alertDelete: false,
      alertLiked: false,

      menuPost: false,
      postImgShow: true,

      addLikes: {
        likes: false,
      },

      msgLikes: null,
    };
  },

  mounted() {

    /* Affichage du menu post correspondant a l'utilisateur*/
    const search = localStorage.getItem("USER_INFO");
    const found = JSON.parse(search);
    const usernameLocal = found.username;
    const token = found.token;

    const verifyAdmin = jwt_decode(token);

    if (verifyAdmin.isAdmin === true) {
      this.menuPost = true;
    }

    if (this.UserUsername.includes(usernameLocal)) {
      this.menuPost = true;
    }

    /* Affichage de l'image du post si elle existe */
    if (!this.dataAttachment) {
      this.postImgShow = false;
    }
  },

  methods: {
    showUpdateForm() {
      this.showFormUpdatePost = true;
    },

    showAlertDelete() {
      this.alertDelete = true;
    },

    cancelUpdateForm(e) {
      e.preventDefault();
      this.showFormUpdatePost = false;
    },

    deletePost(e) {
      e.preventDefault();

      const searchToken = localStorage.getItem("USER_INFO");
      const tokenFound = JSON.parse(searchToken);
      const token = tokenFound.token;

      const curTarget = e.currentTarget;
      let dataTarget = curTarget.dataset;
      let idDelete = parseInt(dataTarget.idDeletePost);

      const config = { headers: { Authorization: `Bearer ${token}` } };
      this.axios
        .delete(`http://localhost:3000/newsWall/postDelete/${idDelete}`, config)
        .then((res) => {
          if (res) {
            window.setTimeout(() => {
            location.reload();
          }, 1000);
          }
          
        })
        .catch((err) => {
          this.msg.error = err.response.data.error;
        });
    },

    likePost(e) {
      e.preventDefault();

      const searchToken = localStorage.getItem("USER_INFO");
      const tokenFound = JSON.parse(searchToken);
      const token = tokenFound.token;

      const curTarget = e.currentTarget;
      let dataTarget = curTarget.dataset;
      let idLike = parseInt(dataTarget.likeIdBtn);

      const postLiked = document.querySelector(
        `[data-like-id-span ="${idLike}"]`
      ); 

      if (this.addLikes.likes === true) {
        this.addLikes.likes = false;
        postLiked.style.color = "#000000";

      } else if (this.addLikes.likes === false) {
        this.addLikes.likes = true;
        postLiked.style.color = "#FC2D04";
        
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      this.axios.put(`http://localhost:3000/newsWall/like/${idLike}`,this.addLikes,config)
        .then((res) => {
          this.msgLikes = res.data.message;
          this.alertLiked = true
        });
    },
  },
};
</script>

<style lang="scss">

.card {
  position: relative;
  width: 50%;
  margin: 25px;
  box-shadow: 5px 5px 16px 6px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 15px;
  background-color: white;

  &__head {
    display: flex;
  }

  &__title {
    justify-content: center;
    display: flex;
    padding: 10px;

      .title-card {
        font-weight: 500;
      }
  }

  &__content {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  &__image {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &__avatar-name {
    padding: 5px;
    display: flex;
    align-items: center;
    width: 50%;
  }

  &__btn-post {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: 50%;
    height: 30px;
  }

  &__reaction {
    display: flex;
  }
  
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
}

.alert-likes {
  display: flex;
  align-items: center;
  background-color: #07D85B;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin-left: 20px;
}

.username-card-head {
  margin-left: 10px;
  width: 50%;
  font-size: 25px;
  font-weight: 600;
}

.container-icon-likes {
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  width: 50%;

  span:hover {
    cursor: pointer;
  }
}

.material-icons.redgroupo:hover {
  color: #fc2d04;
  transition-duration: 0.5s;
}

.container-icon-remark {
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 10px;

  span {
    cursor: pointer;
  }
}

.icon-comments {
  text-align: center;
}

.icon-reaction {
  font-size: 30px;
}

.img-post {
  object-fit: contain;
  width: 100%;
  height: 350px;
}

.content-comments {
  display: flex;
  margin: 15px;
  box-shadow: 5px 5px 16px 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px 0 0 10px;
}

.container-username-comment {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  align-items: center;
  width: 10%;
}

.container-user-comment {
  display: flex;
  align-items: center;
  width: 70%;
  //border: solid 1px black;
}

.container-delete-update-comments {
  //border: solid 1px black;
  width: 20%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}

.container-form-update-post {
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(255, 215, 215);
  background: linear-gradient(
    90deg,
    rgba(255, 215, 215, 1) 0%,
    rgba(0, 0, 0, 0.8186624991793592) 0%
  );
  left: 0;
  bottom: 0;
  border-radius: 15px;
}

.alert-delete-post {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 150px;

  .container-btn-delete-post {
    display: flex;
    width: 30%;
    justify-content: space-around;
  }
}

.container-new-comments {
  border-radius: 10px;
  padding: 10px;
}

.input-like {
  display: none;
}

@media only screen and (max-width: 320px) {
    .card {
      width: 80%;

        .img-post {
          width: 100%;
        }

        .content-comments {
          padding: 0;
          margin: 0;
          margin-bottom: 25px;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .alert-delete-post {
          margin-right: 100px;
        }

    }
}

@media only screen and (min-width: 320px) and (max-width: 600px) {
  .card {
      width: 80%;

        .img-post {
          width: 100%;
        }

        .content-comments {
          padding: 0;
          margin: 0;
          margin-bottom: 25px;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .alert-delete-post {
          top: 100px;
          right: 100px;
        }
    }
}

@media only screen and (max-width: 768px) {
  .card {
      width: 80%;

        .img-post {
          width: 100%;
        }
  }
} 
</style>
