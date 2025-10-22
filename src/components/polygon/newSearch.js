import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from 'react-places-autocomplete';
 
export class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = async (address,placeId) => {
    console.log(address,"address");
   
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSelect(latLng))
      .catch(error => console.error('Error', error));

      const place = await geocodeByPlaceId(placeId);
      console.log(place[0],"place");
      this.props.gotRegion(place[0]?.formatted_address)
      const { long_name: postalCode = '' } =
        place[0].address_components.find(c => c.types.includes('postal_code')) || {};
        this.props.gotPostalCode(postalCode)
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{margin:"20px 0 15px",textAlign:"center" }} >
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'form-control',
              })}
            />
            <div className="autocomplete-dropdown-container" >
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer',textAlign:"start",backgroundColor:"blue",color:"white" }
                  : { backgroundColor: '#ffffff', cursor: 'pointer',textAlign:"start" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
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
    );
  }
}