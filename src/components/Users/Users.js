import React, { useState } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Modal, message } from 'antd';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import WarpForm from '../Form/Form'

function Users({ dispatch, loading, userData }) {
  const { list: dataSource, total, page: current, modalStatus, confirmLoading } = userData
  let chirldRef = null
  let addOrUpdate = null

  const [updateData,setData] = useState({
    name: '',
    email: '',
    website: ''
  })

  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
    dispatch({
      type: 'users/delete',
      payload: {
        id
      }
    })
  }

  function updateHandler(record) {
    addOrUpdate = 'update'
    setData({ ...record })
    dispatch({
      type: 'users/loaded',
      payload: {
        modalStatus: true
      }
    })
  }

  function addHandler(){
    addOrUpdate = 'add'
    dispatch({
      type: 'users/loaded',
      payload: {
        modalStatus: true
      }
    })
  }

  function handleCancel(){
    dispatch({
      type: 'users/loaded',
      payload: {
        modalStatus: false
      }
    })
  }
    
  function handleOk(){
    chirldRef.checkForm().then((res) => {
      dispatch({
        type: addOrUpdate === 'add' ?  'users/add' : 'users/update',
        payload: {
          userInfo: { ...res }
        },
        callback: res => {
          res.id === '0' ? message.warning(res.message)
          : message.success(res.message)
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  function AddModal(){
    return (
      <Modal
          title="添加用户"
          visible={modalStatus}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
        <WarpForm updateData={updateData} onRef={(child) => { chirldRef = child }}></WarpForm>
      </Modal>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, { id }) => (
        <span className={styles.operation}>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
    {
      title: 'Update',
      key: 'update',
      render: (text, record, { id }) => (
        <span className={styles.operation}>
          <Popconfirm title="Confirm to update?" onConfirm={updateHandler.bind(null, record)}>
            <a href="">Update</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Button className={styles.addBtn} type="primary" size="small" onClick={addHandler}>添加</Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
        />
        <AddModal></AddModal>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const userData = state.users;
  return {
    loading: state.loading.models.users,
    userData
  };
}

export default connect(mapStateToProps)(Users);
