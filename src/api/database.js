import { getTeam } from "@/api/nba";
import firebase from "firebase/compat/app";
import { app } from "./firebase";

// Required for side-effects
import "firebase/firestore";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export function guardarEquipo(nombre, abv) {
  setDoc(doc(db, "teams", abv), { name: nombre })
    .then(() => {
      console.log("Registro agregado con éxito");
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
}

export async function leerPartidos() {
  try {
    let partidos = [];
    let snapshot = await getDocs(collection(db, "games"));

    snapshot.forEach((partido) => {
      partidos.push(partido.data());
    });

    return [undefined, partidos];
  } catch (error) {
    return [error, undefined];
  }
}

export async function guardarPartido(t1, t2, fase, conf) {
  let team1data = await getTeam(t1);
  let team2data = await getTeam(t2);
  setDoc(doc(db, "games", t1 + "x" + t2), {
    team1: team1data.data,
    team2: team2data.data,
    key: fase,
    conference: conf,
    status: "editable", //'uneditable','finished'
    result_team1: 0,
    result_team2: 0,
  })
    .then(() => {
      console.log("Registro agregado con éxito");
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
}

export async function guardarPrediccion(
  team1,
  team2,
  predTeam1,
  predTeam2,
  email
) {
  await setDoc(doc(db, "userxgames", team1 + "x" + team2 + "x" + email), {
    game_id: team1 + "x" + team2,
    pred_team1: predTeam1,
    pred_team2: predTeam2,
    user: email,
  })
    .then(() => {
      console.log("Registro agregado con éxito");
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
}

export async function getPredicts(id, emailPar) {
  try {
    let email = emailPar || user.email;
    let predicts = [];
    let q = query(
      collection(db, "userxgames"),
      where("user", "==", email),
      where("game_id", "==", id)
    );

    let snapshot = await getDocs(q);

    snapshot.forEach((predict) => {
      predicts = predict.data();
    });
    return predicts;
  } catch (error) {
    return [error, undefined];
  }
}

export async function updateStatusGame(id_game, newStatus) {
  try {
    const docRef = doc(db, "games", id_game);

    await updateDoc(docRef, {
      status: newStatus,
    });

    console.log("Estado actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar estado:", error);
  }
}

export async function getStatus(team1Id, team2Id) {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "games"),
        where("team1.id", "==", team1Id),
        where("team2.id", "==", team2Id)
      )
    );

    if (querySnapshot.docs.length > 0) {
      // Obtiene el primer documento que cumple con las condiciones
      const firstDocument = querySnapshot.docs[0];
      return firstDocument.data().status;
    } else {
      // Maneja el caso en el que no se encuentra ningún documento
      return null;
    }
  } catch (error) {
    return error;
  }
}

export async function getGamesByKey(key) {
  try {
    let predicts = [];
    let q = query(collection(db, "games"), where("key", "==", key));

    let snapshot = await getDocs(q);

    snapshot.forEach((predict) => {
      predicts.push(predict.data());
    });

    return [null, predicts];
  } catch (error) {
    return [error, undefined];
  }
}

export async function saveGameResult(id_game, resTeam1, resTeam2) {
  try {
    const docRef = doc(db, "games", id_game);

    await updateDoc(docRef, {
      result_team1: resTeam1,
      result_team2: resTeam2,
    });

    console.log("Resultado actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar Resultado:", error);
  }
}

export async function getDataGame(teamId1, teamId2) {
  try {
    let predicts = [];
    let q = query(
      collection(db, "games"),
      where("team1.id", "==", teamId1),
      where("team2.id", "==", teamId2)
    );

    let snapshot = await getDocs(q);

    snapshot.forEach((predict) => {
      predicts = predict.data();
    });
    return predicts;
  } catch (error) {
    return [error, undefined];
  }
}

export async function saveUser(user) {
  await setDoc(doc(db, "user", user.email), {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    points: "0",
    championships: "0",
  })
    .then(() => {
      console.log("Registro agregado con éxito");
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
}

export async function getUsers() {
  try {
    let users = [];
    let snapshot = await getDocs(collection(db, "user"));

    // Utilizar Promise.all para esperar todas las promesas
    let userPromises = snapshot.docs.map(async (userDoc) => {
      let user = userDoc.data();
      let [err, points] = await getPoints(user.email);
      return { ...user, points };
    });

    // Esperar a que todas las promesas se resuelvan
    users = await Promise.all(userPromises);

    return [undefined, users];
  } catch (error) {
    return [error, undefined];
  }
}

export async function getUsersByGroup(id) {
  try {
    let users = [];
    const docRef = doc(db, "groups", id);
    const docSnap = await getDoc(docRef);

    let userPromises = docSnap.data().users.map(async (userDoc) => {
      let user = userDoc;
      let [err, points] = await getPoints(user.email);
      return { ...user, points };
    });

    // Esperar a que todas las promesas se resuelvan
    users = await Promise.all(userPromises);
    return [undefined, users];
  } catch (error) {
    return [error, undefined];
  }
}

async function getPoints(email) {
  var points = 0; // Inicializa points con 0

  try {
    let predict;
    let [err, games] = await leerPartidos();

    for (const game of games) {
      if (game.status === "finished") {
        predict = await getPredicts(game.team1.id + "x" + game.team2.id, email);

        if (
          (game.result_team1 > game.result_team2 &&
            predict.pred_team1 > predict.pred_team2) ||
          (game.result_team1 < game.result_team2 &&
            predict.pred_team1 < predict.pred_team2)
        ) {
          points += 3;
          if (
            game.result_team1 === predict.pred_team1 &&
            game.result_team2 === predict.pred_team2
          ) {
            points += 2;
          }
        }
      }
    }
  } catch (error) {
    return [error, undefined];
  }

  try {
    const [predictResponse, resultResponse] = await Promise.all([
      getSpecialPredict(email),
      getSpecialPredictResult(),
    ]);

    const [err1, predict] = predictResponse;
    const [err2, result] = resultResponse;

    // Si no se cargo resultado o no hay prediccion no se calcula esta parte de los puntos
    if (result.length == 0 || predict.length == 0) {
      return [undefined, points];
    }
    // Suma 2 puntos por finalista de cada conferencia
    if (predict.team1 == result.team1) {
      points += 2;
    }
    if (predict.team2 == result.team2) {
      points += 2;
    }

    //Suma 5 puntos si le pega al campeon
    if (
      ((predict.predTeam1 == result.predTeam1 &&
        parseInt(result.predTeam1) == 4) ||
        (predict.predTeam2 == result.predTeam2 &&
          parseInt(result.predTeam2) == 4)) &&
      predict.predTeam1 != predict.predTeam2
    ) {
      points += 5;
    }

    //Suma 5 puntos si le pega al MVP
    if (predict.mvp === result.mvp) {
      points += 5;
    }

    return [undefined, points];
  } catch (error) {
    return [error, undefined];
  }
}

export async function deleteGame(id) {
  try {
    await deleteDoc(doc(db, "games", id));
    console.log("Registro Borrado");
  } catch (error) {}
}

export async function saveSpecialPredict(
  team1,
  team2,
  predTeam1,
  predTeam2,
  mvp,
  email
) {
  return await setDoc(doc(db, "user_x_specialPredicts", email), {
    team1: team1,
    team2: team2,
    predTeam1: predTeam1,
    predTeam2: predTeam2,
    mvp: mvp,
    user: email,
  });
}

export async function getSpecialPredict(email) {
  try {
    let predicts = [];
    let q = query(
      collection(db, "user_x_specialPredicts"),
      where("user", "==", email)
    );

    let snapshot = await getDocs(q);

    snapshot.forEach((predict) => {
      predicts = predict.data();
    });
    return [undefined, predicts];
  } catch (error) {
    return [error, undefined];
  }
}

export async function getSpecialPredictResult() {
  try {
    let predicts = [];
    let q = query(collection(db, "user_x_specialPredicts_result"));

    let snapshot = await getDocs(q);

    snapshot.forEach((predict) => {
      predicts = predict.data();
    });
    return [undefined, predicts];
  } catch (error) {
    return [error, undefined];
  }
}

export async function saveSpecialPredictResult(
  team1,
  team2,
  predTeam1,
  predTeam2,
  mvp
) {
  await setDoc(doc(db, "user_x_specialPredicts_result", "PlayOff2024"), {
    team1: team1,
    team2: team2,
    predTeam1: predTeam1,
    predTeam2: predTeam2,
    mvp: mvp,
  })
    .then(() => {
      console.log("Registro agregado con éxito");
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
}

export function createNewGroup(name, accesibility, admin, photoURL) {
  setDoc(doc(collection(db, "groups")), {
    name: name,
    photoURL: photoURL,
    accesibility: accesibility,
    users: [admin],
    admin: admin,
  })
    .then(() => {
      console.log("Registro agregado con éxito");
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
}

export async function getGroupsByUsr(user) {
  try {
    let groups = [];
    let q = query(
      collection(db, "groups"),
      where("users", "array-contains", user)
    );

    let snapshot = await getDocs(q);

    snapshot.forEach((group) => {
      let groupData = { ...group.data() };

      groupData.id = group.id;

      groups.push(groupData);
    });
    return [undefined, groups];
  } catch (error) {
    return [error, undefined];
  }
}

export async function getGroupsNotByUser(email) {
  try {
    let groups = [];
    let q = query(
      collection(db, "groups"),
      where("accesibility", "==", "public")
    );

    let snapshot = await getDocs(q);

    // Recorremos los resultados y filtramos aquellos grupos en los que el usuario no está presente
    snapshot.forEach((group) => {
      let groupData = { ...group.data() };
      let found = false;

      // Verificar si el correo electrónico está presente en el array "users"
      groupData.users.forEach((user) => {
        if (user.email === email) {
          found = true;
        }
      });

      if (!found) {
        groupData.id = group.id;
        groups.push(groupData);
      }
    });

    return [undefined, groups];
  } catch (error) {
    return [error, undefined];
  }
}

export async function joinGroup(id, user) {
  try {
    const docRef = doc(db, "groups", id);

    await updateDoc(docRef, {
      users: arrayUnion(user),
    });

    console.log("Usuario agregado con éxito");
  } catch (error) {
    throw new Error("Error al agregar usuario");
  }
}

export async function deleteGroup(groupId) {
  try {
    await deleteDoc(doc(db, "groups", groupId));
    console.log("Registro Borrado");
  } catch (error) {
    console.log(error);
  }
}

export async function leaveGroupDB(groupId, user) {
  try {
    const docRef = doc(db, "groups", groupId);

    await updateDoc(docRef, {
      users: arrayRemove(user),
    });

    console.log("Usuario eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
}
