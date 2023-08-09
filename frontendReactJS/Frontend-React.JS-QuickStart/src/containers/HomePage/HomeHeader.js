import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FaBars, FaRegHospital, FaTooth, FaBrain } from "react-icons/fa";
import { BsFillQuestionCircleFill, BsHospital } from "react-icons/bs";
import { AiOutlineSearch, AiFillMobile } from "react-icons/ai";
import { BiTestTube } from "react-icons/bi";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        console.log(this.props)

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='bar'>
                                <FaBars />
                            </div>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <BsFillQuestionCircleFill />

                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className='language-vi'>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className='language-en'>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <div className='ai'>
                                <AiOutlineSearch />
                            </div>

                            <input type='text' placeholder='Tim chuyen khoa kham benh'></input>
                        </div>
                    </div>

                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'> <div className='icon'><FaRegHospital /></div></div>
                                <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'> <div className='icon'><AiFillMobile /></div></div>
                                <div className='text-child'> <FormattedMessage id="banner.child2" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'> <div className='icon'><BsHospital /></div></div>
                                <div className='text-child'> <FormattedMessage id="banner.child3" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'> <div className='icon'><FaBrain /></div></div>
                                <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'> <div className='icon'><FaTooth /></div></div>
                                <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'> <div className='icon'><BiTestTube /></div></div>
                                <div className='text-child'> <FormattedMessage id="banner.child6" /> </div>
                            </div>
                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
