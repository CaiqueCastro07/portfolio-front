import "./BlackBar.css"

function BlackBar() {

    return (
        <>
            <section className="black" id="black">
                <div className="container">
                    <div className="black__wrapper">
                        <img src={require("../../assets/to-do-list-blackbar.png")} 
                        alt="" className="to-do-list-blackbar" />
                        <p className="black__text">Add a new task, complete it. Is something off? It's ok, just move it back to the To-Do area. Manage your tasks like a pro!</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlackBar;
