import { useState } from "react";
import { Authorize } from "../../Api/api";
import "./SignIn.css"

function SignIn(props) {

    const [registerMode, setRegisterMode] = useState(false);
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [rPassword, setRPassword] = useState("")
    const [email, setEmail] = useState("")
    const [returnedError,setReturnedError] = useState("")

    if (props?.logged) return (<></>);
    if (!props?.loginScreen) return (<></>);

    const authorize = new Authorize()

    const resetValues = (u,p,rp,e) => {
        !u && setUser("")
        !p && setPassword("")
        !rp && setRPassword("")
        !e && setEmail("")
    }

    const registerUser = () => {

        if (!user || !password || !rPassword || !email) {
            setReturnedError("Preencha todos os dados")
            return
        }

        if(password !== rPassword){
            setReturnedError("The passwods do not match")
            return
        }

        authorize.registerUser(user, email, password).then((res) => {

            if (res?.status != 200) {
                setReturnedError(res?.message || "Error")
                return false
            }

            console.log(res?.message)
            localStorage.setItem("login", res?.data)
            resetValues()
            window.location.reload()

        }).catch((err) => {

            })

        resetValues()

    }

    const signIn = () => {

        if (!user || !password) {
            setReturnedError("Preencha todos os dados")
            return
        }

        authorize.login(user, password).then((res) => {

            if (res?.status != 200) {
                setReturnedError(res?.message || "Error")
                return false
            }

            localStorage.setItem("login", res?.data)
            props.setLogged(res?.data)
            resetValues()
            window.location.reload()


        }).catch((err) => {

        })

        resetValues()

    }

    const modeControl = () => {

        if (registerMode) {
            registerUser()
            return
        }

        signIn()
    }


    return (
        <>
            <div className="unfocus-background"></div>
            <section className="signin">
                <div className="container">
                    <div className="signin__wrapper">
                        <div onClick={() => {props.setLoginScreen(false); setReturnedError("")}} className="close-btn">close</div>
                        <div className="signin-header">
                            <img src={require("../../assets/signin-animation.png")} alt="" className="signin-animation" />
                            <img src={require("../../assets/sign-in-text.png")} alt="" className="signin-text" />
                        </div>
                        <div className="signin-inputs">

                            {registerMode ? (<>
                                <div className="each-input">
                                    <label className="user">User:</label>
                                    <input value={user} onChange={(evt) => setUser(evt?.target?.value)} className="input-field-sign" type="text" placeholder="" />
                                </div>
                                <div className="each-input">
                                    <label className="user">Email:</label>
                                    <input value={email} onChange={(evt) => setEmail(evt?.target?.value)} className="input-field-sign" type="text" placeholder="" />
                                </div>
                                <div className="each-input">
                                    <label className="password">Password:</label>
                                    <input value={password} onChange={(evt) => setPassword(evt?.target?.value)} className="input-field-sign" type="password" placeholder="" />
                                </div>
                                <div className="each-input">
                                    <label className="password">Repeat the password:</label>
                                    <input value={rPassword} onChange={(evt) => setRPassword(evt?.target?.value)} className="input-field-sign" type="password" placeholder="" />
                                </div>
                            </>)
                                :
                                (<>
                                    <div className="each-input">
                                        <label className="user">User:</label>
                                        <input value={user} onChange={(evt) => setUser(evt?.target?.value)} className="input-field-sign" type="text" placeholder="" />
                                    </div>
                                    <div className="each-input">
                                        <label className="password">Password:</label>
                                        <input value={password} onChange={(evt) => setPassword(evt?.target?.value)} className="input-field-sign" type="password" placeholder="" />
                                    </div>
                                </>)
                                }
                                <div className="returned-error-signin">{returnedError}</div>
                        </div>
                        <div className="btn-sign-wrapper">
                            <div onClick={modeControl} className="signin-green-btn">{registerMode ? "Register" : "Sign In"}</div>
                            <div onClick={() => {setRegisterMode(!registerMode); setReturnedError("");resetValues()}} className="register-grey-btn">{registerMode ? "Sign In" : "Register"}</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn;
