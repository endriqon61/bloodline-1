import client from '../../lib/sanityConfig/client';
import {useState} from 'react'
import { motion } from 'framer-motion';
import { container, content } from '../../lib/motion/variants';
import getRequests from '../../custom-hooks/getRequests';
import styles from '../../styles/Home.module.css';

export default function Home() {
    const [bloodType, setBloodType] = useState('Karpoš')
    const [location, setLocation] = useState('A+')
    const [hospital, setHospital] = useState('Zan Mitrev')
    const [status, setStatus] = useState('active')
    const [requests] = getRequests(client)
  
    function handleSubmit(){
        client.create({
            _type: 'request',
            hospital: hospital,
            bloodType: bloodType,
            location: location,
            status: status
        }).then(res => console.log(res))
    }
    function handleStatus(id, status){
        //fetch single document here
        //every request has own id
        console.log("reqies",  requests?.[0]._id)
        client
        .patch(requests?.[1]._id || 'random id') // Document ID to patch
        .set({status: 'complete'}) // Shallow merge // Increment field by count
        .commit() // Perform the patch and return a promise
        .then((updatedRequest) => {
          console.log('Hurray, the request is updated! New document:')
          console.log(updatedRequest)
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message)
        })
    }

    return (
        <motion.div variants={container} initial='initial' animate='enter' exit='exit' >
            <div className={styles.main}>
                <div className="form-box">
                    <motion.h1 variants={content}>Manage your requests</motion.h1>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className='row justify-content-between' >
                                <div  className='col-md-5' style={{ margin: '3em 0' }}>
                                    <motion.h2> New Request </motion.h2>
                                    <motion.div variants={content} className="group">
                                        <label>Location</label>
                                        <select onChange={(e)=>setLocation(e.target.value)} name='location'>
                                            <option>Karpoš</option>
                                            <option>Centar</option>
                                        </select>
                                    </motion.div>
                                    <motion.div variants={content} className="group">
                                        <label>Blood Type*</label>
                                        <select onChange={(e)=>setBloodType(e.target.value)} name='bloodType'>
                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>AB+</option>
                                            <option>AB-</option>
                                            <option>0+</option>
                                            <option>0-</option>
                                        </select>
                                    </motion.div>
                                    <input onClick={handleSubmit} type="submit" className="button" value="Send Request" />
                                </div>
                                <div className='col-md-6' style={{ margin: '3em 0' }}>
                                    <motion.h2> Previous Requests </motion.h2>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Hospital
                                                </th>
                                                <th>
                                                    Blood Type
                                                </th>
                                                <th>
                                                    Location
                                                </th>
                                                <th>
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Zan Mitrev
                                                </td>
                                                <td>
                                                    A+
                                                </td>
                                                <td>
                                                    Skopje, Karpoš
                                                </td>
                                                <td>
                                                    <span style={{ background: 'green', color: 'white', borderRadius: '7px', padding: '.2em .5em', display: 'inline-block' }}>• Active</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Acibadem
                                                </td>
                                                <td>
                                                    0-
                                                </td>
                                                <td>
                                                    Skopje, Centar
                                                </td>
                                                <td>
                                                    <span style={{ background: 'darkred', color: 'white', borderRadius: '7px', padding: '.2em .5em', display: 'inline-block' }} >• Completed</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                </div>
            </div>
            <div className='footer'>
                <div className='links'>
                    <a href='mailto:bloodlinemacedonia@gmail.com'>Email Us</a>
                </div>
                <p> With <span style={{ color: '#DA3237' }}>&hearts;</span> from Bloodline Team </p>
            </div>

        </motion.div>
    );
}
