import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Medical_facility from './Section/Medical_facility';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { set } from 'lodash';

class HomePage extends Component {

    // handleAfterChange = (index, dontAnimate)=>{
    //     console.log('Huynh check current slide: ', dontAnimate)
    // }
    render() {
        let { language } = this.props;
        let settings = {
            dots: false,
            infinite: false,//vô hạn
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // slickGoTo: this.handleAfterChange
        };
        return (

            <div>
                <HomeHeader isShowBanner={true} />
                {/* truyền cho nó một cái key */}
                <Specialty
                    settings={settings}
                />
                <Medical_facility
                    settings={settings}
                />
                <OutstandingDoctor
                    settings={settings}
                />

                <HandBook
                    settings={settings}
                />
                <About />
                <HomeFooter />

                <div style={{ height: '300px' }}></div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
