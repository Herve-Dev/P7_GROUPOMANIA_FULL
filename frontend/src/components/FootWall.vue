<template>
    <ul class="container-foot">
        <li class="container-about">
            <h2>A PROPOS</h2>
            <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
                plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
                300 il y a 3 ans.</p>
        </li>
        
        <li class="container-copyright">
            <p>Copyright © 2022 FullMetal Dev</p>

            <div>
                <ul class="menu-link-social">
                    <li><a href="http://facebook.fr"><img class="img-social-media" src="../assets/facebook.png" alt="lien facebook"></a></li>
                    <li><a href="http://instagram.fr"><img class="img-social-media" src="../assets/instagram.png" alt="lien instagram"></a></li>
                    <li><a href="http://twitter.fr"><img class="img-social-media" src="../assets/twitter.png" alt="lien twitter"></a></li>
                    <li><a href="http://pinterest.fr"><img class="img-social-media" src="../assets/pinterest.png" alt="lien pinterest"></a></li>
                </ul>
            </div>
        </li>
    </ul>
</template>


<script>
export default {
    name: 'FooterWall'
    
}
</script>


<style lang="scss">
    .container-foot {
        padding: 70px;
        display: flex;

            .container-about {
                width: 100%;
                padding: 50px;
                border-radius: 10px;
                box-shadow: 5px 5px 16px 6px rgba(0,0,0,0.2);
                list-style: none;
            }

            .container-copyright {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
    }

    .menu-link-social {
        display: flex;

            .img-social-media {
                width: 50px;
            }

            li {
                list-style: none;
            }
    }
    
    @media only screen and (max-width: 320px) {
        .container-foot {
            flex-direction: column;
            padding: 10px;

                .container-about {
                    width: 90%;
                    padding: 15px;
                }

                .container-copyright {
                    padding-top: 15px;
                }
        }
    }

    @media only screen and (max-width: 768px) {
        .container-foot {
            display: flex;
            flex-direction: column;

                .container-about {
                    width: 90%;
                    padding: 15px;
                }

                .container-copyright {
                    padding-top: 15px;
                }
        }
    }
</style>