import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FaBars } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
class HomeHeader extends Component {

    render() {


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
                                <div><b>Chuyên khoa</b></div>
                                <div className='subs-title'>Tìm bác sỹ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='subs-title'>Chọn bệnh viện, phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sỹ</b></div>
                                <div className='subs-title'>Chọn bác sỹ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='subs-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <BsFillQuestionCircleFill />
                                Hỗ trợ
                            </div>
                            <div className='flag'>
                                VN
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title1'>Nền tảng y tế</div>
                    <div className='title2'>Chăm sóc sức khỏe toàn diện</div>
                    <div className='search'>
                        <div className='ai'>
                            <AiOutlineSearch />
                        </div>

                        <input type='text' placeholder='Tim chuyen khoa kham benh'></input>
                    </div>
                    <div className='options'></div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
