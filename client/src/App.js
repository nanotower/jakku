import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
// import "./stylesheets/style.scss";

import GoogleAuth from "./components/auth/GoogleAuth";
import AuthService from "./components/auth/Authservice";
import RoutesService from "./RoutesService";

import Home from "./components/pages/Home";
import HomeLogged from "./components/pages/HomeLogged";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreateBid from "./components/organisms/CreateBid";
import CreateProduct from "./components/organisms/CreateProduct";
import ShowBid from "./components/pages/ShowBid";
import Navbar from "./components/organisms/Navbar";
import ShowMyProduct from "./components/pages/ShowMyProduct";
import ShowProduct from "./components/pages/ShowProduct";


export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedInUser: null,
      bid: null,
      product: null,
      products: null,
      position: {lat: 40.3923071, lng: -3.6996187}
      
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
    console.log("logout done")
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
          loggedInUser: response,
          products: []
        });
        console.log("fetch/////", this.state);
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
    return this.router.getProduct(id)
    .then(response=> {

      this.setState({
        ...this.state,
        product: response,
      })
      console.log("vuelta de productid", this.state)
    })
    .catch(error=> console.log(error))
    
  }
  buyProduct(id) {
    return this.router.buyProduct(id)
    .then(response=> {
      this.setState({
        ...this.state,
        product: response
      })
      console.log("vuelta de compra producto", this.state)
    })
  }
  getProducts() {
    return this.router.getProducts()
    .then(response=> {
      response.sort((a, b) => Math.random() - 0.5);      
      this.setState({
        ...this.state,
        products: response
      })
      console.log("carga productos en state app", this.state)

    }
      )
  }
  shuffleProducts () {
    const shuffled= [...this.props.products].sort((a, b) => Math.random() - 0.5);
    this.setState({
      ...this.state,
      products: shuffled
    })
  console.log("logged props", this.props)

  }
  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(
                   {
                        ...this.state,
                        position :{lat: position.coords.latitude, lng: position.coords.longitude}
                    }
                )
            }
        )
    } 
}
  

  


  render() {
    return this.state.loggedInUser ? (
      
      <React.Fragment>
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
              console.log("antes de montar", this.state)
              return (
                <React.Fragment>
        
                  <HomeLogged user={this.state.loggedInUser}
                   productsFromApp={()=>{this.getProducts()}}
                   centerMap={this.state.position}
                    products={this.state.products}></HomeLogged>
                   
                </React.Fragment>
              );
            }}
          />
          <Route
            exact
            path="/create-bid"
            render={() => {
              if (this.state.loggedInUser.bid) {
                return (
                  <React.Fragment>
                
                    <h1>Ya tienes una subasta activa</h1>
                    <p>Link al panel de control de tu mudanza</p>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment>
          
                    estas log
                    <CreateBid
                      fromApp={newValue => this.changeStateBid(newValue)}
                    ></CreateBid>
                  </React.Fragment>
                );
              }
            }}
          />
          <Route
            exact
            path="/create-product"
            render={() => {
              console.log("llama create product" , this.state.loggedInUser)
          
                return (
                  <React.Fragment>
          
                    <CreateProduct 
                    fromApp={()=>this.fetchUser()}
                    fromAppRefreshProducts={()=>this.getProducts()} 
                    bid={this.state.loggedInUser.bid? this.state.loggedInUser.bid._id : null}>
                      
                    </CreateProduct>
                  </React.Fragment>
                ) 
            }}
          />
          <Route
            exact
            path="/your-bid"
            render={() => {
              return (
                <React.Fragment>
      
                  <ShowBid
                    fromApp={() => this.fetchUser()}
                    user={this.state.loggedInUser}
                  ></ShowBid>
                </React.Fragment>
              );
            }}
          />
   
          <Route
            path="/product/:id"
            render={(props) => {            
              return (
                <React.Fragment>
           
                 
                  <ShowProduct 
                  productFromApp={()=>this.getProduct(props.match.params.id)} product={this.state.product}
                  fromApp={() => this.fetchUser()} userId={this.state.loggedInUser._id} buyFromApp={(id)=>this.buyProduct(id)}
                  centerMap={this.state.position}>
                  
                  </ShowProduct>
                </React.Fragment>
              );
            }}
          />

          <Route
            path="/my-product/:id"
            render={(props) => {
              let chosenProduct = props.match.params.id;
              return (
                <React.Fragment>
          
                 
                  <ShowMyProduct productId={chosenProduct} fromApp={() => this.fetchUser()} user={this.state.loggedInUser} product={null}></ShowMyProduct>
                </React.Fragment>
              );
            }}
          />
        </Switch>
      </React.Fragment>
    ) :
    
    
    
    
    
    
    
    
    
    
    
    (
      <React.Fragment>
          <Navbar
            className="nav-logged"
            logMeOut={this.logout}
          />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <React.Fragment>
                  <Home></Home>
                </React.Fragment>
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={() => {
              return (
                <React.Fragment>
                  <Login getUser={this.getUser}></Login>
                  <Signup getUser={this.getUser}></Signup>
                  <GoogleAuth getUser={this.getUser}></GoogleAuth>
                  <a href="http://localhost:3010/auth/google">
                    Sign In with Google
                  </a>
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
                  <h1>
                    Tienes que estar registrado para poder crear tu mudanza
                  </h1>
                  <Login getUser={this.getUser}></Login>
                  <Signup getUser={this.getUser}></Signup>
                  <GoogleAuth getUser={this.getUser}></GoogleAuth>
                  <a href="http://localhost:3010/auth/google">
                    Sign In with Google
                  </a>
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3010/auth/google"
                  ></Button>
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
