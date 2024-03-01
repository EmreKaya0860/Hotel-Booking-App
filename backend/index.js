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
  storageBucket: "hotelbookingapp-8250c.appspot.com",
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
    if (user[0])
      return res.send({ message: "Giriş başarılı.", data: user[0], key: 1 });
    return res.send({
      message: "Kullanıcı yok veya şifre yanlış.",
      data: [],
      key: 0,
    });
  } catch (err) {
    console.log("err=>", err);
    return res.send({ message: "Başarısız", err: err.message, key: 0 });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { userEmail, userPassword, userName, userSurname } = req.body;
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
    const user = userList.filter((item) => item.Email == userEmail);
    if (user[0])
      return res.send({ message: "Bu Email zaten kayıtlı.", data: [], key: 0 });

    const docRef = db.collection("Users").doc();

    docRef
      .set({
        Email: req.body.userEmail,
        Name: req.body.userName,
        Surname: req.body.userSurname,
        Password: req.body.userPassword,
        Photo: null,
        LikedHotels: [],
        Reservations: [],
      })
      .then(() => {
        return res.send({
          message: "Kullanıcı ekleme başarılı.",
          data: {
            Email: req.body.userEmail,
            Name: req.body.userName,
            Surname: req.body.userSurname,
            Password: req.body.userPassword,
          },
          key: 1,
        });
      })
      .catch((error) => {
        console.error("Error writing document:", error);
      });
  } catch (err) {
    console.log("err=>", err);
    return res.send({ message: "Başarısız", err: err.message, key: 0 });
  }
});

app.post("/edit-profile", async (req, res) => {

  const usersCollection = db.collection("Users");

  const { userEmail, name, surname, password, photo } = req.body;

  if (!userEmail) return res.json({ message: "Email boş olamaz." })

  let findUser = await usersCollection.where("Email", "==", userEmail?.toLowerCase()).get()

  if (!findUser) return res.json({ message: "Kullanıcı bulunamadı." })

  let user = findUser.docs[0].data()


  //check if user has Name, Surname, Password, Photo, if not, add them
  if (!user.Name) user.Name = ""
  if (!user.Surname) user.Surname = ""
  if (!user.Password) user.Password = ""
  if (!user.Photo) user.Photo = ""


  if (name) user.Name = name
  if (surname) user.Surname = surname
  if (password) user.Password = password

  if (photo) {
    const base64 = photo.split(',')[1]
    const buffer = Buffer.from(base64, 'base64')
    const bucket = admin.storage().bucket()
    const file = bucket.file(`users/${findUser.docs[0].id}.png`)
    await file.save(buffer, { contentType: 'image/png' })
    user.Photo = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/users%2F${findUser.docs[0].id}.png?alt=media`
  }

  await usersCollection.doc(findUser.docs[0].id).set(user)

  return res.json({ message: "Başarılı", data: user })

});

app.post("/get-profile", async (req, res) => {

  const usersCollection = db.collection("Users");

  const { userEmail } = req.body;

  if (!userEmail) return res.json({ message: "Email boş olamaz." })

  let findUser = await usersCollection.where("Email", "==", userEmail?.toLowerCase()).get()

  if (!findUser) return res.json({ message: "Kullanıcı bulunamadı." })

  let user = findUser.docs[0].data()

  return res.json({ message: "Başarılı", data: user })


});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
