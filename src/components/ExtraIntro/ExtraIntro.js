import "./ExtraIntro.css"
import Responsive from "./Slider/Slider";

function ExtraIntro() {

    return (
        <>
            <section className="cards extra-info" id="cards">
                <form className="container">
                    <div className="extraintro__wrapper">
                        <div className="extraintro__card card">
                    
                            <div className="extraintro-slider">
                                <div className="slider-component">
                                    <Responsive></Responsive>
                                </div>
                            </div>
                            <div className="extraintro-bg">
                            <img src={require("../../assets/goodthings-txt.png")} alt="" className="goodthings-txt" />
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ExtraIntro;

