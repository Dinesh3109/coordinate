import React from 'react';
import '../App.css';
import '../style/grid.css';



export default class Getkey extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityKey: '',
      isKey: false,
      xml: ''
    }
    this.reset = this.reset.bind(this);

  }

  handleChange = (event) => {
    this.setState({
      city: event.target.value
    })
  }

 

  reset(props) {

    this.setState({
      city: '',
      isKey: false

    })
  }


  render() {
    return (
      <div>
        <div className="container">
          <div className="row">

            <div className="col span-3-of-3">
              <div className="textbox">
                <label> Enter the city name</label>
              </div>
            </div>
            <div className="col span-3-of-3">
              <input type="text" value={this.state.city}
                name="city"
                id="city"
                placeholder="Enter city name here..."
                onChange={this.handleChange}
                required></input>
            </div>
            <div className="row">

              <div className="col span-1-of-3">
                <button className="btn btn-full" onClick={() => { this.props.getTemp(this.state.city) }}>GET Weather</button>
              </div>
              <div className="col span-1-of-3">
                <button className="btn btn-full" onClick={this.reset}>Reset</button>
              </div>
            </div>
            {/* {(this.state.isKey) && 
                <div className="conatiner">
                    <div className="row">
                        <div>
                            <div className="col span-1-of-3">
                            <button className="btn btn-small" onClick={()=>{this.props.getTemperature(this.state.cityKey)}}>Today Weather</button>
                            </div>
                            <div className="col span-1-of-3">
                            <button className="btn btn-small" onClick={()=>{this.props.getForcast(this.state.cityKey)}}>Forcasting for 5 days</button>
                            </div>
                        </div>

                    </div>
                    
                </div>
            } */}
          </div>
        </div>
      </div>

    )
  }
}


