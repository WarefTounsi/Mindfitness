const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

exports.signUp = async function (req, res) {
     const { password, email, role } = req.body;
     if (!email || !password || !role) {
          //le cas ou l'email ou le mot de passe ne serait pas soumit ou nul
          return res.status(400).json({
               text: "Requete Invalide",
          });
     }

     //création de l'objet User dans lequel on hash le mot de passe
     const user = {
          email,
          password: passwordHash.generate(password),
          role,
     };
     //on vérifie d'abord l'utilisateur existe en base ou non
     try {
          const findUser = await User.findOne({
               email,
          });
          if (findUser) {
               return res.status(400).json({
                    text: "Utilisateur existe déjà",
               });
          }
     } catch (error) {
          return res.status(500).json({ error });
     }
     try {
          //sauvegarde de l'utilisateur en base
          const userData = new User(user);
          const userObject = await userData.save();
          return res.status(200).json({
               text: "Succès",
               token: userObject.getToken(),
               role: userObject.role,
          });
     } catch (error) {
          console.log(error)
          return res.status(500).json({ error });
     }
};
exports.signIn = async function (req, res) {
     const { email, password } = req.body;
     if (!email || !password) {
          //le cas ou l'email ou le mot de passe ne serait pas soumit ou nul
          return res.status(400).json({
               text: "Requete Invalide",
          });
     }
     try {
          // On check si l'utilisateur existe en base
          const findUser = await User.findOne({ email });
          if (!findUser)
               return res.status(401).json({
                    text: "L'utilisateur n'existe pas",
               });
          if (!findUser.authenticate(password))
               return res.status(401).json({
                    text: "Mot de passe incorrect",
               });
          return res.status(200).json({
               token: findUser.getToken(),
               text: "Authentification réussi",
               role: findUser.role,
          });
     } catch (error) {
          return res.status(500).json({
               error,
          });
     }
};
