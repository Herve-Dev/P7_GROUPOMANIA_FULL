require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const emailValidation = require('nodejs-email-validation');
const genUsername = require("unique-username-generator");
const maskemail = require('maskemail');
const { User, Post, Remark } = require('../models');
const passwordValidator = require('password-validator');
const fs = require('fs')


const schema = new passwordValidator();
schema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase() 
.has().digits(2)
.has().not().spaces()  



exports.signup = async (req, res, next) => {

    const {username, email, password, isAdmin} = req.body
    
    if (!username || !email || !password) {
        return res.status(404).json({'error' : 'Veuillez remplir tout les champs'})
    }

    const emailFound = await User.findOne({ where: { email: email} })
    const usernameFound = await User.findOne({ where: {username: username}} )

    if (emailFound) {
        console.log(emailFound);
        return res.status(404).json({'error': 'Email déja existant'})
    }

    if (usernameFound) {
        const alternativeUsernameForUser = genUsername.generateUsername(username, 2) // module pour proposer un autre username à l'utilisateur
        console.log(alternativeUsernameForUser);
        return res.status(404).json({'error': 'Username déja existant voici un Username alternatif ,'+ ' ' + alternativeUsernameForUser})    
    }

    const validateEmail = emailValidation.validate(email)

    if (validateEmail == true) {
        const validatePassword = schema.validate(password)
        
            if (validatePassword == false) {
                return res.status(404).json({'error': 'Votre mot de passe doit contenir au moin "1 Majuscule, 1 Minuscule, 1 numéro, 1 charactère spécial" '})
            }

            const passwordCrypted = await bcrypt.hash(password, 10);
            const user = await User.create({username: username, email: email, password: passwordCrypted, isAdmin: isAdmin});

            return res.status(201).json({ user })
    } else {
        return res.status(404).json({'error':'Veuillez rentrer un email valide'})
    }       
}

exports.avatarAndBiography = async (req, res, next) => {
    const userId = req.token.userId;
    const {biography} = req.body
    let attachment = req.file 

    const searchUser = await User.findOne({attributes: ['id','username','email' , 'isAdmin', 'attachment', 'biography'], where: { id: userId}})
    
    if (searchUser) {

        if (attachment) {
            attachment =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        
        searchUser.attachment = attachment
        searchUser.biography = biography
        await searchUser.save()
        console.log(searchUser);
        return res.status(201).json({ message: 'votre profil a été mis à jour ' })
        
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(404).send({error:"Veuillez remplir tout les champs"})
    }

    const userFound = await User.findOne({ where: { email: email} })

    if (!userFound) {
        return res.status(404).json({'error':'Utilisateur non trouver ou erreur dans votre mot de passe'})   
    }

    const decryptedPassword = await bcrypt.compare(password, userFound.password)

    if (decryptedPassword === false) {
        return res.status(404).json({'error':'erreur dans votre mot de passe'})
    }

    const userId = userFound.id
    const username = userFound.username
    const avatarUrl = userFound.attachment
    const isAdmin = userFound.isAdmin
    const tokenGenerate = jwt.sign({username: username, userId: userId, avatar: avatarUrl, isAdmin: isAdmin }, process.env.JWT_SIGN_SECRET, { expiresIn: '3h'})

        return res.status(200).json({
            id: userId,
            username: username,
            token: tokenGenerate,
            avatar: avatarUrl,
        })
}

exports.myprofile = async (req, res, next) => {
    
    const userFoundId = req.token.userId;
    const paramsId = req.params.id;

        if (userFoundId != paramsId) {
            res.status(404).json({error: "Erreur authentification du token"})
        } 

        if (userFoundId == paramsId) { // a verifier niveau sécurité
            const users = await User.findOne( {attributes: ['id','username', 'email' ,'isAdmin', 'attachment', 'biography' ,'createdAt'], where: {id: userFoundId}} );
            const userInformation = {
                id: users.id,
                username: users.username,
                email: maskemail(users.email),
                isAdmin: users.isAdmin,
                attachment: users.attachment,
                biography: users.biography,
                createdAt: users.createdAt
            }
            res.status(201).json({infoUser: userInformation})
        }  
}

exports.profilUserSelected = async (req, res, next) => {
    const paramsUserId = req.params.id;
    const reqSqlUser = await User.findOne( {attributes: ['id','username', 'email' ,'isAdmin', 'attachment', 'biography' ,'createdAt'], where: {id: paramsUserId}} );

    try {
        if (reqSqlUser) {
            return res.status(201).json({infoUser: reqSqlUser} )
        }
    } catch (error) {
        return res.status(404).json({error})
    }
    
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    const userIdToken = req.token.userId
    const searchUser = await User.findOne({ attributes: ['id', 'username', 'email', 'isAdmin', 'attachment'], where: { id: userId}})
        
        if (searchUser) {

            if (searchUser.attachment) {
                const fileName = searchUser.attachment.split("/images/")[1];

                Remark.destroy({where: {userId: userId}})
                .then(() => {
                
                    Post.destroy({where: {userId: userId }})
                        .then(() => {
                            fs.unlink(`images/${fileName}`, () => {
                                User.destroy({where: {id: userId}})
                                return res.status(200).json({message:'Compte supprimez avec succes'})
                            })
                        })
                        .catch((error) => {
                            return res.status(404).json({ error })
                        })
                })
                .catch((error) => {
                    return res.status(404).json({ error })
                })
            } else {
                Remark.destroy({where: {userId: userId}})
                    .then(() => {
                        
                        Post.destroy({where: {userId: userId }})
                            .then(() => {
                                User.destroy({where: {id: userId}})
                                return res.status(200).json({message:'Compte supprimez avec succes'})
                            })
                            .catch((error) => {
                                return res.status(404).json({ error })
                            })
                    })
                    .catch((error) => {
                        return res.status(404).json({ error })
                    })
            }

            

        } else if (searchUser.isAdmin === true) {
            Remark.destroy({where: {userId: userId}})
            .then(() => {
                Post.destroy({where: {userId: userId }})
                    .then((res) => {
                        User.destroy({where: {id: userId}})
                        return res.status(200).json({message:'Compte supprimez avec succes'})
                    })
                    .catch((error) => {
                        return res.status(404).json({ error })
                    })
            })
            .catch((error) => {
                return res.status(404).json({ error })
            })
        }
}

exports.verifyEmailPassForgot = async (req, res, next) => {
    const email = req.body
    
    if (email) {
        const searchUser = await User.findOne({attributes: ['id', 'email', 'username'], where: email })

            if (searchUser) {
                const tokenGenerate = jwt.sign({username: searchUser.username, userId: searchUser.id, email: searchUser.email}, process.env.JWT_SIGN_SECRET, { expiresIn: '3h'})
                const userId = searchUser.id
                const urlUpdatePassword = `http://localhost:8080/UpdatePassword/${userId}`
                return res.status(201).json({urlUpdatePassword, tokenGenerate})
            } else {
                return res.status(404).json({error: "Utilisateur introuvable"})
            }    
    }   
}

exports.updateOldPass = async (req, res, next) => {
    const userId = req.params.id
    const {oldPassword, newPassword} = req.body

    try {

        if (oldPassword && newPassword) {

            const searchUser = await User.findOne({where: {id: userId}})
            
                if (searchUser) {

                    const validateNewPassword = schema.validate(newPassword)

                        if (validateNewPassword === true) {

                            const decryptedPassword = await bcrypt.compare(oldPassword, searchUser.password)
                    
                                if (decryptedPassword === true) {

                                    const newPasswordCrypted = await bcrypt.hash(newPassword, 10);
                                    searchUser.password = newPasswordCrypted
                                    await searchUser.save()
                                    return res.status(201).json({message: "Mot de passe mis à jour"})
                                }

                        } else {
                            return res.status(404).json({error: " erreur dans votre mot de passe "})
                        }
                    
                }
                
        } else {
            return res.status(404).json({error: " Veuillez remplir tout les champs "})
        }

    } catch (error) {
        return res.status(404).json({error: " Ressource non trouvée "})
    }
    
}

exports.updateForgetPassword = async (req, res, next) => {
    const userId = req.params.id
    const searchUser = await User.findOne({attributes: ['id', 'email','password'], where: {id: userId}})
    const {newPassword, reNewPassword} = req.body

    if (!newPassword || !reNewPassword) {
        return res.status(404).json({error: "Veuillez remplir tout les champs"})
    }

    if (newPassword || reNewPassword) {
        
        if (newPassword === reNewPassword) {

            const stringifyNewPassword = JSON.stringify(newPassword)
            const stringifyReNewPassword = JSON.stringify(reNewPassword)

            const validateNewPassword = schema.validate(stringifyNewPassword)
            const validateReNewPassword = schema.validate(stringifyReNewPassword)

                if (validateNewPassword && validateReNewPassword === true) {

                    const passwordCrypted = await bcrypt.hash(newPassword, 10);
                    searchUser.password = passwordCrypted
                    await searchUser.save()
                    return res.status(201).json({message: "mot de passe modifié"})
  
                } else {
                    return res.status(404).json({error: " erreur dans votre mot de passe "})
                }

        } else {
            return res.status(404).json({error: " mot de passe non identique "})
        }
    }
}
