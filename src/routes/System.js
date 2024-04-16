import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import Header from '../containers/Header/Header';
import ManageDocTor from '../containers/System/Admin/ManageDocTor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import HomePage from '../containers/HomePage/HomePage';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/user-manage" component={UserManage} />
                            {/* <Route path="/system/product-manage" component={ProductManage} /> */}
                            <Route path="/system/manage-doctor" component={ManageDocTor} />

                            {/* đường link dẫn đến trang manage schedule với quyền bác sĩ và admin */}
                            <Route path="/doctor/manage-schedule" component={ManageDocTor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />


                            {/* Clinic */}
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />



                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
