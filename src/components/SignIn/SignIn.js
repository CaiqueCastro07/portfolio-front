import { useState } from "react";
import { Authorize } from "../../Api/api";
import "./SignIn.css"

function SignIn(props) {

    const [registerMode, setRegisterMode] = useState(false);
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [rPassword, setRPassword] = useState("")
    const [email, setEmail] = useState("")

    if (props?.logged) return (<></>);
    if (!props?.loginScreen) return (<></>);

    const authorize = new Authorize()

    const resetValues = () => {
        setUser("")
        setPassword("")
        setRPassword("")
        setEmail("")
    }

    const registerUser = () => {

        if (!user || !password || !rPassword || !email) {
            alert("Preencha todos os dados")
            return
        }

        authorize.registerUser(user, email, password).then((res) => {

            if (res?.status != 200) {
                console.log(res?.message)
                return false
            }

            console.log(res?.message)
            localStorage.setItem("login", res?.data)
            window.location.reload()

        })
            .catch((err) => {

            })

        resetValues()

    }

    const signIn = () => {

        if (!user || !password) {
            alert("Preencha todos os dados")
            return
        }

        authorize.login(user, password).then((res) => {

            if (res?.status != 200) {
                console.log(res?.message)
                return false
            }

            localStorage.setItem("login", res?.data)
            props.setLogged(res?.data)
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
                        <div onClick={() => props.setLoginScreen(false)} className="close-btn">close</div>
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
                                    <label className="password">Repeat password:</label>
                                    <input value={rPassword} onChange={(evt) => setRPassword(evt?.target?.value)} className="input-field-sign" type="password" placeholder="" />
                                </div>
                            </>)
                                :
                                (<>
                                    <div className="each-input">
                                        <label className="user">User:</label>
                                        <input value={user} onChange={(evt) => setUser(evt?.target?.value)} className="input-field" type="text" placeholder="" />
                                    </div>
                                    <div className="each-input">
                                        <label className="password">Password:</label>
                                        <input value={password} onChange={(evt) => setPassword(evt?.target?.value)} className="input-field" type="password" placeholder="" />
                                    </div>
                                </>)}

                        </div>
                        <div className="btn-sign-wrapper">
                            <div onClick={modeControl} className="signin-green-btn">{registerMode ? "Register" : "Sign In"}</div>
                            <div onClick={() => setRegisterMode(!registerMode)} className="register-grey-btn">{registerMode ? "Sign In" : "Register"}</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn;
