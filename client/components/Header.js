import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light" id="navigation">
        <div className="nav-options">
          <Link to="/" onClick={this.props.signOut}>
            Sign Out
          </Link>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
