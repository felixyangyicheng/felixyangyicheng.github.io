﻿import { CountUp } from "../../lib/countUp/countUp.min.js?v=8.3.3"
import Data from "../../modules/data.js?v=8.3.3"

export function init(id, invoke, val, callback, option) {
    option = option || {}
    if (callback !== null) {
        option.onCompleteCallback = () => {
            invoke.invokeMethodAsync(callback)
        }
    }

    const countUp = new CountUp(id, val, option)
    countUp.start()
}
