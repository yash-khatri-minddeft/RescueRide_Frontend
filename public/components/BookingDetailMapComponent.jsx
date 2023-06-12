import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import pendingIcon from './../../src/assets/images/pending-icon.gif'
import successIcon from './../../src/assets/images/success-icon.gif'
import BookingDetailCurrentLocation from './BookingDetailCurrentLocation';

export default function BookingDetailMapComponent({ bookingId }) {
  const [bookingDetails, setBookingDetails] = useState();
  const [hospitalDetails, setHospitalDetails] = useState();
  const [ambulanceDetails, setAmbulanceDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (bookingId) {
      axios.post('/api/controller/get-booking-by-id', {
        id: bookingId
      }).then(respose => {
        if (respose.data.success) {
          axios.post('/api/controller/get-hospital-by-id', {
            id: respose.data.data.hospitalid
          })
            .then(hospital => {
              setHospitalDetails(hospital.data.data)
            })
          if (respose.data.data.ambulance_number != 'null') {
            axios.post('/api/controller/get-ambulance-by-id', {
              id: respose.data.data.ambulance_number
            }).then(ambulance => {
              setAmbulanceDetails(ambulance.data.data)
            })
          }

          setBookingDetails(respose.data.data)
        }
        setIsLoading(false)
      })
    }
  }, [bookingId])
  return (
    <>
      {isLoading && <Loader opacity={1} />}
      <div className="booking-details">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="booking-details-card">
                {bookingDetails && hospitalDetails ?
                  <>
                    <div className="booking-card-top">
                      <h3 className='text-white'>Your Booking Id:</h3>
                      <h2 className='text-white mb-0'>{bookingDetails._id}</h2>
                    </div>
                    <div className="booking-card-bottom">
                      <div className="booking-card-bottom-left">
                        <h3 className='mb-3'>Your Location: </h3>
                        <div className='mb-2'>Latitude: {bookingDetails.user_latitude.toFixed(6)}</div>
                        <div>Longitude: {bookingDetails.user_longitude.toFixed(6)}</div>
                      </div>
                      <div className="booking-card-bottom-right">
                        <h3 className='mb-3'>Hospital Location: </h3>
                        <div className='mb-2'>Latitude: {hospitalDetails.latitude.toFixed(6)}</div>
                        <div>Longitude: {hospitalDetails.longitude.toFixed(6)}</div>
                      </div>
                    </div>
                    {bookingDetails.status != 'pending' && ambulanceDetails &&
                      <div className="booking-card-ambulance-details">
                        <h3 className='mb-3'>Ambulance Details:</h3>
                        <div className='mb-2'>Ambulance No: {ambulanceDetails.AmbulanceNumber}</div>
                        <div className='mb-2'>Ambulance Type: {ambulanceDetails.type}</div>
                        <div className='mb-2'>Driver Name: {ambulanceDetails.driverName}</div>
                        <div>Driver Phone No: <a href={`tel:${ambulanceDetails.driveNo}`}>{ambulanceDetails.driveNo}</a></div>
                      </div>
                    }
                    {bookingDetails.status != 'current' &&
                      <div className="booking-card-status text-center">
                        <h3 className='mb-3'>Booking Status: </h3>
                        <img src={bookingDetails.status == 'completed' ? successIcon : pendingIcon} className='img-fluid icon' alt="" />
                        <p className='m-0 mt-3' style={{ textTransform: 'capitalize' }}>{bookingDetails.status}</p>
                      </div>
                    }
                  </> :
                  <div className="booking-card-top">
                    <h3 className='text-white'>No booking Found for ID</h3>
                    <h2 className='text-white mb-0'>{bookingId}</h2>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {bookingDetails && hospitalDetails && ambulanceDetails && bookingDetails?.status != 'pending' &&
          <div className='booking-current-map'>
            <BookingDetailCurrentLocation
              bookingDetails={bookingDetails}
              ambulanceDetails={ambulanceDetails}
              setAmbulanceDetails={setAmbulanceDetails}
              hospitalDetails={hospitalDetails}
              userCoords={{ latitude: bookingDetails?.user_latitude, longitude: bookingDetails?.user_longitude }}
              ambulanceCoords={{ latitude: bookingDetails?.ambulance_latitude, longitude: bookingDetails?.ambulance_longitude }}
              hospitalCoords={{ latitude: hospitalDetails?.latitude, longitude: hospitalDetails?.longitude }}
              bookingStatus={bookingDetails.status}
            />
          </div>
        }
      </div>
    </>
  )
}
