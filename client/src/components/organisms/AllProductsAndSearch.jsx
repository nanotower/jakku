import React, { Component } from 'react'
import SearchBar from "../atoms/SearchBar";
import Bidmapcontainer from "../molecules/Bidmapcontainer";
import AllProducts from "../organisms/AllProducts";

export default class AllProductsAndSearch extends Component {
  constructor(props) {
    super(props)
    this.state= {
      products: props.products,
      searchProducts: props.products,
      
    }
  }


  makeSearch(searchText) {
    const searchProductsResults = this.state.products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    this.setState({
      ...this.state,
      searchProducts: searchProductsResults
    });
  }

  // changeStock(stockCheckbox) {
  //   this.setState({
  //     ...this.state,
  //     inStock: stockCheckbox
  //   });
  // }
  render() {
    return (
      <div className="container-all-search">
                <SearchBar
                  updateSearch={searchText => this.makeSearch(searchText)}
                  // updateInStock={stockCheckbox => this.changeStock(stockCheckbox)}
                />
                <h6>Selecciona un marcador del mapa para ver mudanzas disponibles</h6>
                <Bidmapcontainer
                  bids={this.props.bids}
                  centerMap={this.props.centerMap}
                ></Bidmapcontainer>
                <AllProducts products={this.state.searchProducts}></AllProducts>
              </div>
    )
  }
}
