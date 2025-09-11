import { XIcon } from "lucide-react";

export default function Notifications() {
    
    return(
        <div className="w-full bg-black text-white py-1 items-center sm:px-10 flex ">
            <div className="text-cont text-sm flex-wrap flex space-x-2 font-semibold flex-1 text-center justify-center">
                <p>Sign Up to get 20% off to your first order.</p>
                <a href="#" className=" underline">Sign Up Now</a>
            </div>
            <div className="close-btn  hidden md:flex">
                <XIcon className="text-white cursor-pointer "/>
            </div>
        </div>
    )
}