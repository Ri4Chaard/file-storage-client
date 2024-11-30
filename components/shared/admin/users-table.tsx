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
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/services/auth";
import { filesize } from "filesize";
import Link from "next/link";
import { ArrowRight, Pencil, PencilLine, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/services/instance";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Api } from "@/services/api-client";

interface Props {
    className?: string;
}

export const UsersTable: React.FC<Props> = ({ className }) => {
    const { users, loading, fetchUsers } = useUserStore();
    const [editingUserId, setEditingUserId] = React.useState<number | null>(
        null
    );
    const [comment, setComment] = React.useState<string | null>(null);

    const handleEditClick = (user: User) => {
        if (editingUserId === user.id) {
            saveComment(user.id);
        } else {
            setEditingUserId(user.id);
            setComment(user.comment || "");
        }
    };

    const saveComment = async (userId: number) => {
        try {
            await Api.users.addComment({
                userId,
                comment,
            });
            setEditingUserId(null);
            fetchUsers();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Table className={cn("min-w-full", className)}>
            <TableHeader className="border-b">
                <TableRow>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Номер замовлення
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Номер телефону
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Кількість файлів
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Об'єм зайнятого місця
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Коментар
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold">
                        Логи входів
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-gray-700 font-semibold"></TableHead>
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
                              <TableCell>
                                  <Skeleton className="w-[220px] h-[14px]" />
                              </TableCell>
                              <TableCell>
                                  <Skeleton className="w-[220px] h-[14px]" />
                              </TableCell>
                              <TableCell>
                                  <Skeleton className="w-[220px] h-[14px]" />
                              </TableCell>
                          </TableRow>
                      ))
                    : users.map((user: User) => (
                          <TableRow key={user.id} className="cursor-pointer">
                              {/* <Link
                                  href={`/user/${user.id}`}
                                  className="contents"
                              > */}
                              <TableCell>#{user.orderId}</TableCell>
                              <TableCell>{user.phone || "—"}</TableCell>
                              <TableCell>
                                  {user.files ? user.files.length : "0"}
                              </TableCell>
                              <TableCell>
                                  {user.files && user.files.length > 0
                                      ? filesize(
                                            user.files.reduce(
                                                (acc, file) => acc + file.size,
                                                0
                                            )
                                        )
                                      : "0"}
                              </TableCell>
                              <TableCell className="flex items-center gap-2">
                                  {editingUserId === user.id ? (
                                      <Textarea
                                          value={comment || ""}
                                          onChange={(e) =>
                                              setComment(e.target.value)
                                          }
                                          className="border px-2 py-1 rounded w-full"
                                      />
                                  ) : (
                                      <TooltipProvider>
                                          <Tooltip>
                                              <TooltipTrigger asChild>
                                                  <span className="truncate max-w-[150px]">
                                                      {user.comment || "—"}
                                                  </span>
                                              </TooltipTrigger>
                                              <TooltipContent className="p-2 max-w-xs whitespace-normal">
                                                  <span>
                                                      {user.comment || "—"}
                                                  </span>
                                              </TooltipContent>
                                          </Tooltip>
                                      </TooltipProvider>
                                  )}
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditClick(user)}
                                  >
                                      {editingUserId === user.id ? (
                                          <PencilLine width={16} height={16} />
                                      ) : (
                                          <Pencil width={16} height={16} />
                                      )}
                                  </Button>
                              </TableCell>
                              <TableCell>
                                  <Button variant="ghost">
                                      <Scroll width={16} height={16} />
                                  </Button>
                              </TableCell>
                              <TableCell>
                                  <Link
                                      href={`/user/${user.id}`}
                                      className="contents"
                                  >
                                      <Button variant="ghost">
                                          <ArrowRight width={16} height={16} />
                                      </Button>
                                  </Link>
                              </TableCell>
                          </TableRow>
                      ))}
            </TableBody>
        </Table>
    );
};
