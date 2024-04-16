import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import  './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    //khai báo chuẩn react
    constructor(props){
        super(props);
        //khởi tạo các biến muốn dùng trong state
        //this này có nghĩa là class
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetUserRedux();
    }

    componentDidUpdate(prevProps,prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUserRedux = (user) =>{
        this.props.deleteUserRedux(user.id);
    }

    handleEdituser = (user) =>{
        // console.log('Huynh check uesr edit: ', user)
        this.props.handleEdituserFromParentKey(user)
    }

    render() {
        // console.log('Huynh check all user by redux: ', this.props.listUsers)
        // console.log('Huynh check re - render state: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        
                        {arrUsers && arrUsers.length >0 &&
                            arrUsers.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button 
                                                className="btn-edit"
                                                onClick={() => this.handleEdituser(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteUserRedux(item)}
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
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin1.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
