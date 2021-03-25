import React, {Component} from 'react';
import io from '../../helpers/socket';
import {connect} from 'react-redux';
import {getUser} from '../../redux/actions/user';

class Root extends Component {
  getUser = async token => {
    await this.props.getUser(token);
  };
  async componentDidMount() {
    io.on(this.props.auth.user.id, () => {
      const {token} = this.props.auth;
      this.getUser(token);
    });
    // io.onAny(() => {
    //   const {id} = this.props.user.results;
    //   const {token} = this.props.auth;
    //   if (id) {
    //     io.once(id, msg => {
    //       this.getUser(token);
    //     });
    //   }
    // });
  }
  render() {
    return <>{this.props.children}</>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {getUser};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
