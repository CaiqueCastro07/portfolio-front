import "./Footer.css"

function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="container-footer">
                    <img src={require("../../assets/contact-footer.png")} alt="" className="contact-footer" />
                </div>
            </footer>
            <div className="green-bar-footer-l"></div>
            <div className="green-bar-footer-r"></div>
        </>
    )
}

export default Footer;
