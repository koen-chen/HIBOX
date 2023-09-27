export function useOrder<Type extends { id: number }>(order: number[], data: Array<Type>): Type[] {
  const orderData: Type[] = []

  if ((order.length > 0) && (data.length > 0)) {
    order.forEach((id: number) => {
      const temp = data.find((item) => {
        if (item.id == id) {
          return item
        }
      })

      if (temp) {
        orderData.push(temp)
      }
    })

    return orderData
  } else {
    return []
  }
}