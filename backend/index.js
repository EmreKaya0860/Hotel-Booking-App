const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const admin = require("firebase-admin");
const serviceAccount = require("./hotelbookingapp-8250c-firebase-adminsdk-nk5t3-8334af771e.json");

app.use(express.urlencoded({ extended: false })).use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hotelbookingapp-8250c.appspot.com",
});

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const usersCollection = db.collection("Users");

    const userList = await usersCollection
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const user = userList.filter(
      (item) => item.Email == userEmail && item.Password == userPassword
    );
    if (user[0]) return res.send({ message: "Giriş başarılı.", data: user[0], key: 1 });
    return res.send({ message: "Kullanıcı yok veya şifre yanlış.", data: [], key:0 });
  } catch (err) {
    console.log("err=>", err);
    return res.send({ message: "Başarısız", err: err.message, key:0 });
  }
});

app.post("/register", async (req, res) => {
    try {
        const { userEmail, userPassword, userName, userSurname } = req.body;
        console.log(userEmail, userPassword, userName, userSurname)
        const usersCollection = db.collection("Users");
    
        const userList = await usersCollection
          .get()
          .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });
            return data;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        const user = userList.filter(
          (item) => item.Email == userEmail
        );
        if (user[0]) return res.send({ message: "Bu Email zaten kayıtlı.", data:[], key: 0 });

        const docRef = db.collection('Users').doc();

        docRef.set({Email: req.body.userEmail, Name: req.body.userName, Surname: req.body.userSurname, Password:req.body.userPassword})
          .then(() => {
        return res.send({ message: "Kullanıcı ekleme başarılı.", data: {Email: req.body.userEmail, Name: req.body.userName, Surname: req.body.userSurname, Password:req.body.userPassword}, key:1 });
          })
          .catch((error) => {
            console.error("Error writing document:", error);
          });

      } catch (err) {
        console.log("err=>", err);
        return res.send({ message: "Başarısız", err: err.message, key:0 });
      }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
