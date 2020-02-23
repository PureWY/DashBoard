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
      return { ...state, ...payload }
    },

    query(state, { payload: { data: list, total, page }}) {
      return { ...state, list, total, page };
    },

    delete(state, { payload: { id }}) {
      let list = state.list.filter((item) => (
        item.id !== id
      ))
      return { ...state, list }
    },

    update(state, { payload: { userInfo }, callback}) {
      let list = state.list.map(item => {
        if(item.name === userInfo.name){
          item = { 
            ...item,
            ...userInfo 
          }
        }
        return item
      })
      callback({
        id: '1',
        type: 'success',
        message: '用户修改成功'
      })
      return { ...state, list, modalStatus: false }
    },

    add(state, { payload: { userInfo }, callback}) {
      let isExist = state.list.findIndex((item) => {
        return item.name === userInfo.name
      })
      if(isExist > -1){
        callback({
          id: '0',
          type: 'error',
          message: '该用户已存在'
        })
        return { ...state, modalStatus: true }
      }else{
        let id = new Date().getTime()
        state.list.push({
          ...userInfo,
          id
        })
        callback({
          id: '1',
          type: 'success',
          message: '用户添加成功'
        })
        return { ...state, modalStatus: false } 
      }
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
        type: 'query',
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