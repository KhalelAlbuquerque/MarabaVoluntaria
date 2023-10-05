// Utilização ex:
// import { BiSolidUser } from "react-icons/bi";
// <InputForm type="text" name="name" icon={BiSolidUser} placeholder="name"/>

export default function InputPrimario({ type, name, icon: Icon, placeholder }){
    return (
      <div className="flex gap-4 bg-white items-center rounded-3xl px-3 pl-6 py-3 min-[352px]:w-80 sm:w-[300px] md:w-[400px] lg:mx-auto">
        <Icon className="text-[24px] text-primaryLight-500" />
        <input
          type={type}
          name={name}
          className="flex-grow  placeholder-primaryDark-900 outline-none"
          placeholder={placeholder}
        />
      </div>
    )
}
  