const encoder = new TextEncoder()

class SafeKey {
    constructor() {
        let r = +String(Math.random()).substring(2,4)
        this.protect = (nArr) => {
            return nArr.map((e)=>e-r)
        }

    }
}

export default SafeKey