import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';
import { CustomBreadcrumb } from '../component'
import './style.less';

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (newCard) => {
            const action = {
                type: `${namespace}/addNewCard`,
                payload: newCard,
            };
            dispatch(action);
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)

class Main extends Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb />
                <div className="container">
                    这首页
                </div>
            </div>
        );
    }
}
export default Main
