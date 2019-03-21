import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FrontPage extends Component {
    state = {
        travelList: [],
        searchText: ''
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch('http://localhost:3001/travel', { method: 'GET' })
            .then(items => items.json().then(travel => this.setState({ travelList: travel })))
            .catch(err => console.log(err));
    }

    handleDelete = (id) => {
        fetch('http://localhost:3001/travel/' + id, { method: 'DELETE' })
            .then(result => result.json())
            .then(data => {
                return fetch(data.request.url, { method: 'GET' })
            })
            .then(response => response.json())
            .then(travels => this.setState({ travelList: travels }))
            .catch(err => alert(err.message));
    }

    handleSearchChange = (event) => {
        this.setState({ searchText: event.target.value }, () => {
            if (this.state.searchText) {
                const filter = this.state.travelList.filter(el => {
                    return el.city.toLowerCase().includes(this.state.searchText.toLowerCase()) || el.country.toLowerCase().includes(this.state.searchText.toLowerCase())
                });
                this.setState({ travelList: filter });
            } else {
                this.fetchData();
            }
        });

    }

    render() {
        const auth = true;
        let content =
            <div>
                <h2>Hello from FrontPage!</h2>
                <p>Click <Link to="/signup"> here</Link> to register/login</p>
            </div>

        let travelList = null;

        if (this.state.travelList.length > 0) {
            travelList = this.state.travelList.map(item => {
                return (
                    <tr key={item._id}>
                        <td>{item.city}</td>
                        <td>{item.country}</td>
                        <td>{item.description}</td>
                        <td>{item.rating}</td>
                        <td><a onClick={() => this.handleDelete(item._id)}>Delete</a></td>
                    </tr>
                );
            });
        }

        if (auth) {
            content = <div>
                <h2>Cities I want to visit</h2>
                <input type="text" className="form-control" placeholder="Search" onChange={this.handleSearchChange} value={this.state.searchText} />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Description</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelList}
                    </tbody>
                </table>
            </div>
        }

        return content;
    }
};

export default FrontPage;
