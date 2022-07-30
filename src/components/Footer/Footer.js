import "./Footer.css"

function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="container-footer">
                    <div className="footer-contact">
                       <div className="txt-wrp">
                        <b onClick={()=>window.open("https://www.linkedin.com/in/caique-d-148991220/", '_blank').focus()} className="help-text-footer">LinkedIn</b>
                        </div> 
                        <div className="txt-wrp"><b className="email-text-footer">caiquecastroaraujo@gmail.com</b></div>
                    </div>
                </div>
            </footer>
            <div className="green-bar-footer-l"></div>
            <div className="green-bar-footer-r"></div>
        </>
    )
}

export default Footer;
