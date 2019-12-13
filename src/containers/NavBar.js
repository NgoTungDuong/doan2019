import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBContainer } from 'mdbreact';

export default class NavBar extends React.Component {
    state = {
        collapseID: ""
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render () {
        const overlay = (
            <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
        );
        return (
            <div>
                <Router>
                    <div>
                        <MDBNavbar dark expand="md" fixed="top" style={{backgroundColor: "#563e91"}}>
                            <MDBContainer>
                                <MDBNavbarBrand>
                                    <a className="white-text" href='/'><strong>Chứng Thực Công Chứng</strong></a>
                                </MDBNavbarBrand>
                                <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
                                <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
                                    <MDBNavbarNav right>
                                        <MDBNavItem>
                                                {/* <a className="btn btn-secondary btn-sm" href='/create-file'><strong>Đăng Nhập</strong></a> */}
                                            <p>{this.props.account}</p>
                                        </MDBNavItem>
                                    </MDBNavbarNav>
                                </MDBCollapse>
                            </MDBContainer>
                        </MDBNavbar>
                        {this.state.collapseID && overlay}
                    </div>
                </Router>
            </div>
        )
    }
}

