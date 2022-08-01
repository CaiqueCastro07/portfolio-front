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
                        <div onClick={()=>window.location.reload()} className="home-logo">
                        <img src={require("../../assets/home-logo.png")} alt="" className="home-img"  />
                        </div>
                        {props?.logged ? (<div className="signin-btn" onClick={logout}>logout</div>
                        ) : (<div onClick={() => props?.setLoginScreen(true)} className="signin-btn">login</div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
