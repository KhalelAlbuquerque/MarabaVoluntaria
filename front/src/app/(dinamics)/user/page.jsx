import UserProfile from "@/components/UserProfile/UserProfile"
import request from "@/helpers/request";

export default async function User() {
    const requisicao = await request('user/user/653674dd46e012463546014f')
    
    let userInfo = requisicao

    return (
        <UserProfile userInfo={userInfo.user} />
    );
}