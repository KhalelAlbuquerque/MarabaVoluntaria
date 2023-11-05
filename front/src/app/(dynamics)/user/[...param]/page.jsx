
import UserInfo from '@/components/UserInfo/UserInfo'


export default function User({params}){

    const userId = params.param[0]

    return(
        <div>
            <UserInfo userId={userId}/>
        </div>
    )

}