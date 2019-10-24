import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      lat: null,
      lng: null
    };
  }

  handleChange = address => {
    this.setState({ ...this.state, address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0]).then(googleLatLng => {
          this.setState({
            ...this.state,
            address: results[0].formatted_address,
            lat: googleLatLng.lat,
            lng: googleLatLng.lng
          });
          this.changeValue()
        });
      })
      // .then(latLng => console.log('Success', latLng))
      .catch(error => console.error("Error", error));
  };
  changeValue() {
    this.props.changeState(this.state)
  };

  render() {
    return (
      <div className="input-location-container">
        {/* xxxx{this.state.address}xxxx
        xxxx{this.state.lat}xxxx
        xxxx{this.state.lng}xxxx */}
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div className="input-location">
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
