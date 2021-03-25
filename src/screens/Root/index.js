import React, {Component} from 'react';
import io from '../../helpers/socket';
import {connect} from 'react-redux';
import {getUser} from '../../redux/actions/user';
import {
  transactionHistory,
  transactionToday,
  totalTransaction,
} from '../../redux/actions/transaction';
import {showMessage} from '../../helpers/showMessage';

class Root extends Component {
  getUser = async token => {
    await this.props.getUser(token);
  };
  transactionHistory = async token => {
    await this.props.transactionHistory(token);
  };
  transactionToday = async token => {
    await this.props.transactionToday(token);
  };
  totalTransaction = async token => {
    await this.props.totalTransaction(token);
  };
  async componentDidMount() {
    io.on(this.props.auth.user.id, msg => {
      const {token} = this.props.auth;
      this.getUser(token);
      this.transactionHistory(token);
      this.transactionToday(token);
      this.totalTransaction(token);
      showMessage(
        'You Received a Transfer, Please Check your history',
        'success',
      );
    });
  }
  render() {
    return <>{this.props.children}</>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getUser,
  transactionHistory,
  transactionToday,
  totalTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
