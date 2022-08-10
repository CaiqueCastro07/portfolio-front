import "./Intro.css"

function Intro(props) {

    const scrollToList = ()=>{
        props?.todoPlace?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }

    return (
        <>
            <section className="intro" id="intro">
                <div className="container">
                    <div className="intro__wrapper">
                       
                        <div className="intro__left">
                         <img src={require("../../assets/organize_intro.png")} alt="" className="organize_intro"/>
                        <div onClick={scrollToList} className="go-to-do-btn">
                         <img src={require("../../assets/go-to-do-btn.png")} alt="" className="go-to-do-btn-img" />
                        </div>
                        </div>

                        <div className="intro__right">
                            <img src={require("../../assets/image.jpg")} alt="" className="intro__img"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Intro;
