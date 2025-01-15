import NoteLayout from '@/modules/order-note/NoteLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_layout/orderNote')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <NoteLayout>
        </NoteLayout>
    )
}
