import React, { Component } from 'react';


class CityForm extends Component {
    state = {
        city: '',
        country: '',
        description: '',
        rating: null
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = { ...this.state }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.state.city && this.state.country) {
            fetch('http://localhost:3001/travel', { method: 'POST', headers: headers, body: JSON.stringify(data) })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else {
            alert('Please fill in all required fields');
        }
        console.log(data);
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }


    render() {
        return (
            <div className="container">
                <h1>New City</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text" className="form-control" id="cityName" placeholder="Enter city name" name="city" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Country</label>
                        <input type="text" className="form-control" id="countryName" placeholder="Enter country name" name="country" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description</label>
                        <input type="text" className="form-control" id="description" placeholder="Write description" name="description" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Score</label>
                        <input type="int" className="form-control" id="score" placeholder="Score" name="rating" onChange={this.handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-success mr-5">Save city</button>
                </form>
            </div>
        );
    }


}

export default CityForm;