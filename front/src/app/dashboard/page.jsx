'use client'

import ModalConfirmClosePost from "@/components/ModalConfirmClosePost/ModalConfirmClosePost";
import { useState } from 'react'
import {useSession} from "next-auth/react"

function DashboardPage() {
    const {data: session, status} = useSession()

    const [toggleModal,setToggleModal] = useState(false)

    return (
        <div>
            <h1>Testando Modal</h1>
            {toggleModal ? <ModalConfirmClosePost toggleModal={toggleModal} /> : null}

            <button onClick={() => setToggleModal(!toggleModal)}>Fechar POST</button>
        </div>
    );
}

export default DashboardPage;