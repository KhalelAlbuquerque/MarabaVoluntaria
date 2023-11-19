export default function convertToBase64(e, setImage){
    var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImage(reader.result)
        }
        reader.onerror = (error=>{
            console.log(error)
        })
  }