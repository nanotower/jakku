import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-materialize";
import RoutesService from "../../RoutesService";
import ModalLoginFirst from "../auth/ModalLoginFirst";
import ModalLogin from "../auth/ModalLogin";

import AllProductsAndSearch from "../organisms/AllProductsAndSearch";
import PreloaderSpinner from "../atoms/PreloaderSpinner";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: null,
      products: null,
    };
    this.router = new RoutesService();
  }

  componentDidMount() {
    this.router.getProducts().then(response => {
      let bids = response.map(product => product.bid);
      bids.forEach(bid =>
        bid.productsList.map(id =>
          response.filter(product => product._id === id)
        )
      );
      let bidsId = [];
      bids = bids.filter(bid => {
        if (bidsId.includes(bid._id)) {
          return false;
        } else {
          bidsId.push(bid._id);
          return true;
        }
      });
      this.setState({
        ...this.state,
        products: response,
        bids: bids,
        centerMap: this.props.centerMap
      });

    });
  }

  render() {
    return (
      <div className="home">
        <div className="title-container">
       
        <h1>
                Si te acabas de mudar<br></br>
                o estás a punto de mudarte,<br></br>
                podemos ayudarte
              </h1>
        <img src='bkg-img.svg' alt="background image"></img>

        </div >
       
        {/* <NavLink to={"/create-bid"}>Me voy a mudar</NavLink>
        <NavLink to={"/create-bid"}>Me acabo de mudar</NavLink> */}
        <Tabs className="tab-demo z-depth-1 tabs-fixed-width tab-container">
          <Tab title="Me voy a mudar" className="me-mudo">
            <div className="mudo-container">

              <h3>
              ¿Tienes demasiadas cosas y no vas a llevarlas a tu nuevo hogar?<br></br>
              Estás de enhorabuena.
            </h3>
            


          
            <p>
              Tenemos el escaparate perfecto para venderlo todo el día exacto
              que tú decidas.
            </p>

            </div>
          
            <main className="timeline">
              <ul>
                <li className="li-r">
                  <i class="medium material-icons">event_available</i>
                  <p className="number-r">1</p>
                  <h4>Fija el día</h4>
                  <p>
                    Decide cuando quieres vaciar tu vivienda. Te liberas de lo
                    que no necesitas justo cuando te mudas. Ni antes, ni
                    después.
                  </p>
                </li>
                <li className="li-l">
                  <i class="medium material-icons">camera_alt</i>
                  <p className="number-l">2</p>
                  <h4>Separa lo que no te vas a llevar</h4>
                  <p>Hazle fotos y descríbelo brevemente. Puedes una sola cosa en cada caja, como una mesa, o meter el salón completo. ¡En nuestras cajas cabe todo!</p>
                </li>
                <li className="li-r no3">
                  <i class="medium material-icons">euro_symbol</i>
                  <p className="number-3">3</p>
                  <h4>Ponles precio</h4>
                  <p>Desde 1 céntimo hasta lo que tú juzgues.</p>
                </li>

                <li className="li-l">
                  <i class="medium material-icons">thumb_up</i>
                  <p className="number-4">4</p>
                  <h4>Véndelo</h4>
                  <p>Los compradores irán a recogerlo el día acordado. Listo para tu mudanza.</p>
                </li>
              </ul>
            </main>
            <div className="create-bid-container">
              <div className="create-hover">
        <label className="label-crear">Crear mudanza</label>
        <ModalLoginFirst passText={"Tienes que identificarte para continuar"}></ModalLoginFirst>
        {/* <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a> */}
        </div>
        </div>
          </Tab>
          <Tab title="Me acabo de mudar" active>
            <div className="mudare-container">
          <div className="mudo-container mudoNext-container">
            <div className="section-title">
            <h3>
              ¿Te faltan cosas en tu nueva casa?
            </h3>
            <p>
              Búscalo. Seguro que alguien se está mudando y le sobra.
            </p>
            </div>
            <img className="sofa-icon" src='sofa-icon.svg' alt="sofa icon"></img>
            </div>
                       
            {this.state.products && this.state.bids && this.state.centerMap ? (
              <React.Fragment>  

                
               
               
                  <AllProductsAndSearch
                zoomMap={12}
                  bids={this.state.bids}
                  centerMap={this.props.centerMap}
                  products={this.props.products}
                  mapSize={[70,400]}
                ></AllProductsAndSearch>

                
               
               
              </React.Fragment>
            ) : (
              <PreloaderSpinner></PreloaderSpinner>
            )}
       
            </div>
          </Tab>
        </Tabs>
      
      </div>
    );
  }
}

export default withRouter(Home);
