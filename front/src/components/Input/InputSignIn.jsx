export default function InputSignIn({ type, name, icon: Icon, placeholder, setValue, value }){
    return (
      <div className="flex gap-4 bg-white border-2 border-gray-500 items-center rounded-lg px-3 pl-6 py-3 sm:w-[300px] lg:mx-auto lg:w-[410px] xl:w-[650px] max-[337px]:w-[250px]">
        <Icon className="flex text-[24px] text-primaryLight-500" />
        <input
          type={type}
          name={name}
          className="flex-grow placeholder-primaryDark-900 outline-none w-full"
          placeholder={placeholder}
          onChange={({target}) => setValue(target.value)}
          value={value}
        />
      </div>
    )
}
  