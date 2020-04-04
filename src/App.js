import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import logo from "./logo.svg";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    console.log(user);

    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Titip</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Form inline>
            {user ? (
              <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Welcome, {user.displayName} 
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            ) : (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
          </Form>
        </Navbar>
        <Container>
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
