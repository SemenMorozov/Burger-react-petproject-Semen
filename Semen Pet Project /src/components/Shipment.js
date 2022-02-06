import React from 'react'
import PropTypes from 'prop-types'

class Shipment extends React.Component {
  static propTypes={
    total: PropTypes.number
  }


    render() {
        const { total } = this.props;
        const shipping = total > 0 && total < 15 ? 2.5 : 'free';
        const shippingNeon =
          shipping === 'free' ? (
            <span className='font-effect-neon total_wrap-cheap'>{shipping} €</span>
          ) : (
            <span>{shipping} €</span>
          );

    return (
      <div className="total">
        <div className="total-wrap">
            <div>Shipment: {total>0? shippingNeon : null}</div>
            <div className='total-wrap-free'></div>
            {total < 15 ? `add to your order ${15-total} € for free delivery`: null}
          <div className="total_wrap final"> Total : {total} €</div>
        </div>
      </div>
    )
  }
}

export default Shipment;
