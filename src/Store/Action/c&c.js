import { FFS, FA } from "../../Firebase";

export const get_cc = () => {
  return async dispatch => {
    try {
      let user = FA.currentUser;

      let cont = await FFS.collection("user_conta")
        .doc(user.uid)
        .collection("contas")
        .get();

      let cat = await FFS.collection("user_categoria")
        .doc(user.uid)
        .collection("categorias")
        .get();

      let contas = [];

      if (!cont.empty) {
        cont.docs.forEach(doc => {
          let a = doc.data();
          contas.push(a);
        });
      }
      let categorias = [];

      if (!cat.empty) {
        cat.docs.forEach(doc => {
          let a = doc.data();
          categorias.push(a);
        });
      }

      const cc = { contas, categorias };
      return dispatch({ type: "GET_C&C", payload: cc });
    } catch (error) {
      console.log("Login with redux -> Failed");
    }
  };
};
