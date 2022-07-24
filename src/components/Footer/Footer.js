import "./Footer.css"

function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="container-footer">
                    <div className="footer-contact">
                       <div className="txt-wrp"><b className="help-text-footer">Need Help?</b></div> 
                        <div className="txt-wrp"><b className="email-text-footer">coopers@coopers.pro</b></div>
                        <div className="txt-wrp"><b className="reserve-text-footer">© 2022 Coopers. All rights reserved.</b></div>
                    </div>
                </div>
            </footer>
            <div className="green-bar-footer-l"></div>
            <div className="green-bar-footer-r"></div>
        </>
    )
}

export default Footer;
