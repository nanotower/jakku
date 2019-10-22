import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { SideNav, SideNavItem, Button } from "react-materialize";
import Box from "../../img/box.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  logout=(e)=> {
    this.props.logMeOut(e)
    this.props.history.push('/')
    
  }
  signup =(e) => {
    this.props.history.push("/signup")
  }
  yourbid= () => {
    this.props.history.push("/your-bid")
  }
  yourPurchases = () => {
    this.props.history.push("/my-purchases")
  }

  // render() {

  //     if(this.props.user) {
  //       return (
  //         <nav>
  //           <NavLink to={"/"} className="jakku-logo"><img src="../../img/21eaecb818a8dd6c5286b5f66886d918.jpg" alt="Box image logo"/><h1>Jakku</h1> </NavLink>
  //            <ul>
  //              <li>
  //              <NavLink to={"/profile"} className="profile-container">{this.props.user.username}<img src={this.props.user.imgPath} alt="User profile image"/>
  //              </NavLink>
  //              </li>

  //              <li><div onClick={e=>this.logout(e)}>Logout</div></li>
  //              <li>menu</li>
  //            </ul>
  //         </nav>
  //       )
  //     }
  //     else {
  //       return (
  //         <nav>
  //         <NavLink to={"/"} className="jakku-logo"><img src={Box} alt="Box image logo"/><h1>Jakku</h1> </NavLink>

  //          <ul>
  //            <li>
  //            <NavLink to={"/login"} className="profile-container">Acceder
  //            </NavLink>
  //            </li>
  //            <li>menu</li>
  //          </ul>
  //       </nav>

  //       )

  //     }
  // }
  render() {
    if (this.props.user) {
      return (
        <React.Fragment>
          <nav>
            <div class="nav-wrapper">
            
              <NavLink to={"/"} className="brand-logo tracking-in-expand">
                <img src={Box} className="logo-img"/>
                Jakku
              </NavLink>
              
              <ul class="right hide-on-med-and-down">
                <li>
                  <a href="#" className="profile-container" >
                    {this.props.user.username}
                    <img className="profile-image"
                      src={this.props.user.imgPath}
                      alt="User profile image"
                    />

                  </a>
                </li>
              </ul>
              <div>
              <a href="#"  data-target="mobile-demo"   className="profile-container sidenav-trigger" >
                    {this.props.user.username}
                    <img className="profile-image"
                      src={this.props.user.imgPath}
                      alt="User profile image"
                    />

                  </a>

                {/* <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons" className="material-icons">menu</i>
              </a> */}

                  <SideNav
                    className="sidenav" id="mobile-demo"
                    trigger={<i class="material-icons"></i>}
                    options={{ closeOnClick: true }, {edge: 'right'}}
                  >
                    <SideNavItem
                      userView
                      user={{
                        background: `${this.props.user.imgPath}`,
                        image:
                          `${Box}`,
                        name: `${this.props.user.username}`
                      }}
                    />
                    <SideNavItem href="#!icon" icon="account_circle">
                      Tu perfil
                    </SideNavItem>
                    
                   
                    {/* <SideNavItem subheader></SideNavItem>
                    <SideNavItem subheader waves href="/your-bid"></SideNavItem> */}
                    <SideNavItem waves onClick={this.yourPurchases}>
                    Cajas compradas
                    </SideNavItem>
                    <SideNavItem waves onClick={this.yourbid}>
                    Tu mudanza
                    </SideNavItem>
                    <SideNavItem divider />
                    <SideNavItem waves onClick={this.logout}>
                      Salir
                    </SideNavItem>
                  </SideNav>
                </div> 
            </div>
            
             
          </nav>
          
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <nav>
          <div class="nav-wrapper">
          
            <NavLink to={"/"} className="brand-logo">
              <img src={Box} className="logo-img"/>
              Jakku
            </NavLink>
            
            <ul class="right hide-on-med-and-down">
              <li>
         <NavLink to={"/signin"}>Acceder</NavLink>
              </li>
            </ul>
            <div>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
                <SideNav
                  className="sidenav" id="mobile-demo"
                  trigger={<i class="material-icons"></i>}
                  options={{ closeOnClick: true }, {edge: 'right'}}
                >
                  <SideNavItem
                    userView
                    user={{
                      background: "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png",
                      image:
                        `${Box}`,
                      name: `Invitado`
                    }}
                  />
                  <SideNavItem href="#!icon" icon="account_circle" onClick={(e)=>this.signup(e)}>
                    Acceder 
                  </SideNavItem>
                  {/* <SideNavItem href="#!second">Second Link</SideNavItem>
                  <SideNavItem divider />
                  <SideNavItem subheader>Subheader</SideNavItem> */}
                </SideNav>
              </div> 
          </div>
          
           
        </nav>
        
      </React.Fragment>
     
      );
    }
  }
}
export default withRouter(Navbar);
