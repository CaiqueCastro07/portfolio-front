import "./BlackBar.css"

function BlackBar() {

    return (
        <>
            <section className="black" id="black">
                <div className="container">
                    <div className="black__wrapper">
                        <img src={require("../../assets/to-do-list-blackbar.png")} 
                        alt="" className="to-do-list-blackbar" />
                        <p className="black__text">Drag and drop to set your main priorities, check when it's done and create new tasks.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlackBar;
