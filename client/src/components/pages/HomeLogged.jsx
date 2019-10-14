import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Tabs, Tab } from "react-materialize";
import { withRouter } from "react-router-dom";
import ShowBid from "../pages/ShowBid";
import AllProducts from "../organisms/AllProducts";
import SearchBar from "../atoms/SearchBar";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
import RoutesService from "../../RoutesService";


class HomeLogged extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      searchProducts: props.products
    };
    this.router= new RoutesService;
  }

  componentDidMount() {
    this.router.getProducts()
    .then(response=> {
      this.setState({
        ...this.state,
        products: response
      })
    })
  }

  makeSearch(searchText) {
    console.log(this.props);
    const searchProductsResults = this.state.products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(this.state);

    this.setState({
      ...this.state,
      searchProducts: searchProductsResults
    });
  }
  change = () => {
    this.setState({
      ...this.state,
      products: this.props.products
    });
    console.log(this.state);
  };

  // changeStock(stockCheckbox) {
  //   this.setState({
  //     ...this.state,
  //     inStock: stockCheckbox
  //   });
  // }


  render() {
    if (!this.props.user.bid) {
      return (
        <div>
          {/* <h1>Hola, {this.props.user.username}</h1> */}
          <h1>
            Si te acabas de mudar o estás a punto de mudarte, podemos ayudarte
          </h1>
          <NavLink to={"/create-bid"}>
            <Button>Me voy a mudar</Button>
          </NavLink>
          <NavLink to={"/create-bid"}>Me acabo de mudar</NavLink>
        </div>
      );
    } else {
      if (this.props.products) {
        return (
          <React.Fragment>
            {/* <h1>Hola, {this.props.user.username}</h1> */}
            <Tabs className="tab-demo z-depth-1" options={{ swipeable: true }}>
              <Tab title="Tu mudanza" >
                   <ShowBid
                    // fromApp={() => this.fetchUser()}
                    user={this.props.user}
                  ></ShowBid>
              </Tab>
              <Tab title="Test 2" active className="red">
                Test 2
              </Tab>
            </Tabs>

{/*       
            <NavLink to={"/your-bid"}>
              <Button>Panel de control de mudanza</Button>
            </NavLink> */}

            <p>aqui va la search</p>
            <SearchBar
              updateSearch={searchText => this.makeSearch(searchText)}
              // updateInStock={stockCheckbox => this.changeStock(stockCheckbox)}
            />

            <button onClick={this.change}>cambiar</button>
            <Bidmapcontainer
              products={this.props.products}
              centerMap={this.props.centerMap}
            ></Bidmapcontainer>
         
         
            <AllProducts products={this.props.products}></AllProducts>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <h1>Loading...</h1>
          </React.Fragment>
        ); 
      }
    }
  }
}

export default withRouter(HomeLogged);
