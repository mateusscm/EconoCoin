import { FFS, FA } from '../../Firebase';

export const get_info = () => {
  return async dispatch => {
    try {
      let user = FA.currentUser;
      let [ini, fin] = _getDates();

      let ref = await FFS.collection('user_movimentacao')
        .doc(user.uid)
        .collection('movimentacoes')
        .where('data', '>', ini.toISOString().split('T')[0])
        .where("data", "<", fin.toISOString().split("T")[0])
        .orderBy('data', 'desc')
        .get();

      let cont = await FFS.collection('user_conta')
        .doc(user.uid)
        .collection('contas')
        .get();

      let rec = 0;
      let desp = 0;
      let sal = 0;
      let tempc = [];
      if (!cont.empty) {
        cont.docs.forEach(doc => {
          let a = doc.data();
          tempc.push(a);
          sal += parseFloat(a.balance);
        });
      }

      if (!ref.empty) {
        ref.docs.forEach(doc => {
          let data = doc.data();
          if (data.categoria !== 'Transferencia') {
            if (data.tipo === 'receita') {
              rec += parseFloat(data.balance);
            } else if (data.tipo === 'despesa') {
              desp += parseFloat(data.balance);
            }
          }
        });
      }
      let inf = [
        {
          title: 'Saldo em conta',
          qtd: '',
          icon: 'money-bill-wave',
        },
        {
          title: 'Receitas do mês',
          qtd: '',
          icon: 'calendar-plus',
        },
        {
          title: 'Despesas do mês',
          qtd: '',
          icon: 'calendar-minus',
        },
        {
          title: 'Balanço do mês',
          qtd: '',
          icon: 'calendar-check',
        },
      ];
      inf[0].qtd = 'R$ ' + sal;
      inf[1].qtd = 'R$ ' + rec;
      inf[2].qtd = 'R$ ' + desp;
      inf[3].qtd = 'R$ ' + (rec + desp);
      let _ref = await filterRef();
      let info = { info: inf, conta: tempc, ref: _ref };
      // debugger;
      dispatch({ type: 'GET_INFO', payload: info });
    } catch (error) {
      console.log(
        'There was a problem while getting the user information, check redux!'
      );
    }
  };
};

export const del_info = (redirect, target) => {
  return dispatch => {
    dispatch({ type: 'DEL_INFO' });
  };
};

const _getDates = () => {
  let fin = new Date(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split("T")[0]
  );
  let ini = new Date(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0]
  );

  ini.setDate(ini.getDate() - 1);
  fin.setDate(fin.getDate() + 1);
  return [ini, fin];
};

const filterRef = async () => {
  const user = FA.currentUser;
  let temp = [];
  let resp = await FFS.collection('user_movimentacao')
    .doc(user.uid)
    .collection('movimentacoes')
    .orderBy('data', 'desc')
    .limit(3)
    .get();

  if (!resp.empty) {
    resp.forEach(r => {
      temp.push(r.data());
    });
  }
  const newTotal = temp.reduce(
    (totalValue, inf) => totalValue + parseFloat(inf.balance),
    0
  );
  return {
    infos: temp,
    newTotal,
  };
};
