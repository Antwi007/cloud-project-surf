import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, getAccountDetails, getSurfAccountDetails, removeSurfingAccount, putProfilePic } from '../actions';
import SurfingService  from '../apis/SurfingService';

const surfingObject = new SurfingService();

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '476309356496-jbc6p1ispb4614a3uvef5ppbha1td362.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = async (isSignedIn) => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();
      this.props.signIn(userId);
      const googleUserAccount = this.auth.currentUser.get().getBasicProfile()
      const accountDetails = {
        name: googleUserAccount.getName(),
        profilePic: googleUserAccount.getImageUrl(),
        email: googleUserAccount.getEmail(),
      }
      this.props.getAccountDetails(accountDetails);
      
      try {
        const surfAccount = await surfingObject.getSurfAccountDetails(userId);
        console.log("got account data", surfAccount);
        /* const favorites = await surfingObject.getFavorites(userId);
        console.log("got favorites", favorites)
        const accountData = {...surfAccount.data, favorites: favorites.data} 
        console.log("constructed accountData", accountData)
        this.props.getSurfAccountDetails(accountData);
        */
        this.props.getSurfAccountDetails(surfAccount.data);
        const profilePicUrl = await surfingObject.getProfilePic(userId);
        this.props.putProfilePic(profilePicUrl);
      }
      catch {
        console.log("creating new account")
        await surfingObject.createSurfingAccount(userId);
      }

    } else {
      console.log("signing out")
      this.props.signOut();
      this.props.removeSurfingAccount();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, getAccountDetails, getSurfAccountDetails, removeSurfingAccount, putProfilePic }
)(GoogleAuth);
