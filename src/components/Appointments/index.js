// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const initialAppointments = []

class Appointments extends Component {
  state = {
    appointments: initialAppointments,
    title: '',
    date: '',
    filtered: false,
  }

  addAppointment = e => {
    e.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      stared: false,
    }

    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      title: '',
      date: '',
    }))
  }

  changeTitle = e => {
    this.setState({title: e.target.value})
  }

  changeDate = e => {
    this.setState({date: e.target.value})
  }

  stared = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(each => {
        if (each.id === id) {
          return {...each, stared: !each.stared}
        }
        return each
      }),
    }))
  }

  filterStaredAppointments = () => {
    this.setState(prevState => ({...prevState, filtered: !prevState.filtered}))
  }

  render() {
    const {appointments, title, date, filtered} = this.state

    const starColor = filtered ? 'starColor' : ''

    console.log(filtered)

    let FilteredAppointments = appointments
    if (filtered === true) {
      FilteredAppointments = appointments.filter(each => each.stared === true)
    }

    return (
      <div className="mainContainer">
        <div className="subContainer">
          <div className="upperContainer">
            <div className="inputContainer">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.addAppointment}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <br className="lineBreaker" />
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  className="title"
                  onChange={this.changeTitle}
                  value={title}
                />
                <br className="lineBreaker" />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <br className="lineBreaker" />
                <input
                  type="date"
                  id="date"
                  className="date"
                  onChange={this.changeDate}
                  value={date}
                />
                <br className="lineBreaker" />
                <button type="submit" className="submitButton">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointmentImage"
            />
          </div>
          <hr className="lineSeparator" />
          <div className="lowerContainer">
            <div className="appointments">
              <h1 className="heading2">Appointments</h1>
              <button
                type="button"
                className={`${starColor} starredButton`}
                onClick={this.filterStaredAppointments}
              >
                Starred
              </button>
            </div>
            <div>
              <div className="appointmentContainer">
                {FilteredAppointments.map(each => (
                  <AppointmentItem
                    appointment={each}
                    staredColor={this.stared}
                    key={each.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
