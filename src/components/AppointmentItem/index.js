// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointment, staredColor} = props
  const {id, title, date, stared} = appointment

  const onClickStarColorChange = () => {
    staredColor(id)
  }

  const starImage = stared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <ul>
      <li className="eachAppointmentContainer">
        <div className="titleStarred">
          <p className="titleHeading">{title}</p>
          <button
            type="button"
            data-testid="star"
            className="starImage"
            onClick={onClickStarColorChange}
          >
            <img src={starImage} alt="star" />
          </button>
        </div>
        <p className="appointmentDateTime">
          Date:{format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </li>
    </ul>
  )
}

export default AppointmentItem
