// import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    modalStatus: null,
    confirmLoading: null
  },

  reducers: {
    loaded(state, { payload }){
      console.log(payload)
      return { ...state, ...payload }
    },

    save(state, { payload: { data: list, total, page }}) {
      return { ...state, list, total, page };
    },

    delete(state, { payload: { id }}) {
      let list = state.list.filter((item) => (
        item.id !== id
      ))
      return { ...state, list }
    }
  },

  effects: {
    *fetch({ payload = {} }, { call, put }) {
      // const { data, headers } = yield call(usersService.fetch, { page });
      const data = [{
        id: '1',
        name: 'wy',
        email: '1132@qq.com',
        website: 'www.baidu.com'
      },{
        id: '2',
        name: 'syb',
        email: '1132@qq.com',
        website: 'www.baidu.com'
      },{
        id: '3',
        name: 'lq',
        email: '1132@qq.com',
        website: 'www.baidu.com'
      }]

      yield put({
        type: 'save',
        payload: {
          data, 
          total: 3, 
          page: 1
        }
      });
    }
  },

  subscriptions: {
    setup({ dispatch,history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      })
    }
  }
}