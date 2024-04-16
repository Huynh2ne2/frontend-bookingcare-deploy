import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { CardText } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
    //khai báo chuẩn react
    constructor(props) {
        super(props);
        //khởi tạo các biến muốn dùng trong state
        //this này có nghĩa là class
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })

    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'})
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {

        // console.log('Click delete', user)
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage)
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = async (user) => {
        console.log('Check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        let res = await editUserService(user)
        try {
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }

        } catch (e) {
            console.log(e)
        }
        // console.log('Click save user: ', res)
    }
    render() {
        // console.log('check render' , this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                {/* properties: nested component: có thằng tha có thk con -> thk con muốn nhận được dữ liệu thì phải dùng biến props */}
                <div className="title text-center"> Manage users with Eric</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new users
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    // console.log('eric check map', item, index)
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
