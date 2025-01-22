import React, { Component } from 'react'


import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from '../components/Home';
import Board from '../components/Board';
import Bot from '../components/Bot';
import MissionImpossible from "../components/MissionImpossible"
import ReactTutorial from "../components/ReactTutorial"
import { Container } from 'react-bootstrap';


export default class Routes extends Component {
    render() {
        return (
            <Container>

                <Router>
                    <Switch>
                        <Route exact path="/" component={Board} />
                        <Route exact path="/easy" component={Bot} />
                        <Route exact path="/hard" component={MissionImpossible} />
                        <Route exact path="/tutorial" component={ReactTutorial} />
                    </Switch>
                </Router >
                <Home />
            </Container >
        );
    }
}
