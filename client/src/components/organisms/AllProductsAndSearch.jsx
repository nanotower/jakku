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
                
                {this.props.title? <p>{this.props.title}</p> 
                : <h6>Selecciona un marcador del mapa para ver mudanzas disponibles</h6>}
                <Bidmapcontainer
                  bids={this.props.bids}
                  centerMap={this.props.centerMap}
                  centerBid={this.props.centerBid}
                  zoomMap={this.props.zoomMap}
                  mapSize={this.props.mapSize}
                ></Bidmapcontainer>
                <SearchBar
                  products={this.state.searchProducts}
                  updateSearch={searchText => this.makeSearch(searchText)}
                  // updateInStock={stockCheckbox => this.changeStock(stockCheckbox)}
                />
                 <div className="card-container">
                <AllProducts products={this.state.searchProducts}></AllProducts>
                 </div>
              </div>
    )
  }
}
