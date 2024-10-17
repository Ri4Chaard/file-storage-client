import React from "react";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    className?: string;
}

export const UsersTable: React.FC<Props> = ({ className }) => {
    const { users, loading } = useUserStore();
    const router = useRouter();

    return (
        <Table
            className={cn(
                "min-w-full bg-white border border-gray-200",
                className
            )}
        >
            <TableHeader className="bg-gray-100 border-b">
                <TableRow>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Логін
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Номер телефону
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        E-mail
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading
                    ? [...Array(6)].map((_, index) => (
                          <TableRow key={index}>
                              <TableCell>
                                  <Skeleton className="w-[120px] h-[14px]" />
                              </TableCell>
                              <TableCell>
                                  <Skeleton className="w-[178px] h-[14px]" />
                              </TableCell>
                              <TableCell>
                                  <Skeleton className="w-[220px] h-[14px]" />
                              </TableCell>
                          </TableRow>
                      ))
                    : users.map((user) => (
                          <TableRow
                              key={user.id}
                              className="cursor-pointer"
                              onClick={() => router.push(`/user/${user.id}`)}
                          >
                              <TableCell className="">{user.login}</TableCell>
                              <TableCell className="">
                                  {user.phone ? user.phone : "—"}
                              </TableCell>
                              <TableCell className="">
                                  {user.email ? user.email : "—"}
                              </TableCell>
                          </TableRow>
                      ))}
            </TableBody>
        </Table>
    );
};
