import React, { Component } from 'react';
import { TextInput } from "react-materialize";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <form>
          <div className="input-field col s6">
            <TextInput
              onChange={e => this.props.updateSearch(e.target.value)}
              type="text"
              name="search"
              id="search"
              label="Busca lo que necesites"
              className="input-search"
            />
          </div>
        </form>
        {/* <label htmlFor="search">Search</label> */}

        {/* <label>
          <input
            onChange={e => this.props.updateInStock(e.target.checked)}
            type="checkbox"
            name="in-stock"
            id="in-stock"
          />
          <span>Only show products in stock</span>
        </label> */}
        {/* <label htmlFor="in-stock">Only show products in stock</label> */}
      </div>
    );
  }
}