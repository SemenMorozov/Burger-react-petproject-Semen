import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import MenuAdmin from './MenuAdmin'
import Burger from './Burger'
import sampleBurgers from '../sample-burgers'
import base from '../Base'

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  }

  state = {
    burgers: {},
    order: {},
  }

  componentDidMount() {
    // console.log('mount');
    const { params } = this.props.match

    const localStorageRef = localStorage.getItem(params.restaurantId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: 'burgers',
    })
  }

  componentDidUpdate() {
    const { params } = this.props.match
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addBurger = (burger) => {
    console.log('addBurger', burger)

    const burgers = { ...this.state.burgers }
    burgers['burger${Date.now()}'] = burger
    this.setState({ burgers })
  }

  updateBurger = (key, updatedBurger) => {
    const burgers = { ...this.state.burgers }
    burgers[key] = updatedBurger
    this.setState({ burgers })
  }

  deleteBurger = (key) => {
    const burgers = { ...this.state.burgers }
    burgers[key] = null
    this.setState({ burgers })
  }

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers })
  }

  addToOrder = (key) => {
    // 1. Copy state object
    const order = { ...this.state.order }
    // 2. Add key to order with value 1 or update
    order[key] = order[key] + 1 || 1
    // 3. Write new object in state
    this.setState({ order })
  }

  deleteFromOrder = (key) => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Very Hot burgers" />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}
                />
              )
            })}
          </ul>
        </div>
        <Order
          deleteFromOrder={this.deleteFromOrder}
          burgers={this.state.burgers}
          order={this.state.order}
        />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          burgers={this.state.burgers}
          updateBurger={this.updateBurger}
          deleteBurger={this.deleteBurger}
        />
      </div>
    )
  }
}

export default App
