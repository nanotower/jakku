import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

import { withRouter } from 'react-router-dom'
import AllProducts from '../organisms/AllProducts';
import SearchBar from '../atoms/SearchBar';

 class HomeLogged extends Component {
   constructor(props){
     super(props)
     this.state= {
      products: props.products,
      searchProducts: props.products,
     }
   }



  // componentDidMount() {
  //   this.props.productsFromApp();
  // }
  makeSearch(searchText) {
    console.log(this.props)
    const searchProductsResults = this.state.products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(this.state)

    this.setState({
      ...this.state,
      searchProducts: searchProductsResults
    });
  }
  change =() =>{
    this.setState({
      ...this.state,
      products: this.props.products
    })
    console.log(this.state)
  }
   
  

  // changeStock(stockCheckbox) {
  //   this.setState({
  //     ...this.state,
  //     inStock: stockCheckbox
  //   });
  // }

  render() {
    if(!this.props.user.bid) {
      return (
        <div>
          <h1>Hola, {this.props.user.username}</h1>
        <h1>Si te acabas de mudar o estás a punto de mudarte, podemos ayudarte</h1>
        <NavLink to={"/create-bid"}>Me voy a mudar</NavLink>
        <NavLink to={"/create-bid"}>Me acabo de mudar</NavLink>
      </div>

      )
    }
    else {
      if(this.props.products) {
        return (
          <React.Fragment>
            <h1>Hola, {this.props.user.username}</h1>
            <a>campo de busqueda</a>
            <NavLink to={"/your-bid"}>Panel de control de mudanza</NavLink>
            
          <p>aqui va la search</p>
          <SearchBar
          updateSearch={searchText => this.makeSearch(searchText)}
          // updateInStock={stockCheckbox => this.changeStock(stockCheckbox)}
        />

          <button onClick={this.change}>cambiar</button>
            <AllProducts products={this.props.products}></AllProducts>
  
          </React.Fragment>  
          )
      }
      else {
      return (
        <React.Fragment>
        <h1>Loading...</h1>
        </React.Fragment>
      )
      }

    
    }  
  }
}

export default withRouter(HomeLogged)
