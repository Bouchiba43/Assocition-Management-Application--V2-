"use client"

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { userRole } from "@prisma/client";
import Link from "next/link";

const AdminPage = () => {

    return (
    <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                Admin
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
            <RoleGate allowedRole={userRole.ADMIN}>
                <FormSuccess message="You have permission to view this content!"/>
                <Button>
                <Link href="http://localhost:3100/dashboard">Go to Admin Dashboard</Link>
                </Button>
            </RoleGate>
        </CardContent>
    </Card>
    )
}

export default AdminPage;