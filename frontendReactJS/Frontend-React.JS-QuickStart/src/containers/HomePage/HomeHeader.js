import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FaBars } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
class HomeHeader extends Component {

    render() {


        return (
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
