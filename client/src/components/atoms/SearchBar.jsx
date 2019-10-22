import React, { Component } from 'react';
import { TextInput } from "react-materialize";
// const tags = [
//   { name: 'Cocina' },
//   { name: 'Salón' },
//   { name: 'Baño' },
//   { name: 'Deportes' },
//   { name: 'Dormitorio' },
//   { name: 'Estudio' },
//   { name: 'Niños' },
//   { name: 'Imagen y sonido' }
// ];

// filterTag= (tag) => {

// }


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
        {/* <div onClick={this.filterTag(cocina)}>cocina</div> */}
      </div>
    );
  }
}