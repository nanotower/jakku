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
      this.getProducts();

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
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);
    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);


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
              // if (this.state.loggedInUser.bid) {
              //   return (
              //     <div className="page">
              //       <h1>Ya tienes una subasta activa</h1>
              //       <p>Link al panel de control de tu mudanza</p>
              //     </div>
              //   );
              // } else {
                return (
                  <div className="page page-create-bid">
                    <CreateBid
                      fromApp={newValue => this.changeStateBid(newValue)}
                      user={this.state.loggedInUser}
                    ></CreateBid>
                  </div>
                );
              // }
            }}
          />
          <Route
            exact
            path="/create-product"
            render={() => {
              console.log("llama create product", this.state.loggedInUser);

              return (
                <div className="page page-create-product">
                  <CreateProduct
                    user={this.state.loggedInUser}
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
              
              return (
                <div className="page page-mybid">
                  <ShowMyBid
                    fromApp={() => this.fetchUser()}
                    user={this.state.loggedInUser}
                    products={this.state.loggedInUser.products}
                  ></ShowMyBid>
                </div>
              );
            }}
          />
          <Route
            path="/bid/:id"
            render={props => {
              return (
                <div className="page page-bid-id">
      
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
                <div className="page page-product-id">
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
                <div className="page page-myproduct-id">
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
             
              let productsOwned = this.state.products.filter(product =>{
                return  product.buyer?  product.buyer == this.state.loggedInUser._id 
                : false
              });
              return (
                <div className="page page-purchases">
                  <ShowMyPurchases
                
                    fromApp={() => this.fetchUser()}
                    user={this.state.loggedInUser}
                    products={productsOwned}
                  ></ShowMyPurchases>
                </div>
              );
            }}
          />
        </Switch>
        </div>
        {/* <FooterBar></FooterBar> */}
      </div>
    ) :
    
    
    
    
    
    
    
    (
        <div className="render-nologin">
        <div className="body-render-nologin">
        <Navbar className="nav-logged" logMeOut={this.logout} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                  <div className="page page-home-not-logged">
                  <Home
                    productsFromApp={() => {
                      this.getProducts();
                    }}
                    centerMap={this.state.position}
                    products={this.state.products}
                  ></Home>
                </div>
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={() => {
              return (
                <div className="page page-singup">
                <Auth></Auth>
               
                </div>
              );
            }}
          />
          <Route
            exact
            path="/create-bid"
            render={() => {
              return (
                <div className="page page-create-notlog">
               <Auth></Auth>
                </div>
              );
            }}
          />
          <Route
            exact
            path="/create-product"
            render={() => {
              return (
                <div className="page page-create-notlog">
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
                </div>
              );
            }}
          />
             <Route
            path="/product/:id"
            render={props => {
              return (
                <div className="page page-product-id">
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
        </Switch>
        </div>
        {/* <FooterBar></FooterBar> */}
        </div>
     
    );
  }
}
