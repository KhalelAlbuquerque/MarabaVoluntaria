import UserSubscriptions from "../UserSubscriptions/UserSubscriptions"

export default function UserOverview({user, owner}){
    // email, name, phoneNumber, postInscriptions (array), role, _id
    
    let userRole
    let phone
    function getRole(){
        switch(user.role){
            case "User":
                userRole = 'Usuário'
                break
            case "Admin":
                userRole = 'Administrador'
                break
            case "Ong":
                userRole = "ONG"
                break
        }
    }

    function formatNumber(){
        let ddd = user.phoneNumber.substr(0,2)
        let firstHalf = user.phoneNumber.substr(2, 5)
        let secHalf = user.phoneNumber.substr(7,9)
        
        phone = (`(${ddd}) ${firstHalf}-${secHalf}`)
    }
    formatNumber()
    getRole()
    return(
        <div className="w-full bg-blue-200">

            {owner ? 
                <p className="font-bold text-center">Seu perfil</p>
                :   
                <p className="font-bold text-center">Perfil de <span>{user.name}</span></p>
            }

            <p>Cargo: {userRole}</p>
            <p>Telefone: {phone}</p>

            <p>Inscrições:</p>
            <div>
                <UserSubscriptions postIds={user.postInscriptions}/>
            </div>
        </div>
    )

}