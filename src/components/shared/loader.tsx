import Image from "next/image"
import logo from "../../../public/log.svg"
type Props = {
    loading: boolean
}
const Loader = ({ loading }: Props) => {
    return (
        <div
            className={`${loading ? "flex" : "hidden"} w-screen absolute top-0 left-0 z-150 h-screen  items-center justify-center bg-gray-200`}
        >
            <div className=" rounded-xl animate-spin">
                <Image
                    alt="load-logo"
                    src={logo}
                    width={150}
                    height={150}
                />
            </div>
        </div>
    )
}

export default Loader
