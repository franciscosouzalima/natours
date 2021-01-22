import axios from 'axios'
import { showAlert } from './alerts'

var stripe = Stripe(
  'pk_test_51IBre8CbcVaB34NuvEfi0JDpEwJY04K4jJ7p6q7sb3ZNeESxVikztONX1JKNgZIbclWT2n4b1fbH8agnBQpnATpE00tWS8qm9t'
)

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    )
    console.log(session)
    //2) Create checkou form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
  } catch (err) {
    console.log(err)
    showAlert('error', err)
  }
}
