import InfoOngComponent from "@/components/InfoOngComponent/InfoOngComponent"

export default function InfoOng({params}){

    let id = params.params[0]

    return(
        <InfoOngComponent id={id}/>
    )
}
