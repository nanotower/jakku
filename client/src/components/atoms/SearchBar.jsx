import React, { Component } from 'react';
import { TextInput, Autocomplete, Icon } from "react-materialize";
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
    let searchObj={};
    this.props.products.forEach(product=> searchObj[product.name]= null)
    console.log(searchObj)

    
    // arr.forEach(x=> obj[x]=null)
    return (
      <div className="search-bar">
        <form>
          <div className="input-field col s6">
         

{/* 
            <TextInput
              // onChange={e => this.props.updateSearch(e.target.value)}
              // type="text"
              name="search"
              id="search"
              label="Busca lo que necesites"
              className="input-search"
            >
               </TextInput> */}
               <Autocomplete 
          onChange={e => this.props.updateSearch(e.target.value)}
          type="text"
          name="search"
          id="search"
          label="Busca lo que necesites"
          className="input-search"
          options={{data: searchObj}}
          placeholder="Busca lo que necesites"
          icon={<Icon>search</Icon>}/>
        
          </div>
        </form>
        {/* <div onClick={this.filterTag(cocina)}>cocina</div> */}
      </div>
    );
  }
}