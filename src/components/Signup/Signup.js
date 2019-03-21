import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AuthService from '../authentication/auth';


class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }

        this.auth = new AuthService();
    }


    componentWillMount(){
        if(this.auth.loggedIn())
            this.props.history.replace('/');
    }

    handleSignin = (event) => {
        event.preventDefault();
        this.auth.login(this.state.email,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
        console.log("Signin");
    }

    handleSignup = (event) => {
        event.preventDefault();
        this.auth.register(this.state.email,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
               console.log(res);
            })
            .catch(err =>{
                alert(err);
            })
        console.log("Signup");
    }


    handleChange =(e)=> {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    // componentWillMount(){
    //     if(this.Auth.loggedIn())
    //         this.props.history.replace('/');
    // }

    render() {
        return (
            <div className="container">
                 <Form onSubmit={this.handleSignin}>
                 <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="*****" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup inline>
                     <Button type="submit">Login</Button>
                     <Button onClick={this.handleSignup}>Register</Button>
                </FormGroup>
                </Form>
            </div>
        );
    }


}

export default Signup;