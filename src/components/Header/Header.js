import "./Header.css"

function Header(props) {

    const logout = () => {
        localStorage.removeItem("login")
        props.setLogged(false)
        props.setLoginScreen(false)
        window.location.reload()
    }

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <img src={require("../../assets/home-logo.png")} alt="" className="home-logo" />
                        {props?.logged ? (<img onClick={logout} src={require("../../assets/signout-btn.png")} alt="" className="signin-btn" />
                        ) : (<img onClick={() => props?.setLoginScreen(true)} src={require("../../assets/signin-btn.png")} alt="" className="signin-btn" />
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
