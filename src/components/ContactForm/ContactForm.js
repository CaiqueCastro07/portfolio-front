import { useState } from "react";
import "./ContactForm.css"

function ContactForm() {

    const [yourName, setYourName] = useState("")
    const [yourEmail, setYourEmail] = useState("")
    const [yourPhone, setYourPhone] = useState("")
    const [yourMessage, setYourMessage] = useState("")

    const sendMessage = ()=>{
        setYourName("")
        setYourEmail("")
        setYourPhone("")
        setYourMessage("")
    }

    // to build

    return (
        <>
            <section className="cards contact-form" id="cards">
                <form className="container">
                    <div className="form__wrapper">
                        <div className="container-form">
                            <div className="green-sm-bar"></div>
                            <div className="picture">
                                <img src={require("../../assets/tatiana.png")} alt="" className="tatiana" />
                            </div>
                            <img src={require("../../assets/get-in-touch.png")} alt="" className="get-in-touch" />

                            <form className="contact-subform" action="#">
                                <div className="form-div">

                                    <div className="input-box-contact">
                                        <span className="details">Your Name</span>
                                        <input value={yourName} onChange={(evt)=>setYourName(evt?.target?.value)} className="input-field input-mobile" type="text" placeholder="type your name here..." />
                                    </div>
                                    <div className="input-box-contact">
                                        <span className="details">Email*</span>
                                        <input value={yourEmail} onChange={(evt)=>setYourEmail(evt?.target?.value)} className="input-field input-mobile" type="text" placeholder="example@example.com" />
                                    </div>
                                    <div className="input-box-contact">
                                        <span className="details">Telephone*</span>
                                        <input value={yourPhone} onChange={(evt)=>setYourPhone(evt?.target?.value)} className="input-field input-mobile" type="tel" placeholder="your telephone here..." />
                                    </div>
                                    <div className="input-box-contact">
                                        <span className="details">Message</span>
                                        <textarea value={yourMessage} onChange={(evt)=>setYourMessage(evt?.target?.value)} className="input-field message" type="text" placeholder="type what you want to say to us..." />
                                    </div>
                                    <div onClick={sendMessage} className="submit-form-btn">
                                        <img src={require("../../assets/send-now.png")} alt="" className="send-now" />
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ContactForm;

