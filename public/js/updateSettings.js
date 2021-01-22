import axios from 'axios'
import { showAlert } from './alerts'

export const updateSettings = async (data, type) => {
  // type is either password or data
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe'

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    })

    if ((res.data.status = 'success')) {
      showAlert('success', `${type.toUpperCase()} updated successfully`)
      window.setTimeout(() => {
        location.assign('/me')
      }, 500)
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
}
