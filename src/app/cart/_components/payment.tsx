import React from "react"

type Props = {
    paymentMethod: string
    setPaymentMethod: (e: string) => void
}
const Payment: React.FC<Props> = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div className="mt-20">
            <h2 className="text-2xl mb-5">Выберите способ оплаты</h2>

            <div className="flex flex-col md:flex-row gap-18 md:items-center">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="payment"
                            id="office"
                            value="office"
                            checked={paymentMethod === "office"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="accent-blue-500"
                        />
                        <label htmlFor="office">Оплата в офисе продаж</label>
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="payment"
                            id="courier"
                            value="courier"
                            checked={paymentMethod === "courier"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="accent-blue-500"
                        />
                        <label htmlFor="courier">Оплата при доставке</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment
