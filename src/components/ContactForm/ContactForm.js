import { useState } from "react";
import "./ContactForm.css"
import { validate } from "react-email-validator";
import { ApiController } from "../../Api/api";

let limit = false;

function ContactForm() {

    const [yourName, setYourName] = useState("")
    const [yourEmail, setYourEmail] = useState("")
    const [yourPhone, setYourPhone] = useState("")
    const [yourMessage, setYourMessage] = useState("")
    const [sendMsgReturn, setSendMsgReturn] = useState("")

    const api = new ApiController()

    const success = <p className="success-msg">Message sent, we will contact you soon!</p>

    const sendMessage = () => {

        if(limit){
            setSendMsgReturn("Wait a moment...")
            setTimeout(()=>{limit = false},15000)
            return 
        }

        if (!yourEmail || !yourMessage) {
            setSendMsgReturn("Preencha todos os campos obrigatórios")
            return
        }

        if (!validate(yourEmail)) {
            setYourEmail("")
            setSendMsgReturn("Invalid email")
            return
        }


        api.sendMessageApi(yourName,yourEmail,yourMessage).then((res)=>{

            if(!res){
                setSendMsgReturn("Error sending your message, try again later")
                return
            }

            limit = true
            setSendMsgReturn(success)

        }).catch((err)=>{

        })

        setTimeout(() => {
            !sendMsgReturn && setSendMsgReturn("")
        }, 5000)

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
                                        <input value={yourName} onChange={(evt) => setYourName(evt?.target?.value)} className="input-field input-mobile" type="text" placeholder="type your name here..." />
                                    </div>
                                    <div className="input-box-contact">
                                        <span className="details">Email*</span>
                                        <input value={yourEmail} onChange={(evt) => setYourEmail(evt?.target?.value)} className="input-field input-mobile" type="text" placeholder="yourname@example.com" />
                                    </div>
                                    <div className="input-box-contact">
                                        <span className="details">Message*</span>
                                        <textarea value={yourMessage} onChange={(evt) => setYourMessage(evt?.target?.value)} className="input-field message" type="text" placeholder="type your messahe here..." />
                                    </div>
                                    <div className="send-msg-return">{sendMsgReturn}</div>
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

