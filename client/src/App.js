import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


import GoogleAuth from "./components/auth/GoogleAuth";
import AuthService from "./components/auth/Authservice";
import RoutesService from "./RoutesService";

import Home from "./components/pages/Home";
import HomeLogged from "./components/pages/HomeLogged";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreateBid from "./components/organisms/CreateBid";
import CreateProduct from "./components/organisms/CreateProduct";
import ShowMyBid from "./components/pages/ShowMyBid";
import ShowBid from "./components/pages/ShowBid";
import Navbar from "./components/organisms/Navbar";
import ShowMyProduct from "./components/pages/ShowMyProduct";
import ShowMyPurchases from "./components/pages/ShowMyPurchases";
import ShowProduct from "./components/pages/ShowProduct";
import './styles/main.scss'
import Auth from "./components/auth/Auth";
import FooterBar from "./components/organisms/FooterBar";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedInUser: null,
      bid: null,
      product: null,
      products: null,
      position: { lat: 40.3923071, lng: -3.6996187 }
    };
    this.service = new AuthService();
    this.router = new RoutesService();
    this.fetchUser();
    this.getProducts();
    this.getGeoLocation();
  }

  getUser = userObj => {
    this.setState({
      ...this.state,
      loggedInUser: userObj
    });
  };

  logout = () => {
    console.log("logout done");
    this.service.logout().then(() => {
      this.setState({
        ...this.state,
        loggedInUser: null
      });
    });
  };

  fetchUser = () => {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          ...this.state,
          loggedInUser: response
        }, console.log("fetch/////", this.state));
        
      })
      .catch(error => {
        this.setState({
          ...this.state,
          loggedInUser: false
        });
      });
  };
  changeStateBid(newValue) {
    // const { from, to, deadLine } = newValue;
    // this.setState({
    //   ...this.state,
    //   bid: {
    //     from: from,
    //     to: to,
    //     deadLine: deadLine
    //   },
    //   nobid: "xxxxxxxx"
    // });
    this.fetchUser();
    console.log(newValue);
    console.log("bid actualizada", this.state);
  }

  getProduct(id) {
    return this.router
      .getProduct(id)
      .then(response => {
        this.setState({
          ...this.state,
          product: response
        });
        console.log("vuelta de productid", this.state);
      })
      .catch(error => console.log(error));
  }
  buyProduct(id) {
    return this.router.buyProduct(id).then(response => {
      this.setState({
        ...this.state,
        product: response
      });

    });
  }
  getProducts() {
    return this.router.getProducts().then(response => {
      response.sort((a, b) => Math.random() - 0.5);
      this.setState({
        ...this.state,
        products: response
      });

    });
  }
  shuffleProducts() {
    const shuffled = [...this.props.products].sort(
      (a, b) => Math.random() - 0.5
    );
    this.setState({
      ...this.state,
      products: shuffled
    });
    console.log("logged props", this.props);
  }
  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          ...this.state,
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };

  render() {
    return this.state.loggedInUser ? (
      <div className="render-login">
        <div className="body-render-login">
        <Navbar
          className="nav-logged"
          user={this.state.loggedInUser}
          logMeOut={this.logout}
        />
        
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div className="page">
                  <HomeLogged
                    user={this.state.loggedInUser}
                    productsFromApp={() => {
                      this.getProducts();
                    }}
                    centerMap={this.state.position}
                    products={this.state.products}
                    // bids={this.state.bids}
                  ></HomeLogged>
                </div>
              );
            }}
          />
          <Route
            exact
            path="/create-bid"
            render={() => {
              if (this.state.loggedInUser.bid) {
                return (
                  <div className="page">
                    <h1>Ya tienes una subasta activa</h1>
                    <p>Link al panel de control de tu mudanza</p>
                  </div>
                );
              } else {
                return (
                  <div className="page">
                    <CreateBid
                      fromApp={newValue => this.changeStateBid(newValue)}
                    ></CreateBid>
                  </div>
                );
              }
            }}
          />
          <Route
            exact
            path="/create-product"
            render={() => {
              console.log("llama create product", this.state.loggedInUser);

              return (
                <div className="page">
                  <CreateProduct
                    fromApp={() => this.fetchUser()}
                    fromAppRefreshProducts={() => this.getProducts()}
                    bid={
                      this.state.loggedInUser.bid
                        ? this.state.loggedInUser.bid._id
                        : null
                    }
                  ></CreateProduct>
                </div>
              );
            }}
          />
          <Route
            exact
            path="/your-bid"
            render={() => {
              console.log("antes de montar", this.state);
              return (
                <div className="page">
                  <ShowMyBid
                    fromApp={() => this.fetchUser()}
                    user={this.state.loggedInUser}
                    product={this.state.products}
                  ></ShowMyBid>
                </div>
              );
            }}
          />
          <Route
            path="/bid/:id"
            render={props => {
              return (
                <div className="page">
      
                  <ShowBid
                    // BidFromApp={() => this.GetBid()}
                    id={props.match.params.id}
                    user={this.state.loggedInUser}
                    centerMap={this.state.position}
                  ></ShowBid>
                </div>
              );
            }}
          />

          <Route
            path="/product/:id"
            render={props => {
              return (
                <div className="page">
                  <ShowProduct
                    productFromApp={() =>
                      this.getProduct(props.match.params.id)
                    }
                    product={this.state.product}
                    fromApp={() => this.fetchUser()}
                    userId={this.state.loggedInUser._id}
                    buyFromApp={id => this.buyProduct(id)}
                    centerMap={this.state.position}
                  ></ShowProduct>
                </div>
              );
            }}
          />

          <Route
            path="/my-product/:id"
            render={props => {
              let chosenProduct = props.match.params.id;
              return (
                <div className="page">
                  <ShowMyProduct
                    productId={chosenProduct}
                    fromApp={() => this.fetchUser()}
                    user={this.state.loggedInUser}
                    product={null}
                  ></ShowMyProduct>
                </div>
              );
            }}
          />
          <Route
            exact
            path="/my-purchases"
            render={props => {
              return (
                <div className="page">
                  <ShowMyPurchases
                
                    // fromApp={() => this.fetchUser()}
                    user={this.state.loggedInUser}
                    products={this.state.products}
                  ></ShowMyPurchases>
                </div>
              );
            }}
          />
        </Switch>
        </div>
        <FooterBar></FooterBar>
      </div>
    ) :
    
    
    
    
    
    
    
    (
      <React.Fragment>
        <Navbar className="nav-logged" logMeOut={this.logout} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
         
                  <Home
                    productsFromApp={() => {
                      this.getProducts();
                    }}
                    centerMap={this.state.position}
                    products={this.state.products}
                  ></Home>
     
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={() => {
              return (
                <React.Fragment>
                <Auth></Auth>
               
                </React.Fragment>
              );
            }}
          />
          <Route
            exact
            path="/create-bid"
            render={() => {
              return (
                <React.Fragment>
               <Auth></Auth>
                </React.Fragment>
              );
            }}
          />
          <Route
            exact
            path="/create-product"
            render={() => {
              return (
                <React.Fragment>
                  <h1>
                    Tienes que estar registrado y tener una mudanza activa para
                    poder crear cajas con productos{" "}
                  </h1>
                  <Login getUser={this.getUser}></Login>
                  <Signup getUser={this.getUser}></Signup>
                  <GoogleAuth getUser={this.getUser}></GoogleAuth>
                  <a href="http://localhost:3010/auth/google">
                    Sign In with Google
                  </a>
                  <Button variant="contained" color="primary"></Button>
                </React.Fragment>
              );
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
