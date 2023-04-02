

const totalCal = (orderItem) => {
    let total = 0
    orderItem.forEach(item => {
        total += item.quantity * item.price
    })
    return total
}

export default totalCal